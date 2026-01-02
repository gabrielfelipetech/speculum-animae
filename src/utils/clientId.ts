// src/utils/clientId.ts
export function getOrCreateClientId(): string {
  if (typeof window === 'undefined') {
    return 'server';
  }

  const KEY = 'sa_client_id';
  let id = window.localStorage.getItem(KEY);

  if (!id) {
    const random =
      window.crypto?.randomUUID?.() ??
      `anon-${Math.random().toString(36).slice(2)}`;
    id = random;
    window.localStorage.setItem(KEY, id);
  }

  return id;
}
