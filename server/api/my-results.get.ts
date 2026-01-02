// server/api/my-results.get.ts
import {
  serverSupabaseClient,
  serverSupabaseUser,
} from '#supabase/server';
import type { StoredResult } from './results.post';

interface HistoryItem {
  id: string;
  slug: StoredResult['slug'];
  timestamp: string;
  meta?: StoredResult['meta'];
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const clientId = typeof query.clientId === 'string' ? query.clientId : null;
  const queryUserId =
    typeof query.userId === 'string' && /^[0-9a-f-]{36}$/i.test(query.userId)
      ? query.userId
      : null;

  const user = await serverSupabaseUser(event).catch(() => null);
  const userId =
    typeof user?.id === 'string' && /^[0-9a-f-]{36}$/i.test(user.id)
      ? user.id
      : null;
  const effectiveUserId = userId ?? queryUserId;

  if (!effectiveUserId && !clientId) {
    return { items: [] as HistoryItem[] };
  }

  let supabaseItems: HistoryItem[] = [];

  // 1) Supabase (fonte principal)
  if (userId) {
    try {
      const supabase = await serverSupabaseClient(event);

      const { data, error } = await supabase
        .from('test_results')
        .select('session_id, slug, created_at, meta')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (!error && data) {
        supabaseItems = data.map((row) => ({
          id: row.session_id as string,
          slug: row.slug as StoredResult['slug'],
          timestamp: row.created_at as string,
          meta: (row.meta ?? undefined) as StoredResult['meta'],
        }));
      }

      if (error) {
        console.error('[Supabase] erro ao buscar test_results', error);
      }
    } catch (err) {
      console.error('[Supabase] erro inesperado em /api/my-results', err);
    }
  }

  // 2) Fallback: storage local
  const storage = useStorage<StoredResult[]>('results');
  const all = (await storage.getItem('items')) ?? [];

  if (clientId && effectiveUserId) {
    let updated = false;
    for (const item of all) {
      if (!item.userId && item.clientId === clientId) {
        item.userId = effectiveUserId;
        updated = true;
      }
    }
    if (updated) {
      await storage.setItem('items', all);
    }
  }

  const storageItems: HistoryItem[] = all
    .filter(
      (item) =>
        (effectiveUserId && item.userId === effectiveUserId) ||
        (!item.userId && clientId && item.clientId === clientId),
    )
    .map((item) => ({
      id: item.id,
      slug: item.slug,
      timestamp: item.timestamp,
      meta: item.meta ?? undefined,
    }));

  const merged: HistoryItem[] = [...supabaseItems];
  for (const item of storageItems) {
    if (!merged.some((existing) => existing.id === item.id)) {
      merged.push(item);
    }
  }

  merged.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

  return { items: merged };
});
