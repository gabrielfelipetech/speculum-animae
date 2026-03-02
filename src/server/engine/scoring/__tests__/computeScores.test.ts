import { describe, expect, it } from 'vitest';
import {
  computeLikertScores,
  computePairwiseScores,
  computeRankScores,
} from '../computeScores';
import { scoreTest } from '../scoreTest';
import type { TestConfig } from '~/types/tests';

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

  it('keeps scoreTest output stable for a mixed questionnaire', () => {
    const config: TestConfig = {
      id: 'mixed-test',
      slug: 'mixed-test',
      resultSlug: 'big-five',
      kind: 'bigFive',
      title: 'Mixed Test',
      description: 'Test fixture',
      groupsLabel: 'Step',
      scale: 'agreement',
      scoring: {
        strategy: 'average-per-group',
      },
      groups: [
        {
          id: 'alpha',
          name: 'Alpha',
          shortDescription: 'Alpha group',
          questions: [
            {
              id: 'q1',
              type: 'likert',
              text: 'Question 1',
              dimension: 'alpha',
              scaleKey: 'agreement',
            },
            {
              id: 'q2',
              type: 'choice',
              text: 'Question 2',
              multiple: false,
              options: [
                { id: 'optA', label: 'Option A' },
                { id: 'optB', label: 'Option B' },
              ],
              dimensionMap: {
                optA: 'alpha',
                optB: 'beta',
              },
            },
          ],
        },
        {
          id: 'beta',
          name: 'Beta',
          shortDescription: 'Beta group',
          questions: [],
        },
      ],
      questionSet: [
        {
          id: 'alpha',
          name: 'Alpha',
          shortDescription: 'Alpha group',
          questions: [
            {
              id: 'q1',
              type: 'likert',
              text: 'Question 1',
              dimension: 'alpha',
              scaleKey: 'agreement',
            },
            {
              id: 'q2',
              type: 'choice',
              text: 'Question 2',
              multiple: false,
              options: [
                { id: 'optA', label: 'Option A' },
                { id: 'optB', label: 'Option B' },
              ],
              dimensionMap: {
                optA: 'alpha',
                optB: 'beta',
              },
            },
          ],
        },
        {
          id: 'beta',
          name: 'Beta',
          shortDescription: 'Beta group',
          questions: [],
        },
      ],
    };

    const results = scoreTest(config, {
      'alpha:q1': 6,
      'alpha:q2': ['optA'],
    });

    expect(results).toEqual([
      {
        groupId: 'alpha',
        name: 'Alpha',
        average: 6.5,
      },
      {
        groupId: 'beta',
        name: 'Beta',
        average: 1,
      },
    ]);
  });
});
