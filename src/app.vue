<!-- src/app.vue -->
<template>
  <div
    class="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-50"
  >
    <SiteHeader
      :theme="theme"
      @toggle-theme="toggleTheme"
    />

    <main class="mx-auto max-w-5xl px-4 py-6">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import SiteHeader from '~/components/layout/SiteHeader.vue';

type Theme = 'light' | 'dark';

const theme = useState<Theme>('theme', () => 'light');

function applyThemeClass(value: Theme): void {
  if (process.client) {
    const root = document.documentElement;
    root.classList.toggle('dark', value === 'dark');
  }
}

onMounted(() => {
  if (!process.client) return;

  const saved = window.localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') {
    theme.value = saved as Theme;
  } else {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    theme.value = prefersDark ? 'dark' : 'light';
  }
  applyThemeClass(theme.value);
});

watch(
  theme,
  (value) => {
    if (!process.client) return;
    window.localStorage.setItem('theme', value);
    applyThemeClass(value);
  },
  { immediate: false },
);

function toggleTheme(): void {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
}
</script>
