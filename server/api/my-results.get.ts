// server/api/my-results.get.ts
import { serverSupabaseClient } from '#supabase/server';
import { resolveAuthUser } from '../utils/authUser';
import type { StoredResult } from './results.post';

interface HistoryItem {
  id: string;
  slug: StoredResult['slug'];
  timestamp: string;
  meta?: StoredResult['meta'];
}

export default defineEventHandler(async (event) => {
  const user = await resolveAuthUser(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    });
  }

  try {
    const supabase = await serverSupabaseClient(event);
    const { data, error } = await supabase
      .from('test_results')
      .select('session_id, slug, created_at, meta')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Supabase] erro ao buscar test_results', error);
      return { items: [] };
    }

    const items: HistoryItem[] = (data ?? []).map((row) => ({
      id: row.session_id as string,
      slug: row.slug as StoredResult['slug'],
      timestamp: row.created_at as string,
      meta: (row.meta ?? undefined) as StoredResult['meta'],
    }));

    return { items };
  } catch (err) {
    console.error('[Supabase] erro inesperado em /api/my-results', err);
    return { items: [] };
  }
});
