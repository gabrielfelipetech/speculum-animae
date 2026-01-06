<template>
  <AssessmentResultsView :report="report" :test-slug="testSlug" :theme="theme" />
</template>

<script setup lang="ts">
import type { AssessmentReport } from '~/types/results';
import AssessmentResultsView from '~/components/results/AssessmentResultsView.vue';

const props = defineProps<{
  report: AssessmentReport;
  testSlug?: string | null;
}>();

const report = props.report;
const testSlug = props.testSlug ?? null;

const theme = {
  kicker: 'Perfil profissional',
  heroClass:
    'bg-gradient-to-br from-amber-200/60 to-amber-50 dark:from-amber-900/30 dark:to-slate-900/80',
  barClass: 'bg-amber-500 dark:bg-amber-400',
};
</script>
