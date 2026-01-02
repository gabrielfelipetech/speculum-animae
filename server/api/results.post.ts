// server/api/results.post.ts
import {
  serverSupabaseClient,
  serverSupabaseUser,
} from '#supabase/server';

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
    userId?: string | null;
    results: { groupId: string; name: string; average: number }[];
    topSummaries?: StoredResult['topSummaries'];
    meta?: StoredResult['meta'];
  }>(event);

  const slug: StoredResult['slug'] =
    body.category === 'twelveLayers' ? 'twelve-layers' : 'temperaments';

  const user = await serverSupabaseUser(event).catch(() => null);
  const userId =
    typeof user?.id === 'string' && /^[0-9a-f-]{36}$/i.test(user.id)
      ? user.id
      : null;
  const bodyUserId =
    typeof body.userId === 'string' && /^[0-9a-f-]{36}$/i.test(body.userId)
      ? body.userId
      : null;
  const effectiveUserId = userId ?? bodyUserId;

  // 1) Sempre salvar localmente como fallback
  const storage = useStorage<StoredResult[]>('results');
  const key = 'items';

  const entry: StoredResult = {
    id: body.sessionId,
    slug,
    userId: effectiveUserId ?? null,
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

  // 2) Tentar sincronizar com Supabase (apenas se estiver logado)
  try {
    if (userId) {
      const supabase = await serverSupabaseClient(event);

      const { error } = await supabase.from('test_results').insert({
        id: crypto.randomUUID(),
        session_id: body.sessionId,
        user_id: userId,
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
    console.error('[Supabase] erro inesperado ao sincronizar resultados', err);
  }

  return { id: entry.id };
});
