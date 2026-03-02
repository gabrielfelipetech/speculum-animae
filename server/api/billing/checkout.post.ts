import { getRequestURL } from 'h3';
import { withCriticalApiLogging } from '../../utils/bugsnag';
import { getBillingProvider } from '../../billing/provider';
import { resolveBillingAuthContext } from '../../billing/auth';
import { isKnownPlanId } from '../../billing/plans';

type CheckoutBody = {
  plan?: unknown;
  planId?: unknown;
  successUrl?: unknown;
  cancelUrl?: unknown;
  clientId?: unknown;
};

function resolveBodyPlanId(body: CheckoutBody): string | null {
  const planIdValue =
    typeof body.planId === 'string'
      ? body.planId
      : typeof body.plan === 'string'
        ? body.plan
        : null;

  if (!planIdValue) return null;
  return planIdValue.trim() || null;
}

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
  const ctx = { area: 'billing.checkout', authUserId: null as string | null };

  return await withCriticalApiLogging(event, ctx, async () => {
    const body = await readBody<CheckoutBody>(event);
    const planId = resolveBodyPlanId(body);
    if (!planId || !isKnownPlanId(planId) || planId === 'free') {
      throw createError({
        statusCode: 400,
        message: 'Plano invalido.',
      });
    }

    const runtime = useRuntimeConfig();
    const baseUrl = String(
      runtime.public.siteUrl || getRequestURL(event).origin,
    ).replace(/\/$/, '');
    const successUrl = resolveAbsoluteUrl(
      body.successUrl,
      `${baseUrl}/planos?status=success`,
    );
    const cancelUrl = resolveAbsoluteUrl(
      body.cancelUrl,
      `${baseUrl}/planos?status=cancel`,
    );

    const clientId = typeof body.clientId === 'string' ? body.clientId : null;
    const authContext = await resolveBillingAuthContext(event, { clientId });
    ctx.authUserId = authContext.userId ?? null;

    const provider = getBillingProvider();
    const response = await provider.createCheckout(
      {
        planId,
        successUrl,
        cancelUrl,
      },
      authContext,
    );

    return response;
  });
});
