// server/api/results/[id].get.ts
import {
  serverSupabaseClient,
} from '#supabase/server';
import type { AnyReport } from '~/types/results';
import { buildTwelveLayersReport } from '../report-builders/twelveLayers';
import { buildTemperamentsReport } from '../report-builders/temperaments';
import type { StoredResult } from '../results.post';
import { resolveUserId } from '../../utils/resolveUserId';

interface StoredResultRow {
  session_id: string;
  slug: StoredResult['slug'];
  user_id: string | null;
  client_id: string | null;
  results: StoredResult['results'];
  top_summaries: StoredResult['topSummaries'] | null;
  meta: StoredResult['meta'] | null;
  created_at: string;
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'ID de sessao nao informado',
    });
  }

  const query = getQuery(event);
  const clientId = typeof query.clientId === 'string' ? query.clientId : null;
  const userId = await resolveUserId(event);

  if (!userId && !clientId) {
    throw createError({
      statusCode: 400,
      message: 'clientId nao informado',
    });
  }

  let entry: StoredResult | null = null;

  const canAccess = (storedUserId?: string | null, storedClientId?: string | null): boolean => {
  if (storedUserId) {
    return Boolean(userId && storedUserId === userId);
  }
  return Boolean(clientId && storedClientId && clientId === storedClientId);
};


  // 1) Supabase
  try {
    const supabase = await serverSupabaseClient(event);

    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .eq('session_id', id)
      .maybeSingle<StoredResultRow>();

    if (!error && data) {
      if (!canAccess(data.user_id, data.client_id)) {
        throw createError({
          statusCode: 403,
          message: 'Voce nao tem permissao para ver estes resultados.',
        });
      }

      entry = {
        id: data.session_id,
        slug: data.slug,
        userId: data.user_id,
        email: null,
        clientId: data.client_id,
        results: data.results,
        topSummaries: data.top_summaries ?? undefined,
        meta: data.meta ?? undefined,
        timestamp: data.created_at,
      };
    } else if (error) {
      console.error(
        '[Supabase] erro ao buscar resultado, fallback para storage',
        error,
      );
    }
  } catch (err) {
    console.error(
      '[Supabase] erro inesperado ao buscar resultado, fallback para storage',
      err,
    );
  }

  // 2) Fallback: storage local
  if (!entry) {
    const storage = useStorage<StoredResult[]>('results');
    const all = (await storage.getItem('items')) ?? [];
    const fromStorage = all.find((item) => item.id === id);

    if (fromStorage) {
      if (!canAccess(fromStorage.userId, fromStorage.clientId)) {
        throw createError({
          statusCode: 403,
          message: 'Voce nao tem permissao para ver estes resultados.',
        });
      }

      entry = fromStorage;
    }
  }

  if (!entry) {
    throw createError({
      statusCode: 404,
      message: 'Resultados nao encontrados',
    });
  }

  let report: AnyReport;

  switch (entry.slug) {
    case 'twelve-layers':
      report = buildTwelveLayersReport(entry);
      break;
    case 'temperaments':
      report = buildTemperamentsReport(entry);
      break;
    default:
      throw createError({
        statusCode: 400,
        message: 'Tipo de teste desconhecido',
      });
  }

  return report;
});
