const STORAGE_PREFIX = 'sa:lastResult:';

export function lastResultStorageKey(slug: string): string {
  return `${STORAGE_PREFIX}${slug}`;
}

export function getLastResultId(slug: string): string | null {
  if (!process.client) return null;
  if (!slug) return null;
  try {
    return window.localStorage.getItem(lastResultStorageKey(slug));
  } catch {
    return null;
  }
}

export function setLastResultId(slug: string, id: string): void {
  if (!process.client) return;
  if (!slug || !id) return;
  try {
    window.localStorage.setItem(lastResultStorageKey(slug), id);
  } catch {
    // ignore storage errors
  }
}

export function clearLastResultId(slug: string): void {
  if (!process.client) return;
  if (!slug) return;
  try {
    window.localStorage.removeItem(lastResultStorageKey(slug));
  } catch {
    // ignore storage errors
  }
}
