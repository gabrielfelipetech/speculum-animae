import { getRequestURL } from 'h3';
import { withCriticalApiLogging } from '../../utils/bugsnag';
import { getBillingProvider } from '../../billing/provider';
import { resolveBillingAuthContext } from '../../billing/auth';

type PortalBody = {
  returnUrl?: unknown;
};

function resolveAbsoluteUrl(value: unknown, fallbackUrl: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return fallbackUrl;
  }

  try {
    const parsed = new URL(value);
    if (!parsed.protocol.startsWith('http')) {
      return fallbackUrl;
    }
    return parsed.toString();
  } catch {
    return fallbackUrl;
  }
}

export default defineEventHandler(async (event) => {
  const ctx = { area: 'billing.portal', authUserId: null as string | null };

  return await withCriticalApiLogging(event, ctx, async () => {
    const authContext = await resolveBillingAuthContext(event);
    ctx.authUserId = authContext.userId ?? null;

    if (!authContext.isAuthenticated) {
      throw createError({
        statusCode: 401,
        message: 'Login necessario para gerenciar a assinatura.',
      });
    }

    const runtime = useRuntimeConfig();
    const baseUrl = String(
      runtime.public.siteUrl || getRequestURL(event).origin,
    ).replace(/\/$/, '');
    const body = await readBody<PortalBody>(event);
    const returnUrl = resolveAbsoluteUrl(
      body.returnUrl,
      `${baseUrl}/planos?status=portal`,
    );

    const provider = getBillingProvider();
    return await provider.createPortal({ returnUrl }, authContext);
  });
});
