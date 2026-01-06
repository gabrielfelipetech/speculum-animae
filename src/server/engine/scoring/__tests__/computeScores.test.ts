import { describe, expect, it } from 'vitest';
import {
  computeLikertScores,
  computePairwiseScores,
  computeRankScores,
} from '../computeScores';

describe('scoring compute functions', () => {
  it('applies reverse scoring for likert items', () => {
    const answers = { 'group:q1': 2 };
    const questions = [
      { key: 'group:q1', dimension: 'openness', reverse: true },
    ];

    const scores = computeLikertScores(answers, questions);

    expect(scores.openness).toEqual([6]);
  });

  it('converts ranking order into dimension scores', () => {
    const order = ['a', 'b', 'c'];
    const mapping = { a: 'alpha', b: 'beta', c: 'gamma' };

    const scores = computeRankScores(order, mapping);

    expect(scores.alpha?.[0]).toBeCloseTo(7);
    expect(scores.beta?.[0]).toBeCloseTo(4);
    expect(scores.gamma?.[0]).toBeCloseTo(1);
  });

  it('converts pairwise choices into winner and loser scores', () => {
    const pairs = [
      {
        left: { id: 'a', label: 'A', dimension: 'alpha' },
        right: { id: 'b', label: 'B', dimension: 'beta' },
      },
      {
        left: { id: 'c', label: 'C', dimension: 'gamma' },
        right: { id: 'd', label: 'D', dimension: 'delta' },
      },
    ];
    const choices = ['a', 'd'];

    const scores = computePairwiseScores(choices, pairs);

    expect(scores.alpha).toEqual([7]);
    expect(scores.beta).toEqual([1]);
    expect(scores.gamma).toEqual([1]);
    expect(scores.delta).toEqual([7]);
  });
});
