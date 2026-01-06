<template>
  <section class="mx-auto flex max-w-6xl gap-8 px-4 py-10">
    <div class="flex-1 space-y-8">
      <header :id="ids.overview" :class="['rounded-3xl p-6', theme.heroClass]">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {{ theme.kicker }}
            </p>
            <h1 class="mt-2 font-display text-3xl tracking-tight md:text-4xl">
              {{ report.title }}
            </h1>
            <p class="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              {{ report.subtitle }}
            </p>
          </div>
        </div>
      </header>

      <section
        v-if="report.disclaimer"
        class="rounded-2xl border border-amber-200/70 bg-amber-50/80 p-4 text-xs text-amber-900 dark:border-amber-500/40 dark:bg-amber-900/20 dark:text-amber-100"
      >
        {{ report.disclaimer }}
      </section>

      <section
        :id="ids.summary"
        class="rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
      >
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          Resumo do perfil
        </h2>
        <ul class="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-300">
          <li v-for="(item, index) in report.summary" :key="index" class="flex gap-2">
            <span class="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-300" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </section>

      <section
        v-if="report.scores.length"
        :id="ids.scores"
        class="rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
      >
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          Pontuacao por dimensao
        </h2>
        <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Valores na escala de 1 a 7 para cada dimensao avaliada.
        </p>

        <div class="mt-4 space-y-3">
          <div v-for="point in report.scores" :key="point.key" class="space-y-1">
            <div class="flex items-center justify-between text-[0.7rem]">
              <span class="font-medium text-slate-700 dark:text-slate-200">
                {{ point.label }}
              </span>
              <span class="text-slate-500 dark:text-slate-400">
                {{ point.raw.toFixed(2) }} / 7
              </span>
            </div>
            <div class="h-2 rounded-full bg-slate-200/80 dark:bg-slate-800/80">
              <div
                class="h-2 rounded-full"
                :class="theme.barClass"
                :style="{ width: `${point.normalized}%` }"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        :id="ids.recommendations"
        class="rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
      >
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          Recomendacoes praticas
        </h2>
        <ul class="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-300">
          <li v-for="(item, index) in report.recommendations" :key="index" class="flex gap-2">
            <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 dark:bg-emerald-300" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </section>

      <ResultsSection
        v-for="section in report.sections ?? []"
        :id="section.id"
        :key="section.id"
        :title="section.title"
        :subtitle="section.subtitle"
        :blocks="section.blocks"
      />

      <section
        v-if="testSlug"
        class="rounded-2xl border border-slate-200/80 bg-white/90 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
      >
        <h2 class="text-base font-semibold text-slate-900 dark:text-slate-50">
          Proximo passo
        </h2>
        <p class="mt-1 text-xs text-slate-500 dark:text-slate-300">
          Refaca o teste para gerar um novo resultado atualizado.
        </p>
        <BaseButton
          type="button"
          class="mt-3 rounded-full text-xs font-semibold uppercase tracking-[0.18em]"
          @click="handleRetake"
        >
          Refazer teste
        </BaseButton>
      </section>
    </div>

    <aside
      class="sticky top-4 hidden w-64 self-start rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 md:block"
    >
      <p class="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        Nesta pagina
      </p>
      <nav class="mt-3 space-y-1 text-sm">
        <ResultsSidebarLink :href="`#${ids.overview}`" label="Visao geral" number="1" />
        <ResultsSidebarLink :href="`#${ids.summary}`" label="Resumo" number="2" />
        <ResultsSidebarLink :href="`#${ids.scores}`" label="Pontuacoes" number="3" />
        <ResultsSidebarLink
          :href="`#${ids.recommendations}`"
          label="Recomendacoes"
          number="4"
        />
        <ResultsSidebarLink
          v-for="(section, index) in sidebarSections"
          :key="section.id"
          :href="`#${section.id}`"
          :label="section.title"
          :number="String(index + 5)"
        />
      </nav>
    </aside>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from '#app';
import type { AssessmentReport } from '~/types/results';
import ResultsSection from '~/components/results/ResultsSection.vue';
import ResultsSidebarLink from '~/components/results/ResultsSidebarLink.vue';
import BaseButton from '~/components/base/BaseButton.vue';
import { clearLastResultId } from '~/utils/testLastResult';

type ThemeConfig = {
  kicker: string;
  heroClass: string;
  barClass: string;
};

const props = defineProps<{
  report: AssessmentReport;
  testSlug?: string | null;
  theme: ThemeConfig;
}>();

const router = useRouter();
const report = props.report;
const theme = props.theme;
const testSlug = computed(() => props.testSlug ?? null);

const ids = {
  overview: 'overview',
  summary: 'summary',
  scores: 'scores',
  recommendations: 'recommendations',
};

const sidebarSections = computed(() => report.sections ?? []);

function handleRetake(): void {
  if (!testSlug.value) return;
  clearLastResultId(testSlug.value);
  router.push({ path: `/testes/${testSlug.value}`, query: { fresh: '1' } });
}
</script>
