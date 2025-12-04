// server/api/my-results.get.ts
import {
  serverSupabaseClient,
  serverSupabaseUser,
} from '#supabase/server';
import type { StoredResult } from './results.post';

type Slug = 'twelve-layers' | 'temperaments';

interface HistoryItem {
  id: string;
  slug: Slug;
  timestamp: string;
  meta?: {
    title?: string;
    subtitle?: string;
    groupsLabel?: string;
  };
}

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event).catch(() => null);

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'É preciso estar autenticado para ver o histórico de testes.',
    });
  }

  const client = serverSupabaseClient(event);

  let rows: any[] | null = null;

  try {
    const { data, error } = await client
      .from('test_results')
      .select('session_id, slug, meta, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      rows = data;
    } else if (error) {
      console.error(
        '[Supabase] erro ao buscar test_results, fallback para storage',
        error,
      );
    }
  } catch (err) {
    console.error(
      '[Supabase] erro inesperado ao buscar test_results, fallback para storage',
      err,
    );
  }

  let items: HistoryItem[];

  if (rows) {
    items = rows.map((row: any) => ({
      id: row.session_id as string,
      slug: row.slug as Slug,
      timestamp: row.created_at as string,
      meta: row.meta ?? undefined,
    }));
  } else {
    const storage = useStorage<StoredResult[]>('results');
    const all = (await storage.getItem('items')) ?? [];

    const mine = all
      .filter((item) => item.userId === user.id)
      .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

    items = mine.map((r) => ({
      id: r.id,
      slug: r.slug as Slug,
      timestamp: r.timestamp,
      meta: r.meta,
    }));
  }

  return { items };
});
