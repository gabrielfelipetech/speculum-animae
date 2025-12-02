<!-- src/components/tests/LikertTestProgress.vue -->
<template>
  <div
    class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white/90 px-4 py-3 text-xs dark:border-slate-800 dark:bg-slate-900/80"
  >
    <div class="flex flex-col gap-1">
      <span class="font-medium text-slate-700 dark:text-slate-200">
        Progresso do questionário
      </span>
      <span class="text-[0.7rem] text-slate-500 dark:text-slate-400">
        {{ answeredCount }} de {{ totalQuestions }} afirmações respondidas
      </span>
      <span
        v-if="totalGroups > 0"
        class="text-[0.7rem] text-slate-500 dark:text-slate-400"
      >
        Etapa {{ currentGroupNumber }} de {{ totalGroups }}
      </span>
    </div>

    <div class="w-full max-w-xs">
      <div class="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          class="h-full bg-brand-500 dark:bg-amber-400"
          :style="{ width: overallProgressPercent + '%' }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps<{
  answeredCount: number;
  totalQuestions: number;
  totalGroups: number;
  currentGroupNumber: number;
  overallProgressPercent: number;
}>();

const {
  answeredCount,
  totalQuestions,
  totalGroups,
  currentGroupNumber,
  overallProgressPercent,
} = toRefs(props);
</script>
