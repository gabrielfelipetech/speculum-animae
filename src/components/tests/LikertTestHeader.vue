<!-- src/components/tests/LikertTestHeader.vue -->
<template>
  <header class="space-y-2">
    <p
      class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
    >
      {{ config.title }}
    </p>
    <h2 class="font-display text-2xl tracking-tight md:text-3xl">
      {{ config.subtitle }}
    </h2>
    <p class="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
      {{ config.description }}
    </p>
  </header>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import type { LikertTestConfig } from '~/types/tests';

const props = defineProps<{
  config: LikertTestConfig;
}>();

const { config } = toRefs(props);
</script>
