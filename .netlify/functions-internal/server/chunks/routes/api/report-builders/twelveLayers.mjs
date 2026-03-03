import { n as normalizeAvgTo0to10 } from '../../../_/normalizeScale.mjs';

function listNames(items) {
  if (!items.length) return "";
  if (items.length === 1) return items[0].name;
  if (items.length === 2) return `${items[0].name} e ${items[1].name}`;
  const allButLast = items.slice(0, -1).map((i) => i.name).join(", ");
  const last = items[items.length - 1].name;
  return `${allButLast} e ${last}`;
}
function intensityLabel(score) {
  if (score >= 8) return "muito alta";
  if (score >= 6.5) return "alta";
  if (score >= 5) return "moderada";
  if (score >= 3.5) return "equilibrada";
  if (score >= 2) return "baixa";
  return "muito baixa";
}
const LAYER_TEXTS = {
  buildTitle(top3) {
    const main = top3[0];
    return main ? `Seu perfil nas 12 camadas: foco em ${main.name}` : "Seu perfil nas 12 camadas da personalidade";
  },
  buildSubtitle(top3, bottom3) {
    const fortes = listNames(top3);
    const fracas = listNames(bottom3);
    return `Este retrato foi constru\xC3\xADdo a partir das suas respostas no teste das 12 camadas. As camadas que aparecem com mais for\xC3\xA7a em voc\xC3\xAA s\xC3\xA3o ${fortes}. J\xC3\xA1 as que exigem mais aten\xC3\xA7\xC3\xA3o e cuidado s\xC3\xA3o ${fracas}.`;
  },
  buildIntro(top3, bottom3) {
    return `As 12 camadas da personalidade funcionam como doze lentes pelas quais voc\xC3\xAA enxerga a si mesmo, as pessoas e o mundo. Em voc\xC3\xAA, as camadas ${listNames(
      top3
    )} aparecem como fontes claras de energia, iniciativa e motiva\xC3\xA7\xC3\xA3o. S\xC3\xA3o dimens\xC3\xB5es em que voc\xC3\xAA sente mais seguran\xC3\xA7a para agir e tomar decis\xC3\xB5es, mesmo em contextos de press\xC3\xA3o.

Por outro lado, camadas como ${listNames(
      bottom3
    )} aparecem mais fr\xC3\xA1geis ou silenciosas. Elas n\xC3\xA3o s\xC3\xA3o defeitos, mas \xC3\xA1reas em que voc\xC3\xAA tende a sentir menos espontaneidade ou confian\xC3\xA7a. Quando a vida exige demais dessas dimens\xC3\xB5es, \xC3\xA9 comum surgir cansaso, procrastina\xC3\xA7\xC3\xA3o ou sensa\xC3\xA7\xC3\xA3o de inadequa\xC3\xA7\xC3\xA3o.`;
  },
  buildShadow(top3, bottom3) {
    return `Todo ponto forte, se n\xC3\xA3o \xC3\xA9 bem integrado, pode virar ponto cego. Quando as camadas ${listNames(
      top3
    )} ficam desproporcionais, voc\xC3\xAA pode exagerar justamente nas qualidades que mais admira em si mesmo: firmeza que vira rigidez, liberdade que vira fuga de compromissos, sensibilidade que vira drama, intelig\xC3\xAAncia que vira ironia.

As camadas mais fracas (${listNames(
      bottom3
    )}) costumam ficar na \xE2\u20AC\u0153sombra\xE2\u20AC\x9D: voc\xC3\xAA evita situa\xC3\xA7\xC3\xB5es que as exigem, ou reage com defensividade quando algu\xC3\xA9m toca nesses pontos. Reconhecer essas sombras \xC3\xA9 o in\xC3\xADcio de um crescimento realmente adulto.`;
  },
  describeTopLayers(top3) {
    return top3.map((layer) => {
      const level = intensityLabel(layer.average);
      return `\xE2\u20AC\xA2 ${layer.name}: aparece em voc\xC3\xAA com intensidade ${level} (m\xC3\xA9dia ${layer.average.toFixed(
        2
      )} na escala de 0 a 10). Essa camada tende a ser uma das primeiras a se manifestar quando voc\xC3\xAA precisa tomar decis\xC3\xB5es importantes, lidar com conflitos ou iniciar projetos.`;
    }).join("\n");
  },
  describeBottomLayers(bottom3) {
    return bottom3.map((layer) => {
      const level = intensityLabel(layer.average);
      return `\xE2\u20AC\xA2 ${layer.name}: surge com intensidade ${level}. Nessa dimens\xC3\xA3o voc\xC3\xAA tende a sentir mais inseguran\xC3\xA7a, cansa\xC3\xA7o ou resist\xC3\xAAncia interior. Quando um ambiente exige demais dessa camada, sua energia costuma baixar mais r\xC3\xA1pido.`;
    }).join("\n");
  }
};

