<template>
  <section class="space-y-4">
    <header class="space-y-2">
      <p
        v-if="kicker"
        class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
      >
        {{ kicker }}
      </p>
      <h2 class="font-display text-2xl tracking-tight text-slate-900 dark:text-slate-50">
        {{ title }}
      </h2>
      <p v-if="description" class="text-sm text-slate-600 dark:text-slate-300">
        {{ description }}
      </p>
    </header>

    <FaqAccordion :items="items" />
  </section>
</template>

<script setup lang="ts">
import type { FaqItem } from '~/types/faq';
import FaqAccordion from '~/components/faq/FaqAccordion.vue';

defineProps<{
  title: string;
  items: FaqItem[];
  description?: string;
  kicker?: string;
}>();
</script>
