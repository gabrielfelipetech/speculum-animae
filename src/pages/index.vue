<template>
  <main class="mx-auto max-w-5xl space-y-10 px-4 py-8">
    <header class="space-y-3">
      <p
        class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400"
      >
        Speculum Animae
      </p>
      <h1 class="font-display text-3xl tracking-tight md:text-4xl">
        Testes de personalidade, temperamento e virtudes em um só lugar.
      </h1>
      <p class="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
        Comece pelo teste das 12 camadas da personalidade ou explore outros
        instrumentos, como o teste de temperamentos clássicos. Mais testes
        serão adicionados conforme o projeto evoluir.
      </p>
    </header>

    <section class="space-y-4">
      <h2 class="text-sm font-semibold text-slate-700 dark:text-slate-200">
        Testes principais
      </h2>

      <div class="grid gap-4 md:grid-cols-2">
        <TestCard
          v-for="test in coreTests"
          :key="test.id"
          :test="test"
          variant="core"
        />
      </div>
    </section>
    <section v-if="otherTests.length" class="space-y-4">
      <h2 class="text-sm font-semibold text-slate-700 dark:text-slate-200">
        Outros testes
      </h2>

      <div class="grid gap-4 md:grid-cols-2">
        <TestCard
          v-for="test in otherTests"
          :key="test.id"
          :test="test"
          variant="other"
        />
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-sm font-semibold text-slate-700 dark:text-slate-200">
        Artigos
      </h2>
      <div
        class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 md:flex-row md:items-center md:justify-between"
      >
        <div class="space-y-2">
          <h3 class="font-display text-xl text-slate-900 dark:text-slate-50">
            Leituras para aprofundar sua jornada
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            Explore artigos sobre personalidade, temperamentos, virtudes e relacionamentos.
          </p>
        </div>
        <NuxtLink
          to="/artigos"
          class="inline-flex items-center justify-center rounded-full border border-indigo-200 bg-indigo-600 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm transition hover:bg-indigo-700 dark:border-amber-300/40 dark:bg-amber-300 dark:text-slate-900"
        >
          Ver artigos
        </NuxtLink>
      </div>
    </section>

    <section id="faq" class="space-y-4">
      <FaqSection
        kicker="FAQ"
        title="Perguntas frequentes"
        :items="globalFaq"
        description="Respostas rapidas para duvidas comuns sobre a plataforma."
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useHead, useSeoMeta } from '#imports';
import { allTests } from '~/config/tests';
import { getGlobalFaq } from '~/data/faq';
import { buildFaqSchema } from '~/utils/seo/faqSchema';
import type { TestConfig } from '~/types/tests';
import TestCard from '~/components/tests/TestCard.vue';
import FaqSection from '~/components/faq/FaqSection.vue';

useSeoMeta({
  title: 'Testes de personalidade',
  description:
    'Teste suas camadas de personalidade e temperamentos clássicos em uma experiência guiada.',
});

const allLikertTests = allTests.likert as TestConfig[];

const coreTests = computed(() =>
  allLikertTests.filter((test) => test.category === 'core'),
);

const otherTests = computed(() =>
  allLikertTests.filter((test) => test.category !== 'core'),
);

const globalFaq = getGlobalFaq();

useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(buildFaqSchema(globalFaq)),
    },
  ],
}));
</script>
