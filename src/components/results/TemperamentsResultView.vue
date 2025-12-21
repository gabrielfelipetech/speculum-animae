<!-- src/components/results/TemperamentsResultsView.vue -->
<template>
  <section class="mx-auto flex max-w-6xl gap-8 px-4 py-10">
    <!-- Coluna principal -->
    <div class="flex-1 space-y-8">
      <!-- Hero -->
      <header
        id="overview"
        class="rounded-3xl bg-gradient-to-br from-emerald-200/60 to-emerald-50 p-6 dark:from-emerald-900/30 dark:to-slate-900/80"
      >
        <p
          class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400"
        >
          Retrato de temperamento
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

      <!-- Gráfico dos temperamentos (barras 0–10) -->
      <div
        class="rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
      >
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          Intensidade dos temperamentos
        </h2>
        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Cada barra mostra o quanto cada temperamento aparece em você. Os
          valores foram convertidos para uma escala de 0 a 10.
        </p>

        <div class="mt-4 space-y-3">
          <div
            v-for="score in graphPoints"
            :key="score.label"
            class="space-y-1"
          >
            <div class="flex items-center justify-between text-[0.7rem]">
              <span class="font-medium text-slate-700 dark:text-slate-200">
                {{ score.label }}
              </span>
              <span class="text-slate-500 dark:text-slate-400">
                {{ score.value.toFixed(1) }} / 10
              </span>
            </div>
            <div
              class="h-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80"
            >
              <div
                class="h-2 rounded-full bg-emerald-500 dark:bg-emerald-400"
                :style="{ width: `${(score.value / 10) * 100}%` }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Seções de texto -->
      <ResultsSection
        id="traits"
        title="1. Traços e dinâmica do temperamento"
        :blocks="report.traits.blocks"
      />

      <ResultsSection
        id="career"
        title="2. Carreira, ambição e estilo de trabalho"
        :blocks="report.career.blocks"
      />

      <ResultsSection
        id="growth"
        title="3. Crescimento, virtudes e estresse"
        :blocks="report.growth.blocks"
      />

      <ResultsSection
        id="relationships"
        title="4. Relacionamentos e afetividade"
        :blocks="report.relationships.blocks"
      />

      <!-- CTA -->
      <div
        id="relatorio-completo"
        class="mt-6 rounded-2xl border border-emerald-300/70 bg-emerald-50/80 p-5 text-sm dark:border-emerald-500/50 dark:bg-emerald-900/20"
      >
        <h2 class="font-semibold text-emerald-900 dark:text-emerald-100">
          Relatório PDF completo de temperamentos
        </h2>
        <p class="mt-1 text-slate-700 dark:text-slate-200">
          No PDF você terá a leitura aprofundada do seu temperamento principal
          e secundário, riscos típicos, virtudes-chave, sugestões para trabalho,
          família e vida afetiva.
        </p>
        <button
          type="button"
          class="mt-4 inline-flex items-center rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-50 shadow-sm ring-1 ring-emerald-300/70 transition hover:bg-emerald-600 hover:ring-emerald-400"
          @click="downloadPdf"
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
          label="Visão geral"
          number="1"
        />
        <ResultsSidebarLink
          href="#traits"
          label="Traços e comportamento"
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
import { computed } from 'vue';
import type { TemperamentReport, GraphPoint } from '~/types/results';
import ResultsSection from '~/components/results/ResultsSection.vue';
import ResultsSidebarLink from '~/components/results/ResultsSidebarLink.vue';

const props = defineProps<{
  report: TemperamentReport;
  sessionId: string;
}>();

const report = props.report;

function downloadPdf() {
  if (process.client) {
    window.location.href = `/api/results/${props.sessionId}/pdf`;
  }
}

function toZeroTenScale(value: number): number {
  // a média sempre está entre 1 e 7
  const clamped = Math.max(1, Math.min(value, 7));

  // mapeia [1, 7] -> [0, 1]
  const normalized = (clamped - 1) / (7 - 1);

  // agora [0, 1] -> [0, 10]
  const converted = normalized * 10;

  return Number(converted.toFixed(1));
}

// barras para temperamento principal + secundário (quando existir)
const graphPoints = computed<GraphPoint[]>(() => {
  const all: { label: string; value: number }[] = [];

  all.push({
    label: report.temperament.primary.name,
    value: report.temperament.primary.average,
  });

  if (report.temperament.secondary) {
    all.push({
      label: report.temperament.secondary.name,
      value: report.temperament.secondary.average,
    });
  }

  return all.map((item) => ({
    label: item.label,
    value: toZeroTenScale(item.value),
  }));
});
</script>
