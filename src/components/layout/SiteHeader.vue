<!-- src/components/layout/SiteHeader.vue -->
<template>
  <header
    class="border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
  >
    <div
      class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3"
    >
      <!-- Logo / Home -->
      <NuxtLink
        to="/"
        class="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50"
      >
        Speculum Animae
      </NuxtLink>

      <!-- Botão de tema -->
      <button
        type="button"
        class="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
        @click="emit('toggle-theme')"
      >
        <span v-if="theme === 'light'">☾ Modo escuro</span>
        <span v-else>☼ Modo claro</span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  theme: 'light' | 'dark';
}>();

const emit = defineEmits<{
  (e: 'toggle-theme'): void;
}>();

const { theme } = props;
</script>
