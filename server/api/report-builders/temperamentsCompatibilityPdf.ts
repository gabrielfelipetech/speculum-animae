import type { StoredResult } from '../results.post';
import {
  TEMPERAMENT_LABELS_PT,
  isTemperamentId,
  type TemperamentId,
} from '../../texts/premiumTemperaments';
import { normalizeAvgTo0to10 } from '../../../src/shared/engine/scoring';

export type CompatibilityScore = {
  id: TemperamentId;
  name: string;
  score: number;
};

export type CompatibilityPdfContent = {
  primary: CompatibilityScore;
  secondary: CompatibilityScore;
  scoresOrdered: CompatibilityScore[];
  overview: string;
  pairDynamics: { title: string; body: string }[];
  frictionStrategies: string[];
  practicalAgreements: string[];
};

function buildPairDynamics(primary: CompatibilityScore, secondary: CompatibilityScore) {
  return [
    {
      title: '2.1 Ritmo de decisao do par',
      body:
        `Quando ${primary.name} assume o comando relacional, o ritmo tende a ser mais rapido e diretivo. ` +
        `${secondary.name} adiciona modulacao de contexto e ajuda a evitar respostas impulsivas.`,
    },
    {
      title: '2.2 Comunicacao em conflito',
      body:
        `${primary.name} tende a priorizar clareza objetiva, enquanto ${secondary.name} tende a preservar estabilidade emocional. ` +
        'A combinacao funciona melhor com regras explicitas de escuta e tempo de resposta.',
    },
    {
      title: '2.3 Distribuicao de responsabilidades',
      body:
        `O par ganha eficiencia quando ${primary.name} lidera frentes de decisao e ${secondary.name} sustenta continuidade e acompanhamento. ` +
        'Essa divisao reduz sobrecarga e melhora previsibilidade.',
    },
    {
      title: '2.4 Sinais de desgaste e recuperacao',
      body:
        'Em semanas de alta pressao, o casal precisa revisar energia, irritabilidade, ruido de comunicacao e qualidade de acordos praticos. ' +
        'Ajustes curtos e frequentes evitam acumulacao de atritos.',
    },
  ];
}

export function buildTemperamentsCompatibilityPdfContent(
  entry: StoredResult,
): CompatibilityPdfContent {
  const normalized = entry.results
    .filter((result) => isTemperamentId(result.groupId))
    .map((result) => ({
      id: result.groupId,
      name: TEMPERAMENT_LABELS_PT[result.groupId],
      score: normalizeAvgTo0to10(result.average, 1, 7),
    }))
    .sort((a, b) => b.score - a.score);

  if (normalized.length < 2) {
    throw new Error('Compatibility PDF requires at least two temperament scores.');
  }

  const primary = normalized[0];
  const secondary = normalized[1];
  const pairDynamics = buildPairDynamics(primary, secondary);

  return {
    primary,
    secondary,
    scoresOrdered: normalized,
    overview:
      `Compatibilidade dominante no eixo ${primary.name} + ${secondary.name}. ` +
      'A leitura considera intensidade relativa, distribuicao de papeis e pontos de ajuste para convivencia sustentavel.',
    pairDynamics,
    frictionStrategies: [
      'Definir janela semanal fixa para revisar atritos sem interrupcoes.',
      'Separar fatos observaveis de interpretacoes emocionais antes de decidir.',
      'Usar regra de pausa curta quando o tom da conversa ultrapassar limite combinado.',
      'Converter criticas recorrentes em acordos de comportamento com prazo de revisao.',
    ],
    practicalAgreements: [
      'Checklist de alinhamento semanal: prioridades, agenda, limites e suporte mutuo.',
      'Acordo de comunicacao: mensagens criticas sempre com contexto e proposta objetiva.',
      'Acordo de reparacao: toda conversa de conflito termina com proximo passo verificavel.',
      'Acordo de manutencao: manter um ritual de conexao de 20 minutos por dia.',
      'Acordo de revisao mensal: medir progresso dos combinados e ajustar pontos de friccao.',
    ],
  };
}
