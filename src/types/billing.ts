export type BillingPlanKey = 'free' | 'premium_monthly' | 'premium_annual';
export type BillingPaidPlanKey = Exclude<BillingPlanKey, 'free'>;

export type BillingInterval = 'month' | 'year';

export type BillingPrice = {
  id: string;
  unitAmount: number;
  currency: string;
  interval?: BillingInterval;
  intervalCount?: number;
};

export type BillingProduct = {
  id: string;
  name: string;
  description?: string;
};

export type BillingPlan = {
  key: BillingPlanKey;
  name: string;
  description: string;
  price: BillingPrice | null;
  features: string[];
  badge?: string;
  highlight?: boolean;
  ctaLabel: string;
  product?: BillingProduct | null;
};

export type BillingCustomer = {
  isLoggedIn: boolean;
  isPremium: boolean;
};

export type BillingPlansResponse = {
  plans: BillingPlan[];
  customer: BillingCustomer;
};
