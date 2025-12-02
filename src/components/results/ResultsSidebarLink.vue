<!-- src/components/results/ResultsSidebarLink.vue -->
<template>
  <a
    :href="href"
    class="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
  >
    <span
      v-if="number"
      class="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-[0.65rem] dark:border-slate-600"
    >
      {{ number }}
    </span>
    <span v-else-if="icon === 'lock'" class="flex h-5 w-5 items-center justify-center">
      🔒
    </span>
    <span>{{ label }}</span>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  href: string;
  label: string;
  number?: string;
  icon?: 'lock';
}>();
</script>
