<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useLazyAsyncData, useSeoMeta } from '#app';
import { getOrCreateClientId } from '~/utils/clientId';

import type {
  AnyReport,
  TwelveLayersReport,
  TemperamentReport,
} from '~/types/results';

import TwelveLayersResultsView from '../../components/results/TwelveLayersResultView.vue';
import TemperamentsResultsView from '../../components/results/TemperamentsResultView.vue';
import SkeletonBlock from '~/components/base/SkeletonBlock.vue';

useSeoMeta({
  robots: 'noindex, nofollow',
  title: 'Resultados',
});

const route = useRoute();
const sessionId = computed(() => route.params.sessionId as string);

const { data, error, pending } = useLazyAsyncData<AnyReport>(
  `results-${sessionId.value}`,
  () => {
    const clientId = import.meta.client ? getOrCreateClientId() : null;
    return $fetch(`/api/results/${sessionId.value}`, {
      query: clientId ? { clientId } : undefined,
    });
  },
);

const isLoading = computed(() => pending.value || (!data.value && !error.value));

const errorMessage = computed(() => {
  if (!error.value) return '';
  const anyError = error.value as { data?: { message?: string } };
  return anyError.data?.message ?? 'Erro ao carregar resultados.';
});

const twelveReport = computed<TwelveLayersReport | null>(() => {
  const r = data.value;
  return r && r.kind === 'twelveLayers' ? (r as TwelveLayersReport) : null;
});

const temperamentReport = computed<TemperamentReport | null>(() => {
  const r = data.value;
  return r && r.kind === 'temperaments'
    ? (r as TemperamentReport)
    : null;
});
</script>

<template>
  <section
    v-if="isLoading"
    class="min-h-screen bg-slate-50/70 dark:bg-slate-950"
  >
    <div class="mx-auto max-w-5xl space-y-4 px-4 py-10">
      <SkeletonBlock class="h-10 w-2/3" />
      <SkeletonBlock class="h-5 w-full" />
      <SkeletonBlock class="h-5 w-5/6" />
      <SkeletonBlock class="h-40 w-full rounded-2xl" />
      <SkeletonBlock class="h-32 w-full rounded-2xl" />
    </div>
  </section>

  <section
    v-else-if="error"
    class="min-h-screen bg-slate-50/70 dark:bg-slate-950"
  >
    <div class="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <h1 class="text-xl font-semibold text-slate-900 dark:text-slate-50">
        Resultado indisponível
      </h1>
      <p class="text-sm text-slate-600 dark:text-slate-300">
        {{ errorMessage }}
      </p>
      <NuxtLink
        to="/"
        class="inline-flex items-center rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
      >
        Voltar para a página inicial
      </NuxtLink>
    </div>
  </section>

  <section
    v-else-if="twelveReport || temperamentReport"
    class="min-h-screen bg-slate-50/70 dark:bg-slate-950"
  >
    <TwelveLayersResultsView
      v-if="twelveReport"
      :report="twelveReport"
    />

    <TemperamentsResultsView
      v-else-if="temperamentReport"
      :report="temperamentReport"
      :session-id="sessionId"
    />
  </section>
</template>
