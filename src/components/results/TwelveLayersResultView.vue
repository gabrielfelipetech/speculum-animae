<!-- src/components/results/TwelveLayersResultsView.vue -->
<template>
  <section class="mx-auto flex max-w-6xl gap-8 px-4 py-10">
    <!-- Coluna principal -->
    <div class="flex-1 space-y-8">
      <!-- Hero -->
      <header
        id="overview"
        class="rounded-3xl bg-gradient-to-br from-amber-200/60 to-amber-50 p-6 dark:from-amber-900/30 dark:to-slate-900/80"
      >
        <p
          class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
        >
          Seu retrato nas 12 camadas
        </p>
        <h1 class="mt-2 font-display text-3xl tracking-tight md:text-4xl">
          {{ report.overall.title }}
        </h1>
        <p
          class="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300"
        >
          {{ report.overall.subtitle }}
        </p>
      </header>

      <!-- Mapa das 12 camadas (barrinhas) -->
      <div
        v-if="report.traits.graph?.length"
        class="rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
      >
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          Mapa das 12 camadas
        </h2>
        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Cada barra representa a intensidade média de uma camada na sua
          personalidade (escala de 1 a 7).
        </p>

        <div class="mt-4 space-y-3">
          <div
            v-for="point in report.traits.graph"
            :key="point.label"
            class="space-y-1"
          >
            <div class="flex items-center justify-between text-[0.7rem]">
              <span class="font-medium text-slate-700 dark:text-slate-200">
                {{ point.label }}
              </span>
              <span class="text-slate-500 dark:text-slate-400">
                {{ point.value.toFixed(2) }} / 7
              </span>
            </div>
            <div
              class="h-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80"
            >
              <div
                class="h-2 rounded-full bg-amber-500 dark:bg-amber-400"
                :style="{ width: `${(point.value / 7) * 100}%` }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Seções de texto -->
      <ResultsSection
        id="traits"
        title="1. Traços de personalidade"
        :blocks="report.traits.blocks"
      />

      <ResultsSection
        id="career"
        title="2. Carreira"
        :blocks="report.career.blocks"
      />

      <ResultsSection
        id="growth"
        title="3. Crescimento pessoal"
        :blocks="report.growth.blocks"
      />

      <ResultsSection
        id="relationships"
        title="4. Relacionamentos"
        :blocks="report.relationships.blocks"
      />

      <!-- CTA Premium -->
      <div
        id="relatorio-completo"
        class="mt-6 rounded-2xl border border-amber-300/70 bg-amber-50/80 p-5 text-sm dark:border-amber-500/50 dark:bg-amber-900/20"
      >
        <h2 class="font-semibold text-amber-900 dark:text-amber-100">
          Desbloqueie o relatório PDF completo
        </h2>
        <p class="mt-1 text-slate-700 dark:text-slate-200">
          Veja todas as interpretações detalhadas, exemplos práticos,
          combinações entre camadas e um plano de crescimento passo a passo
          baseado no seu resultado.
        </p>
        <button
          type="button"
          class="mt-4 inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-50 shadow-sm ring-1 ring-amber-300/70 transition hover:bg-amber-600 hover:ring-amber-400"
        >
          Baixar relatório completo (PDF)
        </button>
      </div>
    </div>

    <!-- Sidebar -->
    <aside
      class="sticky top-4 hidden w-64 self-start rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 md:block"
    >
      <p
        class="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
      >
        Nesta página
      </p>
      <nav class="mt-3 space-y-1 text-sm">
        <ResultsSidebarLink
          href="#overview"
          label="Resumo geral"
          number="1"
        />
        <ResultsSidebarLink
          href="#traits"
          label="Traços de personalidade"
          number="2"
        />
        <ResultsSidebarLink
          href="#career"
          label="Carreira"
          number="3"
        />
        <ResultsSidebarLink
          href="#growth"
          label="Crescimento pessoal"
          number="4"
        />
        <ResultsSidebarLink
          href="#relationships"
          label="Relacionamentos"
          number="5"
        />
        <ResultsSidebarLink
          href="#relatorio-completo"
          label="Relatório completo (PDF)"
          icon="lock"
        />
      </nav>
    </aside>
  </section>
</template>

<script setup lang="ts">
import type { TwelveLayersReport } from '~/types/results';
import ResultsSection from '~/components/results/ResultsSection.vue';
import ResultsSidebarLink from '~/components/results/ResultsSidebarLink.vue';

const props = defineProps<{
  report: TwelveLayersReport;
}>();

const report = props.report;
</script>
