// server/texts/temperaments.ts
import type { ResultBlock, TemperamentScore } from './temperaments.shared';
import { intensityLabel } from './temperaments.shared';

import {
  buildCholericIntro,
  buildCholericTraits,
  buildCholericCareer,
  buildCholericGrowth,
  buildCholericRelationships,
} from './temperaments.choleric';

import {
  buildSanguineIntro,
  buildSanguineTraits,
  buildSanguineCareer,
  buildSanguineGrowth,
  buildSanguineRelationships,
} from './temperaments.sanguine';

import {
  buildPhlegmaticIntro,
  buildPhlegmaticTraits,
  buildPhlegmaticCareer,
  buildPhlegmaticGrowth,
  buildPhlegmaticRelationships,
} from './temperaments.phlegmatic';

export type { TemperamentScore } from './temperaments.shared';

export const TEMPERAMENT_TEXTS = {
  detectTemperament(results: TemperamentScore[]) {
    const sorted = [...results].sort((a, b) => b.average - a.average);
    const primary = sorted[0];
    const secondary = sorted[1];
    return { primary, secondary };
  },

  buildTitle(primary: TemperamentScore, secondary?: TemperamentScore) {
    if (!primary) return 'Seu perfil de temperamento';

    if (secondary) {
      return `Seu perfil de temperamento: ${primary.name} com traços de ${secondary.name}`;
    }

    return `Seu perfil de temperamento: ${primary.name}`;
  },

  buildSubtitle(primary: TemperamentScore, secondary?: TemperamentScore) {
    if (!primary) {
      return 'Retrato de temperamento construído a partir das suas respostas.';
    }

    if (secondary) {
      return (
        `Este retrato foi construído a partir do teste de temperamentos, ` +
        `mostrando como a combinação entre ${primary.name} (mais forte) e ${secondary.name} ` +
        `aparece na forma como você sente, decide e se relaciona.`
      );
    }

    return (
      `Este retrato foi construído a partir do teste de temperamentos, ` +
      `mostrando como o temperamento ${primary.name} influencia seu modo de agir, reagir e se relacionar.`
    );
  },

  // -------------------------------------------------------------------------
  // INTRO / OVERVIEW
  // -------------------------------------------------------------------------
  buildIntro(
    primary: TemperamentScore,
    secondary?: TemperamentScore,
  ): ResultBlock[] {
    if (!primary) {
      return [
        {
          id: 'temp-overview-generic',
          access: 'free',
          title: 'Seu perfil de temperamento',
          body:
            'Retrato de temperamento construído a partir das suas respostas, indicando tendências estáveis de reação, ' +
            'ritmo, sensibilidade e modo de buscar segurança.',
        },
      ];
    }

    switch (primary.groupId) {
      case 'choleric':
        return buildCholericIntro(primary, secondary);
      case 'sanguine':
        return buildSanguineIntro(primary, secondary);
      case 'phlegmatic':
        return buildPhlegmaticIntro(primary, secondary);
      default:
        break;
    }

    const blocks: ResultBlock[] = [];
    const comboText = secondary
      ? `Seu temperamento predominante é ${primary.name}, com influência significativa de ${secondary.name}.`
      : `Seu temperamento predominante é ${primary.name}.`;

    blocks.push({
      id: 'temp-overview',
      access: 'free',
      title: 'Seu perfil de temperamento',
      body:
        `${comboText}\n\n` +
        `Na prática, isso significa que as características clássicas desse temperamento aparecem em você ` +
        `com intensidade ${intensityLabel(primary.average)}. A forma como você reage sob pressão, toma decisões, ` +
        `se comunica e organiza a vida diária passa fortemente por esse eixo.\n\n` +
        `O temperamento não é uma “caixinha” que define tudo, mas um mapa de tendências estáveis: ` +
        `impulsos, ritmos, fragilidades e formas de buscar segurança.`,
    });

    if (secondary) {
      blocks.push({
        id: 'temp-combo',
        access: 'free',
        title: 'Como a combinação de temperamentos aparece em você',
        body:
          `A combinação entre ${primary.name} e ${secondary.name} torna o seu perfil mais complexo e rico. ` +
          `Em alguns momentos você atua como um ${primary.name} típico; em outros, a influência de ${secondary.name} ` +
          `traz nuances de sensibilidade, prudência, estabilidade ou expansividade, dependendo da mistura específica.\n\n` +
          `Isso explica por que você não se vê totalmente em descrições simplistas de um único temperamento.`,
      });
    }

    blocks.push({
      id: 'temp-premium-overview',
      access: 'premium',
      title: 'Mapa completo do seu temperamento (Premium)',
      body:
        'No relatório em PDF você verá a leitura detalhada de cada temperamento presente em você, ' +
        'com exemplos concretos de situações do dia a dia em que essas tendências aparecem — inclusive como elas mudam ' +
        'quando você está descansado, cansado, sob pressão ou em paz.',
    });

    return blocks;
  },

  // -------------------------------------------------------------------------
  // TRAÇOS / PERSONALIDADE
  // -------------------------------------------------------------------------
  buildTraits(
    primary: TemperamentScore,
    secondary?: TemperamentScore,
  ): ResultBlock[] {
    if (!primary) return [];

    switch (primary.groupId) {
      case 'choleric':
        return buildCholericTraits(primary, secondary);
      case 'sanguine':
        return buildSanguineTraits(primary, secondary);
      case 'phlegmatic':
        return buildPhlegmaticTraits(primary, secondary);
      default:
        break;
    }

    const blocks: ResultBlock[] = [];

    blocks.push({
      id: 'temp-traits-core',
      access: 'free',
      title: 'Traços centrais de personalidade',
      body:
        `O núcleo do seu temperamento é marcado por traços associados a ${primary.name}. ` +
        `Eles aparecem na rapidez das suas reações, na forma de expressar emoções e na energia que você leva para os ambientes.\n\n` +
        `Pessoas com esse temperamento costumam sentir com força o que vivem, sejam entusiasmos ou irritações. ` +
        `O jeito de impor presença, mesmo em silêncio, muitas vezes é percebido por quem convive com você.`,
    });

    if (secondary) {
      blocks.push({
        id: 'temp-traits-secondary',
        access: 'free',
        title: 'Como o temperamento secundário modifica o seu jeito',
        body:
          `A presença de ${secondary.name} como temperamento secundário atua como um “filtro” sobre o principal. ` +
          `Em algumas situações você reage de forma típica de ${primary.name}; em outras, a marca de ${secondary.name} ` +
          `aparece com mais força, tornando-o mais reservado, mais diplomático, mais estável ou mais emotivo.\n\n` +
          `Essa alternância não é incoerência; é justamente a riqueza do seu perfil.`,
      });
    }

    blocks.push({
      id: 'temp-traits-premium',
      access: 'premium',
      title: 'Análise completa dos traços (Premium)',
      body:
        'No relatório em PDF você encontrará uma leitura organizada dos principais traços do seu temperamento ' +
        '(influência, ritmo, estabilidade, sensibilidade, foco, iniciativa etc.), comentando como cada um aparece ' +
        'na sua história concreta.',
    });

    return blocks;
  },

  // -------------------------------------------------------------------------
  // CARREIRA / TRABALHO
  // -------------------------------------------------------------------------
  buildCareer(
    primary: TemperamentScore,
    secondary?: TemperamentScore,
  ): ResultBlock[] {
    if (!primary) return [];

    switch (primary.groupId) {
      case 'choleric':
        return buildCholericCareer(primary, secondary);
      case 'sanguine':
        return buildSanguineCareer(primary, secondary);
      case 'phlegmatic':
        return buildPhlegmaticCareer(primary, secondary);
      default:
        break;
    }

    const blocks: ResultBlock[] = [];

    blocks.push({
      id: 'temp-career-style',
      access: 'free',
      title: 'Estilo de trabalho e produtividade',
      body:
        `Seu temperamento influencia fortemente a forma como você organiza tarefas, lida com prazos e responde a cobranças.\n\n` +
        `No padrão de ${primary.name}, é comum ter um jeito muito próprio de começar projetos, mantê-los e finalizá-los. ` +
        `Quando o ambiente respeita esse ritmo, sua produtividade cresce; quando o contradiz o tempo todo, surgem ` +
        `procrastinação, irritação ou desligamento.`,
    });

    blocks.push({
      id: 'temp-career-motivation',
      access: 'free',
      title: 'Ambição, motivação e desejo de liderar',
      body:
        `Certos temperamentos buscam naturalmente protagonismo; outros preferem contribuir nos bastidores. ` +
        `O seu teste aponta que o eixo ligado a ambição e motivação segue o padrão de ${primary.name}, ` +
        `o que influencia o quanto você se sente vivo ao receber desafios, metas claras ou espaço de autonomia.`,
    });

    if (secondary) {
      blocks.push({
        id: 'temp-career-combo',
        access: 'free',
        title: 'Combinação de temperamentos na carreira',
        body:
          `A mistura entre ${primary.name} e ${secondary.name} pode gerar um profissional que alterna entre ` +
          `grande iniciativa e períodos de maior cautela, análise ou sensibilidade. Quando essa combinação está ` +
          `integrada, você equilibra ação e prudência; quando não está, pode oscilar entre agir demais sem pensar ` +
          `ou pensar demais sem agir.`,
      });
    }

    blocks.push({
      id: 'temp-career-premium',
      access: 'premium',
      title: 'Caminhos profissionais alinhados ao seu temperamento (Premium)',
      body:
        'No relatório em PDF você terá exemplos de tipos de função e ambiente que costumam dialogar melhor com o seu ' +
        'temperamento (gestão, bastidores, pesquisa, atendimento, áreas criativas, planejamento estratégico etc.), ' +
        'bem como alertas sobre contextos que tendem a drenar muito a sua energia.',
    });

    return blocks;
  },

  // -------------------------------------------------------------------------
  // CRESCIMENTO / VIRTUDES
  // -------------------------------------------------------------------------
  buildGrowth(
    primary: TemperamentScore,
    secondary?: TemperamentScore,
  ): ResultBlock[] {
    if (!primary) return [];

    switch (primary.groupId) {
      case 'choleric':
        return buildCholericGrowth(primary, secondary);
      case 'sanguine':
        return buildSanguineGrowth(primary, secondary);
      case 'phlegmatic':
        return buildPhlegmaticGrowth(primary, secondary);
      default:
        break;
    }

    const blocks: ResultBlock[] = [];

    blocks.push({
      id: 'temp-growth-stress',
      access: 'free',
      title: 'Reação ao estresse e às crises',
      body:
        `Sob pressão, o temperamento ${primary.name} costuma aparecer com ainda mais nitidez. ` +
        `Algumas emoções são amplificadas (raiva, ansiedade, tristeza, apatia), e certos comportamentos automáticos ` +
        `se repetem (falar demais, se fechar, querer resolver tudo na hora, fugir de conflitos etc.).\n\n` +
        `Aprender a reconhecer esses sinais precoces é fundamental para evitar explosões ou implosões emocionais.`,
    });

    if (secondary) {
      blocks.push({
        id: 'temp-growth-hidden',
        access: 'free',
        title: 'Tendências ocultas em momentos de crise',
        body:
          `Em crises mais profundas, o temperamento secundário ${secondary.name} também entra em cena: ` +
          `você pode se perceber mais impulsivo, mais frio, mais dramático ou mais distante do que o habitual. ` +
          `Essa mudança não é falsidade, mas um modo de defesa. Quanto mais consciência você tem disso, mais consegue ` +
          `pedir ajuda e escolher respostas maduras.`,
      });
    }

    blocks.push({
      id: 'temp-growth-virtues',
      access: 'free',
      title: 'Virtudes que equilibram o seu temperamento',
      body:
        'Cada temperamento tem virtudes que surgem com facilidade e virtudes que exigem mais esforço. ' +
        'Parte do crescimento passa por fortalecer justamente aquilo que corrige os exageros típicos do seu perfil, ' +
        'sem sufocar o que há de bom nele.',
    });

    blocks.push({
      id: 'temp-growth-premium',
      access: 'premium',
      title: 'Plano de crescimento por etapas (Premium)',
      body:
        'No relatório em PDF você encontrará um plano em etapas adaptado ao seu temperamento, com exercícios práticos, ' +
        'pontos de exame de consciência e atitudes diárias para canalizar sua energia para o bem.',
    });

    return blocks;
  },

  // -------------------------------------------------------------------------
  // RELACIONAMENTOS
  // -------------------------------------------------------------------------
  buildRelationships(
    primary: TemperamentScore,
    secondary?: TemperamentScore,
  ): ResultBlock[] {
    if (!primary) return [];

    switch (primary.groupId) {
      case 'choleric':
        return buildCholericRelationships(primary, secondary);
      case 'sanguine':
        return buildSanguineRelationships(primary, secondary);
      case 'phlegmatic':
        return buildPhlegmaticRelationships(primary, secondary);
      default:
        break;
    }

    const blocks: ResultBlock[] = [];

    blocks.push({
      id: 'temp-rel-dynamics',
      access: 'free',
      title: 'Dinâmica dos seus relacionamentos',
      body:
        `Seu temperamento influencia como você demonstra carinho, o quanto precisa de proximidade ou espaço e ` +
        `como reage a conflitos. O temperamento ${primary.name} tem um estilo típico de lidar com amizade, família ` +
        `e afetividade (mais intenso, mais estável, mais sensível, mais reservado etc.).`,
    });

    if (secondary) {
      blocks.push({
        id: 'temp-rel-mix',
        access: 'free',
        title: 'Impacto da combinação nas relações',
        body:
          `A combinação entre ${primary.name} e ${secondary.name} pode fazer você alternar entre momentos de grande ` +
          `presença e períodos de recolhimento. Algumas pessoas percebem você como muito forte; outras enxergam um lado ` +
          `mais vulnerável que poucos conhecem. Entender essa dinâmica ajuda a comunicar melhor o que você sente.`,
      });
    }

    blocks.push({
      id: 'temp-rel-premium',
      access: 'premium',
      title: 'Orientações para amizades, família e vida afetiva (Premium)',
      body:
        'No relatório em PDF você terá orientações específicas para cada tipo de relação — amizades, família, ' +
        'namoro/casamento — mostrando como o seu temperamento costuma reagir em cada contexto e quais atitudes ajudam ' +
        'a construir vínculos mais maduros e estáveis.',
    });

    return blocks;
  },
};
