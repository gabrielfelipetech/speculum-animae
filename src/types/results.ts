// src/types/results.ts

export type AccessLevel = 'free' | 'premium';

export type DimensionLevel = 'low' | 'medium' | 'high';
export type DimensionScore = {
  key: string;
  label: string;
  raw: number;
  normalized: number;
  level: DimensionLevel;
};
export type ResultBlockUi = {
  variant?: 'text' | 'list' | 'twoColumnCards';
  icon?: 'check' | 'warning' | 'energy' | 'guide' | 'neutral';
  group?: string;
  column?: 1 | 2;
};

export type ResultPoint = {
  label: string;
  description: string;
};

export type ResultSection = {
  title: string;
  bullets: string[];
};
export type ResultBlockContent =
  | { kind: 'bullets'; bullets: string[] } 
  | { kind: 'sections'; sections: ResultSection[] }
  | { kind: 'points'; points: ResultPoint[] };
export type ResultBlock = {
  id: string;
  title?: string;
  body: string;
  access: AccessLevel;
  content?: ResultBlockContent;
  ui?: ResultBlockUi;
};
export type ReportBlock = ResultBlock & {
  title: string;
};
export type GraphPoint = {
  label: string;
  value: number; 
};

/* ---------- 12 Camadas ---------- */

export interface LayerScore {
  groupId: string;
  name: string;
  average: number;
}

export interface TwelveLayersReport {
  kind: 'twelveLayers';
  sessionId: string;
  overall: {
    title: string;
    subtitle: string;
    blocks: ResultBlock[];
  };
  traits: {
    graph: GraphPoint[];
    blocks: ResultBlock[];
  };
  career: { blocks: ResultBlock[] };
  growth: { blocks: ResultBlock[] };
  relationships: { blocks: ResultBlock[] };
}

/* ---------- Temperamentos ---------- */

export interface TemperamentScore {
  groupId: string;
  name: string;
  average: number;
}

export interface TemperamentReport {
  kind: 'temperaments';
  sessionId: string;
  temperament: {
    primary: TemperamentScore;
    secondary?: TemperamentScore;
  };
  overall: {
    title: string;
    subtitle: string;
    blocks: ResultBlock[];
  };
  traits: { blocks: ResultBlock[] };
  career: { blocks: ResultBlock[] };
  growth: { blocks: ResultBlock[] };
  relationships: { blocks: ResultBlock[] };
}

/* ---------- Generic Assessments ---------- */

export type AssessmentReportKind =
  | 'bigFive'
  | 'disc'
  | 'selfSabotage'
  | 'procrastination'
  | 'decisionMaking'
  | 'loveLanguages'
  | 'attachment'
  | 'conflictCommunication'
  | 'jealousyBoundaries'
  | 'temperamentCompatibility'
  | 'learningStyle'
  | 'studyFocus'
  | 'studyHabits'
  | 'metacognition'
  | 'workValues'
  | 'motivators'
  | 'leadershipStyle'
  | 'teamwork'
  | 'anxietyTriggers'
  | 'burnoutStress'
  | 'habitsConsistency'
  | 'sleepEnergy'
  | 'archetypes'
  | 'selfEsteem'
  | 'emotionalIntelligence';

export type ReportKind = AssessmentReportKind | 'twelveLayers' | 'temperaments';

export type ReportSection = {
  id: string;
  title: string;
  subtitle?: string;
  blocks: ReportBlock[];
};

export interface AssessmentReport {
  kind: AssessmentReportKind;
  sessionId: string;
  title: string;
  subtitle: string;
  summary: string[];
  scores: DimensionScore[];
  recommendations: string[];
  sections?: ReportSection[];
  disclaimer?: string;
}

export type AnyReport =
  | TwelveLayersReport
  | TemperamentReport
  | AssessmentReport;
