import type { StoredResult } from '../results.post';
import {
  TEMPERAMENT_LABELS_PT,
  getPremiumTemperamentText,
  isTemperamentId,
  type TemperamentId,
} from '../../texts/premiumTemperaments';
import {
  TEMPERAMENT_SOURCE_SCALE,
  normalizeScaleValue,
  type ScoreScale,
} from '../../../src/shared/engine/scoring/normalizeScale';

export type GrowthHorizon = 'week' | 'month' | 'quarter';

export type GrowthStep = {
  id: string;
  title: string;
  horizon: GrowthHorizon;
  actions: string[];
};

export type CaseStudyDomain = 'work' | 'family' | 'relationships';

export type CaseStudy = {
  id: string;
  domain: CaseStudyDomain;
  title: string;
  body: string;
};

export type SpiritualPractice = {
  id: string;
  title: string;
  steps: string[];
  readings?: string[];
};

export interface TemperamentProfile {
  label: string;
  overview: string;
  strengths: string[];
  risks: string[];
  work: string[];
  relationships: string[];
  family: string[];
  spiritual: string[];
  growthSteps?: GrowthStep[];
  examen?: string[];
  caseStudies?: CaseStudy[];
  spiritualPractices?: SpiritualPractice[];
}

export interface TemperamentsBuilderContext {
  main: { id: TemperamentId; average: number };
  secondary: { id: TemperamentId; average: number } | null;
}

export type TemperamentProfileBuilder = (
  ctx: TemperamentsBuilderContext,
) => TemperamentProfile;

export const TEMPERAMENT_LABELS: Record<TemperamentId, string> = {
  choleric: 'Colerico',
  melancholic: 'Melancolico',
  sanguine: 'Sanguineo',
  phlegmatic: 'Fleumatico',
};

type TemperamentScoreSummary = {
  id: TemperamentId;
  name: string;
  average: number;
  sourceAverage: number;
  base10Average: number;
};

export interface TemperamentsPdfContent {
  scale: ScoreScale;
  main: {
    id: TemperamentId;
    average: number;
    sourceAverage: number;
    base10Average: number;
  };
  secondary: {
    id: TemperamentId;
    average: number;
    sourceAverage: number;
    base10Average: number;
  } | null;
  resultsOrdered: TemperamentScoreSummary[];
  mainProfile: TemperamentProfile;
  secondaryProfile: TemperamentProfile | null;
}

function buildProfile(temperament: TemperamentId): TemperamentProfile {
  const premium = getPremiumTemperamentText(temperament);

  return {
    label: TEMPERAMENT_LABELS[temperament],
    overview: premium.overview,
    strengths: [premium.strengths],
    risks: [premium.weaknesses],
    work: [premium.career],
    relationships: [premium.relationships],
    family: [premium.relationships],
    spiritual: [premium.practices],
    examen: premium.checklist,
  };
}

function normalizeResultEntry(
  entry: StoredResult['results'][number],
): TemperamentScoreSummary | null {
  if (!isTemperamentId(entry.groupId)) {
    return null;
  }

  const normalized = normalizeScaleValue(entry.average, TEMPERAMENT_SOURCE_SCALE);

  return {
    id: entry.groupId,
    name: TEMPERAMENT_LABELS_PT[entry.groupId],
    average: normalized.source,
    sourceAverage: normalized.source,
    base10Average: normalized.base10,
  };
}

export function buildTemperamentsPdfContent(
  entry: StoredResult,
): TemperamentsPdfContent {
  const sorted = entry.results
    .map(normalizeResultEntry)
    .filter((result): result is TemperamentScoreSummary => result !== null)
    .sort((a, b) => b.sourceAverage - a.sourceAverage);

  if (sorted.length === 0) {
    throw new Error('No temperament scores available to build PDF content.');
  }

  const main = sorted[0];
  const secondary = sorted[1] ?? null;

  return {
    scale: TEMPERAMENT_SOURCE_SCALE,
    main: {
      id: main.id,
      average: main.average,
      sourceAverage: main.sourceAverage,
      base10Average: main.base10Average,
    },
    secondary: secondary
      ? {
          id: secondary.id,
          average: secondary.average,
          sourceAverage: secondary.sourceAverage,
          base10Average: secondary.base10Average,
        }
      : null,
    resultsOrdered: sorted,
    mainProfile: buildProfile(main.id),
    secondaryProfile: secondary ? buildProfile(secondary.id) : null,
  };
}
