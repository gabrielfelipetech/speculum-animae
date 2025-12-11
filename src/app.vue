<!-- src/app.vue -->
<template>
  <div
    class="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-50 pt-8"
  >
    <SiteHeader
      :theme="theme"
      @toggle-theme="toggleTheme"
      @open-auth="isAuthOpen = true"
      @logout="handleLogout"
    />

    <AuthModal
      :open="isAuthOpen"
      :loading="authLoading"
      :error-message="authError"
      @update:open="(v) => (isAuthOpen = v)"
      @close="isAuthOpen = false"
      @submit-email="handleEmailAuth"
      @google-auth="handleGoogleAuth"
    />

    <main class="mx-auto max-w-5xl px-4 py-6">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, computed } from 'vue';
import SiteHeader from '~/components/layout/SiteHeader.vue';
import AuthModal from '~/components/auth/AuthModal.vue';
import { useAuth } from '~/composables/useAuth';
import SiteFooter from '~/components/layout/SiteFooter.vue';
type Theme = 'light' | 'dark';

const theme = useState<Theme>('theme', () => 'light');
const isAuthOpen = ref(false);

const { signInWithEmail, signUpWithEmail, signInWithGoogle, signOut, loading, errorMessage } =
  useAuth();

const authLoading = computed(() => loading.value);
const authError = computed(() => errorMessage.value ?? null);

function applyThemeClass(value: Theme): void {
  if (process.client) {
    const root = document.documentElement;
    root.classList.toggle('dark', value === 'dark');
  }
}

onMounted(() => {
  if (!process.client) return;

  const saved = window.localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') {
    theme.value = saved as Theme;
  } else {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    theme.value = prefersDark ? 'dark' : 'light';
  }
  applyThemeClass(theme.value);
});

watch(
  theme,
  (value) => {
    if (!process.client) return;
    window.localStorage.setItem('theme', value);
    applyThemeClass(value);
  },
  { immediate: false },
);

function toggleTheme(): void {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}

async function handleEmailAuth(payload: {
  mode: 'signin' | 'signup';
  email: string;
  password: string;
  name?: string;
  gender?: 'male' | 'female';
}) {
  if (payload.mode === 'signin') {
    const user = await signInWithEmail(payload.email, payload.password);
    if (user) isAuthOpen.value = false;
  } else {
    if (!payload.name || !payload.gender) {
      return;
    }
    const user = await signUpWithEmail({
      email: payload.email,
      password: payload.password,
      fullName: payload.name,
      gender: payload.gender,
    });
    if (user) {
      isAuthOpen.value = false;
    }
  }
}

async function handleGoogleAuth() {
  await signInWithGoogle();
  // redirecionamento vem do próprio Supabase
}

async function handleLogout() {
  await signOut();
}
</script>
