import { d as defineEventHandler, w as withCriticalApiLogging, e as resolveAuthUser } from '../../../_/nitro.mjs';
import { g as getBillingProvider, t as toAppBillingPlan } from '../../../_/provider.mjs';
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

function resolveMockPremiumStatus(authUser) {
  var _a;
  if (!authUser) {
    return { isLoggedIn: false, isPremium: false };
  }
  const userMetadata = authUser.user_metadata;
  const appMetadata = authUser.app_metadata;
  const planValue = (_a = userMetadata == null ? void 0 : userMetadata.plan) != null ? _a : appMetadata == null ? void 0 : appMetadata.plan;
  const isPremium = planValue === "premium" || planValue === "premium_monthly" || planValue === "premium_annual";
  return {
    isLoggedIn: true,
    isPremium
  };
}
const plans_get = defineEventHandler(async (event) => {
  const ctx = { area: "billing.plans", authUserId: null };
  return await withCriticalApiLogging(event, ctx, async () => {
    var _a;
    const authUser = await resolveAuthUser(event);
    const authUserId = (_a = authUser == null ? void 0 : authUser.id) != null ? _a : null;
    ctx.authUserId = authUserId;
    const provider = getBillingProvider();
    const providerPlans = await provider.listPlans();
    const plans = providerPlans.map((plan) => toAppBillingPlan(plan)).filter((plan) => plan !== null);
    const customer = resolveMockPremiumStatus(authUser);
    const response = {
      plans,
      customer
    };
    return response;
  });
});

export { plans_get as default };
//# sourceMappingURL=plans.get.mjs.map
