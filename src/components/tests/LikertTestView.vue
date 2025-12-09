<!-- src/components/tests/LikertTestView.vue -->
<template>
  <section class="space-y-6">
    <!-- Cabeçalho do teste -->
    <LikertTestHeader :config="config" />

    <!-- Info de progresso geral -->
    <LikertTestProgress
      :answered-count="answeredCount"
      :total-questions="totalQuestions"
      :total-groups="totalGroups"
      :current-group-number="currentGroupNumber"
      :overall-progress-percent="overallProgressPercent"
    />

    <!-- Formulário (etapa atual) -->
    <form class="space-y-6" @submit.prevent="handleNextClick">
      <div
        v-if="currentGroup"
        data-test-step-container
        class="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80"
      >
        <!-- Cabeçalho da etapa (neutro) -->
        <div class="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 class="text-sm font-semibold leading-tight">
              Afirmações
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              Responda com sinceridade; não há respostas certas ou erradas.
            </p>
          </div>

          <span class="text-[0.65rem] text-slate-500 dark:text-slate-400">
            {{ currentGroupAnsweredCount }} / {{ currentGroupTotalQuestions }} afirmações desta etapa
          </span>
        </div>

        <!-- Lista de perguntas da etapa -->
        <div class="space-y-4">
          <div
            v-for="(question, questionIndex) in currentGroup.questions"
            :key="question.groupId + ':' + question.questionId"
            class="space-y-3 rounded-xl bg-slate-50/70 p-4 dark:bg-slate-800/80"
            :ref="(el) => setQuestionRef(el, questionIndex)"
            tabindex="0"
            @keydown="
              (event) =>
                handleQuestionKeydown(
                  event,
                  questionIndex,
                  question.groupId,
                  question.questionId,
                )
            "
          >
            <p class="text-sm font-medium text-slate-800 dark:text-slate-100">
              {{ question.text }}
            </p>

            <!-- mini-indicador local -->
            <div class="text-[0.7rem] text-slate-500 dark:text-slate-400">
              Afirmação {{ questionIndex + 1 }} de {{ currentGroupTotalQuestions }}
            </div>

            <LikertScaleQuestion
              :model-value="
                answers[fieldKey(question.groupId, question.questionId)] ?? null
              "
              :name="fieldKey(question.groupId, question.questionId)"
              :min-label="config.scaleMinLabel"
              :max-label="config.scaleMaxLabel"
              @update:modelValue="(value) => {
                answers[fieldKey(question.groupId, question.questionId)] = value;
              }"
              @answered="handleQuestionAnswered(questionIndex)"
            />

            <p
              v-if="
                submittedCurrentStep &&
                !answers[fieldKey(question.groupId, question.questionId)]
              "
              class="text-[0.7rem] text-red-500"
            >
              Responda esta afirmação.
            </p>
          </div>
        </div>
      </div>

      <!-- Navegação entre etapas -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <BaseButton
          type="button"
          class="!bg-slate-200 !text-slate-800 hover:!bg-slate-300 dark:!bg-slate-800 dark:!text-slate-50 dark:hover:!bg-slate-700"
          :disabled="isFirstGroup"
          @click="goPrevious"
        >
          Voltar
        </BaseButton>

        <BaseButton type="submit" :disabled="!canGoNext">
          <span v-if="!isLastGroup">Continuar</span>
          <span v-else>Ver resultado</span>
        </BaseButton>
      </div>
    </form>

    <!-- RESULTADOS: CAMADAS / VIRTUDES / ETC (não temperamentos) -->
    <LikertTestResultsGeneric
      v-if="results && results.length && config.category !== 'temperaments'"
      :results="results"
      :top-summaries="topSummaries"
    />

    <!-- RESULTADOS: TEMPERAMENTOS -->
    <LikertTestResultsTemperaments
      v-if="results && results.length && config.category === 'temperaments'"
      :results="results"
    />

    <!-- Bloco de monetização / relatório premium -->
    <LikertTestPremiumTeaser v-if="config.hasPremiumReport" />
  </section>
</template>

<script setup lang="ts">
import {
  ref,
  toRefs,
  watch,
  type ComponentPublicInstance,
} from 'vue';
import { useRoute, useRouter } from '#app';

