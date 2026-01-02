<template>
  <div class="space-y-3">
    <details
      v-for="item in items"
      :key="item.q"
      class="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/80"
    >
      <summary
        class="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-slate-800 dark:text-slate-100"
      >
        <span>{{ item.q }}</span>
        <span class="text-xs font-semibold text-slate-400 dark:text-slate-500">+</span>
      </summary>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {{ item.a }}
      </p>
    </details>
  </div>
</template>

<script setup lang="ts">
import type { FaqItem } from '~/types/faq';

defineProps<{
  items: FaqItem[];
}>();
</script>
