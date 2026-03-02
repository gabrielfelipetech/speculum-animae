import type { StoredResult } from '../results.post';
import { buildCholericPdfProfile } from './temperamentsPdf.choleric';
import { buildSanguinePdfProfile } from './temperamentsPdf.sanguine';
import { buildMelancholicPdfProfile } from './temperamentsPdf.melancholic';
import { phlegmaticPdfProfile } from './temperamentsPdf.phlegmatic';

export type TemperamentId = 'choleric' | 'melancholic' | 'sanguine' | 'phlegmatic';
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

const TEMPERAMENT_BUILDERS: Record<TemperamentId, TemperamentProfileBuilder> = {
  choleric: buildCholericPdfProfile,
  sanguine: buildSanguinePdfProfile,
  melancholic: buildMelancholicPdfProfile,
  phlegmatic: () => phlegmaticPdfProfile,
};

export interface TemperamentsPdfContent {
  main: { id: TemperamentId; average: number };
  secondary: { id: TemperamentId; average: number } | null;
  resultsOrdered: { id: TemperamentId; name: string; average: number }[];
  mainProfile: TemperamentProfile;
  secondaryProfile: TemperamentProfile | null;
}

export function buildTemperamentsPdfContent(
  entry: StoredResult,
): TemperamentsPdfContent {
  const sorted = [...entry.results]
    .slice()
    .sort((a, b) => b.average - a.average)
    .map((r) => ({
      groupId: r.groupId as TemperamentId,
      average: r.average,
    }));

  const main = sorted[0];
  const secondary = sorted[1] ?? null;

  const mainCtx: TemperamentsBuilderContext = {
    main: { id: main.groupId, average: main.average },
    secondary: secondary
      ? { id: secondary.groupId, average: secondary.average }
      : null,
  };

  const secondaryCtx: TemperamentsBuilderContext | null = secondary
    ? {
        main: { id: secondary.groupId, average: secondary.average },
        secondary: { id: main.groupId, average: main.average },
      }
    : null;

  const mainProfile = TEMPERAMENT_BUILDERS[main.groupId](mainCtx);
  const secondaryProfile = secondaryCtx
    ? TEMPERAMENT_BUILDERS[secondaryCtx.main.id](secondaryCtx)
    : null;

  return {
    main: { id: main.groupId, average: main.average },
    secondary: secondary
      ? { id: secondary.groupId, average: secondary.average }
      : null,
    resultsOrdered: sorted.map((r) => ({
      id: r.groupId,
      name: TEMPERAMENT_LABELS[r.groupId],
      average: r.average,
    })),
    mainProfile,
    secondaryProfile,
  };
}
