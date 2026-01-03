import { ref } from 'vue';
import type { LikertTestConfig } from '~/types/tests';
import { getSupabaseAccessToken } from '~/utils/authToken';
import { getOrCreateClientId } from '~/utils/clientId';

interface SaveLikertResultArgs {
  config: LikertTestConfig;
  answers: Record<string, number | null>;
  results: { groupId: string; name: string; average: number }[];
  topSummaries: {
    groupId: string;
    name: string;
    title: string;
    average: number;
    description: string;
  }[];
}

export function useSaveResult() {
  const isSaving = ref(false);
  const lastError = ref<Error | null>(null);

  async function saveLikertResult(args: SaveLikertResultArgs): Promise<string | null> {
    if (!import.meta.client) return null;

    isSaving.value = true;
    lastError.value = null;

    try {
      const sessionId = crypto.randomUUID();

      // Fonte de verdade: token (não useSupabaseUser aqui)
      const token = await getSupabaseAccessToken();
      const isLoggedIn = typeof token === 'string' && token.length > 0;

      const clientId = getOrCreateClientId();
      if (!isLoggedIn && !clientId) {
        return null;
      }

      const compactAnswers: Record<string, number> = {};
      for (const [key, value] of Object.entries(args.answers)) {
        if (typeof value === 'number') compactAnswers[key] = value;
      }

      const category: 'twelveLayers' | 'temperaments' =
        args.config.category === 'temperaments' ? 'temperaments' : 'twelveLayers';

      const headers: Record<string, string> = {};
      if (isLoggedIn && token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await $fetch<{ id: string }>('/api/results', {
        method: 'POST',
        credentials: 'include',
        headers: Object.keys(headers).length ? headers : undefined,
        body: {
          sessionId,
          // pode mandar sempre; o servidor só usa quando estiver deslogado
          clientId: clientId ?? null,
          category,
          results: args.results,
          topSummaries: args.topSummaries,
          meta: {
            title: args.config.title,
            subtitle: args.config.subtitle,
            groupsLabel: args.config.groupsLabel ?? 'Camada',
          },
          answers: compactAnswers,
        },
      });

      return response?.id ?? null;
    } catch (error) {
      console.error('Failed to save result', error);
      lastError.value = error instanceof Error ? error : new Error('Unknown error');
      return null;
    } finally {
      isSaving.value = false;
    }
  }

  return { saveLikertResult, isSaving, lastError };
}
