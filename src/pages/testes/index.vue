<!-- src/pages/testes/index.vue -->
<template>
  <section class="mx-auto max-w-4xl space-y-6 px-4 py-8">
    <header class="space-y-2">
      <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
        Speculum Animae
      </p>
      <h1 class="font-display text-3xl tracking-tight">Testes</h1>
      <p class="text-sm text-slate-600 dark:text-slate-300">
        Escolha um teste para iniciar sua jornada de autoconhecimento.
      </p>
    </header>

    <div class="grid gap-4 md:grid-cols-2">
      <TestCard
        v-for="test in tests"
        :key="test.id"
        :test="test"
        :variant="test.category === 'core' ? 'core' : 'other'"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSeoMeta } from '#imports'
import { allTests } from '~/config/tests'
import type { LikertTestConfig } from '~/types/tests'
import TestCard from '~/components/tests/TestCard.vue'

useSeoMeta({
  title: 'Testes',
  description: 'Lista de testes públicos do Speculum Animae para começar agora.',
})

const allLikertTests = allTests.likert as LikertTestConfig[]

const tests = computed(() => {
  return [...allLikertTests]
    .slice()
    .sort((a, b) => {
      const aCore = a.category === 'core' ? 0 : 1
      const bCore = b.category === 'core' ? 0 : 1
      if (aCore !== bCore) return aCore - bCore
      return a.title.localeCompare(b.title, 'pt-BR')
    })
})
</script>
