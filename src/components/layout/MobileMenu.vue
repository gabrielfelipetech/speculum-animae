<template>
  <div v-if="open" class="fixed inset-0 z-50 md:hidden">
    <div
      class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
      @click="emit('close')"
    />
    <div
      :id="panelId"
      ref="panelRef"
      role="dialog"
      aria-modal="true"
      :aria-label="t('menu.title')"
      tabindex="-1"
      class="absolute right-3 top-3 w-[min(92vw,340px)] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >
      <div class="flex items-center justify-between">
        <div class="space-y-1">
          <p class="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {{ t('menu.title') }}
          </p>
        </div>
        <button
          type="button"
          class="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          :aria-label="t('common.actions.close')"
          @click="emit('close')"
        >
          <Icon name="mdi:close" size="18" aria-hidden="true" />
        </button>
      </div>

      <nav class="mt-4 space-y-2">
        <div v-if="isLoggedIn" :class="itemClass">
          {{ t('menu.greeting', { name: displayName }) }}
        </div>
        <NuxtLink
          v-if="isLoggedIn"
          to="/testes/historico"
          :class="itemClass"
          @click="emit('close')"
        >
          {{ t('menu.items.testsDone') }}
        </NuxtLink>
        <button
          v-else
          type="button"
          :class="itemClass"
          @click="handleAuthOpen"
        >
          {{ t('menu.items.testsDone') }}
        </button>

        <NuxtLink to="/artigos" :class="itemClass" @click="emit('close')">
          {{ t('menu.items.articles') }}
        </NuxtLink>
        <NuxtLink to="/planos" :class="itemClass" @click="emit('close')">
          {{ t('menu.items.plan') }}
        </NuxtLink>

        <button
          v-if="!isLoggedIn"
          type="button"
          :class="itemClass"
          @click="handleAuthOpen"
        >
          {{ t('common.actions.enterRegister') }}
        </button>
        <button
          v-else
          type="button"
          :class="itemClass"
          @click="handleLogout"
        >
          {{ t('common.actions.logout') }}
        </button>
      </nav>

      <div class="mt-4 space-y-3 border-t border-slate-200 pt-3 dark:border-slate-800">
        <LanguageToggle class="w-full justify-center" />
        <ThemeToggle
          class="w-full justify-center"
          :theme="theme"
          @toggle="emit('toggle-theme')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { useI18n, useRoute } from '#imports';
import LanguageToggle from '~/components/layout/LanguageToggle.vue';
import ThemeToggle from '~/components/layout/ThemeToggle.vue';
import { useAuthUi } from '~/composables/useAuthUi';

const props = defineProps<{
  open: boolean;
  panelId: string;
  theme: 'light' | 'dark';
}>();

const emit = defineEmits<{
  close: [];
  'open-auth': [];
  logout: [];
  'toggle-theme': [];
}>();

const panelRef = ref<HTMLDivElement | null>(null);
const route = useRoute();
const { isLoggedIn, displayName } = useAuthUi();
const { t } = useI18n();

const itemClass =
  'flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-amber-300 dark:hover:text-amber-200';

function handleAuthOpen(): void {
  emit('close');
  emit('open-auth');
}

function handleLogout(): void {
  emit('close');
  emit('logout');
}

watch(
  () => props.open,
  (open, _, onCleanup) => {
    if (!open) return;
    nextTick(() => {
      panelRef.value?.focus();
    });
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        emit('close');
      }
    };
    window.addEventListener('keydown', onKeydown);
    onCleanup(() => window.removeEventListener('keydown', onKeydown));
  },
);

watch(
  () => route.fullPath,
  () => {
    if (props.open) {
      emit('close');
    }
  },
);
</script>
