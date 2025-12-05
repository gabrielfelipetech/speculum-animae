// server/api/results/[id].get.ts
import { serverSupabaseUser } from '#supabase/server';
import type { AnyReport } from '~/types/results';
import { buildTwelveLayersReport } from '../report-builders/twelveLayers';
import { buildTemperamentsReport } from '../report-builders/temperaments';
import type { StoredResult } from '../results.post';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'ID de sessão não informado',
    });
  }

  const user = await serverSupabaseUser(event).catch(() => null);

  const storage = useStorage<StoredResult[]>('results');
  const all = (await storage.getItem('items')) ?? [];

  const entry = all.find((item) => item.id === id) ?? null;

  if (!entry) {
    throw createError({
      statusCode: 404,
      message: 'Resultados não encontrados',
    });
  }

  if (entry.userId && (!user || user.id !== entry.userId)) {
    throw createError({
      statusCode: 403,
      message: 'Você não tem permissão para ver estes resultados.',
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
