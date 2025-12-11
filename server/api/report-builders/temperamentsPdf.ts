// server/api/report-builders/temperamentsPdf.ts
import type { StoredResult } from '../results.post';
import { buildCholericPdfProfile } from './temperamentsPdf.choleric';
import { buildSanguinePdfProfile } from './temperamentsPdf.sanguine';
import { buildMelancholicPdfProfile } from './temperamentsPdf.melancholic';

export type TemperamentId = 'choleric' | 'melancholic' | 'sanguine' | 'phlegmatic';

export interface TemperamentProfile {
  label: string;
  overview: string;
  strengths: string[];
  risks: string[];
  work: string[];
  relationships: string[];
  family: string[];
  spiritual: string[];
}

export interface TemperamentsBuilderContext {
  main: { id: TemperamentId; average: number };
  secondary: { id: TemperamentId; average: number } | null;
}

export type TemperamentProfileBuilder = (
  ctx: TemperamentsBuilderContext,
) => TemperamentProfile;

export const TEMPERAMENT_LABELS: Record<TemperamentId, string> = {
  choleric: 'Colérico',
  melancholic: 'Melancólico',
  sanguine: 'Sanguíneo',
  phlegmatic: 'Fleumático',
};

// ---------------------------------------------------------------------------
// Perfil estático apenas para fleumático.
// Colérico, sanguíneo e melancólico têm builders dinâmicos em arquivos separados.
// ---------------------------------------------------------------------------
const STATIC_TEMPERAMENT_PROFILES: Record<'phlegmatic', TemperamentProfile> = {
  phlegmatic: {
    label: 'Fleumático',
    overview:
      'O fleumático é tranquilo, estável e conciliador. Prefere harmonia a conflito e tem facilidade em escutar e manter a paz. ' +
      'Seu ritmo é constante e sua presença tende a ser serena, mesmo em contextos de tensão. Gosta de estabilidade, evita exageros e raramente reage de forma impulsiva, ' +
      'o que o torna um ponto de equilíbrio em ambientes agitados.',
    strengths: [
      'Calma em situações tensas, ajudando a estabilizar o ambiente e reduzir a ansiedade coletiva.',
      'Capacidade de ouvir com paciência, ponderar diferentes pontos de vista e evitar julgamentos precipitados.',
      'Constância: tende a manter compromissos por longo prazo, sem grandes oscilações de humor ou de desempenho.',
      'Flexibilidade para adaptar-se a estilos diferentes de pessoas e liderança, sem necessidade de controlar tudo.',
      'Tendência a evitar extremos: dificilmente se deixa levar por paixões desordenadas ou decisões impulsivas.',
      'Boa capacidade de cooperação: prefere construir em conjunto a competir por destaque.',
    ],
    risks: [
      'Tendência à procrastinação e à inércia quando algo exige esforço extra, adiando o que é desconfortável.',
      'Pode evitar conflitos importantes, deixando decisões em aberto por muito tempo para não enfrentar tensões.',
      'Risco de se acomodar em situações medianas por medo de perder estabilidade, mesmo quando poderia crescer mais.',
      'Dificuldade de expressar o que realmente pensa, cedendo demais para evitar atrito ou desaprovação.',
      'Pode ser percebido como indiferente ou desmotivado, quando na verdade está apenas preservando energia.',
      'Perigo de viver no “modo mínimo”: fazer somente o necessário, sem ousar metas mais altas.',
    ],
    work: [
      'Funciona bem em ambientes previsíveis, estáveis e com clima respeitoso, sem mudanças bruscas constantes.',
      'É excelente em funções de suporte, coordenação tranquila, manutenção de processos e acompanhamento sereno.',
      'Pode precisar de ajuda externa para definir prioridades, sair da zona de conforto e assumir desafios maiores.',
      'Quando devidamente motivado, entrega trabalho de forma serena, consistente e confiável por longos períodos.',
      'Tem facilidade para trabalhos que exigem rotina, paciência e constância, sem necessidade de adrenalina ou competição.',
      'Costuma ser leal à instituição ou equipe, preferindo permanecer em lugares onde se sente seguro e acolhido.',
    ],
    relationships: [
      'Transmite segurança emocional e é visto como alguém “fácil de conviver”, que não cria drama nem tensão desnecessária.',
      'Pode esconder incômodos para não gerar conflito, acumulando ressentimento silencioso ao longo do tempo.',
      'Valoriza relações sem drama, com diálogo simples, previsibilidade e respeito mútuo.',
      'Precisa aprender a se posicionar com mais clareza e firmeza quando necessário, sem medo de desapontar o outro.',
      'Costuma ser um bom mediador de conflitos, justamente por não ter necessidade de vencer discussões.',
      'Tende a manter longas amizades e vínculos familiares, mesmo com poucas demonstrações efusivas de afeto.',
    ],
    family: [
      'Ajuda a manter um clima de paz, rotina e previsibilidade dentro de casa, evitando explosões e imposições bruscas.',
      'Pode deixar decisões importantes nas mãos dos outros para evitar desgaste, sobrecarregando cônjuge ou familiares.',
      'É estável, presente e pouco dado a explosões emocionais, o que dá sensação de segurança aos que convivem com ele.',
      'Precisa ser provocado a participar ativamente das decisões e da educação dos filhos, e não apenas concordar com tudo.',
      'Tende a ser paciente com falhas dos outros, mas pode deixar de corrigir o que realmente precisaria ser ajustado.',
      'Valoriza momentos simples em família, sem necessidade de grandes eventos ou demonstrações grandiosas.',
    ],
    spiritual: [
      'Tem facilidade para uma vida espiritual de rotina e fidelidade discreta, com práticas constantes ao longo dos anos.',
      'Pode cair em acomodação espiritual, praticando o mínimo sem buscar crescimento interior mais profundo.',
      'Beneficia-se de metas espirituais simples mas claras (por exemplo, frequência aos sacramentos, oração diária breve e fiel).',
      'Quando amadurecido, torna-se um fiel silencioso, firme e perseverante, sustentando outras almas com sua constância.',
      'Precisa ser encorajado a sair da “tibieza”, pedindo ao Espírito Santo mais coragem, ardor e generosidade.',
      'Seu equilíbrio natural pode ser colocado a serviço da paz e da unidade na comunidade, tornando-se presença pacificadora.',
    ],
  },
};

// ---------------------------------------------------------------------------
// Mapa de builders: colérico, sanguíneo e melancólico são dinâmicos;
// fleumático usa perfil estático.
// ---------------------------------------------------------------------------
const TEMPERAMENT_BUILDERS: Record<TemperamentId, TemperamentProfileBuilder> = {
  choleric: buildCholericPdfProfile,
  sanguine: buildSanguinePdfProfile,
  melancholic: buildMelancholicPdfProfile,
  phlegmatic: () => STATIC_TEMPERAMENT_PROFILES.phlegmatic,
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
      name: r.name,
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
