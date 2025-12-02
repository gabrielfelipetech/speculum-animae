// server/texts/twelveLayers/layers.ts
import type { ResultBlock } from '~/types/results';

export interface LayerScore {
  groupId: string;
  name: string;
  average: number;
}

export function listNames(items: { name: string }[]): string {
  if (!items.length) return '';
  if (items.length === 1) return items[0].name;
  if (items.length === 2) return `${items[0].name} e ${items[1].name}`;
  const allButLast = items.slice(0, -1).map((i) => i.name).join(', ');
  const last = items[items.length - 1].name;
  return `${allButLast} e ${last}`;
}

export function intensityLabel(score: number): string {
  if (score >= 6) return 'muito alta';
  if (score >= 5) return 'alta';
  if (score >= 4) return 'moderada';
  if (score >= 3) return 'equilibrada';
  if (score >= 2) return 'baixa';
  return 'muito baixa';
}

export const LAYER_TEXTS = {
  buildTitle(top3: LayerScore[]): string {
    const main = top3[0];
    return main
      ? `Seu perfil nas 12 camadas: foco em ${main.name}`
      : 'Seu perfil nas 12 camadas da personalidade';
  },

  buildSubtitle(top3: LayerScore[], bottom3: LayerScore[]): string {
    const fortes = listNames(top3);
    const fracas = listNames(bottom3);
    return (
      `Este retrato foi construído a partir das suas respostas no teste das 12 camadas. ` +
      `As camadas que aparecem com mais força em você são ${fortes}. ` +
      `Já as que exigem mais atenção e cuidado são ${fracas}.`
    );
  },

  buildIntro(top3: LayerScore[], bottom3: LayerScore[]): string {
    return (
      `As 12 camadas da personalidade funcionam como doze lentes pelas quais você enxerga a si mesmo, ` +
      `as pessoas e o mundo. Em você, as camadas ${listNames(
        top3,
      )} aparecem como fontes claras de energia, iniciativa e motivação. ` +
      `São dimensões em que você sente mais segurança para agir e tomar decisões, mesmo em contextos de pressão.\n\n` +
      `Por outro lado, camadas como ${listNames(
        bottom3,
      )} aparecem mais frágeis ou silenciosas. Elas não são defeitos, mas áreas em que você tende a sentir ` +
      `menos espontaneidade ou confiança. Quando a vida exige demais dessas dimensões, é comum surgir cansaso, ` +
      `procrastinação ou sensação de inadequação.`
    );
  },

  buildShadow(top3: LayerScore[], bottom3: LayerScore[]): string {
    return (
      `Todo ponto forte, se não é bem integrado, pode virar ponto cego. ` +
      `Quando as camadas ${listNames(
        top3,
      )} ficam desproporcionais, você pode exagerar justamente nas qualidades que mais admira em si mesmo: ` +
      `firmeza que vira rigidez, liberdade que vira fuga de compromissos, sensibilidade que vira drama, ` +
      `inteligência que vira ironia.\n\n` +
      `As camadas mais fracas (${listNames(
        bottom3,
      )}) costumam ficar na “sombra”: você evita situações que as exigem, ou reage com defensividade quando alguém ` +
      `toca nesses pontos. Reconhecer essas sombras é o início de um crescimento realmente adulto.`
    );
  },

  describeTopLayers(top3: LayerScore[]): string {
    return top3
      .map((layer) => {
        const level = intensityLabel(layer.average);
        return (
          `• ${layer.name}: aparece em você com intensidade ${level} ` +
          `(média ${layer.average.toFixed(
            2,
          )} na escala de 1 a 7). Essa camada tende a ser uma das primeiras a se manifestar ` +
          `quando você precisa tomar decisões importantes, lidar com conflitos ou iniciar projetos.`
        );
      })
      .join('\n');
  },

  describeBottomLayers(bottom3: LayerScore[]): string {
    return bottom3
      .map((layer) => {
        const level = intensityLabel(layer.average);
        return (
          `• ${layer.name}: surge com intensidade ${level}. ` +
          `Nessa dimensão você tende a sentir mais insegurança, cansaço ou resistência interior. ` +
          `Quando um ambiente exige demais dessa camada, sua energia costuma baixar mais rápido.`
        );
      })
      .join('\n');
  },
};
