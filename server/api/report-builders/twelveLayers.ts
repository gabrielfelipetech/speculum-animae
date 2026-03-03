// server/report-builders/twelveLayers.ts
import type { StoredResult } from '../results.post';
import type {
  TwelveLayersReport,
  ResultBlock,
} from '~/types/results';

import {
  LAYER_TEXTS,
  type LayerScore,
} from '../../texts/twelveLayers/layers';
import { CAREER_TEXTS } from '../../texts/twelveLayers/career';
import { GROWTH_TEXTS } from '../../texts/twelveLayers/growth';
import { REL_TEXTS } from '../../texts/twelveLayers/relationships';
import { normalizeAvgTo0to10 } from '../../../src/shared/engine/scoring';

export function buildTwelveLayersReport(
  entry: StoredResult,
): TwelveLayersReport {
  const normalizedResults: LayerScore[] = entry.results.map((result) => ({
    ...result,
    average: normalizeAvgTo0to10(result.average, 1, 7),
  }));

  const sorted: LayerScore[] = [...normalizedResults].sort(
    (a, b) => b.average - a.average,
  );

  const top3 = sorted.slice(0, 3);
  const bottom3 = sorted.slice(-3);

  const overallBlocks: ResultBlock[] = [
    {
      id: 'intro-core',
      access: 'free',
      body: LAYER_TEXTS.buildIntro(top3, bottom3),
    },
    {
      id: 'intro-shadow',
      access: 'premium',
      body: LAYER_TEXTS.buildShadow(top3, bottom3),
    },
  ];

  const traitsBlocks: ResultBlock[] = [
    {
      id: 'traits-top',
      access: 'free',
      title: 'Suas camadas mais fortes',
      body: LAYER_TEXTS.describeTopLayers(top3),
    },
    {
      id: 'traits-bottom',
      access: 'premium',
      title: 'Camadas que pedem mais atenção',
      body: LAYER_TEXTS.describeBottomLayers(bottom3),
    },
  ];

  const graph = normalizedResults.map((r) => ({
    label: r.name,
    value: r.average,
  }));

  const careerBlocks = CAREER_TEXTS.buildFromLayers(top3, bottom3);
  const growthBlocks = GROWTH_TEXTS.buildFromLayers(top3, bottom3);
  const relationshipsBlocks = REL_TEXTS.buildFromLayers(
    top3,
    bottom3,
  );

  return {
    kind: 'twelveLayers',
    sessionId: entry.id,
    overall: {
      title: LAYER_TEXTS.buildTitle(top3),
      subtitle: LAYER_TEXTS.buildSubtitle(top3, bottom3),
      blocks: overallBlocks,
    },
    traits: {
      graph,
      blocks: traitsBlocks,
    },
    career: { blocks: careerBlocks },
    growth: { blocks: growthBlocks },
    relationships: { blocks: relationshipsBlocks },
  };
}
