import { getJwtSubject } from '~/utils/jwt';

export type ActorKey = `u:${string}` | `c:${string}`;

export function isValidUuid(value: string | null | undefined): value is string {
  return typeof value === 'string' && /^[0-9a-f-]{36}$/i.test(value);
}

export function buildUserActorKeyFromToken(token: string | null): ActorKey | null {
  const sub = getJwtSubject(token);
  if (!isValidUuid(sub)) return null;
  return `u:${sub}`;
}

export function buildClientActorKey(clientId: string | null): ActorKey | null {
  if (typeof clientId !== 'string' || clientId.length === 0) return null;
  return `c:${clientId}`;
}

export function buildActorKey(token: string | null, clientId: string | null): ActorKey | null {
  return buildUserActorKeyFromToken(token) ?? buildClientActorKey(clientId);
}
