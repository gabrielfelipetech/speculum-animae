// server/utils/bugsnag.ts
import Bugsnag from '@bugsnag/js';
import { getRequestHeader, getRequestURL } from 'h3';
import type { H3Event } from 'h3';
import { useRuntimeConfig } from '#imports';

type Metadata = Record<string, unknown>;

type CriticalCtx = Readonly<{
  area: string;
  authUserId?: string | null;
}>;

let serverStarted = false;
let serverClient: typeof Bugsnag | null = null;

function stripQuery(url: string): string {
  const idx = url.indexOf('?');
  return idx >= 0 ? url.slice(0, idx) : url;
}

function safeString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

function resolveReleaseStage(config: ReturnType<typeof useRuntimeConfig>): string {
  const explicit = safeString((config.public as Record<string, unknown>)?.releaseStage);
  if (explicit) return explicit;
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
}

function resolveAppVersion(config: ReturnType<typeof useRuntimeConfig>): string | undefined {
  return (
    safeString((config.public as Record<string, unknown>)?.appVersion) ??
    safeString(process.env.NUXT_PUBLIC_APP_VERSION)
  );
}

function getErrorStatusCode(error: unknown): number | undefined {
  if (typeof error !== 'object' || error === null) return undefined;
  const maybe = error as Record<string, unknown>;
  const code = maybe.statusCode;
  return typeof code === 'number' ? code : undefined;
}

function normalizeError(error: unknown): Error {
  if (error instanceof Error) return error;
  const message =
    typeof error === 'string'
      ? error
      : (() => {
          try {
            return JSON.stringify(error);
          } catch {
            return String(error);
          }
        })();
  return new Error(message);
}

function safeStartServerBugsnag(): typeof Bugsnag | null {
  try {
    const config = useRuntimeConfig();
    const apiKey =
      safeString((config.public as Record<string, unknown>)?.bugsnagApiKey) ??
      safeString(process.env.NUXT_PUBLIC_BUGSNAG_API_KEY);

    if (!apiKey) return null;

    if (serverStarted && serverClient) return serverClient;

    const releaseStage = resolveReleaseStage(config);
    const appVersion = resolveAppVersion(config);

    Bugsnag.start({
      apiKey,
      releaseStage,
      appVersion,
      enabledReleaseStages: ['development', 'production'],
      onError: (event) => {
        try {
          const req = (event as unknown as { request?: { url?: string } }).request;
          const url = req?.url;
          if (typeof url === 'string') {
            (event as unknown as { request?: { url?: string } }).request = {
              ...(req ?? {}),
              url: stripQuery(url),
            };
          }
        } catch {
          // no-op
        }
        return true;
      },
    });

    serverStarted = true;
    serverClient = Bugsnag;
    return serverClient;
  } catch {
    return null;
  }
}

export function getServerBugsnag(): typeof Bugsnag | null {
  return safeStartServerBugsnag();
}

export function leaveServerBreadcrumb(name: string, metadata?: Metadata): void {
  try {
    const client = getServerBugsnag();
    if (!client) return;
    client.leaveBreadcrumb(name, metadata ?? {});
  } catch {
    // no-op
  }
}

export function notifyServerError(
  event: H3Event,
  error: unknown,
  metadata?: Metadata,
): void {
  try {
    const client = getServerBugsnag();
    if (!client) return;

    const err = normalizeError(error);

    const url = getRequestURL(event);
    const path = url.pathname;
    const method = event.node.req.method ?? 'GET';
    const userAgent = getRequestHeader(event, 'user-agent') ?? undefined;
    const statusCode = event.node.res.statusCode;

    client.notify(err, (bugsnagEvent) => {
      try {
        bugsnagEvent.addMetadata('request', {
          method,
          path,
          url: path, // sem query
          userAgent,
          statusCode,
        });

        if (metadata && Object.keys(metadata).length > 0) {
          bugsnagEvent.addMetadata('extra', metadata);
        }
      } catch {
        // no-op
      }
    });
  } catch {
    // no-op
  }
}

export async function withCriticalApiLogging<T>(
  event: H3Event,
  ctx: CriticalCtx,
  fn: () => Promise<T>,
): Promise<T> {
  const startedAt = Date.now();

  const url = getRequestURL(event);
  const path = url.pathname;
  const method = event.node.req.method ?? 'GET';

  leaveServerBreadcrumb('api.request', {
    area: ctx.area,
    method,
    path,
    authUserId: ctx.authUserId ?? null,
  });

  try {
    const result = await fn();
    const durationMs = Date.now() - startedAt;

    leaveServerBreadcrumb('api.response', {
      area: ctx.area,
      statusCode: event.node.res.statusCode,
      durationMs,
    });

    return result;
  } catch (error) {
    const durationMs = Date.now() - startedAt;
    const statusCode = getErrorStatusCode(error);

    // 4xx esperado: não notifica
    if (typeof statusCode === 'number' && statusCode < 500) {
      leaveServerBreadcrumb('api.denied', {
        area: ctx.area,
        statusCode,
        durationMs,
      });
      throw error;
    }

    notifyServerError(event, error, {
      area: ctx.area,
      durationMs,
      authUserId: ctx.authUserId ?? null,
      method,
      path,
    });

    throw error;
  }
}
