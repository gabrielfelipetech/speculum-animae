import type {
  BillingPlan as AppBillingPlan,
  BillingPlanKey,
} from '~/types/billing';
import type { BillingPlan as ProviderBillingPlan } from './types';

export type PlanId = BillingPlanKey;

type PlanDefinition = {
  id: PlanId;
  provider: ProviderBillingPlan;
  description: string;
  ctaLabel: string;
  badge?: string;
  highlight?: boolean;
  interval?: 'month' | 'year';
  intervalCount?: number;
  unitAmountCents: number;
  productId?: string;
  productDescription?: string;
};

const PLAN_DEFINITIONS: readonly PlanDefinition[] = [
  {
    id: 'free',
    provider: {
      id: 'free',
      name: 'Essencial',
      priceMonthlyCents: 0,
      currency: 'BRL',
      features: [
        'Resultados essenciais e visao geral',
        'Acesso a testes publicos',
        'Historico salvo no navegador',
      ],
    },
    description: 'Para explorar os testes principais.',
    ctaLabel: 'Comecar agora',
    unitAmountCents: 0,
    productId: 'prod_free',
    productDescription: 'Plano gratuito',
  },
  {
    id: 'premium_monthly',
    provider: {
      id: 'premium_monthly',
      name: 'Premium mensal',
      priceMonthlyCents: 2900,
      currency: 'BRL',
      features: [
        'Relatorios completos em todos os testes',
        'PDF premium para baixar',
        'Historico sincronizado na nuvem',
        'Prioridade em novos testes',
      ],
    },
    description: 'Flexibilidade para ir mais fundo.',
    ctaLabel: 'Assinar mensal',
    badge: 'Flexivel',
    interval: 'month',
    intervalCount: 1,
    unitAmountCents: 2900,
    productId: 'prod_premium',
    productDescription: 'Assinatura premium mensal',
  },
  {
    id: 'premium_annual',
    provider: {
      id: 'premium_annual',
      name: 'Premium anual',
      priceMonthlyCents: 2417,
      currency: 'BRL',
      features: [
        'Tudo do plano mensal',
        'Economia equivalente a 2 meses',
        'Atendimento prioritario',
        'Acesso antecipado a novos relatorios',
      ],
      isPopular: true,
    },
    description: 'Economia para quem leva a jornada a serio.',
    ctaLabel: 'Assinar anual',
    badge: 'Melhor valor',
    highlight: true,
    interval: 'year',
    intervalCount: 1,
    unitAmountCents: 29000,
    productId: 'prod_premium',
    productDescription: 'Assinatura premium anual',
  },
] as const;

export function listKnownProviderPlans(): ProviderBillingPlan[] {
  return PLAN_DEFINITIONS.map((plan) => ({ ...plan.provider }));
}

export function isKnownPlanId(value: string): value is PlanId {
  return PLAN_DEFINITIONS.some((plan) => plan.id === value);
}

export function getStripePriceIdForPlan(planId: PlanId): string | null {
  if (planId === 'free') return null;

  const priceEssential = process.env.STRIPE_PRICE_ESSENTIAL;
  const pricePlus = process.env.STRIPE_PRICE_PLUS;
  const pricePro = process.env.STRIPE_PRICE_PRO;

  if (planId === 'premium_monthly') {
    const resolved = pricePlus ?? priceEssential;
    return typeof resolved === 'string' && resolved.length > 0
      ? resolved
      : null;
  }

  const resolved = pricePro;
  return typeof resolved === 'string' && resolved.length > 0 ? resolved : null;
}

export function toAppBillingPlan(plan: ProviderBillingPlan): AppBillingPlan | null {
  const definition = PLAN_DEFINITIONS.find((item) => item.id === plan.id);
  if (!definition) return null;

  const priceId =
    definition.id === 'free'
      ? 'price_free'
      : getStripePriceIdForPlan(definition.id) ?? `price_${definition.id}`;

  return {
    key: definition.id,
    name: plan.name,
    description: definition.description,
    ctaLabel: definition.ctaLabel,
    badge: definition.badge,
    highlight: definition.highlight,
    features: [...plan.features],
    price: {
      id: priceId,
      unitAmount: definition.unitAmountCents,
      currency: plan.currency,
      interval: definition.interval,
      intervalCount: definition.intervalCount,
    },
    product: definition.productId
      ? {
          id: definition.productId,
          name: plan.name,
          description: definition.productDescription,
        }
      : undefined,
  };
}
