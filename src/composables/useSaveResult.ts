// src/composables/useSaveResult.ts
import { ref } from 'vue';
import { useSupabaseUser } from '#imports';
import type { LikertTestConfig } from '~/types/tests';
import { getOrCreateClientId } from '../utils/clientId';

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
  const supabaseUser = useSupabaseUser();

  async function saveLikertResult(
    args: SaveLikertResultArgs,
  ): Promise<string | null> {
    if (!import.meta.client) return null;

    isSaving.value = true;
    lastError.value = null;

    try {
      const clientId = getOrCreateClientId();
      const sessionId = crypto.randomUUID();
      const rawUserId = supabaseUser.value?.id;
      const userId =
        typeof rawUserId === 'string' && /^[0-9a-f-]{36}$/i.test(rawUserId)
          ? rawUserId
          : null;

      const compactAnswers: Record<string, number> = {};
      for (const [key, value] of Object.entries(args.answers)) {
        if (typeof value === 'number') {
          compactAnswers[key] = value;
        }
      }

      // Normaliza categoria em so 2 tipos
      const category: 'twelveLayers' | 'temperaments' =
        args.config.category === 'temperaments'
          ? 'temperaments'
          : 'twelveLayers';

      const response = await $fetch<{ id: string }>('/api/results', {
        method: 'POST',
        body: {
          sessionId,
          clientId,
          category,
          userId,
          results: args.results,
          topSummaries: args.topSummaries,
          meta: {
            title: args.config.title,
            subtitle: args.config.subtitle,
            groupsLabel: args.config.groupsLabel ?? 'Camada',
          },
        },
      });

      return response?.id ?? null;
    } catch (error) {
      console.error('Failed to save result', error);
      if (error instanceof Error) {
        lastError.value = error;
      } else {
        lastError.value = new Error('Unknown error');
      }
      return null;
    } finally {
      isSaving.value = false;
    }
  }

  return {
    saveLikertResult,
    isSaving,
    lastError,
  };
}



