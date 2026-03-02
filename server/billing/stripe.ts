import Stripe from 'stripe';
import { getStripePriceIdForPlan, isKnownPlanId, listKnownProviderPlans } from './plans';
import type {
  AuthContext,
  BillingProvider,
  CheckoutRequest,
  PortalRequest,
} from './types';

function getStripeClient(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw createError({
      statusCode: 500,
      message: 'Stripe nao configurado. Defina STRIPE_SECRET_KEY.',
    });
  }
  return new Stripe(secretKey);
}

function assertKnownPaidPlan(planId: string): asserts planId is 'premium_monthly' | 'premium_annual' {
  if (!isKnownPlanId(planId) || planId === 'free') {
    throw createError({
      statusCode: 400,
      message: 'Plano invalido para checkout.',
    });
  }
}

function ensureAbsoluteUrl(value: string, fieldName: string): string {
  try {
    const parsed = new URL(value);
    if (!parsed.protocol.startsWith('http')) {
      throw new Error('invalid protocol');
    }
    return parsed.toString();
  } catch {
    throw createError({
      statusCode: 400,
      message: `${fieldName} invalido.`,
    });
  }
}

function toCheckoutMetadata(user: AuthContext): Record<string, string> {
  const metadata: Record<string, string> = {
    actorKey: user.actorKey,
  };
  if (user.userId) {
    metadata.userId = user.userId;
  }
  return metadata;
}

async function resolveCustomerByEmail(
  stripe: Stripe,
  email: string,
): Promise<Stripe.Customer | null> {
  const customers = await stripe.customers.list({
    email,
    limit: 1,
  });

  for (const customer of customers.data) {
    if (!customer.deleted) {
      return customer;
    }
  }

  return null;
}

export function createStripeBillingProvider(): BillingProvider {
  return {
    async listPlans() {
      return listKnownProviderPlans();
    },
    async createCheckout(req: CheckoutRequest, user: AuthContext) {
      const stripe = getStripeClient();
      assertKnownPaidPlan(req.planId);

      const priceId = getStripePriceIdForPlan(req.planId);
      if (!priceId) {
        throw createError({
          statusCode: 500,
          message: `Stripe price nao configurado para o plano ${req.planId}.`,
        });
      }

      const successUrl = ensureAbsoluteUrl(req.successUrl, 'successUrl');
      const cancelUrl = ensureAbsoluteUrl(req.cancelUrl, 'cancelUrl');

      const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: user.actorKey,
        customer_email: user.email,
        metadata: toCheckoutMetadata(user),
      });

      if (!checkoutSession.url) {
        throw createError({
          statusCode: 500,
          message: 'Nao foi possivel criar a sessao de checkout.',
        });
      }

      return { url: checkoutSession.url };
    },
    async createPortal(req: PortalRequest, user: AuthContext) {
      if (!user.isAuthenticated) {
        throw createError({
          statusCode: 401,
          message: 'Login necessario para gerenciar a assinatura.',
        });
      }

      if (!user.email) {
        throw createError({
          statusCode: 400,
          message: 'Nao foi possivel localizar seu e-mail para abrir o portal.',
        });
      }

      const stripe = getStripeClient();
      const customer = await resolveCustomerByEmail(stripe, user.email);

      if (!customer) {
        throw createError({
          statusCode: 400,
          message:
            'Nenhum cliente Stripe foi encontrado para este e-mail. Conclua um checkout primeiro.',
        });
      }

      const returnUrl = ensureAbsoluteUrl(req.returnUrl, 'returnUrl');
      const session = await stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: returnUrl,
      });

      if (!session.url) {
        throw createError({
          statusCode: 500,
          message: 'Nao foi possivel abrir o portal de cobranca.',
        });
      }

      return { url: session.url };
    },
  };
}
