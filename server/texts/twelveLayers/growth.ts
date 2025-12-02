// server/texts/twelveLayers/growth.ts
import type { ResultBlock } from '~/types/results';
import type { LayerScore } from './layers';
import { listNames } from './layers';

export const GROWTH_TEXTS = {
  buildFromLayers(
    top3: LayerScore[],
    bottom3: LayerScore[],
  ): ResultBlock[] {
    const blocks: ResultBlock[] = [];

    blocks.push({
      id: 'growth-resources',
      access: 'free',
      title: 'Recursos internos e pontos de apoio',
      body:
        `As camadas mais fortes (${listNames(
          top3,
        )}) revelam recursos internos que você já possui: disposições que, ` +
        `quando bem orientadas, sustentam resiliência, confiança e determinação. ` +
        `Trabalhar virtudes ligadas a essas camadas costuma gerar crescimento rápido e estável.`,
    });

    blocks.push({
      id: 'growth-energy',
      access: 'free',
      title: 'O que te dá energia e o que te esgota',
      body:
        `Situações que ativam sobretudo ${listNames(
          top3,
        )} tendem a renovar suas forças e trazer sensação de sentido. ` +
        `Por outro lado, contextos que exigem intensamente ${listNames(
          bottom3,
        )} sem pausas nem apoio costumam drenar você com mais facilidade.\n\n` +
        `Perceber isso ajuda a organizar melhor a rotina, balancear compromissos e aprender a dizer “sim” e “não” com mais clareza.`,
    });

    blocks.push({
      id: 'growth-premium',
      access: 'premium',
      title: 'Plano de crescimento em etapas (Premium)',
      body:
        'No relatório em PDF você terá um plano de crescimento dividido em etapas, mostrando como consolidar ' +
        'suas camadas mais fortes, fortalecer as mais frágeis e integrar tudo num caminho realista de maturidade ' +
        'afetiva, intelectual e espiritual.',
    });

    return blocks;
  },
};
