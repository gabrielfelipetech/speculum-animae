import { d as defineEventHandler, w as withCriticalApiLogging, c as createError, a as useRuntimeConfig, b as getRequestURL, r as readBody } from '../../../_/nitro.mjs';
import { g as getBillingProvider } from '../../../_/provider.mjs';
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
const portal_post = defineEventHandler(async (event) => {
  const ctx = { area: "billing.portal", authUserId: null };
  return await withCriticalApiLogging(event, ctx, async () => {
    var _a;
    const authContext = await resolveBillingAuthContext(event);
    ctx.authUserId = (_a = authContext.userId) != null ? _a : null;
    if (!authContext.isAuthenticated) {
      throw createError({
        statusCode: 401,
        message: "Login necessario para gerenciar a assinatura."
      });
    }
    const runtime = useRuntimeConfig();
    const baseUrl = String(
      runtime.public.siteUrl || getRequestURL(event).origin
    ).replace(/\/$/, "");
    const body = await readBody(event);
    const returnUrl = resolveAbsoluteUrl(
      body.returnUrl,
      `${baseUrl}/planos?status=portal`
    );
    const provider = getBillingProvider();
    return await provider.createPortal({ returnUrl }, authContext);
  });
});

export { portal_post as default };
//# sourceMappingURL=portal.post.mjs.map
