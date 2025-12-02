<!-- src/pages/historico.vue -->
<template>
  <main class="mx-auto max-w-4xl px-4 py-8 space-y-6">
    <header class="space-y-2">
      <p
        class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400"
      >
        Histórico
      </p>
      <h1 class="font-display text-2xl tracking-tight md:text-3xl">
        Histórico de testes
      </h1>
      <p class="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
        Veja os últimos testes concluídos neste dispositivo, com destaque para
        as principais camadas ou temperamentos identificados em cada sessão.
      </p>
    </header>

    <div v-if="pending" class="text-sm text-slate-500 dark:text-slate-400">
      Carregando histórico...
    </div>

    <div
      v-else-if="items.length === 0"
      class="rounded-2xl border border-dashed border-slate-300/70 bg-slate-50/80 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300"
    >
      <p class="font-medium">
        Nenhum teste encontrado neste dispositivo.
      </p>
      <p class="mt-1 text-xs">
        Assim que você concluir um teste, ele aparecerá aqui para consulta
        futura.
      </p>
    </div>

    <ul v-else class="space-y-4">
      <li
        v-for="item in items"
        :key="item.id"
        class="rounded-2xl border border-slate-200/80 bg-white/90 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/80"
      >
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p
              class="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
            >
              {{ item.meta.title || item.slug }}
            </p>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              {{ formatDate(item.timestamp) }}
            </p>
            <p
              v-if="item.meta.subtitle"
              class="mt-1 text-[0.75rem] text-slate-600 dark:text-slate-300"
            >
              {{ item.meta.subtitle }}
            </p>
          </div>

          <NuxtLink
            :to="`/testes/${item.slug}`"
            class="text-[0.75rem] font-medium text-brand-600 hover:text-brand-700 dark:text-amber-300 dark:hover:text-amber-200"
          >
            Refazer teste →
          </NuxtLink>
        </div>

        <div class="mt-3 space-y-2 text-xs">
          <div>
            <p class="font-medium text-slate-700 dark:text-slate-100">
              Principais
              {{
                (item.meta.groupsLabel || 'camadas').toLowerCase()
              }}:
            </p>
            <div class="mt-1 flex flex-wrap gap-1.5">
              <span
                v-for="summary in item.topSummaries.slice(0, 3)"
                :key="summary.groupId"
                class="rounded-full bg-slate-100 px-2 py-0.5 text-[0.7rem] text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {{ summary.name }} ({{ summary.average.toFixed(2) }}/7)
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getOrCreateClientId } from '~/utils/clientId.ts';

interface StoredSummary {
  groupId: string;
  name: string;
  title: string;
  average: number;
  description: string;
}

interface StoredResult {
  id: string;
  clientId: string;
  testId: string;
  slug: string;
  timestamp: string;
  answers: Record<string, number>;
  results: { groupId: string; name: string; average: number }[];
  topSummaries: StoredSummary[];
  meta: {
    title?: string;
    subtitle?: string;
    groupsLabel?: string;
  };
}

const { data, pending } = useAsyncData(
  'results-history',
  async () => {
    if (!process.client) {
      return { items: [] as StoredResult[] };
    }

    const clientId = getOrCreateClientId();

    return await $fetch<{ items: StoredResult[] }>('/api/results', {
      params: { clientId },
    });
  },
  {
    server: false,
  },
);

const items = computed<StoredResult[]>(() => data.value?.items ?? []);

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}
</script>
