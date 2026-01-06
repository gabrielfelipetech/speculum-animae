<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useLazyAsyncData, useSeoMeta } from '#app';
import { getSupabaseAccessToken } from '~/utils/authToken';
import { getOrCreateClientId } from '~/utils/clientId';

import type {
  AnyReport,
  AssessmentReport,
  AssessmentReportKind,
  TwelveLayersReport,
  TemperamentReport,
} from '~/types/results';

import TwelveLayersResultsView from '../../components/results/TwelveLayersResultView.vue';
import TemperamentsResultsView from '../../components/results/TemperamentsResultView.vue';
import PersonalityResultsView from '~/components/results/PersonalityResultsView.vue';
import RelationshipsResultsView from '~/components/results/RelationshipsResultsView.vue';
import StudyResultsView from '~/components/results/StudyResultsView.vue';
import WorkResultsView from '~/components/results/WorkResultsView.vue';
import WellbeingResultsView from '~/components/results/WellbeingResultsView.vue';
import SkeletonBlock from '~/components/base/SkeletonBlock.vue';

useSeoMeta({
  robots: 'noindex, nofollow',
  title: 'Resultados',
});

const route = useRoute();

const sessionId = computed(() => String(route.params.sessionId ?? ''));
const testSlug = computed(() => {
  const value = route.query.t;
  if (Array.isArray(value)) return value[0] ?? null;
  return typeof value === 'string' ? value : null;
});

const { data, error, pending } = useLazyAsyncData<AnyReport>(
  `results-${sessionId.value}`,
  async () => {
    const headers: Record<string, string> = {};
    const query: Record<string, string> = {};

    const token = await getSupabaseAccessToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      const clientId = import.meta.client ? getOrCreateClientId() : null;
      if (clientId) query.clientId = clientId;
    }

    return $fetch(`/api/results/${sessionId.value}`, {
      headers: Object.keys(headers).length ? headers : undefined,
      query: Object.keys(query).length ? query : undefined,
    });
  },
  {
    server: false,
    getCachedData: () => undefined,
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

const assessmentReport = computed<AssessmentReport | null>(() => {
  const r = data.value;
  return r && r.kind !== 'twelveLayers' && r.kind !== 'temperaments'
    ? (r as AssessmentReport)
    : null;
});

const personalityKinds: AssessmentReportKind[] = [
  'bigFive',
  'disc',
  'selfSabotage',
  'procrastination',
  'decisionMaking',
  'archetypes',
  'selfEsteem',
  'emotionalIntelligence',
];

const relationshipKinds: AssessmentReportKind[] = [
  'loveLanguages',
  'attachment',
  'conflictCommunication',
  'jealousyBoundaries',
  'temperamentCompatibility',
];

const studyKinds: AssessmentReportKind[] = [
  'learningStyle',
  'studyFocus',
  'studyHabits',
  'metacognition',
];

const workKinds: AssessmentReportKind[] = [
  'workValues',
  'motivators',
  'leadershipStyle',
  'teamwork',
];

const wellbeingKinds: AssessmentReportKind[] = [
  'anxietyTriggers',
  'burnoutStress',
  'habitsConsistency',
  'sleepEnergy',
];

const personalityReport = computed<AssessmentReport | null>(() => {
  if (!assessmentReport.value) return null;
  return personalityKinds.includes(assessmentReport.value.kind)
    ? assessmentReport.value
    : null;
});

const relationshipReport = computed<AssessmentReport | null>(() => {
  if (!assessmentReport.value) return null;
  return relationshipKinds.includes(assessmentReport.value.kind)
    ? assessmentReport.value
    : null;
});

const studyReport = computed<AssessmentReport | null>(() => {
  if (!assessmentReport.value) return null;
  return studyKinds.includes(assessmentReport.value.kind)
    ? assessmentReport.value
    : null;
});

const workReport = computed<AssessmentReport | null>(() => {
  if (!assessmentReport.value) return null;
  return workKinds.includes(assessmentReport.value.kind)
    ? assessmentReport.value
    : null;
});

const wellbeingReport = computed<AssessmentReport | null>(() => {
  if (!assessmentReport.value) return null;
  return wellbeingKinds.includes(assessmentReport.value.kind)
    ? assessmentReport.value
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
    v-else-if="twelveReport || temperamentReport || assessmentReport"
    class="min-h-screen bg-slate-50/70 dark:bg-slate-950"
  >
    <TwelveLayersResultsView
      v-if="twelveReport"
      :report="twelveReport"
      :test-slug="testSlug"
    />

    <TemperamentsResultsView
      v-else-if="temperamentReport"
      :report="temperamentReport"
      :session-id="sessionId"
      :test-slug="testSlug"
    />

    <PersonalityResultsView
      v-else-if="personalityReport"
      :report="personalityReport"
      :test-slug="testSlug"
    />

    <RelationshipsResultsView
      v-else-if="relationshipReport"
      :report="relationshipReport"
      :test-slug="testSlug"
    />

    <StudyResultsView
      v-else-if="studyReport"
      :report="studyReport"
      :test-slug="testSlug"
    />

    <WorkResultsView
      v-else-if="workReport"
      :report="workReport"
      :test-slug="testSlug"
    />

    <WellbeingResultsView
      v-else-if="wellbeingReport"
      :report="wellbeingReport"
      :test-slug="testSlug"
    />
  </section>
</template>
