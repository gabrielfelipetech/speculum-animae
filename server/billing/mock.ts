import { listKnownProviderPlans } from './plans';
import type {
  BillingProvider,
  CheckoutRequest,
  CheckoutResponse,
  PortalRequest,
  PortalResponse,
} from './types';

function createMockCheckoutResponse(_req: CheckoutRequest): CheckoutResponse {
  return { url: '/planos?checkout=mock-success' };
}

function createMockPortalResponse(_req: PortalRequest): PortalResponse {
  return { url: '/planos?portal=mock' };
}

export function createMockBillingProvider(): BillingProvider {
  return {
    async listPlans() {
      return listKnownProviderPlans();
    },
    async createCheckout(req) {
      return createMockCheckoutResponse(req);
    },
    async createPortal(req) {
      return createMockPortalResponse(req);
    },
  };
}
