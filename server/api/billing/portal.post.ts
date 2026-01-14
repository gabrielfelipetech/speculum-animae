import { getRequestURL } from 'h3';
import { resolveAuthUser } from '../../utils/authUser';
import { withCriticalApiLogging } from '../../utils/bugsnag';

export default defineEventHandler(async (event) => {
  const ctx = { area: 'billing.portal', authUserId: null as string | null };

  return await withCriticalApiLogging(event, ctx, async () => {
    const authUser = await resolveAuthUser(event);
    const authUserId = authUser?.id ?? null;
    ctx.authUserId = authUserId;
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
});
