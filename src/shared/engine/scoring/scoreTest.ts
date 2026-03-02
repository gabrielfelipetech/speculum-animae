import type {
  DimensionMap,
  PairwisePair,
  QuestionOption,
  TestAnswerMap,
  TestConfig,
  TestGroup,
  TestQuestion,
} from '~/types/tests';
import {
  computeChoiceScores,
  computeLikertScores,
  computePairwiseScores,
  computeRankScores,
  type DimensionScores,
  type LikertScoreInput,
} from './computeScores';

export type GroupScore = {
  groupId: string;
  name: string;
  average: number;
};

type FlatQuestion = {
  groupId: string;
  groupName: string;
  questionId: string;
  question: TestQuestion;
};

export function buildAnswerKey(groupId: string, questionId: string): string {
  return `${groupId}:${questionId}`;
}

function resolveQuestionSet(config: TestConfig): TestGroup[] {
  return config.questionSet ?? config.groups;
}

function flattenQuestions(config: TestConfig): FlatQuestion[] {
  const items: FlatQuestion[] = [];
  const groups = resolveQuestionSet(config);

  for (const group of groups) {
    for (const question of group.questions) {
      items.push({
        groupId: group.id,
        groupName: group.name,
        questionId: question.id,
        question,
      });
    }
  }

  return items;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function buildDimensionMap(
  options: QuestionOption[],
  overrides?: DimensionMap,
): DimensionMap {
  const map: DimensionMap = {};
  for (const option of options) {
    map[option.id] = overrides?.[option.id] ?? option.id;
  }
  return map;
}

function sanitizeRankOrder(
  raw: unknown,
  options: QuestionOption[],
): string[] | null {
  if (!isStringArray(raw)) return null;
  const optionIds = options.map((opt) => opt.id);
  if (raw.length !== optionIds.length) return null;
  if (new Set(raw).size !== optionIds.length) return null;
  if (raw.some((id) => !optionIds.includes(id))) return null;
  return raw;
}

function sanitizePairwiseChoices(
  raw: unknown,
  pairs: PairwisePair[],
): string[] | null {
  if (pairs.length === 0) return null;
  const choices = isStringArray(raw)
    ? raw
    : typeof raw === 'string'
      ? [raw]
      : null;
  if (!choices || choices.length !== pairs.length) return null;

  for (let index = 0; index < pairs.length; index += 1) {
    const pair = pairs[index];
    const selection = choices[index];
    if (selection !== pair.left.id && selection !== pair.right.id) {
      return null;
    }
  }

  return choices;
}

function sanitizeChoiceSelection(
  raw: unknown,
  options: QuestionOption[],
  multiple: boolean,
  minSelections?: number,
  maxSelections?: number,
): string[] | null {
  const optionIds = options.map((opt) => opt.id);
  const rawList = isStringArray(raw)
    ? raw
    : typeof raw === 'string'
      ? [raw]
      : null;
  if (!rawList) return null;

  const filtered = rawList.filter((id) => optionIds.includes(id));
  const unique = Array.from(new Set(filtered));

  const min = multiple ? (typeof minSelections === 'number' ? minSelections : 1) : 1;
  const max = multiple
    ? typeof maxSelections === 'number'
      ? maxSelections
      : optionIds.length
    : 1;

  if (unique.length < min || unique.length > max) return null;
  if (!multiple && unique.length !== 1) return null;

  return unique;
}

function mergeScores(target: DimensionScores, next: DimensionScores): void {
  for (const [dimension, values] of Object.entries(next)) {
    if (!target[dimension]) {
      target[dimension] = [];
    }
    target[dimension].push(...values);
  }
}

export function scoreTest(
  config: TestConfig,
  answers: TestAnswerMap,
): GroupScore[] {
  const groups = resolveQuestionSet(config);
  const buckets: DimensionScores = {};
  const likertInputs: LikertScoreInput[] = [];
  const likertAnswers: Record<string, number | null> = {};

  const questions = flattenQuestions(config);

  for (const question of questions) {
    const key = buildAnswerKey(question.groupId, question.questionId);
    const raw = answers[key] ?? null;
    const q = question.question;

    if (q.type === 'likert') {
      likertInputs.push({ key, dimension: q.dimension, reverse: q.reverse });
      likertAnswers[key] = typeof raw === 'number' ? raw : null;
      continue;
    }

    if (q.type === 'rank') {
      const order = sanitizeRankOrder(raw, q.options);
      if (!order) continue;
      const mapping = buildDimensionMap(q.options, q.dimensionMap);
      mergeScores(buckets, computeRankScores(order, mapping));
      continue;
    }

    if (q.type === 'pairwise') {
      const choices = sanitizePairwiseChoices(raw, q.pairs);
      if (!choices) continue;
      mergeScores(buckets, computePairwiseScores(choices, q.pairs));
      continue;
    }

    const selected = sanitizeChoiceSelection(
      raw,
      q.options,
      q.multiple,
      q.minSelections,
      q.maxSelections,
    );
    if (!selected) continue;

    const mapping = buildDimensionMap(q.options, q.dimensionMap);
    mergeScores(buckets, computeChoiceScores(selected, mapping));
  }

  mergeScores(buckets, computeLikertScores(likertAnswers, likertInputs));

  const results: GroupScore[] = groups.map((group) => {
    const values = buckets[group.id] ?? [];
    const sum = values.reduce((total, value) => total + value, 0);
    return {
      groupId: group.id,
      name: group.name,
      average: values.length > 0 ? sum / values.length : 0,
    };
  });

  results.sort((a, b) => b.average - a.average);
  return results;
}
