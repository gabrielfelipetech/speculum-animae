<template>
  <main class="mx-auto max-w-5xl space-y-10 px-4 py-8">
    <header ref="headerRef" class="space-y-3 reveal">
      <p
        class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400"
      >
        {{ t('shome.kicker') }}
      </p>
      <h1 class="font-display text-3xl tracking-tight md:text-4xl">
        {{ t('shome.title') }}
      </h1>
      <p class="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
        {{ t('shome.description') }}
      </p>
    </header>

    <section class="space-y-4">
      <h2 class="text-sm font-semibold text-slate-700 dark:text-slate-200">
        {{ t('shome.sections.coreTests') }}
      </h2>

      <div class="grid gap-4 md:grid-cols-2">
        <div
          v-for="(test, index) in coreTests"
          :key="test.id"
          class="reveal"
          v-reveal="index * 80"
        >
          <TestCard :test="test" variant="core" />
        </div>
      </div>
    </section>
    <section v-if="otherTests.length" class="space-y-4">
      <h2 class="text-sm font-semibold text-slate-700 dark:text-slate-200">
        {{ t('shome.sections.otherTests') }}
      </h2>

      <div class="grid gap-4 md:grid-cols-2">
        <div
          v-for="(test, index) in otherTests"
          :key="test.id"
          class="reveal"
          v-reveal="index * 80"
        >
          <TestCard :test="test" variant="other" />
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-sm font-semibold text-slate-700 dark:text-slate-200">
        {{ t('shome.sections.articlesTitle') }}
      </h2>
      <div
        class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 md:flex-row md:items-center md:justify-between"
      >
        <div class="space-y-2">
          <h3 class="font-display text-xl text-slate-900 dark:text-slate-50">
            {{ t('shome.sections.articlesCardTitle') }}
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            {{ t('shome.sections.articlesCardDescription') }}
          </p>
        </div>
        <NuxtLink
          to="/artigos"
          class="inline-flex items-center justify-center rounded-full border border-indigo-200 bg-indigo-600 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:bg-indigo-700 dark:border-amber-300/40 dark:bg-amber-300 dark:text-slate-900"
        >
          {{ t('common.actions.viewArticles') }}
        </NuxtLink>
      </div>
    </section>

    <section id="faq" class="space-y-4">
      <FaqSection
        :kicker="t('shome.faq.kicker')"
        :title="t('shome.faq.title')"
        :items="globalFaq"
        :description="t('shome.faq.description')"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useHead, useI18n, useSeoMeta } from '#imports';
import { allTests } from '~/config/tests';
import { getGlobalFaq } from '~/data/faq';
import { useReveal } from '~/composables/useReveal';
import { buildFaqSchema } from '~/utils/seo/faqSchema';
import type { TestConfig } from '~/types/tests';
import TestCard from '~/components/tests/TestCard.vue';
import FaqSection from '~/components/faq/FaqSection.vue';

const { t } = useI18n();

useSeoMeta(() => ({
  title: t('shome.title'),
  description: t('shome.description'),
}));

const allLikertTests = allTests.likert as TestConfig[];

const coreTests = computed(() =>
  allLikertTests.filter((test) => test.category === 'core'),
);

const otherTests = computed(() =>
  allLikertTests.filter((test) => test.category !== 'core'),
);

const globalFaq = getGlobalFaq();

const headerRef = ref<HTMLElement | null>(null);
const { revealNow } = useReveal();

onMounted(() => {
  if (headerRef.value) {
    revealNow(headerRef.value);
  }
});

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(buildFaqSchema(globalFaq)),
    },
  ],
}));
</script>
