import { useSupabaseClient } from '#imports';

export async function getSupabaseAccessToken(): Promise<string | null> {
  if (!import.meta.client) return null;

  const supabase = useSupabaseClient();
  try {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  } catch {
    return null;
  }
}
