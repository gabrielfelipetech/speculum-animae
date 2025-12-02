// src/composables/useLikertTestRunner.ts
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
import type { LikertTestConfig, SummaryRule } from '~/types/tests';
import { useSaveResult } from '~/composables/useSaveResult';

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
}

interface StepGroup {
  id: string;
  questions: FlatQuestion[];
}

function fieldKeyInternal(groupId: string, questionId: string): string {
  return `${groupId}:${questionId}`;
}

function chooseStepSize(total: number): number {
  // tenta 5, depois 4, depois 6 – sempre sem resto
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

export function useLikertTestRunner(
  config: Ref<LikertTestConfig> | LikertTestConfig,
) {
  const cfg = isRef(config) ? config : ref(config);

  const answers = reactive<Record<string, number | null>>({});
  const currentGroupIndex = ref(0); // agora é índice da "etapa"
  const submittedCurrentStep = ref(false);
  const results = ref<GroupResult[] | null>(null);
  const lastResultId = ref<string | null>(null);

  // Grupos conceituais (camadas, temperamentos, virtudes...) – usados só para pontuação
  const conceptualGroups = computed(() => cfg.value.groups);

  // Todas as perguntas com marcação de grupo (camada/temperamento)
  const flatQuestions = computed<FlatQuestion[]>(() => {
    const items: FlatQuestion[] = [];
    for (const group of conceptualGroups.value) {
      for (const q of group.questions) {
        items.push({
          groupId: group.id,
          groupName: group.name,
          questionId: q.id,
          text: q.text,
        });
      }
    }
    return items;
  });

  // Ordem efetiva das perguntas (embaralhada)
  const orderedQuestions = ref<FlatQuestion[]>([]);

  // Tamanho de cada etapa (4, 5 ou 6, sem resto)
  const stepSize = computed(() => chooseStepSize(flatQuestions.value.length));

  // Etapas (steps) de exibição – cada step tem 4/5/6 perguntas misturadas de vários grupos
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

  // A partir daqui, "groups" significa "etapas"
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
    const validKeys = new Set(
      flatQuestions.value.map((q) =>
        fieldKeyInternal(q.groupId, q.questionId),
      ),
    );

    let count = 0;
    for (const key of validKeys) {
      if (typeof answers[key] === 'number') {
        count += 1;
      }
    }
    return count;
  });

  function isStepComplete(step: StepGroup): boolean {
    return step.questions.every(
      (q) =>
        typeof answers[fieldKeyInternal(q.groupId, q.questionId)] ===
        'number',
    );
  }

  function isTestComplete(): boolean {
    return flatQuestions.value.every(
      (q) =>
        typeof answers[fieldKeyInternal(q.groupId, q.questionId)] ===
        'number',
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
        typeof answers[fieldKeyInternal(q.groupId, q.questionId)] ===
        'number',
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

  // --- ciclo de vida: montar, carregar respostas, gerar ordem aleatória, posicionar na primeira etapa incompleta ---

  onMounted(() => {
    if (typeof window === 'undefined') return;

    // 1) gera ordem aleatória das perguntas
    orderedQuestions.value = shuffleArray(flatQuestions.value);

    // 2) restaura respostas do localStorage
    const raw = window.localStorage.getItem(storageKey.value);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Record<string, number>;
        const validKeys = new Set(
          flatQuestions.value.map((q) =>
            fieldKeyInternal(q.groupId, q.questionId),
          ),
        );

        for (const [key, value] of Object.entries(parsed)) {
          if (!validKeys.has(key)) continue;
          if (typeof value !== 'number') continue;
          answers[key] = value;
        }
      } catch (error) {
        console.error('Failed to load saved answers:', error);
      }
    }

    // 3) encontra a primeira etapa incompleta
    const firstIncompleteIndex = steps.value.findIndex(
      (step) => !isStepComplete(step),
    );

    if (firstIncompleteIndex === -1) {
      // tudo completo → vai para última etapa e calcula resultado
      currentGroupIndex.value = Math.max(0, totalGroups.value - 1);
      void computeResults();
    } else {
      currentGroupIndex.value = firstIncompleteIndex;
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
  });

  onBeforeUnmount(() => {
    if (typeof window === 'undefined') return;
    window.removeEventListener('beforeunload', handleBeforeUnload);
  });

  // Persistência das respostas
  watch(
    () => ({ ...answers }),
    (value) => {
      if (typeof window === 'undefined') return;

      const serialized: Record<string, number> = {};
      for (const [key, val] of Object.entries(value)) {
        if (typeof val === 'number') {
          serialized[key] = val;
        }
      }

      window.localStorage.setItem(
        storageKey.value,
        JSON.stringify(serialized),
      );
    },
    { deep: true },
  );

  // --- regras de resumo e topSummaries (igual antes) ---

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

  const { saveLikertResult } = useSaveResult();

  async function computeResults(): Promise<void> {
    const allComplete = isTestComplete();
    if (!allComplete) {
      submittedCurrentStep.value = true;
      return;
    }

    // resultado por "grupo conceitual" (camada, temperamento, etc.)
    const groupResults: GroupResult[] = conceptualGroups.value.map(
      (group) => {
        const scores = group.questions.map((q) => {
          const value = answers[fieldKeyInternal(group.id, q.id)];
          return typeof value === 'number' ? value : 0;
        });

        const sum = scores.reduce((acc, curr) => acc + curr, 0);
        const average =
          scores.length > 0 ? sum / scores.length : 0;

        return {
          groupId: group.id,
          name: group.name,
          average,
        };
      },
    );

    groupResults.sort((a, b) => b.average - a.average);
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

    groups, // agora são etapas (steps)
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

    fieldKey,
    goPrevious,
    goNext,
  };
}
