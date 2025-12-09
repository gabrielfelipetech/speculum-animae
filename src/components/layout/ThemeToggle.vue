<template>
  <button
    type="button"
    class="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
    @click="$emit('toggle')"
  >
    <span v-if="props.theme === 'light'">☾ Modo escuro</span>
    <span v-else>☼ Modo claro</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  theme: 'light' | 'dark';
}>();

defineEmits<{
  (e: 'toggle'): void;
}>();
</script>
