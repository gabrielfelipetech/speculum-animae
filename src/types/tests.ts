// src/types/tests.ts
export type SummaryRule = {
  min: number;
  max: number;
  title: string;
  descriptionTemplate: string; // usa {{LAYER}} para interpolar
};

export type LikertQuestion = {
  id: string;
  text: string;
};

export type LikertGroup = {
  id: string;
  name: string;
  shortDescription: string;
  questions: LikertQuestion[];
};

export type LikertScoringStrategy = 'average-per-group';

export type LikertTestConfig = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category?: string;
  emphasis?: 'highlighted' | 'default';
  tags?: string[];
  groupsLabel?: string;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
  hasPremiumReport?: boolean;
  scoring: {
    strategy: LikertScoringStrategy;
    summaryRules: SummaryRule[];
  };
  groups: LikertGroup[];
};
