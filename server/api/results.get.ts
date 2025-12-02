// server/api/results.get.ts
import type { StoredResult } from './results.post';

export default defineEventHandler(async () => {
  const storage = useStorage<StoredResult[]>('results');
  const key = 'items';

  const all =
    ((await storage.getItem(key)) ?? []).sort((a, b) =>
      a.timestamp < b.timestamp ? 1 : -1,
    );

  return { items: all };
});
