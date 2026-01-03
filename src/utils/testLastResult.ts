import type { ActorKey } from '~/utils/actorKey';

const STORAGE_PREFIX = 'sa:lastResult:';

function legacyKey(slug: string): string {
  return `${STORAGE_PREFIX}${slug}`;
}

export function lastResultStorageKey(slug: string, actorKey: ActorKey): string {
  return `${STORAGE_PREFIX}${actorKey}:${slug}`;
}

export function getLastResultId(slug: string, actorKey?: ActorKey | null): string | null {
  if (!import.meta.client) return null;
  if (!slug) return null;

  try {
    if (actorKey) {
      const scoped = window.localStorage.getItem(lastResultStorageKey(slug, actorKey));
      if (scoped) return scoped;

      // logado: nunca cair no legacy (evita cross-account)
      if (actorKey.startsWith('u:')) return null;
    }

    return window.localStorage.getItem(legacyKey(slug));
  } catch {
    return null;
  }
}

export function setLastResultId(slug: string, id: string, actorKey?: ActorKey | null): void {
  if (!import.meta.client) return;
  if (!slug || !id) return;

  try {
    if (actorKey) {
      window.localStorage.setItem(lastResultStorageKey(slug, actorKey), id);
      window.localStorage.removeItem(legacyKey(slug));
      return;
    }
    window.localStorage.setItem(legacyKey(slug), id);
  } catch {
    // ignore
  }
}

export function clearLastResultId(slug: string, actorKey?: ActorKey | null): void {
  if (!import.meta.client) return;
  if (!slug) return;

  try {
    if (actorKey) {
      window.localStorage.removeItem(lastResultStorageKey(slug, actorKey));
      return;
    }
    window.localStorage.removeItem(legacyKey(slug));
  } catch {
    // ignore
  }
}
