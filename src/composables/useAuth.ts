import { computed, ref } from 'vue';
import {
  useRuntimeConfig,
  useSupabaseClient,
  useSupabaseUser,
} from '#imports';
import type { User } from '@supabase/supabase-js';

export type Gender = 'male' | 'female';

type SignUpPayload = Readonly<{
  email: string;
  password: string;
  fullName: string;
  gender: Gender;
}>;

type PasswordResetResult = { ok: true } | { ok: false; error: string };

function mapAuthErrorMessage(code?: string, message?: string): string {
  switch (code) {
    case 'invalid_login_credentials':
    case 'invalid_credentials':
      return 'E-mail ou senha incorretos.';
    case 'email_not_confirmed':
      return 'Confirme seu e-mail antes de entrar.';
    case 'user_already_exists':
      return 'Ja existe uma conta com este e-mail.';
    default:
      return message || 'Ocorreu um erro ao autenticar. Tente novamente.';
  }
}

function buildPasswordResetRedirectUrl(): string {
  if (import.meta.client) {
    return `${window.location.origin.replace(/\/$/, '')}/auth/reset-password`;
  }

  const runtime = useRuntimeConfig();
  const baseUrl = String(runtime.public.siteUrl || '').replace(/\/$/, '');
  return `${baseUrl}/auth/reset-password`;
}

export function useAuth() {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const loading = ref(false);
  const errorMessage = ref<string | null>(null);

  const isLoggedIn = computed(() => !!user.value?.id);

  function resetError(): void {
    errorMessage.value = null;
  }

  async function signInWithEmail(
    email: string,
    password: string,
  ): Promise<User | null> {
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

  async function signUpWithEmail(
    payload: SignUpPayload,
  ): Promise<User | null> {
    const { email, password, fullName, gender } = payload;

    loading.value = true;
    resetError();

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, gender },
        },
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

  async function signInWithGoogle(): Promise<void> {
    loading.value = true;
    resetError();

    try {
      if (!import.meta.client) return;

      const origin = window.location.origin;
      const redirectTo = `${origin}/auth/callback`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
        },
      });

      if (error) {
        errorMessage.value = mapAuthErrorMessage(error.code, error.message);
      }
    } finally {
      loading.value = false;
    }
  }

  async function sendPasswordReset(email: string): Promise<PasswordResetResult> {
    if (!email.trim()) {
      const message = 'Informe um e-mail valido.';
      errorMessage.value = message;
      return { ok: false, error: message };
    }

    loading.value = true;
    resetError();

    try {
      const redirectTo = buildPasswordResetRedirectUrl();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        const message = mapAuthErrorMessage(error.code, error.message);
        errorMessage.value = message;
        return { ok: false, error: message };
      }

      return { ok: true };
    } catch {
      const message = 'Nao foi possivel enviar o e-mail de recuperacao.';
      errorMessage.value = message;
      return { ok: false, error: message };
    } finally {
      loading.value = false;
    }
  }

  async function signOut(): Promise<boolean> {
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
    sendPasswordReset,
    signOut,
  };
}
