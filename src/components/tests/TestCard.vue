<template>
  <NuxtLink
      :to="{ path: `/testes/${test.slug}`, query: { fresh: '1' } }"
    class="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500/70 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
  >
    <div class="space-y-1.5">

      <h3 class="font-display text-base leading-snug text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-600 group-hover:text-brand-700 dark:text-amber-300 dark:group-hover:text-amber-200">
        {{ test.title }}
      </h3>
      <p class="text-[0.8rem] text-slate-600 dark:text-slate-300">
        {{ test.subtitle }}
      </p>
    </div>

    <div class="mt-3 flex items-center justify-between text-[0.75rem]">
      <div class="flex flex-wrap gap-1">
        <TestTagPill
          v-for="tag in test.tags"
          :key="tag"
          :label="tag"
        />
      </div>

      <span
        class="flex items-center gap-1 text-[0.7rem] font-medium text-brand-600 group-hover:text-brand-700 dark:text-amber-300 dark:group-hover:text-amber-200"
      >
        Iniciar teste
        <span aria-hidden="true">→</span>
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { LikertTestConfig } from '~/types/tests';
import TestTagPill from '~/components/tests/TestTagPill.vue';

defineProps<{
  test: LikertTestConfig;
  variant: 'core' | 'other';
}>();
</script>
