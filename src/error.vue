<script setup lang="ts">
import { computed } from 'vue';
import { clearError, useError, useRoute, useSeoMeta } from '#imports';
import BaseButton from '~/components/base/BaseButton.vue';
import ErrorShell from '~/components/errors/ErrorShell.vue';
import { useAuthModal } from '~/composables/useAuthModal';
import { useAuthUi } from '~/composables/useAuthUi';

const error = useError();
const route = useRoute();
const { isLoggedIn } = useAuthUi();
const { openAuthModal } = useAuthModal();

const statusCode = computed<number>(() => {
  const raw = error.value?.statusCode;
  if (typeof raw === 'number' && Number.isFinite(raw)) return raw;
  if (typeof raw === 'string') {
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : 500;
  }
  return 500;
});

const isForbidden = computed(() => statusCode.value === 403);
const isNotFound = computed(() => statusCode.value === 404);

const errorTitle = computed(() => {
  if (isNotFound.value) return 'P\u00e1gina n\u00e3o encontrada';
  if (isForbidden.value) return 'Acesso negado';
  return 'Erro interno';
});

const errorDescription = computed(() => {
  if (isNotFound.value) {
    return 'N\u00e3o encontramos a p\u00e1gina que voc\u00ea tentou acessar. Verifique o endere\u00e7o ou escolha uma das op\u00e7\u00f5es abaixo.';
  }
  if (isForbidden.value) {
    return 'Voc\u00ea n\u00e3o tem permiss\u00e3o para acessar este conte\u00fado.';
  }
  return 'Algo deu errado do nosso lado. Tente novamente em alguns instantes.';
});

const statusLabel = computed(() => `Erro ${statusCode.value}`);

useSeoMeta(() => ({
  title: errorTitle.value,
  robots: 'noindex, nofollow',
}));

const primaryLinkClass =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-amber-300 dark:text-slate-900 dark:hover:bg-amber-200 dark:focus-visible:ring-amber-300/80 dark:focus-visible:ring-offset-slate-950';
const secondaryLinkClass =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-amber-300 dark:hover:text-amber-200 dark:focus-visible:ring-amber-300/80 dark:focus-visible:ring-offset-slate-950';

function goHome(): void {
  clearError({ redirect: '/' });
}

function goToTests(): void {
  clearError({ redirect: '/testes' });
}

function goToHistory(): void {
  clearError({ redirect: '/testes/historico' });
}

function handleRetry(): void {
  if (import.meta.client) {
    window.location.reload();
    return;
  }
  clearError({ redirect: route.fullPath });
}

function handleAuthOpen(): void {
  openAuthModal();
}
</script>

<template>
  <section class="mx-auto max-w-4xl">
    <ErrorShell :title="errorTitle" :description="errorDescription" :status-label="statusLabel">
      <template #actions>
        <template v-if="isNotFound">
          <NuxtLink to="/" :class="primaryLinkClass" @click.prevent="goHome">
            Voltar para a home
          </NuxtLink>
          <NuxtLink to="/testes" :class="secondaryLinkClass" @click.prevent="goToTests">
            Ver testes
          </NuxtLink>
        </template>

        <template v-else-if="isForbidden">
          <BaseButton v-if="isLoggedIn" type="button" @click="goToHistory">
            Ir para meus testes
          </BaseButton>
          <BaseButton v-else type="button" @click="handleAuthOpen">
            Entrar / Cadastrar
          </BaseButton>
          <NuxtLink to="/" :class="secondaryLinkClass" @click.prevent="goHome">
            Voltar para a home
          </NuxtLink>
        </template>

        <template v-else>
          <BaseButton type="button" @click="handleRetry">Tentar novamente</BaseButton>
          <NuxtLink to="/" :class="secondaryLinkClass" @click.prevent="goHome">
            Voltar para a home
          </NuxtLink>
        </template>
      </template>
    </ErrorShell>
  </section>
</template>
