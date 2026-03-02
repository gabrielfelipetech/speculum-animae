import type { DimensionMap, PairwisePair } from '~/types/tests';

export type DimensionScores = Record<string, number[]>;

export type LikertScoreInput = {
  key: string;
  dimension: string;
  reverse?: boolean;
};

function addScore(
  buckets: DimensionScores,
  dimension: string,
  value: number,
): void {
  if (!buckets[dimension]) {
    buckets[dimension] = [];
  }
  buckets[dimension].push(value);
}

function clampLikert(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(7, Math.max(1, value));
}

export function computeLikertScores(
  answers: Record<string, number | null>,
  questions: LikertScoreInput[],
): DimensionScores {
  const buckets: DimensionScores = {};

  for (const question of questions) {
    const raw = answers[question.key];
    if (typeof raw !== 'number') continue;
    const reversed = question.reverse ? 8 - raw : raw;
    const value = clampLikert(reversed);
    addScore(buckets, question.dimension, value);
  }

  return buckets;
}

export function computeRankScores(
  order: string[],
  mapping: DimensionMap,
): DimensionScores {
  const buckets: DimensionScores = {};
  const optionIds = Object.keys(mapping);
  const optionCount = optionIds.length;
  if (optionCount === 0 || order.length === 0) return buckets;

  const denominator = Math.max(1, optionCount - 1);

  for (const optionId of optionIds) {
    const index = order.indexOf(optionId);
    if (index < 0) continue;
    const value = 7 - (index * 6) / denominator;
    addScore(buckets, mapping[optionId], value);
  }

  return buckets;
}

export function computePairwiseScores(
  choices: string[],
  pairs: PairwisePair[],
): DimensionScores {
  const buckets: DimensionScores = {};
  if (pairs.length === 0 || choices.length === 0) return buckets;

  pairs.forEach((pair, index) => {
    const selection = choices[index];
    if (selection !== pair.left.id && selection !== pair.right.id) return;

    const winner = selection === pair.left.id ? pair.left : pair.right;
    const loser = selection === pair.left.id ? pair.right : pair.left;
    addScore(buckets, winner.dimension, 7);
    addScore(buckets, loser.dimension, 1);
  });

  return buckets;
}

export function computeChoiceScores(
  selected: string[],
  mapping: DimensionMap,
): DimensionScores {
  const buckets: DimensionScores = {};
  const optionIds = Object.keys(mapping);
  if (optionIds.length === 0) return buckets;

  const selectedSet = new Set(selected);

  for (const optionId of optionIds) {
    const value = selectedSet.has(optionId) ? 7 : 1;
    addScore(buckets, mapping[optionId], value);
  }

  return buckets;
}
