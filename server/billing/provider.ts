import { createMockBillingProvider } from './mock';
import { createStripeBillingProvider } from './stripe';
import type { BillingProvider } from './types';

export type BillingProviderName = 'mock' | 'stripe';

let warnedFallback = false;

export function resolveBillingProviderName(
  env: NodeJS.ProcessEnv = process.env,
): BillingProviderName {
  const requested = env.BILLING_PROVIDER?.trim().toLowerCase();
  const hasStripeSecret =
    typeof env.STRIPE_SECRET_KEY === 'string' && env.STRIPE_SECRET_KEY.length > 0;

  if (requested === 'mock') {
    return 'mock';
  }

  if (hasStripeSecret) {
    return 'stripe';
  }

  return 'mock';
}

export function getBillingProvider(): BillingProvider {
  const selected = resolveBillingProviderName(process.env);
  if (selected === 'stripe') {
    return createStripeBillingProvider();
  }

  const requested = process.env.BILLING_PROVIDER?.trim().toLowerCase();
  const hasStripeSecret =
    typeof process.env.STRIPE_SECRET_KEY === 'string' &&
    process.env.STRIPE_SECRET_KEY.length > 0;

  if (!warnedFallback && requested !== 'mock' && !hasStripeSecret) {
    warnedFallback = true;
    console.warn(
      '[billing] Stripe disabled because STRIPE_SECRET_KEY is missing. Falling back to mock provider.',
    );
  }

  return createMockBillingProvider();
}
