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
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSeoMeta } from '#imports';
import { allTests } from '~/config/tests';
import type { LikertTestConfig } from '~/types/tests';
import TestCard from '~/components/tests/TestCard.vue';

useSeoMeta({
  title: 'Testes de personalidade',
  description:
    'Teste suas camadas de personalidade e temperamentos clássicos em uma experiência guiada.',
});

const allLikertTests = allTests.likert as LikertTestConfig[];

const coreTests = computed(() =>
  allLikertTests.filter((test) => test.category === 'core'),
);

const otherTests = computed(() =>
  allLikertTests.filter((test) => test.category !== 'core'),
);
</script>
