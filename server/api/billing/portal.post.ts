import { getRequestURL } from 'h3';
import { resolveAuthUser } from '../../utils/authUser';

export default defineEventHandler(async (event) => {
  const authUser = await resolveAuthUser(event);
  if (!authUser) {
    throw createError({
      statusCode: 401,
      message: 'Login necessario para gerenciar a assinatura.',
    });
  }

  const runtime = useRuntimeConfig();
  const baseUrl = String(
    runtime.public.siteUrl || getRequestURL(event).origin,
  ).replace(/\/$/, '');

  // TODO: Integrar Stripe Billing Portal e retornar URL real da sessao.
  return { url: `${baseUrl}/planos?status=portal&mock=1` };
});
