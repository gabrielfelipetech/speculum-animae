// server/texts/twelveLayers/relationships.ts
import type { ResultBlock } from '~/types/results';
import type { LayerScore } from './layers';
import { listNames } from './layers';

export const REL_TEXTS = {
  buildFromLayers(
    top3: LayerScore[],
    bottom3: LayerScore[],
  ): ResultBlock[] {
    const blocks: ResultBlock[] = [];

    blocks.push({
      id: 'rel-overview',
      access: 'free',
      title: 'Como você se relaciona a partir das suas camadas',
      body:
        `Nos relacionamentos, as camadas mais fortes (${listNames(
          top3,
        )}) influenciam a forma como você demonstra autenticidade, lealdade, ` +
        `generosidade e inteligência emocional. São elas que sustentam a maneira como você escuta, acolhe, corrige ` +
        `e pede ajuda.`,
    });

    blocks.push({
      id: 'rel-fragilities',
      access: 'free',
      title: 'Onde os vínculos costumam doer mais',
      body:
        `As camadas em que você pontuou mais baixo (${listNames(
          bottom3,
        )}) revelam áreas onde podem surgir bloqueios, defesas exageradas ou ` +
        `mal-entendidos. Em momentos de tensão, é comum que justamente essas dimensões sejam colocadas à prova: ` +
        `capacidade de confiar, de permanecer, de pedir perdão ou de aceitar limites.`,
    });

    blocks.push({
      id: 'rel-premium',
      access: 'premium',
      title: 'Orientações práticas para amizades, família e afetividade (Premium)',
      body:
        'No relatório em PDF você encontrará orientações específicas de como o seu conjunto de camadas ' +
        'costuma se comportar em amizades, família e vida afetiva, com sugestões concretas para crescer em ' +
        'autenticidade, lealdade e caridade nas diferentes fases da vida.',
    });

    return blocks;
  },
};
