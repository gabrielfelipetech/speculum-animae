<!-- src/components/tests/LikertTestResultsGeneric.vue -->
<template>
  <section class="space-y-6">
    <!-- Top 3 predominantes, sem números -->
    <div class="space-y-3">
      <h3 class="font-display text-lg tracking-tight">
        Aspectos mais predominantes
      </h3>

      <div class="space-y-2">
        <article
          v-for="summary in topSummaries"
          :key="summary.groupId"
          class="rounded-xl border border-slate-200/80 bg-white/90 p-3 text-sm dark:border-slate-800 dark:bg-slate-900/80"
        >
          <header class="mb-1 flex items-center justify-between gap-2 text-xs">
            <div>
              <p class="font-medium">
                {{ summary.name }}
              </p>
              <p class="text-[0.7rem] text-slate-500 dark:text-slate-400">
                {{ summary.title }}
              </p>
            </div>
          </header>

          <p class="text-xs text-slate-600 dark:text-slate-300">
            {{ summary.description }}
          </p>
        </article>
      </div>
    </div>

    <!-- 3 mais fracos (sem mostrar pontuação) -->
    <div v-if="weakestGroups.length" class="space-y-3">
      <h3 class="font-display text-lg tracking-tight">
        Aspectos que pedem fortalecimento
      </h3>

      <ul class="space-y-1 text-xs text-slate-600 dark:text-slate-300">
        <li
          v-for="group in weakestGroups"
          :key="group.groupId"
          class="flex items-start gap-2"
        >
          <span class="mt-[2px] h-1.5 w-1.5 rounded-full bg-red-400 dark:bg-red-300" />
          <span>
            <span class="font-medium">{{ group.name }}</span>
            <span class="text-slate-500 dark:text-slate-400">
              — tende a se manifestar de forma mais frágil ou instável no momento.
            </span>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

type LikertResultGroup = {
  groupId: string;
  name: string;
  average: number;
  [key: string]: unknown;
};

type LikertGroupSummary = {
  groupId: string;
  name: string;
  title: string;
  description: string;
};

const props = defineProps<{
  results: LikertResultGroup[];
  topSummaries: LikertGroupSummary[];
}>();

const { results, topSummaries } = toRefs(props);

// 3 dimensões mais fracas (para “aspectos que pedem fortalecimento”)
const weakestGroups = computed<LikertResultGroup[]>(() => {
  if (!results.value || results.value.length === 0) return [];

  const sortedAsc = [...results.value].slice().sort(
    (a, b) => a.average - b.average,
  );

  return sortedAsc.slice(0, 3);
});
</script>
