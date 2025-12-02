// server/texts/twelveLayers/career.ts
import type { ResultBlock } from '~/types/results';
import type { LayerScore } from './layers';
import { listNames, intensityLabel } from './layers';

export const CAREER_TEXTS = {
  buildFromLayers(
    top3: LayerScore[],
    bottom3: LayerScore[],
  ): ResultBlock[] {
    const blocks: ResultBlock[] = [];

    blocks.push({
      id: 'career-overview',
      access: 'free',
      title: 'Como suas camadas impactam a carreira',
      body:
        `No trabalho, as camadas mais fortes (${listNames(
          top3,
        )}) se tornam os seus diferenciais naturais. ` +
        `São elas que sustentam a sensação de competência, foco e propósito quando o ambiente permite que você as use com liberdade.\n\n` +
        `Funções que exigem com frequência essas camadas costumam gerar entusiasmo e criatividade. ` +
        `Já contextos que ignoram completamente esses traços tendem a fazer você se sentir subaproveitado.`,
    });

    blocks.push({
      id: 'career-challenges',
      access: 'free',
      title: 'Quando o trabalho drena mais do que nutre',
      body:
        `As camadas mais frágeis (${listNames(
          bottom3,
        )}) mostram onde a rotina profissional tende a ser mais desgastante. ` +
        `Ambientes que exigem quase o tempo todo essas dimensões podem gerar sensação de “estar sempre no limite”.\n\n` +
        `Isso não significa que você seja incapaz nessas áreas, mas que provavelmente precisará de ` +
        `estruturas de apoio (processos claros, colegas complementares, pausas planejadas) para não viver em exaustão contínua.`,
    });

    // bloco premium com pistas de caminhos
    const fortePrincipal = top3[0];
    const level = fortePrincipal
      ? intensityLabel(fortePrincipal.average)
      : 'relevante';

    blocks.push({
      id: 'career-premium',
      access: 'premium',
      title: 'Sugestões de caminhos profissionais (Premium)',
      body:
        `No relatório completo em PDF você encontrará sugestões de tipos de função e ambiente profissional ` +
        `mais compatíveis com o conjunto de camadas que aparece em você. O foco especial recai sobre a camada ` +
        `${fortePrincipal ? fortePrincipal.name : 'dominante'}, que se manifesta com intensidade ${level}, ` +
        `mostrando em que contextos ela gera liderança, criatividade e senso de missão – e em que contextos ` +
        `ela se transforma em ansiedade ou sobrecarga.`,
    });

    return blocks;
  },
};
