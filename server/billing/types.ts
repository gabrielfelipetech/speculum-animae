export type BillingPlan = {
  id: string;
  name: string;
  priceMonthlyCents: number;
  currency: string;
  features: string[];
  isPopular?: boolean;
};

export type CheckoutRequest = {
  planId: string;
  successUrl: string;
  cancelUrl: string;
};

export type CheckoutResponse = {
  url: string;
};

export type PortalRequest = {
  returnUrl: string;
};

export type PortalResponse = {
  url: string;
};

export type AuthContext = {
  userId?: string;
  email?: string;
  isAuthenticated: boolean;
  actorKey: string;
};

export type BillingProvider = {
  listPlans(): Promise<BillingPlan[]>;
  createCheckout(
    req: CheckoutRequest,
    user: AuthContext,
  ): Promise<CheckoutResponse>;
  createPortal(req: PortalRequest, user: AuthContext): Promise<PortalResponse>;
};
