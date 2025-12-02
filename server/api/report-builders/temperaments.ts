// server/report-builders/temperaments.ts
import type { StoredResult } from '../results.post';
import type {
  TemperamentReport,
  ResultBlock,
} from '~/types/results';

import {
  TEMPERAMENT_TEXTS,
  type TemperamentScore,
} from '../../texts/temperaments';

export function buildTemperamentsReport(
  entry: StoredResult,
): TemperamentReport {
  const { primary, secondary } = TEMPERAMENT_TEXTS.detectTemperament(
    entry.results as TemperamentScore[],
  );

  if (!primary) {
    throw new Error('Não foi possível determinar o temperamento principal');
  }

  const overallBlocks: ResultBlock[] =
    TEMPERAMENT_TEXTS.buildIntro(primary, secondary);
  const traitsBlocks: ResultBlock[] =
    TEMPERAMENT_TEXTS.buildTraits(primary, secondary);
  const careerBlocks: ResultBlock[] =
    TEMPERAMENT_TEXTS.buildCareer(primary, secondary);
  const growthBlocks: ResultBlock[] =
    TEMPERAMENT_TEXTS.buildGrowth(primary, secondary);
  const relBlocks: ResultBlock[] =
    TEMPERAMENT_TEXTS.buildRelationships(primary, secondary);

  return {
    kind: 'temperaments',
    sessionId: entry.id,
    temperament: { primary, secondary },
    overall: {
      title: TEMPERAMENT_TEXTS.buildTitle(primary, secondary),
      subtitle: TEMPERAMENT_TEXTS.buildSubtitle(primary, secondary),
      blocks: overallBlocks,
    },
    traits: { blocks: traitsBlocks },
    career: { blocks: careerBlocks },
    growth: { blocks: growthBlocks },
    relationships: { blocks: relBlocks },
  };
}
