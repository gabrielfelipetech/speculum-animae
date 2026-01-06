// src/types/tests.ts
import type { ReportKind } from '~/types/results';

export type SummaryRule = {
  min: number;
  max: number;
  title: string;
  descriptionTemplate: string;
};

export type LikertScaleId = 'agreement' | 'frequency' | 'intensity';

export type LikertScaleLabels = {
  minLabel: string;
  maxLabel: string;
};

export type BaseQuestion = {
  id: string;
  text: string;
  helperText?: string;
  type: 'likert' | 'rank' | 'pairwise' | 'choice';
};

export type LikertQuestion = BaseQuestion & {
  type: 'likert';
  dimension: string;
  reverse?: boolean;
  scaleKey: LikertScaleId;
};

export type QuestionOption = {
  id: string;
  label: string;
};

export type DimensionMap = Record<string, string>;

export type RankingQuestion = BaseQuestion & {
  type: 'rank';
  options: QuestionOption[];
  dimensionMap?: DimensionMap;
};

export type PairwiseOption = {
  id: string;
  label: string;
  dimension: string;
};

export type PairwisePair = {
  left: PairwiseOption;
  right: PairwiseOption;
};

export type PairwiseQuestion = BaseQuestion & {
  type: 'pairwise';
  pairs: PairwisePair[];
};

export type ChoiceQuestion = BaseQuestion & {
  type: 'choice';
  options: QuestionOption[];
  multiple: boolean;
  dimensionMap?: DimensionMap;
  minSelections?: number;
  maxSelections?: number;
};

export type TestQuestion =
  | LikertQuestion
  | RankingQuestion
  | PairwiseQuestion
  | ChoiceQuestion;

export type TestGroup = {
  id: string;
  name: string;
  shortDescription: string;
  questions: TestQuestion[];
};

export type TestScoringStrategy = 'average-per-group';

type TestConfigCore = {
  id: string;
  slug: string;
  resultSlug: string;
  kind?: ReportKind;
  title: string;
  subtitle?: string;
  description: string;
  disclaimer?: string;
  category?: string;
  emphasis?: 'highlighted' | 'default';
  tags?: string[];
  groupsLabel?: string;
  scale?: LikertScaleId;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
  hasPremiumReport?: boolean;
  scoring: {
    strategy: TestScoringStrategy;
    summaryRules?: SummaryRule[];
  };
  groups: TestGroup[];
};

export type TestConfigInput = TestConfigCore & {
  questionSet?: TestGroup[];
};

export type TestConfig = Omit<TestConfigCore, 'kind'> & {
  kind: ReportKind;
  questionSet: TestGroup[];
};

export type TestAnswer = number | string | string[];

export type TestAnswerMap = Record<string, TestAnswer | null>;
