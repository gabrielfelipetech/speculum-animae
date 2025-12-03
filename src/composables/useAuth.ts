// src/composables/useAuth.ts
import { ref, computed } from 'vue';
import { useSupabaseClient, useSupabaseUser } from '#imports';

export type Gender = 'male' | 'female';

interface SignUpPayload {
  email: string;
  password: string;
  fullName: string;
  gender: Gender;
}

export function useAuth() {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const loading = ref(false);
  const errorMessage = ref<string | null>(null);

  const isLoggedIn = computed(() => !!user.value);

  function resetError() {
    errorMessage.value = null;
  }

  function mapAuthErrorMessage(code?: string, message?: string): string {
    switch (code) {
      case 'invalid_login_credentials':
      case 'invalid_credentials':
        return 'E-mail ou senha incorretos.';
      case 'email_not_confirmed':
        return 'Confirme seu e-mail antes de entrar.';
      case 'user_already_exists':
        return 'Já existe uma conta com este e-mail.';
      default:
        return message || 'Ocorreu um erro ao autenticar. Tente novamente.';
    }
  }

  async function signInWithEmail(email: string, password: string) {
    if (!email || !password) return null;

    loading.value = true;
    resetError();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        errorMessage.value = mapAuthErrorMessage(error.code, error.message);
        return null;
      }

      return data.user ?? null;
    } finally {
      loading.value = false;
    }
  }

  async function signUpWithEmail(payload: SignUpPayload) {
    const { email, password, fullName, gender } = payload;

    loading.value = true;
    resetError();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            gender,
          },
        },
      });

      if (error) {
        errorMessage.value = mapAuthErrorMessage(error.code, error.message);
        return null;
      }

      // se tiver confirmação de e-mail, aqui talvez ainda não logue automaticamente
      return data.user ?? null;
    } finally {
      loading.value = false;
    }
  }

  async function signInWithGoogle() {
    loading.value = true;
    resetError();

    try {
      const redirectTo =
        import.meta.client
          ? `${window.location.origin}/auth/callback`
          : undefined;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
      });

      if (error) {
        errorMessage.value = mapAuthErrorMessage(error.code, error.message);
        return null;
      }

      if (import.meta.client && data?.url) {
        window.location.href = data.url;
      }

      return null;
    } finally {
      loading.value = false;
    }
  }

  async function signOut() {
    loading.value = true;
    resetError();

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        errorMessage.value = mapAuthErrorMessage(error.code, error.message);
        return false;
      }
      return true;
    } finally {
      loading.value = false;
    }
  }

  return {
    user,
    isLoggedIn,
    loading,
    errorMessage,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
  };
}
