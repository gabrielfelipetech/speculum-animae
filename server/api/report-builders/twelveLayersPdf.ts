import type { StoredResult } from '../results.post';
import { normalizeAvgTo0to10 } from '../../../src/shared/engine/scoring';

export type TwelveLayerPdfSection = {
  id: string;
  name: string;
  score: number;
  description: string;
  strengths: string;
  risks: string;
  practice: string;
};

export type TwelveLayersPdfContent = {
  title: string;
  subtitle: string;
  orderedScores: { id: string; name: string; score: number }[];
  topLayers: { id: string; name: string; score: number }[];
  bottomLayers: { id: string; name: string; score: number }[];
  sections: TwelveLayerPdfSection[];
  integratedReading: string;
  sevenDayPlan: string[];
  thirtyDayPlan: string[];
};

function describeScoreBand(score: number): string {
  if (score >= 8) return 'muito alta';
  if (score >= 6.5) return 'alta';
  if (score >= 5) return 'moderada';
  if (score >= 3.5) return 'equilibrada';
  return 'baixa';
}

function makeLayerSection(
  id: string,
  name: string,
  score: number,
): TwelveLayerPdfSection {
  const band = describeScoreBand(score);
  return {
    id,
    name,
    score,
    description:
      `${name} aparece com intensidade ${band} (${score.toFixed(2)}/10). ` +
      'Essa camada influencia o jeito como voce organiza energia, sentido e resposta a pressao no cotidiano.',
    strengths:
      `Quando ${name} esta bem integrada, ela sustenta constancia, discernimento e decisao pratica em contextos de exigencia progressiva.`,
    risks:
      `Se ${name} fica sem supervisao, pode haver excesso de rigidez, dispersao de prioridades ou desgaste silencioso por falta de ritmo sustentavel.`,
    practice:
      `Pratica sugerida para ${name}: definir um objetivo semanal observavel, revisar ao final do dia e registrar ajuste concreto para o ciclo seguinte.`,
  };
}

export function buildTwelveLayersPdfContent(entry: StoredResult): TwelveLayersPdfContent {
  const normalized = entry.results
    .map((result) => ({
      id: result.groupId,
      name: result.name,
      score: normalizeAvgTo0to10(result.average, 1, 7),
    }))
    .sort((a, b) => b.score - a.score);

  if (normalized.length === 0) {
    throw new Error('No layer scores available for twelve-layers PDF.');
  }

  const topLayers = normalized.slice(0, 3);
  const bottomLayers = normalized.slice(-3);
  const sections = normalized.map((layer) =>
    makeLayerSection(layer.id, layer.name, layer.score),
  );

  const integratedReading =
    `As camadas com maior presenca no seu perfil hoje sao ${topLayers
      .map((layer) => layer.name)
      .join(', ')}. ` +
    `As camadas que pedem reforco intencional sao ${bottomLayers
      .map((layer) => layer.name)
      .join(', ')}. ` +
    'A estrategia de crescimento mais estavel combina consolidacao das forcas com treino deliberado das camadas menos espontaneas.';

  return {
    title: entry.meta?.title ?? 'Relatorio das 12 camadas',
    subtitle:
      entry.meta?.subtitle ??
      'Analise detalhada por camada com plano de crescimento em ciclos de 7 e 30 dias.',
    orderedScores: normalized,
    topLayers,
    bottomLayers,
    sections,
    integratedReading,
    sevenDayPlan: [
      'Dia 1: listar 3 comportamentos observaveis das camadas mais fortes.',
      'Dia 2: escolher 1 camada fraca e definir um micro-habito de reforco.',
      'Dia 3: executar uma acao de foco profundo por 25 minutos sem interrupcoes.',
      'Dia 4: revisar relacoes entre energia, foco e contexto nas ultimas 24h.',
      'Dia 5: realizar conversa de alinhamento com um ponto de melhoria objetivo.',
      'Dia 6: consolidar rotina de descanso e manutencao de energia.',
      'Dia 7: fechar ciclo com avaliacao breve e priorizacao da semana seguinte.',
    ],
    thirtyDayPlan: [
      'Semana 1: consolidacao das camadas de maior intensidade com metas simples.',
      'Semana 2: reforco das camadas intermediarias com rotina de acompanhamento.',
      'Semana 3: foco nas camadas mais baixas com duas praticas objetivas por dia.',
      'Semana 4: revisao integrada do perfil e ajustes para o proximo ciclo.',
      'Checklist final: manter indicador semanal de energia, foco, relacoes e execucao.',
    ],
  };
}
