import { c as createError } from './nitro.mjs';
import Stripe from 'stripe';

const PLAN_DEFINITIONS = [
  {
    id: "free",
    provider: {
      id: "free",
      name: "Essencial",
      priceMonthlyCents: 0,
      currency: "BRL",
      features: [
        "Resultados essenciais e visao geral",
        "Acesso a testes publicos",
        "Historico salvo no navegador"
      ]
    },
    description: "Para explorar os testes principais.",
    ctaLabel: "Comecar agora",
    unitAmountCents: 0,
    productId: "prod_free",
    productDescription: "Plano gratuito"
  },
  {
    id: "premium_monthly",
    provider: {
      id: "premium_monthly",
      name: "Premium mensal",
      priceMonthlyCents: 2900,
      currency: "BRL",
      features: [
        "Relatorios completos em todos os testes",
        "PDF premium para baixar",
        "Historico sincronizado na nuvem",
        "Prioridade em novos testes"
      ]
    },
    description: "Flexibilidade para ir mais fundo.",
    ctaLabel: "Assinar mensal",
    badge: "Flexivel",
    interval: "month",
    intervalCount: 1,
    unitAmountCents: 2900,
    productId: "prod_premium",
    productDescription: "Assinatura premium mensal"
  },
  {
    id: "premium_annual",
    provider: {
      id: "premium_annual",
      name: "Premium anual",
      priceMonthlyCents: 2417,
      currency: "BRL",
      features: [
        "Tudo do plano mensal",
        "Economia equivalente a 2 meses",
        "Atendimento prioritario",
        "Acesso antecipado a novos relatorios"
      ],
      isPopular: true
    },
    description: "Economia para quem leva a jornada a serio.",
    ctaLabel: "Assinar anual",
    badge: "Melhor valor",
    highlight: true,
    interval: "year",
    intervalCount: 1,
    unitAmountCents: 29e3,
    productId: "prod_premium",
    productDescription: "Assinatura premium anual"
  }
];
function listKnownProviderPlans() {
  return PLAN_DEFINITIONS.map((plan) => ({ ...plan.provider }));
}
function isKnownPlanId(value) {
  return PLAN_DEFINITIONS.some((plan) => plan.id === value);
}
function getStripePriceIdForPlan(planId) {
  if (planId === "free") return null;
  const priceEssential = process.env.STRIPE_PRICE_ESSENTIAL;
  const pricePlus = process.env.STRIPE_PRICE_PLUS;
  const pricePro = process.env.STRIPE_PRICE_PRO;
  if (planId === "premium_monthly") {
    const resolved2 = pricePlus != null ? pricePlus : priceEssential;
    return typeof resolved2 === "string" && resolved2.length > 0 ? resolved2 : null;
  }
  const resolved = pricePro;
  return typeof resolved === "string" && resolved.length > 0 ? resolved : null;
}
function toAppBillingPlan(plan) {
  var _a;
  const definition = PLAN_DEFINITIONS.find((item) => item.id === plan.id);
  if (!definition) return null;
  const priceId = definition.id === "free" ? "price_free" : (_a = getStripePriceIdForPlan(definition.id)) != null ? _a : `price_${definition.id}`;
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
      intervalCount: definition.intervalCount
    },
    product: definition.productId ? {
      id: definition.productId,
      name: plan.name,
      description: definition.productDescription
    } : void 0
  };
}

