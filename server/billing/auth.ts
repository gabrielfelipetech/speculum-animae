import { getHeader, getQuery, type H3Event } from 'h3';
import { resolveAuthUser } from '../utils/authUser';
import type { AuthContext } from './types';

type AuthContextInput = {
  clientId?: string | null;
};

function normalizeClientId(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function resolveAnonymousClientId(
  event: H3Event,
  input?: AuthContextInput,
): string | null {
  const query = getQuery(event);

  return (
    normalizeClientId(input?.clientId) ??
    normalizeClientId(query.clientId) ??
    normalizeClientId(getHeader(event, 'x-client-id'))
  );
}

export async function resolveBillingAuthContext(
  event: H3Event,
  input?: AuthContextInput,
): Promise<AuthContext> {
  const authUser = await resolveAuthUser(event);
  if (authUser?.id) {
    return {
      userId: authUser.id,
      email: authUser.email ?? undefined,
      isAuthenticated: true,
      actorKey: authUser.id,
    };
  }

  const clientId = resolveAnonymousClientId(event, input);
  if (!clientId) {
    throw createError({
      statusCode: 400,
      message: 'clientId nao informado para checkout anonimo.',
    });
  }

  return {
    isAuthenticated: false,
    actorKey: clientId,
  };
}
