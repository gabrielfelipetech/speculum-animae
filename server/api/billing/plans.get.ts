import { resolveAuthUser } from '../../utils/authUser';
import { withCriticalApiLogging } from '../../utils/bugsnag';
import { getBillingProvider } from '../../billing/provider';
import { toAppBillingPlan } from '../../billing/plans';
import type {
  BillingPlan,
  BillingPlansResponse,
  BillingCustomer,
} from '~/types/billing';

function resolveMockPremiumStatus(
  authUser: Awaited<ReturnType<typeof resolveAuthUser>>,
): BillingCustomer {
  if (!authUser) {
    return { isLoggedIn: false, isPremium: false };
  }

  const userMetadata = authUser.user_metadata as Record<string, unknown>;
  const appMetadata = authUser.app_metadata as Record<string, unknown>;
  const planValue =
    (userMetadata?.plan as string | undefined) ??
    (appMetadata?.plan as string | undefined);
  const isPremium =
    planValue === 'premium' ||
    planValue === 'premium_monthly' ||
    planValue === 'premium_annual';

  return {
    isLoggedIn: true,
    isPremium,
  };
}

export default defineEventHandler(async (event) => {
  const ctx = { area: 'billing.plans', authUserId: null as string | null };

  return await withCriticalApiLogging(event, ctx, async () => {
    const authUser = await resolveAuthUser(event);
    const authUserId = authUser?.id ?? null;
    ctx.authUserId = authUserId;

    const provider = getBillingProvider();
    const providerPlans = await provider.listPlans();
    const plans: BillingPlan[] = providerPlans
      .map((plan) => toAppBillingPlan(plan))
      .filter((plan): plan is BillingPlan => plan !== null);

    const customer = resolveMockPremiumStatus(authUser);

    const response: BillingPlansResponse = {
      plans,
      customer,
    };

    return response;
  });
});
