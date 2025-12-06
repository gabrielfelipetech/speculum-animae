<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useAsyncData } from '#app';

import type {
  AnyReport,
  TwelveLayersReport,
  TemperamentReport,
} from '~/types/results';

import TwelveLayersResultsView from '../../components/results/TwelveLayersResultView.vue';
import TemperamentsResultsView from '../../components/results/TemperamentsResultView.vue';

const route = useRoute();
const sessionId = computed(() => route.params.sessionId as string);

const { data, error } = await useAsyncData<AnyReport>(
  `results-${sessionId.value}`,
  () => $fetch(`/api/results/${sessionId.value}`),
);

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 500,
    message: error.value.message || 'Erro ao carregar resultados',
  });
}

if (!data.value) {
  throw createError({
    statusCode: 404,
    message: 'Resultados não encontrados',
  });
}

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
    v-if="twelveReport || temperamentReport"
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
