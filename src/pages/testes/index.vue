<!-- src/pages/testes/index.vue -->
<template>
  <section class="mx-auto max-w-5xl space-y-6 px-4 py-8">
    <header class="space-y-2">
      <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
        Speculum Animae
      </p>
      <h1 class="font-display text-3xl tracking-tight">Testes</h1>
      <p class="text-sm text-slate-600 dark:text-slate-300">
        Escolha um teste para iniciar sua jornada de autoconhecimento.
      </p>
    </header>

    <section class="space-y-4">
      <h2 class="text-sm font-semibold text-slate-700 dark:text-slate-200">
        Testes principais
      </h2>
      <div class="grid gap-4 md:grid-cols-2">
        <TestCard v-for="test in coreTests" :key="test.id" :test="test" variant="core" />
      </div>
    </section>

    <section v-if="otherTests.length" class="space-y-4">
      <h2 class="text-sm font-semibold text-slate-700 dark:text-slate-200">
        Outros testes
      </h2>
      <div class="grid gap-4 md:grid-cols-2">
        <TestCard v-for="test in otherTests" :key="test.id" :test="test" variant="other" />
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSeoMeta } from '#imports'
import { allTests } from '~/config/tests'
import type { TestConfig } from '~/types/tests'
import TestCard from '~/components/tests/TestCard.vue'

useSeoMeta({
  title: 'Testes',
  description: 'Lista de testes públicos do Speculum Animae para começar agora.',
})

const allLikertTests = allTests.likert as TestConfig[]

function sortByTitle(a: TestConfig, b: TestConfig): number {
  return a.title.localeCompare(b.title, 'pt-BR')
}

const coreTests = computed(() =>
  allLikertTests.filter((test) => test.category === 'core').slice().sort(sortByTitle),
)

const otherTests = computed(() =>
  allLikertTests.filter((test) => test.category !== 'core').slice().sort(sortByTitle),
)
</script>
