import { computed } from 'vue';
import { useRouter, useSupabaseUser } from '#imports';
import { getOrCreateClientId } from '~/utils/clientId';
import { buildClientActorKey, buildUserActorKey } from '~/utils/actorKey';
import { getLastResultId } from '~/utils/testLastResult';

export function useLastResultRedirect() {
  const router = useRouter();
  const supabaseUser = useSupabaseUser();

  const actorKey = computed(() => {
    const userKey = buildUserActorKey(supabaseUser.value?.id ?? null);
    if (userKey) return userKey;

    const clientId = getOrCreateClientId();
    return buildClientActorKey(clientId);
  });

  function getActorKey(): string | null {
    return actorKey.value;
  }

  async function tryRedirectToLastResult(slug: string): Promise<boolean> {
    if (!import.meta.client) return false;
    if (!slug) return false;

    const currentActorKey = getActorKey();
    const scopedResultId = currentActorKey
      ? getLastResultId(slug, currentActorKey)
      : null;

    if (scopedResultId) {
      await router.replace({
        path: `/resultados/${scopedResultId}`,
        query: { t: slug },
      });
      return true;
    }

    // Legacy fallback is only for anonymous flows to avoid cross-account leaks.
    const canUseLegacyFallback =
      !currentActorKey || currentActorKey.startsWith('c:');
    if (!canUseLegacyFallback) return false;

    const legacyResultId = getLastResultId(slug);
    if (!legacyResultId) return false;

    await router.replace({
      path: `/resultados/${legacyResultId}`,
      query: { t: slug },
    });
    return true;
  }

  return {
    getActorKey,
    tryRedirectToLastResult,
  };
}