import BaseButton from '~/components/base/BaseButton.vue';
import LikertScaleQuestion from '~/components/tests/LikertScaleQuestion.vue';
import LikertTestHeader from '~/components/tests/LikertTestHeader.vue';
import LikertTestProgress from '~/components/tests/LikertTestProgress.vue';
import LikertTestResultsGeneric from '~/components/tests/LikertTestResultsGeneric.vue';
import LikertTestResultsTemperaments from '~/components/tests/LikertTestResultsTemperaments.vue';
import LikertTestPremiumTeaser from '~/components/tests/LikertTestPremiumTeaser.vue';

import type { LikertTestConfig } from '~/types/tests';
import { useLikertTestRunner } from '~/composables/useLikertTestRunner';

const props = defineProps<{
  config: LikertTestConfig;
}>();

const { config } = toRefs(props);

const route = useRoute();
const router = useRouter();

// engine reutilizável
const {
  answers,
  currentGroupIndex,
  submittedCurrentStep,
  results,
  lastResultId,

  totalGroups,
  currentGroup,
  currentGroupNumber,
  isFirstGroup,
  isLastGroup,
  totalQuestions,
  answeredCount,
  currentGroupTotalQuestions,
  currentGroupAnsweredCount,
  canGoNext,
  overallProgressPercent,
  topSummaries,

  fieldKey,
  goPrevious,
  goNext,
} = useLikertTestRunner(config);

// ------- RESET QUANDO vier com ?fresh=1 --------
function resetTestRun() {
  // limpa respostas
  Object.keys(answers).forEach((k) => {
    // @ts-expect-error - answers é objeto reativo
    delete answers[k];
  });

  currentGroupIndex.value = 0;
  submittedCurrentStep.value = false;
  results.value = [];
  lastResultId.value = null;
  topSummaries.value = [];
}

if (process.client && route.query.fresh === '1') {
  resetTestRun();

  // remove o query da URL pra não ficar resetando em navegações internas
  router.replace({
    path: route.path,
    query: Object.fromEntries(
      Object.entries(route.query).filter(([key]) => key !== 'fresh'),
    ),
  });
}
// ------------------------------------------------

// refs de perguntas (para scroll + foco)
const questionRefs = ref<HTMLElement[]>([]);

function setQuestionRef(
  el: Element | ComponentPublicInstance | null,
  index: number,
): void {
  if (el instanceof HTMLElement) {
    questionRefs.value[index] = el;
  }
}

// quando muda de etapa, reseta refs e faz scroll suave
watch(currentGroupIndex, () => {
  questionRefs.value = [];
  submittedCurrentStep.value = false;

  if (!process.client) return;

  requestAnimationFrame(() => {
    const container = document.querySelector(
      '[data-test-step-container]',
    );
    if (container instanceof HTMLElement) {
      container.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// quando o resultado é salvo, redireciona para /resultados/:id
watch(lastResultId, (id) => {
  if (!id) return;
  router.push(`/resultados/${id}`);
});

function handleNextClick(): void {
  goNext();
}

// scroll suave para próxima pergunta ao responder
function handleQuestionAnswered(questionIndex: number): void {
  if (!process.client) return;

  const nextIndex = questionIndex + 1;
  const nextEl = questionRefs.value[nextIndex];

  if (nextEl?.scrollIntoView) {
    nextEl.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
}

// navegação por teclado dentro da pergunta
function handleQuestionKeydown(
  event: KeyboardEvent,
  questionIndex: number,
  groupId: string,
  questionId: string,
): void {
  const key = event.key;
  const field = fieldKey(groupId, questionId);
  const current = answers[field];

  // esquerda/direita = mudar opção
  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault();

    let next: number;
    if (typeof current !== 'number') {
      next = 4; // neutro
    } else {
      next = key === 'ArrowLeft' ? current - 1 : current + 1;
      next = Math.min(7, Math.max(1, next));
    }

    if (answers[field] !== next) {
      const wasEmpty = answers[field] == null;
      answers[field] = next;
      if (wasEmpty) {
        handleQuestionAnswered(questionIndex);
      }
    }

    return;
  }

  // cima/baixo = navegar entre perguntas desta etapa
  if (key === 'ArrowUp' || key === 'ArrowDown') {
    event.preventDefault();
    const group = currentGroup.value;
    if (!group) return;

    const direction = key === 'ArrowUp' ? -1 : 1;
    const targetIndex = questionIndex + direction;

    if (targetIndex < 0 || targetIndex >= group.questions.length) {
      return;
    }

    const targetEl = questionRefs.value[targetIndex];
    if (targetEl) {
      targetEl.focus();
      targetEl.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }
}
</script>
