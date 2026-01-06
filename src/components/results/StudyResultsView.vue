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
  kicker: 'Perfil de estudo',
  heroClass:
    'bg-gradient-to-br from-cyan-200/60 to-cyan-50 dark:from-cyan-900/30 dark:to-slate-900/80',
  barClass: 'bg-cyan-500 dark:bg-cyan-400',
};
</script>
