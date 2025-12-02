// src/config/tests/index.ts
import type { LikertTestConfig } from '~/types/tests';
import { likertTests } from './likert';
import { temperamentLikertTests } from './temperaments';

export const allLikertTests: LikertTestConfig[] = [
  ...likertTests,
  ...temperamentLikertTests,
];

export const allTests = {
  likert: allLikertTests,
} as const;

export type TestKind = keyof typeof allTests;

export function getLikertTestBySlug(
  slug: string,
): LikertTestConfig | undefined {
  return allLikertTests.find((test) => test.slug === slug);
}
