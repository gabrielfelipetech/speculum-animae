import { d as defineEventHandler, w as withCriticalApiLogging, r as readBody, c as createError, a as useRuntimeConfig, b as getRequestURL } from '../../../_/nitro.mjs';
import { i as isKnownPlanId, g as getBillingProvider } from '../../../_/provider.mjs';
import { r as resolveBillingAuthContext } from '../../../_/auth.mjs';
import '@bugsnag/js';
import '@supabase/ssr';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue';
import 'vue-router';
import 'node:fs';
import 'node:path';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'better-sqlite3';
import 'stripe';

function resolveBodyPlanId(body) {
  const planIdValue = typeof body.planId === "string" ? body.planId : typeof body.plan === "string" ? body.plan : null;
  if (!planIdValue) return null;
  return planIdValue.trim() || null;
}
function resolveAbsoluteUrl(value, fallbackUrl) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return fallbackUrl;
  }
  try {
    const parsed = new URL(value);
    if (!parsed.protocol.startsWith("http")) {
      return fallbackUrl;
    }
    return parsed.toString();
  } catch {
    return fallbackUrl;
  }
}
const checkout_post = defineEventHandler(async (event) => {
  const ctx = { area: "billing.checkout", authUserId: null };
  return await withCriticalApiLogging(event, ctx, async () => {
    var _a;
    const body = await readBody(event);
    const planId = resolveBodyPlanId(body);
    if (!planId || !isKnownPlanId(planId) || planId === "free") {
      throw createError({
        statusCode: 400,
        message: "Plano invalido."
      });
    }
    const runtime = useRuntimeConfig();
    const baseUrl = String(
      runtime.public.siteUrl || getRequestURL(event).origin
    ).replace(/\/$/, "");
    const successUrl = resolveAbsoluteUrl(
      body.successUrl,
      `${baseUrl}/planos?status=success`
    );
    const cancelUrl = resolveAbsoluteUrl(
      body.cancelUrl,
      `${baseUrl}/planos?status=cancel`
    );
    const clientId = typeof body.clientId === "string" ? body.clientId : null;
    const authContext = await resolveBillingAuthContext(event, { clientId });
    ctx.authUserId = (_a = authContext.userId) != null ? _a : null;
    const provider = getBillingProvider();
    const response = await provider.createCheckout(
      {
        planId,
        successUrl,
        cancelUrl
      },
      authContext
    );
    return response;
  });
});

export { checkout_post as default };
//# sourceMappingURL=checkout.post.mjs.map
