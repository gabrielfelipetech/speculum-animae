import Bugsnag from '@bugsnag/js';
import type { Event } from '@bugsnag/core';
import { getHeader, getRequestURL, type H3Event } from 'h3';
import { useRuntimeConfig } from '#imports';

type BreadcrumbMetadata = Record<string, unknown>;

let initialized = false;
let enabled = false;

function resolveReleaseStage(value?: string | null): 'development' | 'production' {
  if (value === 'production') return 'production';
  if (value === 'development') return 'development';
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
}

function stripQuery(value: string): string {
  const withoutHash = value.split('#')[0] ?? value;
  return withoutHash.split('?')[0] ?? withoutHash;
}

function getSafeUrl(event: H3Event): string {
  const url = getRequestURL(event);
  const origin =
    typeof url.origin === 'string' && url.origin !== 'null' ? url.origin : '';
  return `${origin}${url.pathname}`;
}

function getUserAgent(event: H3Event): string | undefined {
  const raw = getHeader(event, 'user-agent');
  return typeof raw === 'string' && raw.length > 0 ? raw : undefined;
}

function ensureStarted(): void {
  if (initialized) return;
  initialized = true;

  const config = useRuntimeConfig();
  const apiKey = config.public.bugsnagApiKey;

  enabled = typeof apiKey === 'string' && apiKey.length > 0;
  if (!enabled) return;

  const releaseStage = resolveReleaseStage(config.public.releaseStage);
  const appVersion = config.public.appVersion ?? 'dev';

  Bugsnag.start({
    apiKey,
    releaseStage,
    appVersion,
    enabledReleaseStages: ['development', 'production'],
    onError: (event) => {
      const request = event.request;
      if (request?.url) {
        request.url = stripQuery(String(request.url));
      }
      if (request?.headers) {
        const rawUserAgent =
          request.headers['user-agent'] ?? request.headers['User-Agent'];
        const sanitizedHeaders: Record<string, string> = {};
        if (rawUserAgent) {
          sanitizedHeaders['user-agent'] = String(rawUserAgent);
        }
        request.headers = sanitizedHeaders;
      }
      return true;
    },
  });
}

function normalizeError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (typeof error === 'string') return new Error(error);
  return new Error('Unknown server error');
}

function getErrorStatusCode(error: unknown): number | null {
  if (!error || typeof error !== 'object') return null;
  const raw = (error as { statusCode?: unknown; status?: unknown }).statusCode ??
    (error as { statusCode?: unknown; status?: unknown }).status;
  if (typeof raw === 'number' && Number.isFinite(raw)) {
    return raw;
  }
  return null;
}

export function getServerBugsnag(): typeof Bugsnag {
  ensureStarted();
  return Bugsnag;
}

export function leaveServerBreadcrumb(
  name: string,
  metadata?: BreadcrumbMetadata,
): void {
  ensureStarted();
  if (!enabled) return;
  Bugsnag.leaveBreadcrumb(name, metadata);
}

export function notifyServerError(
  event: H3Event,
  error: unknown,
  metadata?: BreadcrumbMetadata,
): void {
  ensureStarted();
  if (!enabled) return;

  const normalized = normalizeError(error);
  const requestUrl = getSafeUrl(event);
  const requestMetadata: Record<string, unknown> = {
    method: event.node.req.method ?? 'GET',
    path: getRequestURL(event).pathname,
    url: requestUrl,
  };

  const userAgent = getUserAgent(event);
  if (userAgent) {
    requestMetadata.userAgent = userAgent;
  }

  const durationMs =
    typeof metadata?.durationMs === 'number' && Number.isFinite(metadata.durationMs)
      ? metadata.durationMs
      : undefined;
  if (typeof durationMs === 'number') {
    requestMetadata.durationMs = durationMs;
  }

  const authUserId = metadata?.authUserId;
  if (typeof authUserId === 'string' && authUserId.length > 0) {
    requestMetadata.authUserId = authUserId;
  }

  const statusCode = event.node.res.statusCode;
  if (typeof statusCode === 'number' && statusCode > 0) {
    requestMetadata.statusCode = statusCode;
  }

  Bugsnag.notify(normalized, (bugsnagEvent: Event) => {
    bugsnagEvent.addMetadata('request', requestMetadata);
    if (metadata) {
      bugsnagEvent.addMetadata('extra', metadata);
    }
  });
}

export async function withCriticalApiLogging<T>(
  event: H3Event,
  ctx: { area: string; authUserId?: string | null },
  fn: () => Promise<T>,
): Promise<T> {
  const method = event.node.req.method ?? 'GET';
  const path = getRequestURL(event).pathname;

  leaveServerBreadcrumb('api.request', {
    area: ctx.area,
    method,
    path,
  });

  const startedAt = Date.now();

  try {
    const result = await fn();
    const durationMs = Date.now() - startedAt;
    const statusCode = event.node.res.statusCode;

    const responseMetadata: Record<string, unknown> = {
      area: ctx.area,
      statusCode,
      durationMs,
    };

    if (typeof ctx.authUserId === 'string' && ctx.authUserId.length > 0) {
      responseMetadata.authUserId = ctx.authUserId;
    }

    leaveServerBreadcrumb('api.response', responseMetadata);
    return result;
  } catch (error) {
    const durationMs = Date.now() - startedAt;
    const statusCode = getErrorStatusCode(error);

    if (typeof statusCode === 'number' && statusCode > 0 && statusCode < 500) {
      const deniedMetadata: Record<string, unknown> = {
        area: ctx.area,
        statusCode,
        durationMs,
      };

      if (typeof ctx.authUserId === 'string' && ctx.authUserId.length > 0) {
        deniedMetadata.authUserId = ctx.authUserId;
      }

      leaveServerBreadcrumb('api.denied', deniedMetadata);
      throw error;
    }

    notifyServerError(event, error, {
      area: ctx.area,
      durationMs,
      authUserId: ctx.authUserId ?? null,
      statusCode: statusCode ?? undefined,
    });

    throw error;
  }
}
