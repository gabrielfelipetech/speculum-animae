import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { getHeader, type H3Event } from 'h3';

function isValidUuid(value: string | undefined | null): value is string {
  return typeof value === 'string' && /^[0-9a-f-]{36}$/i.test(value);
}

export async function resolveUserId(event: H3Event): Promise<string | null> {
  try {
    const user = await serverSupabaseUser(event).catch(() => null);
    if (isValidUuid(user?.id)) {
      return user.id;
    }
  } catch {
    // ignore
  }

  const authHeader = getHeader(event, 'authorization');
  if (!authHeader) return null;

  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;

  const token = match[1]?.trim();
  if (!token) return null;

  try {
    const supabase = await serverSupabaseClient(event);
    const { data, error } = await supabase.auth.getUser(token);
    if (error) return null;
    if (isValidUuid(data.user?.id)) {
      return data.user.id;
    }
  } catch {
    return null;
  }

  return null;
}
