import { resolveAuthUser } from '../../utils/authUser';
import type {
  BillingPlan,
  BillingPlansResponse,
  BillingCustomer,
} from '~/types/billing';

const mockPlans: BillingPlan[] = [
  {
    key: 'free',
    name: 'Essencial',
    description: 'Para explorar os testes principais.',
    price: {
      id: 'price_free',
      unitAmount: 0,
      currency: 'BRL',
    },
    features: [
      'Resultados essenciais e visao geral',
      'Acesso a testes publicos',
      'Historico salvo no navegador',
    ],
    ctaLabel: 'Comecar agora',
    product: {
      id: 'prod_free',
      name: 'Essencial',
      description: 'Plano gratuito',
    },
  },
  {
    key: 'premium_monthly',
    name: 'Premium mensal',
    description: 'Flexibilidade para ir mais fundo.',
    price: {
      id: 'price_premium_monthly',
      unitAmount: 2900,
      currency: 'BRL',
      interval: 'month',
      intervalCount: 1,
    },
    features: [
      'Relatorios completos em todos os testes',
      'PDF premium para baixar',
      'Historico sincronizado na nuvem',
      'Prioridade em novos testes',
    ],
    badge: 'Flexivel',
    ctaLabel: 'Assinar mensal',
    product: {
      id: 'prod_premium',
      name: 'Premium',
      description: 'Assinatura premium',
    },
  },
  {
    key: 'premium_annual',
    name: 'Premium anual',
    description: 'Economia para quem leva a jornada a serio.',
    price: {
      id: 'price_premium_annual',
      unitAmount: 29000,
      currency: 'BRL',
      interval: 'year',
      intervalCount: 1,
    },
    features: [
      'Tudo do plano mensal',
      'Economia equivalente a 2 meses',
      'Atendimento prioritario',
      'Acesso antecipado a novos relatorios',
    ],
    badge: 'Melhor valor',
    highlight: true,
    ctaLabel: 'Assinar anual',
    product: {
      id: 'prod_premium',
      name: 'Premium',
      description: 'Assinatura premium',
    },
  },
];

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
  const authUser = await resolveAuthUser(event);

  const customer = resolveMockPremiumStatus(authUser);

  const response: BillingPlansResponse = {
    plans: mockPlans,
    customer,
  };

  // TODO: Replace mockPlans with Stripe Price/Product listing.
  return response;
});
