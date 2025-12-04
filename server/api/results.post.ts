// server/api/results.post.ts
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';

type ResultItem = {
  groupId: string;
  name: string;
  average: number;
};

export interface StoredResult {
  id: string; 
  slug: 'twelve-layers' | 'temperaments';

  userId?: string | null;
  email?: string | null;

  results: ResultItem[];
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
    results: ResultItem[];
    topSummaries?: StoredResult['topSummaries'];
    meta?: StoredResult['meta'];
  }>(event);

  const storage = useStorage<StoredResult[]>('results');
  const key = 'items';

  const slug: StoredResult['slug'] =
    body.category === 'twelveLayers' ? 'twelve-layers' : 'temperaments';

  const user = await serverSupabaseUser(event).catch(() => null);

  const entry: StoredResult = {
    id: body.sessionId,
    slug,
    userId: user?.id ?? null,
    email: user?.email ?? null,
    results: body.results,
    topSummaries: body.topSummaries ?? undefined,
    meta: body.meta ?? undefined,
    timestamp: new Date().toISOString(),
  };

  const current = (await storage.getItem(key)) ?? [];
  current.push(entry);
  await storage.setItem(key, current);

  try {
    if (user) {
      const client = serverSupabaseClient(event);

      const { error } = await client.from('test_results').insert({
        session_id: body.sessionId,
        user_id: user.id,
        client_id: body.clientId ?? null,
        slug,
        results: body.results,
        top_summaries: body.topSummaries ?? null,
        meta: body.meta ?? null,
      });

      if (error) {
        console.error('[Supabase] erro ao inserir test_results', error);
      }
    }
  } catch (err) {
    console.error(
      '[Supabase] erro inesperado ao sincronizar resultados',
      err,
    );
  }

  return { id: entry.id };
});
