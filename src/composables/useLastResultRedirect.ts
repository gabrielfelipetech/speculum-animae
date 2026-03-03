import { computed } from 'vue';
import { useRouter, useSupabaseUser } from '#imports';
import { getOrCreateClientId } from '~/utils/clientId';
import { buildClientActorKey, buildUserActorKey } from '~/utils/actorKey';
import { getLastResultId } from '~/utils/testLastResult';
import { LEGACY_TEST_SLUG_REDIRECTS } from '~/config/tests';

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

  function slugCandidates(slug: string): string[] {
    const aliases = Object.entries(LEGACY_TEST_SLUG_REDIRECTS)
      .filter(([, canonical]) => canonical === slug)
      .map(([legacySlug]) => legacySlug);

    return [slug, ...aliases];
  }

  async function tryRedirectToLastResult(slug: string): Promise<boolean> {
    if (!import.meta.client) return false;
    if (!slug) return false;

    const currentActorKey = getActorKey();
    for (const candidate of slugCandidates(slug)) {
      const scopedResultId = currentActorKey
        ? getLastResultId(candidate, currentActorKey)
        : null;

      if (scopedResultId) {
        await router.replace({
          path: `/resultados/${scopedResultId}`,
          query: { t: slug },
        });
        return true;
      }
    }

    // Legacy fallback is only for anonymous flows to avoid cross-account leaks.
    const canUseLegacyFallback =
      !currentActorKey || currentActorKey.startsWith('c:');
    if (!canUseLegacyFallback) return false;

    for (const candidate of slugCandidates(slug)) {
      const legacyResultId = getLastResultId(candidate);
      if (!legacyResultId) continue;

      await router.replace({
        path: `/resultados/${legacyResultId}`,
        query: { t: slug },
      });
      return true;
    }

    return false;
  }

  return {
    getActorKey,
    tryRedirectToLastResult,
  };
}
