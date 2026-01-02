<!-- src/components/layout/SiteHeader.vue -->
<template>
  <header
    class="fixed inset-x-0 top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
  >
    <div
      class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2"
    >
      <NuxtLink
        to="/"
        class="flex items-center w-60 gap-4 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50"
      >
       <img src="/logo-512.png" alt="Speculum Animae" class="h-14 w-14 rounded-full" />
  <span class="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
    Speculum Animae
  </span>
      </NuxtLink>

      <nav class="hidden items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 md:flex">
        <NuxtLink
          to="/artigos"
          class="transition hover:text-indigo-600 dark:hover:text-amber-300"
        >
          Artigos
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        
        <div class="flex items-center gap-2">
          <template v-if="user">
            <NuxtLink
              to="/testes/historico"
              class="hidden max-w-[160px] truncate text-xs text-slate-700 underline-offset-2 hover:underline dark:text-slate-200 sm:inline"
            >
              {{ displayName }}
            </NuxtLink>

            <button
              type="button"
              class="rounded-full bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700"
              @click="emit('logout')"
            >
              Sair
            </button>
          </template>
          <template v-else>
            <button
              type="button"
              class="rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/5"
              @click="emit('open-auth')"
            >
              Entrar / Cadastrar
            </button>
          </template>
        </div>
        <ThemeToggle
          :theme="props.theme"
          @toggle="emit('toggle-theme')"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSupabaseUser } from '#imports';
import ThemeToggle from '~/components/layout/ThemeToggle.vue';

const props = defineProps<{
  theme: 'light' | 'dark';
}>();

const emit = defineEmits<{
  (e: 'toggle-theme'): void;
  (e: 'open-auth'): void;
  (e: 'logout'): void;
}>();

const user = useSupabaseUser();

const displayName = computed(() => {
  if (!user.value) return '';
  return (
    (user.value.user_metadata?.full_name as string | undefined) ||
    user.value.email ||
    'Usuário'
  );
});
</script>
