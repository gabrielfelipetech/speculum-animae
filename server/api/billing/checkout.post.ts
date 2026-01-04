import { getRequestURL } from 'h3';
import { resolveAuthUser } from '../../utils/authUser';
import type { BillingPaidPlanKey } from '~/types/billing';

const PAID_PLANS = ['premium_monthly', 'premium_annual'] as const;

function isPaidPlanKey(value: unknown): value is BillingPaidPlanKey {
  return PAID_PLANS.includes(value as BillingPaidPlanKey);
}

export default defineEventHandler(async (event) => {
  const authUser = await resolveAuthUser(event);
  if (!authUser) {
    throw createError({
      statusCode: 401,
      message: 'Login necessario para assinar.',
    });
  }

  const body = await readBody<{ plan?: unknown }>(event);
  const plan = body?.plan;

  if (!isPaidPlanKey(plan)) {
    throw createError({
      statusCode: 400,
      message: 'Plano invalido.',
    });
  }

  const runtime = useRuntimeConfig();
  const baseUrl = String(
    runtime.public.siteUrl || getRequestURL(event).origin,
  ).replace(/\/$/, '');

  // TODO: Integrar Stripe Checkout com runtime.stripeSecretKey e price IDs reais.
  const redirectUrl = `${baseUrl}/planos?status=success&mock=1&plan=${encodeURIComponent(
    plan,
  )}`;

  return { url: redirectUrl };
});
