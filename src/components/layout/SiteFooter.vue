<!-- src/components/layout/SiteFooter.vue -->
<template>
  <footer
    class="mt-10 border-t border-slate-200 bg-white/80 text-slate-800 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/90 dark:text-slate-100"
  >
    <div
      class="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 md:flex-row md:items-start md:justify-between"
    >
      <!-- Branding + mensagem biblica -->
      <section class="space-y-3 md:max-w-xl">
        <div class="space-y-1">
          <p class="text-sm font-semibold tracking-[0.16em] text-slate-500 dark:text-slate-400">
            {{ t('common.brand').toUpperCase() }}
          </p>
        </div>

        <figure
          class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm italic text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          <blockquote class="leading-relaxed">
            Conhece a ti mesmo, e a tuas falhas, e assim viverás.
          </blockquote>
          <figcaption class="mt-1 text-xs not-italic text-slate-500 dark:text-slate-400">
            (Santo Agostinho)
          </figcaption>
        </figure>
      </section>

      <section class="space-y-2">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          {{ t('footer.legalContact') }}
        </p>
        <div class="flex flex-wrap items-center gap-3">
          <NuxtLink
            to="/termos"
            class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-amber-300 transition"
          >
            {{ t('footer.terms') }}
          </NuxtLink>
          <NuxtLink
            to="/privacidade"
            class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-amber-300 transition"
          >
            {{ t('footer.privacy') }}
          </NuxtLink>
          <a
            :href="`mailto:${contactEmail}`"
            class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-amber-300 transition"
          >
            {{ t('footer.contact') }}
          </a>
        </div>
      </section>
    </div>

    <div
      class="border-t border-slate-200 px-4 py-4 text-center text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-500"
    >
      <p>
        &copy; {{ t('footer.copyright', { year: currentYear }) }}
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'

const { t } = useI18n()
const currentYear: number = new Date().getFullYear()
const contactEmail = 'contato@speculumanimae.com.br'
</script>
