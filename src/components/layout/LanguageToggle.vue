<template>
  <div
    class="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-1.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
    role="radiogroup"
    aria-label="Language"
  >
    <button
      v-for="option in availableLocales"
      :key="option.code"
      type="button"
      role="radio"
      :aria-checked="option.code === localeValue"
      :aria-current="option.code === localeValue ? 'true' : undefined"
      :class="getButtonClass(option.code)"
      @click="setLocaleSafe(option.code)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18nUi } from '~/composables/useI18nUi'

const { locale, availableLocales, setLocaleSafe } = useI18nUi()

const localeValue = computed(() => locale.value)

function getButtonClass(code: string): string {
  const base =
    'rounded-full px-2 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900'
  const active =
    'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-50'
  const inactive =
    'text-slate-500 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-amber-300'

  return `${base} ${code === locale.value ? active : inactive}`
}
</script>
