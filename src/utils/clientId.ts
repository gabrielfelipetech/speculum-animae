// src/utils/clientId.ts
const PRIMARY_KEY = 'sa:clientId';
const LEGACY_KEY = 'sa_client_id';

export function getOrCreateClientId(): string | null {
  if (!import.meta.client) {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(PRIMARY_KEY);
    const legacy = window.localStorage.getItem(LEGACY_KEY);
    const existing = stored ?? legacy;

    if (existing) {
      if (!stored) {
        window.localStorage.setItem(PRIMARY_KEY, existing);
      }
      if (legacy) {
        window.localStorage.removeItem(LEGACY_KEY);
      }
      return existing;
    }

    const random =
      window.crypto?.randomUUID?.() ??
      `anon-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(PRIMARY_KEY, random);
    return random;
  } catch {
    return null;
  }
}
