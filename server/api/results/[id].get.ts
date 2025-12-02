// server/api/results/[id].get.ts
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

  const storage = useStorage<StoredResult[]>('results');
  const key = 'items';

  const all = (await storage.getItem(key)) ?? [];
  const entry = all.find((item) => item.id === id);

  if (!entry) {
    throw createError({
      statusCode: 404,
      message: 'Resultados não encontrados',
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
