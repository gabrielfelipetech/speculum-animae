import {
  computed,
  isRef,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
  type Ref,
} from 'vue';
import type {
  PairwiseQuestion,
  SummaryRule,
  TestAnswer,
  TestAnswerMap,
  TestConfig,
  TestQuestion,
} from '~/types/tests';
import { useSaveResult } from '~/composables/useSaveResult';
import { scoreTest } from '~/shared/engine/scoring';

export interface GroupResult {
  groupId: string;
  name: string;
  average: number;
}

interface FlatQuestion {
  groupId: string;
  groupName: string;
  questionId: string;
  text: string;
  question: TestQuestion;
}

interface StepGroup {
  id: string;
  questions: FlatQuestion[];
}

function fieldKeyInternal(groupId: string, questionId: string): string {
  return `${groupId}:${questionId}`;
}

function chooseStepSize(total: number): number {
  const candidates = [5, 4, 6];
  const found = candidates.find((size) => total > 0 && total % size === 0);
  return found ?? 5;
}

function shuffleArray<T>(input: T[]): T[] {
  const arr = input.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function clampLikert(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(7, Math.max(1, value));
}

function normalizePairwiseSelections(
  question: PairwiseQuestion,
  raw: unknown,
): string[] | null {
  if (question.pairs.length === 0) return null;
  const selections = isStringArray(raw)
    ? raw
    : typeof raw === 'string'
      ? [raw]
      : null;
  if (!selections) return null;

  return question.pairs.map((pair, index) => {
    const selection = selections[index];
    if (selection === pair.left.id || selection === pair.right.id) {
      return selection;
    }
    return '';
  });
}

function isAnswerComplete(question: FlatQuestion, answer: TestAnswer | null): boolean {
  const q = question.question;

  if (q.type === 'likert') {
    return typeof answer === 'number' && !Number.isNaN(answer);
  }

  if (q.type === 'pairwise') {
    const normalized = normalizePairwiseSelections(q, answer);
    if (!normalized) return false;
    return q.pairs.every((pair, index) => {
      const selection = normalized[index];
      return selection === pair.left.id || selection === pair.right.id;
    });
  }

  if (q.type === 'rank') {
    if (!isStringArray(answer)) return false;
    if (answer.length !== q.options.length) return false;
    const optionIds = new Set(q.options.map((opt) => opt.id));
    if (answer.some((id) => !optionIds.has(id))) return false;
    return new Set(answer).size === q.options.length;
  }

  if (!isStringArray(answer)) return false;

  const minSelections =
    typeof q.minSelections === 'number' ? q.minSelections : 1;
  const maxSelections =
    typeof q.maxSelections === 'number'
      ? q.maxSelections
      : q.options.length;

  if (q.multiple) {
    return answer.length >= minSelections && answer.length <= maxSelections;
  }

  return answer.length === 1;
}

function sanitizeAnswer(
  question: FlatQuestion,
  raw: unknown,
): TestAnswer | null {
  const q = question.question;

  if (q.type === 'likert') {
    if (typeof raw !== 'number') return null;
    return clampLikert(raw);
  }

  if (q.type === 'pairwise') {
    const normalized = normalizePairwiseSelections(q, raw);
    if (!normalized) return null;
    return normalized;
  }

  if (q.type === 'rank') {
    if (!isStringArray(raw)) return null;
    const optionIds = q.options.map((opt) => opt.id);
    const filtered = raw.filter((id) => optionIds.includes(id));
    if (filtered.length !== optionIds.length) return null;
    if (new Set(filtered).size !== optionIds.length) return null;
    return filtered;
  }

  const ids = q.options.map((opt) => opt.id);
  if (typeof raw === 'string') {
    return ids.includes(raw) ? [raw] : null;
  }
  if (!isStringArray(raw)) return null;
  const filtered = raw.filter((id) => ids.includes(id));
  if (!q.multiple && filtered.length > 1) return null;
  return filtered;
}

export function useLikertTestRunner(
  config: Ref<TestConfig> | TestConfig,
  options?: { fresh?: boolean; skipAutoComputeOnMount?: boolean },
) {
  const cfg = isRef(config) ? config : ref(config);
  const isFreshStart = !!options?.fresh;
  const skipAutoComputeOnMount = options?.skipAutoComputeOnMount === true;

  const answers = reactive<TestAnswerMap>({});
  const currentGroupIndex = ref(0);
  const submittedCurrentStep = ref(false);
  const results = ref<GroupResult[] | null>(null);
  const lastResultId = ref<string | null>(null);

  const conceptualGroups = computed(
    () => cfg.value.questionSet ?? cfg.value.groups,
  );

  const flatQuestions = computed<FlatQuestion[]>(() => {
    const items: FlatQuestion[] = [];
    for (const group of conceptualGroups.value) {
      for (const q of group.questions) {
        items.push({
          groupId: group.id,
          groupName: group.name,
          questionId: q.id,
          text: q.text,
          question: q,
        });
      }
    }
    return items;
  });

  const questionByKey = computed(() => {
    const map = new Map<string, FlatQuestion>();
    for (const item of flatQuestions.value) {
      map.set(fieldKeyInternal(item.groupId, item.questionId), item);
    }
    return map;
  });

  const orderedQuestions = ref<FlatQuestion[]>([]);

  const stepSize = computed(() => chooseStepSize(flatQuestions.value.length));

  const steps = computed<StepGroup[]>(() => {
    const base =
      orderedQuestions.value.length > 0
        ? orderedQuestions.value
        : flatQuestions.value;

    const size = stepSize.value;
    const chunks: StepGroup[] = [];

    for (let i = 0; i < base.length; i += size) {
      chunks.push({
        id: `step-${i / size + 1}`,
        questions: base.slice(i, i + size),
      });
    }

    return chunks;
  });

  const groups = computed(() => steps.value);
  const totalGroups = computed(() => groups.value.length);
  const groupLabel = computed(() => cfg.value.groupsLabel ?? 'Etapa');

  const currentGroup = computed<StepGroup | null>(
    () => groups.value[currentGroupIndex.value] ?? null,
  );

  const currentGroupNumber = computed(
    () => currentGroupIndex.value + 1,
  );

  const isFirstGroup = computed(
    () => currentGroupIndex.value === 0,
  );

  const isLastGroup = computed(
    () => currentGroupIndex.value === totalGroups.value - 1,
  );

  function fieldKey(groupId: string, questionId: string): string {
    return fieldKeyInternal(groupId, questionId);
  }

  const totalQuestions = computed(
    () => flatQuestions.value.length,
  );

  const answeredCount = computed(() => {
    let count = 0;
    for (const question of flatQuestions.value) {
      const key = fieldKeyInternal(question.groupId, question.questionId);
      if (isAnswerComplete(question, answers[key] ?? null)) count += 1;
    }
    return count;
  });

  function isStepComplete(step: StepGroup): boolean {
    return step.questions.every((q) =>
      isAnswerComplete(
        q,
        answers[fieldKeyInternal(q.groupId, q.questionId)] ?? null,
      ),
    );
  }

  function isTestComplete(): boolean {
    return flatQuestions.value.every((q) =>
      isAnswerComplete(
        q,
        answers[fieldKeyInternal(q.groupId, q.questionId)] ?? null,
      ),
    );
  }

  const currentGroupTotalQuestions = computed(() =>
    currentGroup.value ? currentGroup.value.questions.length : 0,
  );

  const currentGroupAnsweredCount = computed(() => {
    const group = currentGroup.value;
    if (!group) return 0;

    return group.questions.filter(
      (q) =>
        isAnswerComplete(
          q,
          answers[fieldKeyInternal(q.groupId, q.questionId)] ?? null,
        ),
    ).length;
  });

  const canGoNext = computed(() => {
    const group = currentGroup.value;
    if (!group) return false;
    return isStepComplete(group);
  });

  const overallProgressPercent = computed(() => {
    if (totalQuestions.value === 0) return 0;
    const ratio = answeredCount.value / totalQuestions.value;
    return Math.min(100, Math.round(ratio * 100));
  });

  const storageKey = computed(
    () => `likert-test:${cfg.value.slug}:answers`,
  );

  function handleBeforeUnload(event: BeforeUnloadEvent): void {
    if (!isTestComplete()) {
      event.preventDefault();
      event.returnValue = '';
    }
  }

  onMounted(() => {
    if (typeof window === 'undefined') return;

    orderedQuestions.value = shuffleArray(flatQuestions.value);

    if (isFreshStart) {
      for (const key of Object.keys(answers)) {
        answers[key] = null;
      }
      currentGroupIndex.value = 0;
      submittedCurrentStep.value = false;
      window.localStorage.removeItem(storageKey.value);
    } else {
      const raw = window.localStorage.getItem(storageKey.value);
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as Record<string, unknown>;
          for (const [key, value] of Object.entries(parsed)) {
            const question = questionByKey.value.get(key);
            if (!question) continue;
            const sanitized = sanitizeAnswer(question, value);
            if (sanitized == null) continue;
            answers[key] = sanitized;
          }
        } catch (error) {
          console.error('Failed to load saved answers:', error);
        }
      }

      const firstIncompleteIndex = steps.value.findIndex(
        (step) => !isStepComplete(step),
      );

      if (firstIncompleteIndex === -1) {
        currentGroupIndex.value = Math.max(0, totalGroups.value - 1);
        if (!skipAutoComputeOnMount) {
          void computeResults();
        }
      } else {
        currentGroupIndex.value = firstIncompleteIndex;
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
  });

  onBeforeUnmount(() => {
    if (typeof window === 'undefined') return;
    window.removeEventListener('beforeunload', handleBeforeUnload);
  });

  watch(
    () => ({ ...answers }),
    (value) => {
      if (typeof window === 'undefined') return;

      const serialized: Record<string, TestAnswer> = {};
      for (const [key, val] of Object.entries(value)) {
        const question = questionByKey.value.get(key);
        if (!question) continue;
        const sanitized = sanitizeAnswer(question, val);
        if (sanitized == null) continue;
        serialized[key] = sanitized;
      }

      window.localStorage.setItem(
        storageKey.value,
        JSON.stringify(serialized),
      );
    },
    { deep: true },
  );

  function getSummaryRule(score: number): SummaryRule | null {
    const rules = cfg.value.scoring.summaryRules;
    if (!rules || !rules.length) return null;

    return (
      rules.find((rule) => score >= rule.min && score <= rule.max) ?? null
    );
  }

  const topSummaries = computed(() => {
    if (!results.value) return [];

    const top = results.value.slice(0, 3);

    return top
      .map((result) => {
        const rule = getSummaryRule(result.average);
        if (!rule) return null;

        const description = rule.descriptionTemplate.replace(
          /{{LAYER}}/g,
          result.name,
        );

        return {
          groupId: result.groupId,
          name: result.name,
          average: result.average,
          title: rule.title,
          description,
        };
      })
      .filter(
        (item): item is {
          groupId: string;
          name: string;
          average: number;
          title: string;
          description: string;
        } => item !== null,
      );
  });

  const { saveLikertResult, isSaving } = useSaveResult();

  async function computeResults(): Promise<void> {
    const allComplete = isTestComplete();
    if (!allComplete) {
      submittedCurrentStep.value = true;
      return;
    }

    const groupResults = scoreTest(cfg.value, answers);
    results.value = groupResults;

    const savedId = await saveLikertResult({
      config: cfg.value,
      answers,
      results: groupResults,
      topSummaries: topSummaries.value,
    });

    lastResultId.value = savedId ?? null;
  }

  function goPrevious(): void {
    if (currentGroupIndex.value === 0) return;
    submittedCurrentStep.value = false;
    currentGroupIndex.value -= 1;
  }

  function isQuestionAnswered(question: FlatQuestion): boolean {
    return isAnswerComplete(
      question,
      answers[fieldKeyInternal(question.groupId, question.questionId)] ?? null,
    );
  }

  function goNext(): void {
    if (!currentGroup.value) return;

    if (!canGoNext.value) {
      submittedCurrentStep.value = true;
      return;
    }

    submittedCurrentStep.value = false;

    if (isLastGroup.value) {
      void computeResults();
    } else {
      currentGroupIndex.value += 1;
    }
  }

  return {
    config: cfg,
    answers,
    currentGroupIndex,
    submittedCurrentStep,
    results,
    lastResultId,
    isSaving,

    groups,
    totalGroups,
    groupLabel,
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
    isQuestionAnswered,

    fieldKey,
    goPrevious,
    goNext,
  };
}