const CAREER_TEXTS = {
  buildFromLayers(top3, bottom3) {
    const blocks = [];
    blocks.push({
      id: "career-overview",
      access: "free",
      title: "Como suas camadas impactam a carreira",
      body: `No trabalho, as camadas mais fortes (${listNames(
        top3
      )}) se tornam os seus diferenciais naturais. S\xE3o elas que sustentam a sensa\xE7\xE3o de compet\xEAncia, foco e prop\xF3sito quando o ambiente permite que voc\xEA as use com liberdade.

Fun\xE7\xF5es que exigem com frequ\xEAncia essas camadas costumam gerar entusiasmo e criatividade. J\xE1 contextos que ignoram completamente esses tra\xE7os tendem a fazer voc\xEA se sentir subaproveitado.`
    });
    blocks.push({
      id: "career-challenges",
      access: "free",
      title: "Quando o trabalho drena mais do que nutre",
      body: `As camadas mais fr\xE1geis (${listNames(
        bottom3
      )}) mostram onde a rotina profissional tende a ser mais desgastante. Ambientes que exigem quase o tempo todo essas dimens\xF5es podem gerar sensa\xE7\xE3o de \u201Cestar sempre no limite\u201D.

Isso n\xE3o significa que voc\xEA seja incapaz nessas \xE1reas, mas que provavelmente precisar\xE1 de estruturas de apoio (processos claros, colegas complementares, pausas planejadas) para n\xE3o viver em exaust\xE3o cont\xEDnua.`
    });
    const fortePrincipal = top3[0];
    const level = fortePrincipal ? intensityLabel(fortePrincipal.average) : "relevante";
    blocks.push({
      id: "career-premium",
      access: "premium",
      title: "Sugest\xF5es de caminhos profissionais (Premium)",
      body: `No relat\xF3rio completo em PDF voc\xEA encontrar\xE1 sugest\xF5es de tipos de fun\xE7\xE3o e ambiente profissional mais compat\xEDveis com o conjunto de camadas que aparece em voc\xEA. O foco especial recai sobre a camada ${fortePrincipal ? fortePrincipal.name : "dominante"}, que se manifesta com intensidade ${level}, mostrando em que contextos ela gera lideran\xE7a, criatividade e senso de miss\xE3o \u2013 e em que contextos ela se transforma em ansiedade ou sobrecarga.`
    });
    return blocks;
  }
};

const GROWTH_TEXTS = {
  buildFromLayers(top3, bottom3) {
    const blocks = [];
    blocks.push({
      id: "growth-resources",
      access: "free",
      title: "Recursos internos e pontos de apoio",
      body: `As camadas mais fortes (${listNames(
        top3
      )}) revelam recursos internos que voc\xEA j\xE1 possui: disposi\xE7\xF5es que, quando bem orientadas, sustentam resili\xEAncia, confian\xE7a e determina\xE7\xE3o. Trabalhar virtudes ligadas a essas camadas costuma gerar crescimento r\xE1pido e est\xE1vel.`
    });
    blocks.push({
      id: "growth-energy",
      access: "free",
      title: "O que te d\xE1 energia e o que te esgota",
      body: `Situa\xE7\xF5es que ativam sobretudo ${listNames(
        top3
      )} tendem a renovar suas for\xE7as e trazer sensa\xE7\xE3o de sentido. Por outro lado, contextos que exigem intensamente ${listNames(
        bottom3
      )} sem pausas nem apoio costumam drenar voc\xEA com mais facilidade.

Perceber isso ajuda a organizar melhor a rotina, balancear compromissos e aprender a dizer \u201Csim\u201D e \u201Cn\xE3o\u201D com mais clareza.`
    });
    blocks.push({
      id: "growth-premium",
      access: "premium",
      title: "Plano de crescimento em etapas (Premium)",
      body: "No relat\xF3rio em PDF voc\xEA ter\xE1 um plano de crescimento dividido em etapas, mostrando como consolidar suas camadas mais fortes, fortalecer as mais fr\xE1geis e integrar tudo num caminho realista de maturidade afetiva, intelectual e espiritual."
    });
    return blocks;
  }
};

