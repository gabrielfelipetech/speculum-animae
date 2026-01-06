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
  kicker: 'Retrato dos relacionamentos',
  heroClass:
    'bg-gradient-to-br from-rose-200/60 to-rose-50 dark:from-rose-900/30 dark:to-slate-900/80',
  barClass: 'bg-rose-500 dark:bg-rose-400',
};
</script>