function createMockCheckoutResponse(_req) {
  return { url: "/planos?checkout=mock-success" };
}
function createMockPortalResponse(_req) {
  return { url: "/planos?portal=mock" };
}
function createMockBillingProvider() {
  return {
    async listPlans() {
      return listKnownProviderPlans();
    },
    async createCheckout(req) {
      return createMockCheckoutResponse();
    },
    async createPortal(req) {
      return createMockPortalResponse();
    }
  };
}

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw createError({
      statusCode: 500,
      message: "Stripe nao configurado. Defina STRIPE_SECRET_KEY."
    });
  }
  return new Stripe(secretKey);
}
function assertKnownPaidPlan(planId) {
  if (!isKnownPlanId(planId) || planId === "free") {
    throw createError({
      statusCode: 400,
      message: "Plano invalido para checkout."
    });
  }
}
function ensureAbsoluteUrl(value, fieldName) {
  try {
    const parsed = new URL(value);
    if (!parsed.protocol.startsWith("http")) {
      throw new Error("invalid protocol");
    }
    return parsed.toString();
  } catch {
    throw createError({
      statusCode: 400,
      message: `${fieldName} invalido.`
    });
  }
}
function toCheckoutMetadata(user) {
  const metadata = {
    actorKey: user.actorKey
  };
  if (user.userId) {
    metadata.userId = user.userId;
  }
  return metadata;
}
async function resolveCustomerByEmail(stripe, email) {
  const customers = await stripe.customers.list({
    email,
    limit: 1
  });
  for (const customer of customers.data) {
    if (!customer.deleted) {
      return customer;
    }
  }
  return null;
}
function createStripeBillingProvider() {
  return {
    async listPlans() {
      return listKnownProviderPlans();
    },
    async createCheckout(req, user) {
      const stripe = getStripeClient();
      assertKnownPaidPlan(req.planId);
      const priceId = getStripePriceIdForPlan(req.planId);
      if (!priceId) {
        throw createError({
          statusCode: 500,
          message: `Stripe price nao configurado para o plano ${req.planId}.`
        });
      }
      const successUrl = ensureAbsoluteUrl(req.successUrl, "successUrl");
      const cancelUrl = ensureAbsoluteUrl(req.cancelUrl, "cancelUrl");
      const checkoutSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: user.actorKey,
        customer_email: user.email,
        metadata: toCheckoutMetadata(user)
      });
      if (!checkoutSession.url) {
        throw createError({
          statusCode: 500,
          message: "Nao foi possivel criar a sessao de checkout."
        });
      }
      return { url: checkoutSession.url };
    },
    async createPortal(req, user) {
      if (!user.isAuthenticated) {
        throw createError({
          statusCode: 401,
          message: "Login necessario para gerenciar a assinatura."
        });
      }
      if (!user.email) {
        throw createError({
          statusCode: 400,
          message: "Nao foi possivel localizar seu e-mail para abrir o portal."
        });
      }
      const stripe = getStripeClient();
      const customer = await resolveCustomerByEmail(stripe, user.email);
      if (!customer) {
        throw createError({
          statusCode: 400,
          message: "Nenhum cliente Stripe foi encontrado para este e-mail. Conclua um checkout primeiro."
        });
      }
      const returnUrl = ensureAbsoluteUrl(req.returnUrl, "returnUrl");
      const session = await stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: returnUrl
      });
      if (!session.url) {
        throw createError({
          statusCode: 500,
          message: "Nao foi possivel abrir o portal de cobranca."
        });
      }
      return { url: session.url };
    }
  };
}

let warnedFallback = false;
function resolveBillingProviderName(env = process.env) {
  var _a;
  const requested = (_a = env.BILLING_PROVIDER) == null ? void 0 : _a.trim().toLowerCase();
  const hasStripeSecret = typeof env.STRIPE_SECRET_KEY === "string" && env.STRIPE_SECRET_KEY.length > 0;
  if (requested === "mock") {
    return "mock";
  }
  if (hasStripeSecret) {
    return "stripe";
  }
  return "mock";
}
function getBillingProvider() {
  var _a;
  const selected = resolveBillingProviderName(process.env);
  if (selected === "stripe") {
    return createStripeBillingProvider();
  }
  const requested = (_a = process.env.BILLING_PROVIDER) == null ? void 0 : _a.trim().toLowerCase();
  const hasStripeSecret = typeof process.env.STRIPE_SECRET_KEY === "string" && process.env.STRIPE_SECRET_KEY.length > 0;
  if (!warnedFallback && requested !== "mock" && !hasStripeSecret) {
    warnedFallback = true;
    console.warn(
      "[billing] Stripe disabled because STRIPE_SECRET_KEY is missing. Falling back to mock provider."
    );
  }
  return createMockBillingProvider();
}

export { getBillingProvider as g, isKnownPlanId as i, toAppBillingPlan as t };
//# sourceMappingURL=provider.mjs.map
