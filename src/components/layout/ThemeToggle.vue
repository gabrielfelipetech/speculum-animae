<template>
  <button
    type="button"
    :aria-label="ariaLabel"
    :title="label"
    class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100
           text-slate-700 shadow-sm transition hover:bg-slate-200
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white
           dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900
           sm:w-auto sm:gap-2 sm:px-3"
    @click="emit('toggle')"
  >
    <Icon name="mdi:theme-light-dark" size="18" aria-hidden="true" />
    <span class="hidden text-xs font-medium sm:inline">
      {{ label }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  theme: 'light' | 'dark'
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const label = computed(() => (props.theme === 'light' ? 'Modo escuro' : 'Modo claro'))
const ariaLabel = computed(() =>
  props.theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro',
)
</script>
