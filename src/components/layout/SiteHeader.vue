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
       <img
         src="/logo-512.png"
         :alt="t('common.brand')"
         class="h-14 w-14 rounded-full"
       />
        <span class="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          {{ t('common.brand') }}
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 md:flex">
        <NuxtLink
          to="/artigos"
          class="transition hover:text-indigo-600 dark:hover:text-amber-300"
        >
          {{ t('menu.items.articles') }}
        </NuxtLink>
        <NuxtLink
          to="/planos"
          class="transition hover:text-indigo-600 dark:hover:text-amber-300"
        >
          {{ t('menu.items.plan') }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <div class="hidden items-center gap-3 md:flex">
          <div class="flex items-center gap-2">
            <template v-if="isLoggedIn">
              <NuxtLink
                to="/testes/historico"
                class="hidden max-w-[160px] truncate text-xs text-slate-700 underline-offset-2 hover:underline dark:text-slate-200 sm:inline"
                :aria-label="t('menu.items.testsDone')"
                :title="t('menu.items.testsDone')"
              >
                {{ displayName }}
              </NuxtLink>

              <button
                type="button"
                class="rounded-full bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700"
                @click="emit('logout')"
              >
                {{ t('common.actions.logout') }}
              </button>
            </template>
            <template v-else>
              <button
                type="button"
                data-cy="open-auth-modal"
                class="rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/5"
                @click="emit('open-auth')"
              >
                {{ t('common.actions.enterRegister') }}
              </button>
            </template>
          </div>
          <LanguageToggle />
          <ThemeToggle
            :theme="props.theme"
            @toggle="emit('toggle-theme')"
          />
        </div>

        <button
          ref="menuButtonRef"
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 shadow-sm transition hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus-visible:ring-offset-slate-900 md:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          :aria-label="t('menu.title')"
          @click="toggleMenu"
        >
          <Icon name="mdi:menu" size="20" aria-hidden="true" />
        </button>
      </div>
    </div>

    <MobileMenu
      :open="isMenuOpen"
      panel-id="mobile-menu"
      :theme="props.theme"
      @close="closeMenu"
      @open-auth="handleAuthOpen"
      @logout="handleLogout"
      @toggle-theme="emit('toggle-theme')"
    />
  </header>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useI18n } from '#imports';
import MobileMenu from '~/components/layout/MobileMenu.vue';
import ThemeToggle from '~/components/layout/ThemeToggle.vue';
import LanguageToggle from '~/components/layout/LanguageToggle.vue';
import { useAuthUi } from '~/composables/useAuthUi';

const props = defineProps<{
  theme: 'light' | 'dark';
}>();

const emit = defineEmits<{
  'toggle-theme': [];
  'open-auth': [];
  logout: [];
}>();

const { isLoggedIn, displayName } = useAuthUi();
const { t } = useI18n();
const menuButtonRef = ref<HTMLButtonElement | null>(null);
const isMenuOpen = ref(false);

function openMenu(): void {
  isMenuOpen.value = true;
}

function closeMenu(): void {
  isMenuOpen.value = false;
  nextTick(() => {
    menuButtonRef.value?.focus();
  });
}

function toggleMenu(): void {
  if (isMenuOpen.value) {
    closeMenu();
  } else {
    openMenu();
  }
}

function handleAuthOpen(): void {
  emit('open-auth');
}

function handleLogout(): void {
  emit('logout');
}

watch(isMenuOpen, (open) => {
  if (open) {
    nextTick(() => {
      menuButtonRef.value?.blur();
    });
  }
});
</script>
