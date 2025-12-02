<!-- src/components/base/BaseButton.vue -->
<template>
  <button
    :type="buttonType"
    class="inline-flex items-center justify-center gap-2 rounded-lg border border-transparent px-4 py-2 text-sm font-medium shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 bg-brand-600 text-white hover:bg-brand-700 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  type?: 'button' | 'submit' | 'reset';
}>();

const buttonType = computed(() => props.type ?? 'button');
</script>
