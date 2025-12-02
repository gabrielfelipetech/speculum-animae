// server/api/results.post.ts

export interface StoredResult {
  id: string; // sessionId usado na rota /resultados/:id
  slug: 'twelve-layers' | 'temperaments';
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
    clientId: string; // mantido só por compatibilidade, mesmo sem uso aqui
    category: 'twelveLayers' | 'temperaments';
    results: { groupId: string; name: string; average: number }[];
    topSummaries?: StoredResult['topSummaries'];
    meta?: StoredResult['meta'];
  }>(event);

  const storage = useStorage<StoredResult[]>('results');
  const key = 'items';

  const slug: StoredResult['slug'] =
    body.category === 'twelveLayers'
      ? 'twelve-layers'
      : 'temperaments';

  const entry: StoredResult = {
    id: body.sessionId,
    slug,
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
