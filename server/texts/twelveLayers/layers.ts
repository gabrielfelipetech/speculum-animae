// server/texts/twelveLayers/layers.ts
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
  if (score >= 8) return 'muito alta';
  if (score >= 6.5) return 'alta';
  if (score >= 5) return 'moderada';
  if (score >= 3.5) return 'equilibrada';
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
      `Este retrato foi construÃ­do a partir das suas respostas no teste das 12 camadas. ` +
      `As camadas que aparecem com mais forÃ§a em vocÃª sÃ£o ${fortes}. ` +
      `JÃ¡ as que exigem mais atenÃ§Ã£o e cuidado sÃ£o ${fracas}.`
    );
  },

  buildIntro(top3: LayerScore[], bottom3: LayerScore[]): string {
    return (
      `As 12 camadas da personalidade funcionam como doze lentes pelas quais vocÃª enxerga a si mesmo, ` +
      `as pessoas e o mundo. Em vocÃª, as camadas ${listNames(
        top3,
      )} aparecem como fontes claras de energia, iniciativa e motivaÃ§Ã£o. ` +
      `SÃ£o dimensÃµes em que vocÃª sente mais seguranÃ§a para agir e tomar decisÃµes, mesmo em contextos de pressÃ£o.\n\n` +
      `Por outro lado, camadas como ${listNames(
        bottom3,
      )} aparecem mais frÃ¡geis ou silenciosas. Elas nÃ£o sÃ£o defeitos, mas Ã¡reas em que vocÃª tende a sentir ` +
      `menos espontaneidade ou confianÃ§a. Quando a vida exige demais dessas dimensÃµes, Ã© comum surgir cansaso, ` +
      `procrastinaÃ§Ã£o ou sensaÃ§Ã£o de inadequaÃ§Ã£o.`
    );
  },

  buildShadow(top3: LayerScore[], bottom3: LayerScore[]): string {
    return (
      `Todo ponto forte, se nÃ£o Ã© bem integrado, pode virar ponto cego. ` +
      `Quando as camadas ${listNames(
        top3,
      )} ficam desproporcionais, vocÃª pode exagerar justamente nas qualidades que mais admira em si mesmo: ` +
      `firmeza que vira rigidez, liberdade que vira fuga de compromissos, sensibilidade que vira drama, ` +
      `inteligÃªncia que vira ironia.\n\n` +
      `As camadas mais fracas (${listNames(
        bottom3,
      )}) costumam ficar na â€œsombraâ€: vocÃª evita situaÃ§Ãµes que as exigem, ou reage com defensividade quando alguÃ©m ` +
      `toca nesses pontos. Reconhecer essas sombras Ã© o inÃ­cio de um crescimento realmente adulto.`
    );
  },

  describeTopLayers(top3: LayerScore[]): string {
    return top3
      .map((layer) => {
        const level = intensityLabel(layer.average);
        return (
          `â€¢ ${layer.name}: aparece em vocÃª com intensidade ${level} ` +
          `(mÃ©dia ${layer.average.toFixed(
            2,
          )} na escala de 0 a 10). Essa camada tende a ser uma das primeiras a se manifestar ` +
          `quando vocÃª precisa tomar decisÃµes importantes, lidar com conflitos ou iniciar projetos.`
        );
      })
      .join('\n');
  },

  describeBottomLayers(bottom3: LayerScore[]): string {
    return bottom3
      .map((layer) => {
        const level = intensityLabel(layer.average);
        return (
          `â€¢ ${layer.name}: surge com intensidade ${level}. ` +
          `Nessa dimensÃ£o vocÃª tende a sentir mais inseguranÃ§a, cansaÃ§o ou resistÃªncia interior. ` +
          `Quando um ambiente exige demais dessa camada, sua energia costuma baixar mais rÃ¡pido.`
        );
      })
      .join('\n');
  },
};

