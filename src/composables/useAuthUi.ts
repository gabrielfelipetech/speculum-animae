// src/composables/useAuthUi.ts
import { computed } from 'vue';
import { useSupabaseSession, useSupabaseUser } from '#imports';
import type { User } from '@supabase/supabase-js';

function isValidUuid(value: string | undefined | null): value is string {
  return typeof value === 'string' && /^[0-9a-f-]{36}$/i.test(value);
}

function getNameFromUser(user: User | null): string {
  if (!user) return 'Minha conta';

  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;

  const fullName = meta.full_name;
  if (typeof fullName === 'string' && fullName.trim().length > 0) {
    return fullName.trim();
  }

  const name = meta.name;
  if (typeof name === 'string' && name.trim().length > 0) {
    return name.trim();
  }

  const email = user.email;
  if (typeof email === 'string' && email.includes('@')) {
    const handle = email.split('@')[0]?.trim();
    if (handle) return handle;
  }

  return 'Minha conta';
}

export function useAuthUi() {
  const session = useSupabaseSession();
  const supabaseUser = useSupabaseUser();

  // user final: prefere session.user, fallback supabaseUser
  const user = computed<User | null>(() => session.value?.user ?? supabaseUser.value ?? null);

  // logado: token + id válido (evita "meio logado")
  const isLoggedIn = computed<boolean>(() => {
    const hasToken = typeof session.value?.access_token === 'string' && session.value.access_token.length > 0;
    const uid = user.value?.id ?? null;
    return hasToken && isValidUuid(uid);
  });

  const displayName = computed(() => getNameFromUser(user.value));

  return {
    user,
    isLoggedIn,
    displayName,
  };
}
