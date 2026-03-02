import { describe, expect, it } from 'vitest';
import { resolveBillingProviderName } from '../provider';

describe('billing provider selection', () => {
  it('uses mock when explicitly requested', () => {
    const env: NodeJS.ProcessEnv = {
      BILLING_PROVIDER: 'mock',
      STRIPE_SECRET_KEY: 'sk_test_123',
    };

    expect(resolveBillingProviderName(env)).toBe('mock');
  });

  it('uses stripe when secret key exists and mock is not forced', () => {
    const env: NodeJS.ProcessEnv = {
      STRIPE_SECRET_KEY: 'sk_test_123',
    };

    expect(resolveBillingProviderName(env)).toBe('stripe');
  });

  it('falls back to mock when stripe key is missing', () => {
    const env: NodeJS.ProcessEnv = {};
    expect(resolveBillingProviderName(env)).toBe('mock');
  });
});
