import type { StoredResult } from '../results.post';
import type { ResultBlock, TemperamentReport } from '~/types/results';
import { normalizeAvgTo0to10 } from '../../../src/shared/engine/scoring';
import {
  TEMPERAMENT_TEXTS,
  type TemperamentScore,
} from '../../texts/temperaments';
import {
  TEMPERAMENT_LABELS_PT,
  getPremiumTemperamentText,
  isTemperamentId,
  type TemperamentId,
  type TemperamentPremiumText,
} from '../../texts/premiumTemperaments';

function resolveTemperamentId(score?: TemperamentScore): TemperamentId | null {
  if (!score) return null;
  return isTemperamentId(score.groupId) ? score.groupId : null;
}

function firstSentence(value: string): string {
  const sentenceMatch = value.match(/^.*?[.!?](?:\s|$)/);
  return (sentenceMatch?.[0] ?? value).trim();
}

function composePremiumSection(
  primaryText: string,
  secondaryText?: string,
  secondaryId?: TemperamentId | null,
): string {
  if (!secondaryText || !secondaryId) {
    return primaryText;
  }

  const secondaryLabel = TEMPERAMENT_LABELS_PT[secondaryId].toLowerCase();
  const secondarySummary = firstSentence(secondaryText);
  return `${primaryText} Em combinacao com ${secondaryLabel}, ${secondarySummary}`;
}

function withPremiumNarrative(
  blocks: ResultBlock[],
  premiumBlock: ResultBlock,
): ResultBlock[] {
  const freeBlocks = blocks.filter((block) => block.access === 'free');
  return [...freeBlocks, premiumBlock];
}

export const PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER =
  'Conteudo premium temporariamente indisponivel. Tente novamente mais tarde.';

function buildPremiumFallback(temperament: TemperamentId): TemperamentPremiumText {
  return {
    temperament,
    overview: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    strengths: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    risks: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    practices: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    work: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    relationships: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    checklist: [PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER],
    weaknesses: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    career: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
  };
}

function safeGetPremiumTemperamentText(
  temperament: TemperamentId,
): TemperamentPremiumText {
  try {
    return getPremiumTemperamentText(temperament);
  } catch (error) {
    console.error(
      `[temperaments] failed to load premium text for "${temperament}". Falling back to placeholder.`,
      error,
    );
    return buildPremiumFallback(temperament);
  }
}

export function buildTemperamentsReport(entry: StoredResult): TemperamentReport {
  const normalizedScores = entry.results
    .filter((result) => isTemperamentId(result.groupId))
    .map((result) => ({
      ...result,
      average: normalizeAvgTo0to10(result.average, 1, 7),
    })) as TemperamentScore[];

  const { primary, secondary } = TEMPERAMENT_TEXTS.detectTemperament(
    normalizedScores,
  );

  if (!primary) {
    throw new Error('Unable to determine primary temperament.');
  }

  const primaryId = resolveTemperamentId(primary);
  if (!primaryId) {
    throw new Error('Unknown primary temperament id.');
  }

  const secondaryId = resolveTemperamentId(secondary);

  const primaryPremium = safeGetPremiumTemperamentText(primaryId);
  const secondaryPremium = secondaryId
    ? safeGetPremiumTemperamentText(secondaryId)
    : null;

  const overallBlocks = withPremiumNarrative(
    TEMPERAMENT_TEXTS.buildIntro(primary, secondary),
    {
      id: 'temp-premium-overview-assets',
      access: 'premium',
      title: 'Mapa completo do seu temperamento (Premium)',
      body: composePremiumSection(
        primaryPremium.overview,
        secondaryPremium?.overview,
        secondaryId,
      ),
    },
  );

  const traitsBlocks = withPremiumNarrative(
    TEMPERAMENT_TEXTS.buildTraits(primary, secondary),
    {
      id: 'temp-premium-traits-assets',
      access: 'premium',
      title: 'Forcas e fragilidades predominantes (Premium)',
      body: `${composePremiumSection(
        primaryPremium.strengths,
        secondaryPremium?.strengths,
        secondaryId,
      )} ${composePremiumSection(
        primaryPremium.weaknesses,
        secondaryPremium?.weaknesses,
        secondaryId,
      )}`,
    },
  );

  const careerBlocks = withPremiumNarrative(
    TEMPERAMENT_TEXTS.buildCareer(primary, secondary),
    {
      id: 'temp-premium-career-assets',
      access: 'premium',
      title: 'Carreira e ambiente de trabalho (Premium)',
      body: composePremiumSection(
        primaryPremium.career,
        secondaryPremium?.career,
        secondaryId,
      ),
    },
  );

  const growthBlocks = withPremiumNarrative(
    TEMPERAMENT_TEXTS.buildGrowth(primary, secondary),
    {
      id: 'temp-premium-growth-assets',
      access: 'premium',
      title: 'Praticas de crescimento (Premium)',
      body: composePremiumSection(
        primaryPremium.practices,
        secondaryPremium?.practices,
        secondaryId,
      ),
    },
  );

  const relationshipsBlocks = withPremiumNarrative(
    TEMPERAMENT_TEXTS.buildRelationships(primary, secondary),
    {
      id: 'temp-premium-relationships-assets',
      access: 'premium',
      title: 'Relacionamentos e vinculos (Premium)',
      body: composePremiumSection(
        primaryPremium.relationships,
        secondaryPremium?.relationships,
        secondaryId,
      ),
    },
  );

  relationshipsBlocks.push({
    id: 'temp-premium-checklist',
    access: 'premium',
    title: 'Checklist pratico (resumo)',
    body:
      'Resumo pratico para aplicar no dia a dia, consolidando forcas, riscos e ajustes prioritarios.',
    content: {
      kind: 'bullets',
      bullets: primaryPremium.checklist.slice(0, 5),
    },
  });

  return {
    kind: 'temperaments',
    sessionId: entry.id,
    temperament: {
      scores: normalizedScores,
      primary,
      secondary: secondary ?? undefined,
    },
    overall: {
      title: TEMPERAMENT_TEXTS.buildTitle(primary, secondary),
      subtitle: TEMPERAMENT_TEXTS.buildSubtitle(primary, secondary),
      blocks: overallBlocks,
    },
    traits: { blocks: traitsBlocks },
    career: { blocks: careerBlocks },
    growth: { blocks: growthBlocks },
    relationships: { blocks: relationshipsBlocks },
  };
}
