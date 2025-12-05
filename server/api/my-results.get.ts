// server/api/my-results.get.ts
import { serverSupabaseUser } from '#supabase/server';
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

  const storage = useStorage<StoredResult[]>('results');
  const all = (await storage.getItem('items')) ?? [];

  const filtered = all
    .filter((item) => item.userId === user.id)
    .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

  const items: HistoryItem[] = filtered.map((item) => ({
    id: item.id,
    slug: item.slug,
    timestamp: item.timestamp,
    meta: item.meta ?? undefined,
  }));

  return { items };
});
