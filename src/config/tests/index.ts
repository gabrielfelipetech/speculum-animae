// src/config/tests/index.ts
import type { TestConfig, TestConfigInput } from '~/types/tests';
import type { ReportKind } from '~/types/results';
import { likertTests } from './likert';
import { temperamentLikertTests } from './temperaments';
import { additionalTests } from './additional';

export const ENABLED_TEST_SLUGS = [
  'temperaments',
  'temperaments-compatibility',
  'twelve-layers',
] as const;

export type EnabledTestSlug = (typeof ENABLED_TEST_SLUGS)[number];

export const LEGACY_TEST_SLUG_REDIRECTS: Record<string, EnabledTestSlug> = {
  '12-camadas': 'twelve-layers',
  'temperamentos-classicos': 'temperaments',
  'temperament-compatibility': 'temperaments-compatibility',
};

const RESULT_KIND_BY_SLUG: Record<EnabledTestSlug, ReportKind> = {
  'twelve-layers': 'twelveLayers',
  temperaments: 'temperaments',
  'temperaments-compatibility': 'temperamentCompatibility',
};

const ENABLED_SLUG_SET = new Set<string>(ENABLED_TEST_SLUGS);
const ENABLED_RESULT_SLUG_SET = new Set<string>(ENABLED_TEST_SLUGS);

export function isEnabledTestSlug(slug: string): slug is EnabledTestSlug {
  return ENABLED_SLUG_SET.has(slug);
}

export function getCanonicalTestSlug(slug: string): string {
  return LEGACY_TEST_SLUG_REDIRECTS[slug] ?? slug;
}

export function resolveEnabledTestSlug(slug: string): EnabledTestSlug | null {
  const canonical = getCanonicalTestSlug(slug);
  return isEnabledTestSlug(canonical) ? canonical : null;
}

function normalizeTestConfig(test: TestConfigInput): TestConfig {
  const questionSet = test.questionSet ?? test.groups ?? [];
  const kind =
    test.kind ??
    (isEnabledTestSlug(test.slug) ? RESULT_KIND_BY_SLUG[test.slug] : undefined);
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
]
  .filter((test) => ENABLED_RESULT_SLUG_SET.has(test.resultSlug))
  .map(normalizeTestConfig);

export const allTests = {
  likert: allLikertTests,
} as const;

export type TestKind = keyof typeof allTests;

export function getTestBySlug(slug: string): TestConfig | undefined {
  return allLikertTests.find((test) => test.slug === slug);
}
