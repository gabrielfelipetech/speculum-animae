// src/config/tests/index.ts
import type { TestConfig, TestConfigInput } from '~/types/tests';
import type { ReportKind } from '~/types/results';
import { likertTests } from './likert';
import { temperamentLikertTests } from './temperaments';
import { additionalTests } from './additional';

const RESULT_KIND_BY_SLUG: Record<string, ReportKind> = {
  '12-camadas': 'twelveLayers',
  'temperamentos-classicos': 'temperaments',
  'love-languages': 'loveLanguages',
  'attachment-styles': 'attachment',
  'conflict-communication': 'conflictCommunication',
  'jealousy-boundaries': 'jealousyBoundaries',
  'temperament-compatibility': 'temperamentCompatibility',
  'big-five': 'bigFive',
  disc: 'disc',
  'self-sabotage': 'selfSabotage',
  procrastination: 'procrastination',
  'decision-making': 'decisionMaking',
  'learning-style-practice': 'learningStyle',
  'study-focus-attention': 'studyFocus',
  'study-habits': 'studyHabits',
  metacognition: 'metacognition',
  'work-values': 'workValues',
  motivators: 'motivators',
  'leadership-style': 'leadershipStyle',
  'teamwork-collaboration': 'teamwork',
  'anxiety-triggers': 'anxietyTriggers',
  'burnout-stress': 'burnoutStress',
  'habits-consistency': 'habitsConsistency',
  'sleep-energy': 'sleepEnergy',
  archetypes: 'archetypes',
  'self-esteem': 'selfEsteem',
  'emotional-intelligence': 'emotionalIntelligence',
};

function normalizeTestConfig(test: TestConfigInput): TestConfig {
  const questionSet = test.questionSet ?? test.groups ?? [];
  const kind = test.kind ?? RESULT_KIND_BY_SLUG[test.slug];
  if (!kind) {
    throw new Error(`Missing report kind for test ${test.slug}`);
  }

  return {
    ...test,
    kind,
    questionSet,
    groups: questionSet,
  };
}

export const allLikertTests: TestConfig[] = [
  ...likertTests,
  ...temperamentLikertTests,
  ...additionalTests,
].map(normalizeTestConfig);

export const allTests = {
  likert: allLikertTests,
} as const;

export type TestKind = keyof typeof allTests;

export function getTestBySlug(slug: string): TestConfig | undefined {
  return allLikertTests.find((test) => test.slug === slug);
}
