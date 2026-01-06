<!-- src/components/tests/LikertTestHeader.vue -->
<template>
  <header class="space-y-2">
    <h1
      class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
    >
      {{ config.title }}
    </h1>
    <h2 class="font-display text-2xl tracking-tight md:text-3xl">
      {{ config.subtitle }}
    </h2>
    <p class="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
      {{ config.description }}
    </p>
    <p
      v-if="config.disclaimer"
      class="max-w-2xl rounded-lg border border-amber-200/70 bg-amber-50/80 p-3 text-[0.7rem] text-amber-900 dark:border-amber-500/40 dark:bg-amber-900/20 dark:text-amber-100"
    >
      {{ config.disclaimer }}
    </p>
  </header>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import type { TestConfig } from '~/types/tests';

const props = defineProps<{
  config: TestConfig;
}>();

const { config } = toRefs(props);
</script>
