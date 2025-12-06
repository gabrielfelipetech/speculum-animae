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
  const user = await serverSupabaseUser(event).catch(() => null);

  if (!user) {
    return { items: [] as HistoryItem[] };
  }

  // 1) Supabase (fonte principal)
  try {
    const supabase = await serverSupabaseClient(event);

    const { data, error } = await supabase
      .from('test_results')
      .select('session_id, slug, created_at, meta')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const items: HistoryItem[] = data.map((row) => ({
        id: row.session_id as string,
        slug: row.slug as StoredResult['slug'],
        timestamp: row.created_at as string,
        meta: (row.meta ?? undefined) as StoredResult['meta'],
      }));

      return { items };
    }

    if (error) {
      console.error('[Supabase] erro ao buscar test_results', error);
    }
  } catch (err) {
    console.error('[Supabase] erro inesperado em /api/my-results', err);
  }

  // 2) Fallback: storage local
  const storage = useStorage<StoredResult[]>('results');
  const all = (await storage.getItem('items')) ?? [];

  const filtered = all
    .filter((item) => !item.userId || item.userId === user.id)
    .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

  const items: HistoryItem[] = filtered.map((item) => ({
    id: item.id,
    slug: item.slug,
    timestamp: item.timestamp,
    meta: item.meta ?? undefined,
  }));

  return { items };
});