const REL_TEXTS = {
  buildFromLayers(top3, bottom3) {
    const blocks = [];
    blocks.push({
      id: "rel-overview",
      access: "free",
      title: "Como voc\xEA se relaciona a partir das suas camadas",
      body: `Nos relacionamentos, as camadas mais fortes (${listNames(
        top3
      )}) influenciam a forma como voc\xEA demonstra autenticidade, lealdade, generosidade e intelig\xEAncia emocional. S\xE3o elas que sustentam a maneira como voc\xEA escuta, acolhe, corrige e pede ajuda.`
    });
    blocks.push({
      id: "rel-fragilities",
      access: "free",
      title: "Onde os v\xEDnculos costumam doer mais",
      body: `As camadas em que voc\xEA pontuou mais baixo (${listNames(
        bottom3
      )}) revelam \xE1reas onde podem surgir bloqueios, defesas exageradas ou mal-entendidos. Em momentos de tens\xE3o, \xE9 comum que justamente essas dimens\xF5es sejam colocadas \xE0 prova: capacidade de confiar, de permanecer, de pedir perd\xE3o ou de aceitar limites.`
    });
    blocks.push({
      id: "rel-premium",
      access: "premium",
      title: "Orienta\xE7\xF5es pr\xE1ticas para amizades, fam\xEDlia e afetividade (Premium)",
      body: "No relat\xF3rio em PDF voc\xEA encontrar\xE1 orienta\xE7\xF5es espec\xEDficas de como o seu conjunto de camadas costuma se comportar em amizades, fam\xEDlia e vida afetiva, com sugest\xF5es concretas para crescer em autenticidade, lealdade e caridade nas diferentes fases da vida."
    });
    return blocks;
  }
};

function buildTwelveLayersReport(entry) {
  const normalizedResults = entry.results.map((result) => ({
    ...result,
    average: normalizeAvgTo0to10(result.average, 1, 7)
  }));
  const sorted = [...normalizedResults].sort(
    (a, b) => b.average - a.average
  );
  const top3 = sorted.slice(0, 3);
  const bottom3 = sorted.slice(-3);
  const overallBlocks = [
    {
      id: "intro-core",
      access: "free",
      body: LAYER_TEXTS.buildIntro(top3, bottom3)
    },
    {
      id: "intro-shadow",
      access: "premium",
      body: LAYER_TEXTS.buildShadow(top3, bottom3)
    }
  ];
  const traitsBlocks = [
    {
      id: "traits-top",
      access: "free",
      title: "Suas camadas mais fortes",
      body: LAYER_TEXTS.describeTopLayers(top3)
    },
    {
      id: "traits-bottom",
      access: "premium",
      title: "Camadas que pedem mais aten\xE7\xE3o",
      body: LAYER_TEXTS.describeBottomLayers(bottom3)
    }
  ];
  const graph = normalizedResults.map((r) => ({
    label: r.name,
    value: r.average
  }));
  const careerBlocks = CAREER_TEXTS.buildFromLayers(top3, bottom3);
  const growthBlocks = GROWTH_TEXTS.buildFromLayers(top3, bottom3);
  const relationshipsBlocks = REL_TEXTS.buildFromLayers(
    top3,
    bottom3
  );
  return {
    kind: "twelveLayers",
    sessionId: entry.id,
    overall: {
      title: LAYER_TEXTS.buildTitle(top3),
      subtitle: LAYER_TEXTS.buildSubtitle(top3, bottom3),
      blocks: overallBlocks
    },
    traits: {
      graph,
      blocks: traitsBlocks
    },
    career: { blocks: careerBlocks },
    growth: { blocks: growthBlocks },
    relationships: { blocks: relationshipsBlocks }
  };
}

export { buildTwelveLayersReport };
//# sourceMappingURL=twelveLayers.mjs.map
