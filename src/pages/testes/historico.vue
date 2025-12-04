<template>
  <section class="min-h-screen bg-slate-50/70 py-8 dark:bg-slate-950">
    <div class="mx-auto max-w-5xl space-y-6 px-4">
      <header class="space-y-1">
        <p class="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Meus testes
        </p>
        <h1 class="text-2xl font-semibold tracking-tight">
          Histórico de testes
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Veja todos os testes que você fez estando logado e acesse novamente seus relatórios completos.
        </p>
      </header>

      <div v-if="pending" class="text-xs text-slate-500 dark:text-slate-400">
        Carregando histórico...
      </div>

      <div v-else-if="error" class="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:border-rose-800/80 dark:bg-rose-950/40 dark:text-rose-200">
        {{ errorMessage }}
      </div>

      <div v-else-if="!items.length" class="rounded-lg border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        Você ainda não possui testes salvos com sua conta.
        Faça um dos testes e ele aparecerá aqui.
      </div>

      <ul v-else class="space-y-3">
        <li
          v-for="item in items"
          :key="item.id"
          class="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/60"
        >
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div class="space-y-1">
              <p class="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {{ labelBySlug(item.slug) }}
              </p>
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {{ item.meta?.title || defaultTitle(item.slug) }}
              </p>
              <p class="text-[0.7rem] text-slate-500 dark:text-slate-400">
                {{ formatDate(item.timestamp) }}
              </p>
            </div>

            <div class="flex items-center gap-2">
              <NuxtLink
                :to="`/resultados/${item.id}`"
                class="rounded-full bg-indigo-600 px-3 py-1.5 text-[0.7rem] font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/5"
              >
                Ver relatório
              </NuxtLink>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAsyncData } from '#app';

type Slug = 'twelve-layers' | 'temperaments';

interface HistoryItem {
  id: string;
  slug: Slug;
  timestamp: string;
  meta?: {
    title?: string;
    subtitle?: string;
    groupsLabel?: string;
  };
}

const { data, pending, error } = await useAsyncData<{ items: HistoryItem[] }>(
  'my-results',
  () => $fetch('/api/my-results'),
);

const items = computed(() => data.value?.items ?? []);

const errorMessage = computed(() => {
  if (!error.value) return '';
  // @ts-expect-error - nitro error tipagem simples aqui
  return error.value?.data?.message ?? 'Erro ao carregar o histórico.';
});

function labelBySlug(slug: Slug): string {
  return slug === 'twelve-layers' ? '12 camadas da personalidade' : 'Temperamentos clássicos';
}

function defaultTitle(slug: Slug): string {
  return slug === 'twelve-layers'
    ? 'Relatório das 12 camadas'
    : 'Relatório de temperamentos';
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}
</script>
