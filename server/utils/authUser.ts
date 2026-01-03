import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import { getHeader, type H3Event } from 'h3';
import type { User } from '@supabase/supabase-js';

function isValidUuid(value: string | undefined | null): value is string {
  return typeof value === 'string' && /^[0-9a-f-]{36}$/i.test(value);
}

export async function resolveAuthUser(event: H3Event): Promise<User | null> {
  try {
    const user = await serverSupabaseUser(event).catch(() => null);
    if (user && isValidUuid(user.id)) {
      return user;
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
    if (data.user && isValidUuid(data.user.id)) {
      return data.user;
    }
  } catch {
    return null;
  }

  return null;
}
