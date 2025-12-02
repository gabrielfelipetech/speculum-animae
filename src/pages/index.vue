<template>
  <main class="mx-auto max-w-5xl px-4 py-8 space-y-10">
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

      <div
        class="grid gap-4 md:grid-cols-2"
      >
        <NuxtLink
          v-for="test in coreTests"
          :key="test.id"
          :to="`/testes/${test.slug}`"
          class="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500/70 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
        >
          <div class="space-y-1.5">
            <p
              class="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-600 group-hover:text-brand-700 dark:text-amber-300 dark:group-hover:text-amber-200"
            >
              {{ test.category === 'core' ? 'Núcleo' : test.category }}
            </p>
            <h3 class="font-display text-base leading-snug">
              {{ test.title }}
            </h3>
            <p class="text-[0.8rem] text-slate-600 dark:text-slate-300">
              {{ test.subtitle }}
            </p>
          </div>

          <div class="mt-3 flex items-center justify-between text-[0.75rem]">
            <div class="flex flex-wrap gap-1">
              <span
                v-for="tag in test.tags"
                :key="tag"
                class="rounded-full bg-slate-100 px-2 py-0.5 text-[0.65rem] text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-700 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-slate-700"
              >
                {{ tag }}
              </span>
            </div>
            <span
              class="flex items-center gap-1 text-[0.7rem] font-medium text-brand-600 group-hover:text-brand-700 dark:text-amber-300 dark:group-hover:text-amber-200"
            >
              Iniciar teste
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section v-if="otherTests.length" class="space-y-4">
      <h2 class="text-sm font-semibold text-slate-700 dark:text-slate-200">
        Outros testes
      </h2>

      <div
        class="grid gap-4 md:grid-cols-2"
      >
        <NuxtLink
          v-for="test in otherTests"
          :key="test.id"
          :to="`/testes/${test.slug}`"
          class="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-500/70 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
        >
          <div class="space-y-1.5">
            <p
              class="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
            >
              {{ test.category }}
            </p>
            <h3 class="font-display text-base leading-snug">
              {{ test.title }}
            </h3>
            <p class="text-[0.8rem] text-slate-600 dark:text-slate-300">
              {{ test.subtitle }}
            </p>
          </div>

          <div class="mt-3 flex items-center justify-between text-[0.75rem]">
            <div class="flex flex-wrap gap-1">
              <span
                v-for="tag in test.tags"
                :key="tag"
                class="rounded-full bg-slate-100 px-2 py-0.5 text-[0.65rem] text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-700 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-slate-700"
              >
                {{ tag }}
              </span>
            </div>
            <span
              class="flex items-center gap-1 text-[0.7rem] font-medium text-brand-600 group-hover:text-brand-700 dark:text-amber-300 dark:group-hover:text-amber-200"
            >
              Iniciar teste
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { allTests } from '~/config/tests';
import type { LikertTestConfig } from '~/types/tests';

const allLikertTests = allTests.likert as LikertTestConfig[];

const coreTests = computed(() =>
  allLikertTests.filter((test) => test.category === 'core'),
);

const otherTests = computed(() =>
  allLikertTests.filter((test) => test.category !== 'core'),
);
</script>
