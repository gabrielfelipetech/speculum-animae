<template>
  <div
    class="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-50 pt-8"
  >
    <SiteHeader
      :theme="theme"
      @toggle-theme="toggleTheme"
      @open-auth="openAuthModal"
      @logout="handleLogout"
    />

    <AuthModal
      :open="isAuthOpen"
      :loading="authLoading"
      :error-message="authError"
      :reset-feedback="resetFeedback"
      @update:open="setAuthModal"
      @close="closeAuthModal"
      @submit-email="handleEmailAuth"
      @google-auth="handleGoogleAuth"
      @reset-password="handleResetPassword"
    />

    <main class="mx-auto max-w-5xl px-4 py-10">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed, ref } from 'vue';
import {
  useHead,
  useSeoMeta,
  useRoute,
  useRuntimeConfig,
  useI18n,
} from '#imports';

import SiteHeader from '~/components/layout/SiteHeader.vue';
import AuthModal from '~/components/auth/AuthModal.vue';
import { useAuth } from '~/composables/useAuth';
import { useAuthModal } from '~/composables/useAuthModal';
import SiteFooter from '~/components/layout/SiteFooter.vue';

type Theme = 'light' | 'dark';

const theme = useState<Theme>('theme', () => 'light');
const { isAuthOpen, openAuthModal, closeAuthModal, setAuthModal } = useAuthModal();

const {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signOut,
  sendPasswordReset,
  loading,
  errorMessage,
} = useAuth();
const { t } = useI18n();
const resetFeedback = ref<{ tone: 'success' | 'error'; message: string } | null>(
  null,
);

const authLoading = computed(() => loading.value);
const authError = computed(() => errorMessage.value ?? null);

const route = useRoute();
const runtime = useRuntimeConfig();
const siteUrl = String(runtime.public.siteUrl || 'https://speculumanimae.com.br').replace(
  /\/$/,
  '',
);

// canonical SEM querystring (evita duplicar /?fresh=1 etc.)
const canonical = computed(() => `${siteUrl}${route.path}`);

function isAuthModalQueryEnabled(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value.some((item) => item === '1' || item === 'true');
  }
  return value === '1' || value === 'true';
}

useSeoMeta(() => ({
  titleTemplate: (t) => (t ? `${t} | Speculum Animae` : 'Speculum Animae'),
  description: 'Testes de personalidade, temperamento e virtudes em um só lugar.',
  ogType: 'website',
  ogSiteName: 'Speculum Animae',
  ogUrl: canonical.value,
  ogImage: `${siteUrl}/logo-512.png`,
  twitterCard: 'summary_large_image',
}));

useHead(() => ({
  link: [{ rel: 'canonical', href: canonical.value }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Speculum Animae',
        url: siteUrl,
        logo: `${siteUrl}/logo-512.png`,
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Speculum Animae',
        url: siteUrl,
      }),
    },
  ],
}));

function applyThemeClass(value: Theme): void {
  if (import.meta.client) {
    const root = document.documentElement;
    root.classList.toggle('dark', value === 'dark');
  }
}

onMounted(() => {
  if (!import.meta.client) return;

  const saved = window.localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') {
    theme.value = saved as Theme;
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme.value = prefersDark ? 'dark' : 'light';
  }
  applyThemeClass(theme.value);
});

watch(
  theme,
  (value) => {
    if (!import.meta.client) return;
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
    if (user) closeAuthModal();
  } else {
    if (!payload.name || !payload.gender) return;
    const user = await signUpWithEmail({
      email: payload.email,
      password: payload.password,
      fullName: payload.name,
      gender: payload.gender,
    });
    if (user) closeAuthModal();
  }
}

async function handleGoogleAuth() {
  await signInWithGoogle();
}

async function handleLogout() {
  await signOut();
}

async function handleResetPassword(payload: { email: string }) {
  const result = await sendPasswordReset(payload.email);
  if (result.ok) {
    resetFeedback.value = {
      tone: 'success',
      message: t('auth.reset.success'),
    };
    return;
  }

  resetFeedback.value = {
    tone: 'error',
    message: result.error || t('auth.reset.error'),
  };
}

watch(isAuthOpen, (isOpen) => {
  if (!isOpen) {
    resetFeedback.value = null;
  }
});

watch(
  () => route.query.auth,
  (value) => {
    if (!import.meta.client) return;
    if (!isAuthModalQueryEnabled(value)) return;
    openAuthModal();
  },
  { immediate: true },
);
</script>
