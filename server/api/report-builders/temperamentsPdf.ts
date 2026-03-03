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
  integratedReadingParagraphs: string[];
  finalChecklist: string[];
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);
}

function sentenceLimit(text: string, maxSentences: number): string {
  const sentences = splitSentences(text);
  if (sentences.length <= maxSentences) {
    return text.trim();
  }
  return sentences.slice(0, maxSentences).join(' ');
}

function firstSentence(text: string): string {
  const sentence = splitSentences(text)[0];
  return sentence ?? text.trim();
}

function compactSection(paragraphs: string[], maxSentences: number): string {
  const merged = paragraphs.join(' ').trim();
  if (!merged) return '';
  return sentenceLimit(merged, maxSentences);
}

function dedupeChecklist(items: string[]): string[] {
  const unique: string[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    const trimmed = item.trim();
    const normalized = trimmed.toLowerCase();
    if (!trimmed || seen.has(normalized)) continue;
    seen.add(normalized);
    unique.push(firstSentence(trimmed));
  }

  return unique;
}

function buildProfile(temperament: TemperamentId): TemperamentProfile {
  const premium = getPremiumTemperamentText(temperament);

  return {
    label: TEMPERAMENT_LABELS[temperament],
    overview: premium.overview,
    strengths: splitParagraphs(premium.strengths),
    risks: splitParagraphs(premium.risks),
    work: splitParagraphs(premium.work),
    relationships: splitParagraphs(premium.relationships),
    family: splitParagraphs(premium.relationships),
    spiritual: splitParagraphs(premium.practices),
    examen: premium.checklist,
  };
}

function buildIntegratedReadingParagraphs(
  mainProfile: TemperamentProfile,
  secondaryProfile: TemperamentProfile | null,
): string[] {
  const overview = compactSection([mainProfile.overview], 4);
  const strengths = compactSection(mainProfile.strengths, 3);
  const risks = compactSection(mainProfile.risks, 2);
  const work = compactSection(mainProfile.work, 2);
  const relationships = compactSection(mainProfile.relationships, 2);
  const practices = compactSection(mainProfile.spiritual, 2);

  if (!secondaryProfile) {
    return [
      `No eixo ${mainProfile.label}, ${overview}`,
      `Na pratica, esse perfil se fortalece quando ${strengths.toLowerCase()} ${work}`,
      `Os principais pontos de atencao sao ${risks.toLowerCase()} ${relationships} ${practices}`,
    ];
  }

  const secondaryOverview = compactSection([secondaryProfile.overview], 3);
  const secondaryStrengths = compactSection(secondaryProfile.strengths, 2);
  const secondaryRisks = compactSection(secondaryProfile.risks, 2);
  const secondaryPractices = compactSection(secondaryProfile.spiritual, 2);

  return [
    `A combinacao ${mainProfile.label}-${secondaryProfile.label} mostra um eixo dominante no principal com modulacao clara do secundario. ${overview}`,
    `No cotidiano, o principal se expressa por ${strengths.toLowerCase()} enquanto o secundario adiciona ${secondaryStrengths.toLowerCase()}`,
    `Em contextos de pressao, aparecem riscos complementares: ${risks.toLowerCase()} e ${secondaryRisks.toLowerCase()}`,
    `A leitura integrada fica mais estavel quando o plano de crescimento combina ${practices.toLowerCase()} com ${secondaryPractices.toLowerCase()} ${secondaryOverview}`,
  ];
}

function buildFinalChecklist(
  mainProfile: TemperamentProfile,
  secondaryProfile: TemperamentProfile | null,
): string[] {
  const base = dedupeChecklist([
    ...(mainProfile.examen ?? []),
    ...(secondaryProfile?.examen ?? []),
  ]);

  if (base.length >= 5) {
    return base.slice(0, 5);
  }

  const fallback = [
    firstSentence(compactSection(mainProfile.strengths, 1)),
    firstSentence(compactSection(mainProfile.risks, 1)),
    firstSentence(compactSection(mainProfile.work, 1)),
    firstSentence(compactSection(mainProfile.relationships, 1)),
    firstSentence(compactSection(mainProfile.spiritual, 1)),
  ].filter((item) => item.length > 0);

  return dedupeChecklist([...base, ...fallback]).slice(0, 5);
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
  const mainProfile = buildProfile(main.id);
  const secondaryProfile = secondary ? buildProfile(secondary.id) : null;

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
    mainProfile,
    secondaryProfile,
    integratedReadingParagraphs: buildIntegratedReadingParagraphs(
      mainProfile,
      secondaryProfile,
    ),
    finalChecklist: buildFinalChecklist(mainProfile, secondaryProfile),
  };
}
