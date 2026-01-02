<template>
  <section class="space-y-6">
    <LikertTestHeader :config="config" />

    <LikertTestProgress
      :answered-count="answeredCount"
      :total-questions="totalQuestions"
      :total-groups="totalGroups"
      :current-group-number="currentGroupNumber"
      :overall-progress-percent="overallProgressPercent"
    />

    <form class="space-y-6" @submit.prevent="handleNextClick">
      <div
        v-if="currentGroup"
        data-test-step-container
        class="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-800 dark:bg-slate-900/80"
      >
        <div class="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 class="text-sm font-semibold leading-tight">Afirmações</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">
              Responda com sinceridade; não há respostas certas ou erradas.
            </p>
          </div>

          <span class="text-[0.65rem] text-slate-500 dark:text-slate-400">
            {{ currentGroupAnsweredCount }} / {{ currentGroupTotalQuestions }} afirmações desta etapa
          </span>
        </div>

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

            <div class="text-[0.7rem] text-slate-500 dark:text-slate-400">
              Afirmação {{ questionIndex + 1 }} de {{ currentGroupTotalQuestions }}
            </div>

            <LikertScaleQuestion
              :model-value="answers[fieldKey(question.groupId, question.questionId)] ?? null"
              :name="fieldKey(question.groupId, question.questionId)"
              :min-label="config.scaleMinLabel"
              :max-label="config.scaleMaxLabel"
              @update:modelValue="(value) => {
                answers[fieldKey(question.groupId, question.questionId)] = value
              }"
              @answered="handleQuestionAnswered(questionIndex)"
            />

            <p
              v-if="submittedCurrentStep && !answers[fieldKey(question.groupId, question.questionId)]"
              class="text-[0.7rem] text-red-500"
            >
              Responda esta afirmação.
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3">
        <BaseButton
          type="button"
          class="!bg-slate-200 !text-slate-800 hover:!bg-slate-300 dark:!bg-slate-800 dark:!text-slate-50 dark:hover:!bg-slate-700"
          :disabled="isFirstGroup"
          @click="goPrevious"
        >
          Voltar
        </BaseButton>

        <BaseButton type="submit" :disabled="!canGoNext || isSaving" :variant="isLastGroup ? 'gradient' : 'gradient'">
          <span v-if="!isLastGroup">Continuar</span>
          <span v-else>Ver resultado</span>
        </BaseButton>
      </div>
    </form>

    <div v-if="isSaving" class="space-y-3">
      <SkeletonBlock class="h-6 w-1/3" />
      <SkeletonBlock class="h-24 w-full rounded-2xl" />
      <SkeletonBlock class="h-24 w-full rounded-2xl" />
    </div>

    <LikertTestResultsGeneric
      v-if="results && results.length && config.category !== 'temperaments'"
      :results="results"
      :top-summaries="topSummaries"
    />

    <LikertTestResultsTemperaments
      v-if="results && results.length && config.category === 'temperaments'"
      :results="results"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, type ComponentPublicInstance } from 'vue'
import { useRouter } from '#app'

import BaseButton from '~/components/base/BaseButton.vue'
import SkeletonBlock from '~/components/base/SkeletonBlock.vue'
import LikertScaleQuestion from '~/components/tests/LikertScaleQuestion.vue'
import LikertTestHeader from '~/components/tests/LikertTestHeader.vue'
import LikertTestProgress from '~/components/tests/LikertTestProgress.vue'
import LikertTestResultsGeneric from '~/components/tests/LikertTestResultsGeneric.vue'
import LikertTestResultsTemperaments from '~/components/tests/LikertTestResultsTemperaments.vue'

import type { LikertTestConfig } from '~/types/tests'
import { useLikertTestRunner } from '~/composables/useLikertTestRunner'

const props = defineProps<{
  config: LikertTestConfig
  fresh?: boolean
}>()

const { config } = toRefs(props)
const router = useRouter()

const {
  answers,
  currentGroupIndex,
  submittedCurrentStep,
  results,
  lastResultId,
  isSaving,
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
} = useLikertTestRunner(config, { fresh: props.fresh === true })

const questionRefs = ref<HTMLElement[]>([])
const shouldRedirectOnComplete = ref(false)

function setQuestionRef(el: Element | ComponentPublicInstance | null, index: number): void {
  if (el instanceof HTMLElement) {
    questionRefs.value[index] = el
  }
}

watch(currentGroupIndex, () => {
  questionRefs.value = []
  submittedCurrentStep.value = false

  if (!process.client) return

  requestAnimationFrame(() => {
    const container = document.querySelector('[data-test-step-container]')
    if (container instanceof HTMLElement) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})

watch(lastResultId, (id) => {
  if (!id || !shouldRedirectOnComplete.value) return
  shouldRedirectOnComplete.value = false
  router.push(`/resultados/${id}`)
})

function handleNextClick(): void {
  if (isLastGroup.value) {
    shouldRedirectOnComplete.value = true
  }
  goNext()
}

function handleQuestionAnswered(questionIndex: number): void {
  if (!process.client) return

  const nextIndex = questionIndex + 1
  const nextEl = questionRefs.value[nextIndex]

  if (nextEl?.scrollIntoView) {
    nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

function handleQuestionKeydown(
  event: KeyboardEvent,
  questionIndex: number,
  groupId: string,
  questionId: string,
): void {
  const key = event.key
  const field = fieldKey(groupId, questionId)
  const current = answers[field]

  if (key === 'ArrowLeft' || key === 'ArrowRight') {
    event.preventDefault()

    let next: number
    if (typeof current !== 'number') {
      next = 4
    } else {
      next = key === 'ArrowLeft' ? current - 1 : current + 1
      next = Math.min(7, Math.max(1, next))
    }

    if (answers[field] !== next) {
      const wasEmpty = answers[field] == null
      answers[field] = next
      if (wasEmpty) handleQuestionAnswered(questionIndex)
    }
    return
  }

  if (key === 'ArrowUp' || key === 'ArrowDown') {
    event.preventDefault()
    const group = currentGroup.value
    if (!group) return

    const direction = key === 'ArrowUp' ? -1 : 1
    const targetIndex = questionIndex + direction

    if (targetIndex < 0 || targetIndex >= group.questions.length) return

    const targetEl = questionRefs.value[targetIndex]
    if (targetEl) {
      targetEl.focus()
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}
</script>
