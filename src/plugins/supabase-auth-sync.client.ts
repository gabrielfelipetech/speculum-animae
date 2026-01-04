// src/plugins/supabase-auth-sync.client.ts
import { defineNuxtPlugin } from '#app';
import { useSupabaseClient, useSupabaseSession, useSupabaseUser } from '#imports';
import type { Session } from '@supabase/supabase-js';

export default defineNuxtPlugin(() => {
  const supabase = useSupabaseClient();
  const session = useSupabaseSession();
  const user = useSupabaseUser();

  let mounted = true;

  async function hydrateFromClient(): Promise<void> {
    try {
      const { data } = await supabase.auth.getSession();
      const s = (data.session ?? null) as Session | null;
      session.value = s;
      user.value = s?.user ?? null;
    } catch {
      // ignore
    }
  }

  hydrateFromClient().catch(() => undefined);

  const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
    if (!mounted) return;
    session.value = (newSession ?? null) as Session | null;
    user.value = newSession?.user ?? null;
  });

  window.addEventListener(
    'beforeunload',
    () => {
      mounted = false;
      subscription?.subscription?.unsubscribe();
    },
    { once: true },
  );
});
