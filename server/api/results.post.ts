// server/api/results.post.ts
import { serverSupabaseUser } from '#supabase/server';

export interface StoredResult {
  id: string; // sessionId
  slug: 'twelve-layers' | 'temperaments';
  userId?: string | null;
  email?: string | null;
  clientId?: string | null;
  results: { groupId: string; name: string; average: number }[];
  topSummaries?: {
    groupId: string;
    name: string;
    title: string;
    average: number;
    description: string;
  }[];
  meta?: {
    title?: string;
    subtitle?: string;
    groupsLabel?: string;
  };
  timestamp: string;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    sessionId: string;
    clientId: string;
    category: 'twelveLayers' | 'temperaments';
    results: { groupId: string; name: string; average: number }[];
    topSummaries?: StoredResult['topSummaries'];
    meta?: StoredResult['meta'];
  }>(event);

  const slug: StoredResult['slug'] =
    body.category === 'twelveLayers' ? 'twelve-layers' : 'temperaments';

  const user = await serverSupabaseUser(event).catch(() => null);

  const storage = useStorage<StoredResult[]>('results');
  const key = 'items';

  const entry: StoredResult = {
    id: body.sessionId,
    slug,
    userId: user?.id ?? null,
    email: user?.email ?? null,
    clientId: body.clientId ?? null,
    results: body.results,
    topSummaries: body.topSummaries ?? undefined,
    meta: body.meta ?? undefined,
    timestamp: new Date().toISOString(),
  };

  const current = (await storage.getItem(key)) ?? [];
  current.push(entry);
  await storage.setItem(key, current);

  // o front espera { id: sessionId }
  return { id: entry.id };
});
