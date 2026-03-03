import { i as isTemperamentId, g as getPremiumTemperamentText, T as TEMPERAMENT_LABELS_PT } from '../../../_/premiumTemperaments.mjs';
import { n as normalizeAvgTo0to10 } from '../../../_/normalizeScale.mjs';
import 'node:fs';
import 'node:path';

function intensityLabel(score) {
  if (score >= 8) return "muito alta";
  if (score >= 6.5) return "alta";
  if (score >= 5) return "moderada";
  if (score >= 3.5) return "equilibrada";
  if (score >= 2) return "baixa";
  return "muito baixa";
}
const TEMPERAMENT_LABELS = {
  choleric: "col\xE9rico",
  sanguine: "sangu\xEDneo",
  melancholic: "melanc\xF3lico",
  phlegmatic: "fleum\xE1tico"
};
function lowerLabel(score) {
  var _a;
  if (!score) return "";
  return (_a = TEMPERAMENT_LABELS[score.groupId]) != null ? _a : score.name.toLowerCase();
}

function buildCholericIntro(primary, secondary) {
  const blocks = [];
  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary);
  const comboText = secondary ? `Seu temperamento predominante \xE9 ${primary.name}, com influ\xEAncia significativa de ${secondary.name}.` : `Seu temperamento predominante \xE9 ${primary.name}, formando um perfil fortemente ${primaryLabel}.`;
  blocks.push({
    id: "temp-overview",
    access: "free",
    title: "Seu perfil de temperamento",
    body: `${comboText}

Na pr\xE1tica, isso costuma gerar uma forma de reagir r\xE1pida, intensa e orientada para resultados. O eixo col\xE9rico est\xE1 ligado a vontade forte, foco em objetivos concretos e facilidade para tomar decis\xF5es, mesmo em ambientes de press\xE3o. A intensidade atual desse temperamento em voc\xEA foi classificada como ${intensityLabel(primary.average)}.

Em termos de tra\xE7os amplos, o col\xE9rico tende a ser mais extrovertido que introvertido (a energia vai para fora, em a\xE7\xF5es), mais realista que puramente intuitivo (gosta do concreto, do que funciona), mais anal\xEDtico/pragm\xE1tico do que sentimental, mais \u201Cdesbravador\u201D do que apenas planejador, e fortemente assertivo (em oposi\xE7\xE3o a turbulento/passivo). Essas tend\xEAncias n\xE3o o definem por completo, mas ajudam a explicar o impulso de \u201Cir para frente\u201D que provavelmente voc\xEA reconhece em si mesmo.`
  });
  if (secondary) {
    const mixId = secondary.groupId;
    let comboBody = "";
    if (mixId === "sanguine") {
      comboBody = `A combina\xE7\xE3o ${primaryLabel}-${secondaryLabel} costuma intensificar ainda mais a dimens\xE3o extrovertida: \xE9 um perfil que mistura vontade firme com sociabilidade, entusiasmo e capacidade de contagiar ambientes. Em linguagem de tra\xE7os, isso se traduz num estilo claramente extrovertido, realista, mas com grande abertura ao novo; anal\xEDtico quando se trata de resultado, mas emocional na forma de se expressar; muito desbravador, com assertividade alta e certa turbul\xEAncia quando contrariado.

\xC9 um tipo de pessoa que tende a inspirar, convencer e arrastar outros, mas que precisa vigiar a impulsividade, a tend\xEAncia a prometer mais do que consegue entregar e o risco de atropelar sensibilidades alheias.`;
    } else if (mixId === "phlegmatic") {
      comboBody = `A combina\xE7\xE3o ${primaryLabel}-${secondaryLabel} une a vontade firme do col\xE9rico \xE0 estabilidade e calma do fleum\xE1tico. O resultado \xE9 um perfil mais \u201Cgestor\u201D: algu\xE9m que continua sendo realista e orientado a metas, mas com mais paci\xEAncia, capacidade de observar e toler\xE2ncia a ritmos diferentes.

Em termos de tra\xE7os, tende a ser um ambivertido (nem t\xE3o explosivo quanto o col\xE9rico puro, nem t\xE3o reservado), com forte senso de realidade, an\xE1lise fria em decis\xF5es importantes, estilo mais planejador do que aventureiro e assertividade alta, mas muitas vezes controlada por um desejo sincero de evitar conflitos desnecess\xE1rios.`;
    } else if (mixId === "melancholic") {
      comboBody = `A combina\xE7\xE3o ${primaryLabel}-${secondaryLabel} junta intensidade de vontade com profundidade afetiva e mental. \xC9 um perfil que pode se mostrar mais introvertido do que um col\xE9rico t\xEDpico, mas n\xE3o por falta de for\xE7a \u2013 e sim por reflex\xE3o, perfeccionismo e certa reserva.

Nos tra\xE7os amplos, voc\xEA tende a oscilar entre momentos de extrovers\xE3o focada (quando h\xE1 um objetivo claro) e per\xEDodos de recolhimento, em que analisa tudo com cuidado. O olhar \xE9 realista, mas com forte componente anal\xEDtico e sens\xEDvel; h\xE1 impulso para desbravar, mas controlado por planejamento e autocr\xEDtica. A assertividade \xE9 alta, embora \xE0s vezes modulada por inseguran\xE7as internas ou medo de falhar.`;
    } else {
      comboBody = `A combina\xE7\xE3o entre ${primary.name} e ${secondary.name} torna o seu perfil mais complexo e rico. Em alguns momentos voc\xEA atua como um ${primary.name} t\xEDpico; em outros, a influ\xEAncia de ${secondary.name} traz nuances de sensibilidade, prud\xEAncia, estabilidade ou expansividade.

Isso ajuda a explicar por que voc\xEA n\xE3o se v\xEA totalmente em descri\xE7\xF5es simplistas de um \xFAnico temperamento.`;
    }
    blocks.push({
      id: "temp-combo",
      access: "free",
      title: "Como a combina\xE7\xE3o de temperamentos aparece em voc\xEA",
      body: comboBody
    });
  }
  blocks.push({
    id: "temp-premium-overview",
    access: "premium",
    title: "Mapa completo do seu temperamento (Premium)",
    body: "No relat\xF3rio em PDF voc\xEA ver\xE1 a leitura detalhada de como o eixo col\xE9rico se articula com o seu temperamento secund\xE1rio, combinando an\xE1lise de tra\xE7os (introvers\xE3o/extrovers\xE3o, realismo/intui\xE7\xE3o, mente anal\xEDtica/afetiva, perfil planejador/desbravador, assertividade/turbul\xEAncia) com exemplos concretos do dia a dia. O material aprofunda tamb\xE9m a perspectiva de autores cl\xE1ssicos sobre o col\xE9rico, indicando caminhos de maturidade e integra\xE7\xE3o interior."
  });
  return blocks;
}
function buildCholericTraits(primary, secondary) {
  const blocks = [];
  if (!secondary || secondary.groupId === "choleric") {
    blocks.push({
      id: "temp-traits-core",
      access: "free",
      title: "Tra\xE7os centrais de personalidade col\xE9rica",
      body: `O n\xFAcleo do temperamento col\xE9rico \xE9 marcado por energia direcionada, foco em objetivos concretos e rea\xE7\xE3o r\xE1pida a pessoas e situa\xE7\xF5es. Em voc\xEA, essas caracter\xEDsticas aparecem com intensidade ${intensityLabel(
        primary.average
      )}, o que costuma se traduzir em um senso forte de miss\xE3o e dificuldade em ficar indiferente.

No eixo introvertido/extrovertido, o col\xE9rico tende naturalmente ao lado extrovertido \u2013 n\xE3o tanto por gostar de festas, mas por projetar a sua vontade para fora, tentando influenciar o ambiente. \xC9 mais realista do que abstrato: valoriza o que funciona e o que entrega resultado. A mente costuma ser anal\xEDtica e estrat\xE9gica, embora as emo\xE7\xF5es sejam muito fortes e, \xE0s vezes, explosivas. Voc\xEA tende a ser mais desbravador do que apenas planejador, e fortemente assertivo: prefere decidir, correr riscos calculados e assumir a responsabilidade, em vez de ficar \xE0 margem.`
    });
  }
  if (secondary && secondary.groupId === "sanguine") {
    blocks.push({
      id: "temp-traits-secondary",
      access: "free",
      title: "Col\xE9rico-sangu\xEDneo: energia expansiva",
      body: `Na combina\xE7\xE3o col\xE9rico-sangu\xEDneo, a vontade firme do col\xE9rico se junta \xE0 sociabilidade e espontaneidade do sangu\xEDneo. Isso costuma gerar um perfil fortemente extrovertido, comunicativo e capaz de \u201Cpuxar\u201D ambientes inteiros. Voc\xEA tende a ler o mundo de forma realista, mas com otimismo; alterna entre an\xE1lise objetiva (quando h\xE1 metas claras) e respostas emocionais intensas (entusiasmo, indigna\xE7\xE3o, anima\xE7\xE3o).

O lado desbravador aparece com for\xE7a: h\xE1 gosto por iniciar projetos, enfrentar desafios e abrir caminho onde outros hesitam. A assertividade \xE9 alta: voc\xEA fala, prop\xF5e e se posiciona com facilidade. O ponto de aten\xE7\xE3o est\xE1 na turbul\xEAncia interna: quando contrariado ou entediado, pode oscilar entre irrita\xE7\xE3o e dispers\xE3o, falando mais do que conv\xE9m ou assumindo mais coisas do que \xE9 saud\xE1vel.`
    });
  } else if (secondary && secondary.groupId === "phlegmatic") {
    blocks.push({
      id: "temp-traits-secondary",
      access: "free",
      title: "Col\xE9rico-fleum\xE1tico: firmeza com estabilidade",
      body: `Na combina\xE7\xE3o col\xE9rico-fleum\xE1tico, a energia dirigida do col\xE9rico se encontra com a calma e a const\xE2ncia do fleum\xE1tico. O resultado \xE9 um perfil que pode ser visto por muitos como \u201Cequilibrado\u201D: h\xE1 for\xE7a de decis\xE3o, mas tamb\xE9m capacidade de ouvir, esperar e manter a serenidade.

Nos eixos de tra\xE7o, isso costuma gerar um tipo ambivertido (nem t\xE3o explosivo, nem t\xE3o apagado), realista, anal\xEDtico, com boa capacidade de planejar antes de agir. O impulso desbravador existe, mas \xE9 filtrado por prud\xEAncia e avers\xE3o a conflitos gratuitos. A assertividade \xE9 alta, por\xE9m mais controlada, o que pode torn\xE1-lo um mediador natural em grupos \u2013 desde que n\xE3o caia na tenta\xE7\xE3o de usar essa calma apenas para \u201Cproteger\u201D o pr\xF3prio jeito de fazer as coisas.`
    });
  } else if (secondary && secondary.groupId === "melancholic") {
    blocks.push({
      id: "temp-traits-secondary",
      access: "free",
      title: "Col\xE9rico-melanc\xF3lico: intensidade com profundidade",
      body: `Na combina\xE7\xE3o col\xE9rico-melanc\xF3lico, a vontade forte encontra um mundo interior intenso, cr\xEDtico e sens\xEDvel. \xC9 comum haver apar\xEAncia de firmeza por fora e grande complexidade afetiva por dentro. Esse perfil tende mais \xE0 introvers\xE3o, n\xE3o por falta de energia, mas porque pensa, rev\xEA e rumina muito o que faz.

O olhar \xE9 realista, mas com forte vi\xE9s anal\xEDtico e perfeccionista: voc\xEA percebe nuances, falhas e incoer\xEAncias com facilidade. H\xE1 impulso para desbravar, mas o planejamento e a autocr\xEDtica \xE0s vezes travam ou atrasam movimentos. A assertividade \xE9 alta em temas que voc\xEA considera justos ou importantes, mas pode ser acompanhada de culpa ou d\xFAvida depois, quando a mente melanc\xF3lica revisita tudo o que foi dito ou feito.`
    });
  }
  blocks.push({
    id: "temp-traits-premium",
    access: "premium",
    title: "An\xE1lise completa dos tra\xE7os col\xE9ricos (Premium)",
    body: "No relat\xF3rio em PDF, o eixo col\xE9rico \xE9 destrinchado em subt\xF3picos: for\xE7a de vontade, rea\xE7\xE3o \xE0 frustra\xE7\xE3o, grau de impulsividade, capacidade de planejamento, estilo de lideran\xE7a, padr\xE3o de autocr\xEDtica e modo como voc\xEA lida com limites. Tamb\xE9m s\xE3o apresentados exemplos concretos de como o seu temperamento mistura tra\xE7os de autenticidade, lealdade e altru\xEDsmo com a necessidade de aprender intelig\xEAncia emocional e dom\xEDnio de si."
  });
  return blocks;
}
function buildCholericCareer(primary, secondary) {
  const blocks = [];
  blocks.push({
    id: "temp-career-style",
    access: "free",
    title: "Estilo de trabalho e produtividade col\xE9ricos",
    body: `O col\xE9rico costuma enxergar o trabalho como lugar natural para realizar, ordenar e liderar. Em voc\xEA, isso aparece como impulso para assumir responsabilidade, definir rumo e cobrar de si e dos outros. A produtividade tende a crescer quando h\xE1 metas claras, autonomia e um grau saud\xE1vel de press\xE3o; e a cair quando o ambiente \xE9 difuso, lento ou excessivamente burocr\xE1tico.

Em termos de tra\xE7os, \xE9 comum haver ambi\xE7\xE3o (no sentido de querer ir al\xE9m), forte motiva\xE7\xE3o frente a desafios dif\xEDceis e desejo espont\xE2neo de liderar ou, ao menos, de influenciar a dire\xE7\xE3o que as coisas tomam. Quando desordenado, esse impulso pode virar dom\xEDnio, dureza ou impaci\xEAncia com os mais lentos. Quando bem trabalhado, torna-se servi\xE7o: lideran\xE7a que entrega, protege, organiza e puxa os outros para o melhor.`
  });
  if (secondary && secondary.groupId === "sanguine") {
    blocks.push({
      id: "temp-career-mix",
      access: "free",
      title: "Col\xE9rico-sangu\xEDneo no trabalho",
      body: `O col\xE9rico-sangu\xEDneo tende a brilhar em contextos din\xE2micos, com contato humano, metas desafiadoras e espa\xE7o para criatividade pr\xE1tica: gest\xE3o de equipes, vendas consultivas, empreendedorismo, comunica\xE7\xE3o, lideran\xE7a em projetos que exigem energia e presen\xE7a constante.

A ambi\xE7\xE3o costuma se expressar em forma de desejo de impacto vis\xEDvel. A motiva\xE7\xE3o sobe quando h\xE1 reconhecimento, desafios e variedade, e cai em rotinas mon\xF3tonas. O ponto de vigil\xE2ncia est\xE1 em prometer demais, iniciar muitas frentes e n\xE3o cuidar o suficiente da continuidade, da documenta\xE7\xE3o e dos detalhes. O aperfei\xE7oamento aqui passa por criar sistemas que obriguem a concluir aquilo que foi come\xE7ado.`
    });
  } else if (secondary && secondary.groupId === "phlegmatic") {
    blocks.push({
      id: "temp-career-mix",
      access: "free",
      title: "Col\xE9rico-fleum\xE1tico no trabalho",
      body: `O col\xE9rico-fleum\xE1tico \xE9 frequentemente percebido como um \u201Ctipo gestor\u201D: combina vis\xE3o de resultado com capacidade de manter processos est\xE1veis. Costuma ir bem em fun\xE7\xF5es de coordena\xE7\xE3o, lideran\xE7a de \xE1reas operacionais, gest\xE3o de times t\xE9cnicos ou administrativos, ou em qualquer fun\xE7\xE3o que pe\xE7a ao mesmo tempo firmeza e serenidade.

A ambi\xE7\xE3o existe, mas costuma ser mais silenciosa; busca mais a efic\xE1cia real do que o brilho. Quando imaturo, pode cair na tenta\xE7\xE3o de usar a calma fleum\xE1tica como fuga de decis\xF5es dif\xEDceis ou confrontos necess\xE1rios. Quando cresce, torna-se refer\xEAncia de estabilidade firme, capaz de sustentar mudan\xE7as sem \u201Cexplodir\u201D o ambiente.`
    });
  } else if (secondary && secondary.groupId === "melancholic") {
    blocks.push({
      id: "temp-career-mix",
      access: "free",
      title: "Col\xE9rico-melanc\xF3lico no trabalho",
      body: `O col\xE9rico-melanc\xF3lico tende a unir alta exig\xEAncia consigo mesmo e com o trabalho \xE0 busca de profundidade e coer\xEAncia. Pode ir muito bem em fun\xE7\xF5es que pedem lideran\xE7a t\xE9cnica, pesquisa aplicada, estrat\xE9gia, dire\xE7\xE3o de projetos complexos, \xE1reas em que seja preciso unir vis\xE3o de conjunto com aten\xE7\xE3o aos detalhes.

A ambi\xE7\xE3o aqui muitas vezes assume a forma de perfeccionismo: desejo de entregar algo impec\xE1vel, bem pensado, bem fundamentado. Quando desequilibrado, isso pode levar a sobrecarga, dificuldade de delegar, autocr\xEDtica cruel e pouca toler\xE2ncia a falhas. Parte do crescimento passa por aceitar limites, aprender a delegar e reconhecer que nem todo projeto precisa ser \u201Co projeto da vida\u201D.`
    });
  }
  blocks.push({
    id: "temp-career-premium",
    access: "premium",
    title: "Caminhos profissionais alinhados ao seu temperamento (Premium)",
    body: "No relat\xF3rio em PDF, s\xE3o apresentados cen\xE1rios profissionais que costumam dialogar bem com o eixo col\xE9rico (lideran\xE7a, gest\xE3o, fun\xE7\xF5es estrat\xE9gicas, empreendedorismo, \xE1reas que exigem decis\xE3o r\xE1pida) e cen\xE1rios que pedem compensa\xE7\xF5es (ambientes muito burocr\xE1ticos, sem autonomia ou sem clareza de dire\xE7\xE3o). Tamb\xE9m s\xE3o exploradas formas concretas de ordenar ambi\xE7\xE3o, perfeccionismo e desejo de estar no comando ao servi\xE7o de um bem maior, sem esmagar quem caminha ao seu lado."
  });
  return blocks;
}
function buildCholericGrowth(primary, secondary) {
  const blocks = [];
  blocks.push({
    id: "temp-growth-stress",
    access: "free",
    title: "Rea\xE7\xE3o do col\xE9rico ao estresse e \xE0s crises",
    body: `Sob press\xE3o, o temperamento col\xE9rico costuma aparecer com ainda mais nitidez. A paci\xEAncia encurta, a necessidade de controlar aumenta e a linguagem tende a ficar mais direta ou dura. Em voc\xEA, isso pode se manifestar como explos\xF5es de impaci\xEAncia, vontade intensa de \u201Cresolver tudo agora\u201D ou dificuldade em aceitar limites e lentid\xF5es alheias.

Ao mesmo tempo, o eixo col\xE9rico \xE9 naturalmente ligado \xE0 resili\xEAncia, confian\xE7a e determina\xE7\xE3o: quando amadurecido, suporta bem o peso de decis\xF5es dif\xEDceis e tem forte senso de responsabilidade. O desafio est\xE1 em transformar essa for\xE7a em servi\xE7o \u2013 n\xE3o em imposi\xE7\xE3o \u2013 e aprender a sentir-se no comando sem sufocar a liberdade de quem caminha ao lado.`
  });
  if (secondary && secondary.groupId === "sanguine") {
    blocks.push({
      id: "temp-growth-hidden",
      access: "free",
      title: "Col\xE9rico-sangu\xEDneo em momentos de instabilidade",
      body: `No col\xE9rico-sangu\xEDneo, crises podem provocar oscila\xE7\xF5es r\xE1pidas: da confian\xE7a ao des\xE2nimo, da determina\xE7\xE3o \xE0 dispers\xE3o. Voc\xEA pode reagir com discursos fortes, decis\xF5es abruptas ou mudan\xE7as repentinas de foco. Em vez de aprofundar a dor, h\xE1 uma tend\xEAncia a \u201Cfugir para a a\xE7\xE3o\u201D ou para est\xEDmulos externos.

O crescimento aqui passa por aprender a parar, nomear o que sente, pedir conselho e n\xE3o se deixar conduzir apenas pelo impulso do momento. Virtudes como temperan\xE7a, prud\xEAncia e mansid\xE3o ajudam a ordenar a enorme energia para um bem real, e n\xE3o apenas para o al\xEDvio imediato.`
    });
  } else if (secondary && secondary.groupId === "phlegmatic") {
    blocks.push({
      id: "temp-growth-hidden",
      access: "free",
      title: "Col\xE9rico-fleum\xE1tico em momentos de crise",
      body: `No col\xE9rico-fleum\xE1tico, crises podem levar ora a rea\xE7\xF5es firmes e decisivas, ora a um recuo silencioso. Voc\xEA pode sentir simultaneamente o impulso de resolver tudo e o desejo de se afastar para n\xE3o piorar a situa\xE7\xE3o. Se mal integrado, isso pode gerar adiamentos, ressentimentos guardados e decis\xF5es tomadas tarde demais.

O crescimento passa por reconhecer cedo os sinais de fuga (procrastina\xE7\xE3o, ironia, \u201Ctanto faz\u201D) e confrontar com caridade o que precisa ser dito. Virtudes como coragem, perseveran\xE7a e caridade paciente ajudam a unir a firmeza col\xE9rica \xE0 paz fleum\xE1tica, em vez de deix\xE1-las se sabotarem.`
    });
  } else if (secondary && secondary.groupId === "melancholic") {
    blocks.push({
      id: "temp-growth-hidden",
      access: "free",
      title: "Col\xE9rico-melanc\xF3lico em crise",
      body: `No col\xE9rico-melanc\xF3lico, crises podem intensificar tanto a dureza para fora quanto a dureza para dentro. Voc\xEA pode reagir com firmeza, exigir demais de si e dos outros e, depois, remoer tudo por dentro, com sensa\xE7\xE3o de culpa, fracasso ou solid\xE3o.

O caminho de crescimento envolve aprender a aceitar a pr\xF3pria fragilidade, pedir ajuda antes de chegar ao limite e praticar atos expl\xEDcitos de miseric\xF3rdia consigo mesmo e com os outros. Virtudes como humildade, esperan\xE7a e paci\xEAncia consigo mesmo s\xE3o cruciais para que a sua determina\xE7\xE3o n\xE3o se transforme em rigidez destrutiva.`
    });
  }
  blocks.push({
    id: "temp-growth-virtues",
    access: "free",
    title: "Virtudes que equilibram o col\xE9rico",
    body: "O col\xE9rico tem facilidade natural para virtudes ligadas \xE0 fortaleza: coragem, const\xE2ncia, decis\xE3o. Por outro lado, precisa trabalhar com mais empenho virtudes como paci\xEAncia, mansid\xE3o, docilidade, humildade e caridade concreta. Parte do crescimento passa por reconhecer que nem toda batalha precisa ser travada, que nem toda verdade precisa ser dita na hora, e que ceder por amor n\xE3o \xE9 fraqueza, mas for\xE7a ordenada."
  });
  blocks.push({
    id: "temp-growth-premium",
    access: "premium",
    title: "Plano de crescimento por etapas (Premium)",
    body: "No relat\xF3rio em PDF voc\xEA encontrar\xE1 um plano em etapas especificamente pensado para o col\xE9rico e suas combina\xE7\xF5es: exames de consci\xEAncia focados nos exageros t\xEDpicos (controle, dureza, impaci\xEAncia), exerc\xEDcios concretos de mansid\xE3o, pr\xE1ticas de confian\xE7a em Deus e formas de canalizar a for\xE7a de vontade para o bem das pessoas que lhe foram confiadas."
  });
  return blocks;
}
function buildCholericRelationships(primary, secondary) {
  const blocks = [];
  blocks.push({
    id: "temp-rel-dynamics",
    access: "free",
    title: "Como o col\xE9rico se relaciona",
    body: `O col\xE9rico tende a levar para os relacionamentos a mesma for\xE7a que leva para o trabalho: fala com franqueza, reage r\xE1pido e quer resolver problemas de forma direta. Isso pode ser percebido como autenticidade e lealdade, mas tamb\xE9m pode soar como dureza quando n\xE3o vem acompanhado de delicadeza.

Em geral, o col\xE9rico valoriza muito a lealdade (admira quem permanece, quem assume compromissos) e o altru\xEDsmo concretizado em a\xE7\xF5es (fazer, ajudar, resolver). A intelig\xEAncia emocional, por\xE9m, nem sempre acompanha a velocidade da vontade: h\xE1 risco de pouca escuta, de pouca leitura das nuances afetivas e de impaci\xEAncia com fragilidades alheias. Quando amadurece, esse temperamento torna-se um apoio firme para os outros: algu\xE9m em quem se pode confiar nos momentos dif\xEDceis.`
  });
  if (secondary && secondary.groupId === "sanguine") {
    blocks.push({
      id: "temp-rel-mix",
      access: "free",
      title: "Col\xE9rico-sangu\xEDneo nos v\xEDnculos",
      body: `O col\xE9rico-sangu\xEDneo costuma ser intenso, presente e expansivo nas rela\xE7\xF5es: gosta de proximidade, conversa, projetos em comum e movimento. Em amizades e afetos, tende a tomar iniciativa, propor programas, animar o ambiente. A autenticidade vem acompanhada de calor humano, mas, se n\xE3o for ordenada, pode virar invas\xE3o, ci\xFAme ou impaci\xEAncia com ritmos diferentes.

A intelig\xEAncia emocional cresce quando aprende a ouvir tanto quanto fala, a respeitar limites e a perceber que nem toda pessoa aguenta o mesmo ritmo de intensidade e mudan\xE7a. Quando integra essas dimens\xF5es, torna-se amigo fiel, c\xF4njuge comprometido e presen\xE7a que levanta os outros.`
    });
  } else if (secondary && secondary.groupId === "phlegmatic") {
    blocks.push({
      id: "temp-rel-mix",
      access: "free",
      title: "Col\xE9rico-fleum\xE1tico nos v\xEDnculos",
      body: `O col\xE9rico-fleum\xE1tico tende a ser algu\xE9m de poucas rela\xE7\xF5es, mas profundas. Consegue unir firmeza com estabilidade afetiva, sendo muitas vezes percebido como \u201Cporto seguro\u201D: n\xE3o se abala f\xE1cil, \xE9 consistente e costuma cumprir o que promete.

O risco est\xE1 em usar a calma fleum\xE1tica para evitar conversas dif\xEDceis ou emo\xE7\xF5es inc\xF4modas, mantendo o outro pr\xF3ximo, mas sem acesso real ao seu interior. O crescimento passa por abrir mais o cora\xE7\xE3o, partilhar fragilidades e permitir que a lealdade n\xE3o se reduza a \u201Cestar sempre ali\u201D, mas se estenda \xE0 disposi\xE7\xE3o de ser vulner\xE1vel.`
    });
  } else if (secondary && secondary.groupId === "melancholic") {
    blocks.push({
      id: "temp-rel-mix",
      access: "free",
      title: "Col\xE9rico-melanc\xF3lico nos v\xEDnculos",
      body: `O col\xE9rico-melanc\xF3lico pode viver os relacionamentos com grande intensidade e profundidade: exige muito de si e dos outros, busca coer\xEAncia, teme a superficialidade. Pode ser extremamente leal e disposto a sacrif\xEDcios, mas tamb\xE9m mais sens\xEDvel a feridas, rejei\xE7\xF5es e incoer\xEAncias.

A intelig\xEAncia emocional cresce quando aprende a nomear o que sente antes de explodir ou se fechar, a perdoar limites reais dos outros e a aceitar que v\xEDnculos humanos sempre ter\xE3o uma certa dose de imperfei\xE7\xE3o. Quando amadurecido, esse perfil se torna capaz de amar com firmeza e ternura ao mesmo tempo.`
    });
  }
  blocks.push({
    id: "temp-rel-premium",
    access: "premium",
    title: "Orienta\xE7\xF5es para amizades, fam\xEDlia e vida afetiva (Premium)",
    body: "No relat\xF3rio em PDF, o eixo col\xE9rico \xE9 aplicado de forma concreta \xE0 vida afetiva: como o seu perfil tende a se comportar em amizade, namoro/casamento, rela\xE7\xE3o com filhos, pais e comunidade. S\xE3o oferecidas sugest\xF5es pr\xE1ticas para canalizar autenticidade, lealdade e altru\xEDsmo sem sufocar o outro, e para crescer em verdadeira intelig\xEAncia emocional, capaz de unir verdade e caridade nos v\xEDnculos di\xE1rios."
  });
  return blocks;
}

function buildSanguineIntro(primary, secondary) {
  const blocks = [];
  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary);
  const comboText = secondary ? `Seu temperamento predominante \xE9 ${primary.name}, com influ\xEAncia significativa de ${secondary.name}.` : `Seu temperamento predominante \xE9 ${primary.name}, formando um perfil fortemente ${primaryLabel}.`;
  blocks.push({
    id: "temp-overview",
    access: "free",
    title: "Seu perfil de temperamento",
    body: `${comboText}

O eixo sangu\xEDneo est\xE1 ligado \xE0 sociabilidade, espontaneidade e rapidez em responder ao que acontece ao redor. Em voc\xEA, essas caracter\xEDsticas aparecem com intensidade ${intensityLabel(primary.average)}, o que costuma se traduzir em facilidade para iniciar conversas, criar v\xEDnculos e trazer leveza aos ambientes.

Nos grandes tra\xE7os, o sangu\xEDneo tende a ser claramente extrovertido (a energia vai para as pessoas), mais intuitivo e criativo do que rigidamente l\xF3gico, mais emocional do que anal\xEDtico, mais desbravador e explorador do que planejador r\xEDgido, e assertivo de forma calorosa \u2013 ainda que, \xE0s vezes, um pouco turbulento, mudando de ideia conforme o clima e as emo\xE7\xF5es do momento.`
  });
  if (secondary) {
    const mixId = secondary.groupId;
    let comboBody = "";
    if (mixId === "choleric") {
      comboBody = `Na combina\xE7\xE3o ${primaryLabel}-${secondaryLabel}, o entusiasmo sangu\xEDneo se junta \xE0 vontade firme do col\xE9rico. Costuma surgir um perfil carism\xE1tico, com grande presen\xE7a de palco, capaz de contagiar grupos e assumir a dianteira sem medo. Em termos de tra\xE7os, isso refor\xE7a a extrovers\xE3o, o realismo pr\xE1tico e o esp\xEDrito desbravador, com alta assertividade e grande foco em impacto vis\xEDvel.

O risco est\xE1 em oscilar entre o entusiasmo contagiante e a impaci\xEAncia dura, prometendo mais do que consegue sustentar e atropelando sensibilidades alheias quando est\xE1 irritado.`;
    } else if (mixId === "phlegmatic") {
      comboBody = `Na combina\xE7\xE3o ${primaryLabel}-${secondaryLabel}, a leveza do sangu\xEDneo encontra a calma est\xE1vel do fleum\xE1tico. O resultado \xE9 um perfil acolhedor, bem-humorado e pac\xEDfico, que costuma ser f\xE1cil de conviver e de aproximar. Os tra\xE7os tendem para uma extrovers\xE3o suave (capaz de falar e ouvir), forte abertura ao novo, mas com gosto por ambientes previs\xEDveis e relacionalmente seguros.

A turbul\xEAncia emocional \xE9 atenuada pelo lado fleum\xE1tico, mas pode aparecer na forma de procrastina\xE7\xE3o, evitar conversas dif\xEDceis ou fugir de conflitos em nome da \u201Cpaz\u201D.`;
    } else if (mixId === "melancholic") {
      comboBody = `Na combina\xE7\xE3o ${primaryLabel}-${secondaryLabel}, o entusiasmo e a sociabilidade sangu\xEDneos se unem a uma grande profundidade afetiva e reflexiva. \xC9 comum haver altern\xE2ncia entre momentos de grande abertura e alegria com as pessoas e per\xEDodos de recolhimento, an\xE1lise e certa autocr\xEDtica. Nos tra\xE7os, isso cria um tipo ambivertido: por fora, caloroso; por dentro, sens\xEDvel e atento aos detalhes e nuances.

Esse perfil \xE9 altamente intuitivo e emocional, com boa capacidade de empatia, mas precisa vigiar a tend\xEAncia a dispersar-se quando as coisas ficam dif\xEDceis e a oscilar de humor com certa facilidade.`;
    } else {
      comboBody = `A combina\xE7\xE3o entre ${primary.name} e ${secondary.name} torna o seu perfil mais complexo e rico. Em alguns momentos voc\xEA atua como um ${primary.name} t\xEDpico; em outros, a influ\xEAncia de ${secondary.name} traz nuances de sensibilidade, prud\xEAncia, estabilidade ou intensidade interior.

Isso ajuda a explicar por que voc\xEA n\xE3o se v\xEA totalmente em descri\xE7\xF5es simplistas de um \xFAnico temperamento.`;
    }
    blocks.push({
      id: "temp-combo",
      access: "free",
      title: "Como a combina\xE7\xE3o de temperamentos aparece em voc\xEA",
      body: comboBody
    });
  }
  blocks.push({
    id: "temp-premium-overview",
    access: "premium",
    title: "Mapa completo do seu temperamento (Premium)",
    body: "No relat\xF3rio em PDF voc\xEA ver\xE1 em detalhe como o eixo sangu\xEDneo colore sua forma de perceber o mundo: n\xEDvel de extrovers\xE3o, sensibilidade \xE0s novidades, padr\xE3o de oscila\xE7\xE3o emocional e modo de lidar com frustra\xE7\xE3o. Tamb\xE9m ser\xE3o exploradas as misturas com o seu temperamento secund\xE1rio, mostrando como isso impacta foco, disciplina e profundidade nos v\xEDnculos."
  });
  return blocks;
}
function buildSanguineTraits(primary, secondary) {
  const blocks = [];
  if (!secondary || secondary.groupId === "sanguine") {
    blocks.push({
      id: "temp-traits-core",
      access: "free",
      title: "Tra\xE7os centrais de personalidade sangu\xEDnea",
      body: `O n\xFAcleo do temperamento sangu\xEDneo \xE9 marcado por abertura, curiosidade e resposta r\xE1pida ao ambiente. Em voc\xEA, essas caracter\xEDsticas aparecem com intensidade ${intensityLabel(
        primary.average
      )}, traduzindo-se em facilidade para iniciar conversas, se adaptar a contextos novos e encontrar algo de interessante mesmo em situa\xE7\xF5es comuns.

No eixo introvertido/extrovertido, o sangu\xEDneo tende claramente \xE0 extrovers\xE3o: sente-se alimentado pela presen\xE7a de pessoas. \xC9 mais intuitivo e imaginativo do que rigorosamente l\xF3gico, com mente criativa que associa ideias com rapidez. A leitura da realidade \xE9 muito afetiva (o que agrada, anima ou incomoda), e o impulso \xE9 mais desbravador do que planejador formal: prefere come\xE7ar, experimentar, testar. A assertividade normalmente se manifesta em forma de simpatia, humor e persuas\xE3o, mais do que em enfrentamento direto.`
    });
  }
  if (secondary && secondary.groupId === "choleric") {
    blocks.push({
      id: "temp-traits-secondary",
      access: "free",
      title: "Sangu\xEDneo-col\xE9rico: carisma com for\xE7a de vontade",
      body: `No perfil sangu\xEDneo-col\xE9rico, o encanto relacional se soma a uma vontade firme orientada a resultados. Isso gera um tipo de pessoa que fala, convoca e conduz \u2013 muitas vezes assumindo naturalmente a lideran\xE7a em grupos. Os tra\xE7os mostram alta extrovers\xE3o, forte componente realista (sobretudo quando h\xE1 metas claras), pensamento r\xE1pido e estrat\xE9gico e grande gosto por desbravar novos projetos.

O ponto de aten\xE7\xE3o est\xE1 na turbul\xEAncia: quando as coisas n\xE3o saem como o esperado, a frustra\xE7\xE3o pode virar irrita\xE7\xE3o, ironia ou dureza. A mente oscila entre o emocional e o anal\xEDtico; quando integrado, esse perfil \xE9 capaz de unir empatia e decis\xE3o com muita for\xE7a.`
    });
  } else if (secondary && secondary.groupId === "phlegmatic") {
    blocks.push({
      id: "temp-traits-secondary",
      access: "free",
      title: "Sangu\xEDneo-fleum\xE1tico: leveza com estabilidade",
      body: `No sangu\xEDneo-fleum\xE1tico, o entusiasmo se apoia numa base tranquila e est\xE1vel. \xC9 um perfil de conviv\xEAncia f\xE1cil: gosta de conversar, fazer gra\xE7a, incluir pessoas, mas tende a evitar conflitos diretos e n\xE3o se abala facilmente com imprevistos.

Nos grandes tra\xE7os, isso gera uma extrovers\xE3o serena, grande empatia e boa capacidade de escuta. A mente \xE9 mais emocional e relacional do que t\xE9cnica, e o estilo \xE9 mais de explorador moderado: gosta de novidades, mas aprecia ter um \u201Cporto seguro\u201D para onde voltar. O perigo est\xE1 em acomodar-se, deixando que a disciplina, a profundidade e o enfrentamento de temas dif\xEDceis fiquem sempre para depois.`
    });
  } else if (secondary && secondary.groupId === "melancholic") {
    blocks.push({
      id: "temp-traits-secondary",
      access: "free",
      title: "Sangu\xEDneo-melanc\xF3lico: calor e profundidade",
      body: `No sangu\xEDneo-melanc\xF3lico, o calor humano do sangu\xEDneo convive com a sensibilidade e a profundidade do melanc\xF3lico. Voc\xEA pode ser muito comunicativo e af\xE1vel em p\xFAblico, mas guardar um mundo interior rico, com reflex\xF5es, d\xFAvidas e emo\xE7\xF5es intensas. \xC9 um perfil que alterna entre extrovers\xE3o e recolhimento, frequentemente percebido como \u201Cintenso, mas delicado\u201D.

H\xE1 forte capacidade intuitiva, aten\xE7\xE3o \xE0s nuances e empatia com dores alheias. Por outro lado, existe tend\xEAncia a oscilar de humor, a se magoar com certa facilidade e a usar o humor ou a leveza como forma de mascarar feridas mais profundas. A integra\xE7\xE3o desse perfil passa por dar espa\xE7o tanto \xE0 alegria quanto \xE0 verdade do que se sente.`
    });
  }
  blocks.push({
    id: "temp-traits-premium",
    access: "premium",
    title: "An\xE1lise completa dos tra\xE7os sangu\xEDneos (Premium)",
    body: "No relat\xF3rio em PDF, o eixo sangu\xEDneo \xE9 detalhado em aspectos como busca de novidades, resist\xEAncia \xE0 rotina, forma de lidar com frustra\xE7\xF5es, padr\xE3o de foco e dispers\xE3o, e modo como a sua afetividade influencia decis\xF5es. Tamb\xE9m s\xE3o apresentados caminhos concretos para integrar criatividade, empatia e leveza com disciplina interior e const\xE2ncia."
  });
  return blocks;
}
function buildSanguineCareer(primary, secondary) {
  const blocks = [];
  blocks.push({
    id: "temp-career-style",
    access: "free",
    title: "Estilo de trabalho e produtividade sangu\xEDneos",
    body: `O sangu\xEDneo costuma trabalhar melhor onde h\xE1 pessoas, variedade e algum grau de movimento. Rotinas muito r\xEDgidas, silenciosas ou repetitivas tendem a drenar sua energia, enquanto ambientes vivos, com troca de ideias e espa\xE7o para criatividade, a fazem crescer.

Em geral, a motiva\xE7\xE3o sobe na presen\xE7a de desafios interessantes, projetos novos e contatos humanos significativos, e cai quando tudo se torna previs\xEDvel demais. H\xE1 grande capacidade de come\xE7ar coisas e gerar impacto imediato; o ponto de aten\xE7\xE3o \xE9 sustentar a continuidade, a organiza\xE7\xE3o e o cuidado com detalhes ao longo do tempo.`
  });
  if (secondary && secondary.groupId === "choleric") {
    blocks.push({
      id: "temp-career-mix",
      access: "free",
      title: "Sangu\xEDneo-col\xE9rico no trabalho",
      body: `O sangu\xEDneo-col\xE9rico tende a se destacar em fun\xE7\xF5es que pedem presen\xE7a, persuas\xE3o e dire\xE7\xE3o: lideran\xE7a de equipes comerciais, empreendedorismo, comunica\xE7\xE3o, ambientes pastorais ou educacionais din\xE2micos, \xE1reas em que seja preciso tanto falar quanto executar. 

A ambi\xE7\xE3o costuma focar em impacto vis\xEDvel e resultados mensur\xE1veis. Quando imaturo, esse perfil pode superestimar a pr\xF3pria capacidade de sustentar todos os projetos que inicia; quando amadurece, aprende a selecionar melhor batalhas, delegar e cuidar para que o brilho do come\xE7o se traduza em frutos est\xE1veis.`
    });
  } else if (secondary && secondary.groupId === "phlegmatic") {
    blocks.push({
      id: "temp-career-mix",
      access: "free",
      title: "Sangu\xEDneo-fleum\xE1tico no trabalho",
      body: `O sangu\xEDneo-fleum\xE1tico costuma ir bem em fun\xE7\xF5es de atendimento, acolhimento, ensino, suporte, media\xE7\xE3o de conflitos leves e qualquer trabalho que combine relacionamento est\xE1vel com um clima relativamente tranquilo. \xC9 o tipo de pessoa que cria bons ambientes de equipe, ajuda a quebrar tens\xF5es e faz os outros se sentirem \xE0 vontade.

A ambi\xE7\xE3o tende a ser moderada: mais voltada para qualidade de vida e seguran\xE7a relacional do que para grandes cargos. O desafio est\xE1 em n\xE3o deixar que a busca por conforto impe\xE7a assumir responsabilidades maiores e enfrentar conversas dif\xEDceis necess\xE1rias para o crescimento profissional.`
    });
  } else if (secondary && secondary.groupId === "melancholic") {
    blocks.push({
      id: "temp-career-mix",
      access: "free",
      title: "Sangu\xEDneo-melanc\xF3lico no trabalho",
      body: `O sangu\xEDneo-melanc\xF3lico pode unir grande capacidade relacional com profundidade de reflex\xE3o, indo bem em \xE1reas que pedem contato humano e, ao mesmo tempo, sensibilidade \xE0s hist\xF3rias e \xE0s nuances: educa\xE7\xE3o, aconselhamento, comunica\xE7\xE3o de conte\xFAdo denso, artes, \xE1reas criativas, pastoral, pesquisa qualitativa.

A motiva\xE7\xE3o aumenta quando sente que o trabalho tem sentido humano e n\xE3o \xE9 apenas \u201Cprodu\xE7\xE3o mec\xE2nica\u201D. Quando desordenado, oscila entre entusiasmo e des\xE2nimo, iniciando projetos inspiradores que depois perdem f\xF4lego. Parte do crescimento passa por criar rotinas m\xEDnimas e estruturas de apoio que o ajudem a perseverar mesmo quando o humor cai.`
    });
  }
  blocks.push({
    id: "temp-career-premium",
    access: "premium",
    title: "Caminhos profissionais alinhados ao seu temperamento (Premium)",
    body: "No relat\xF3rio em PDF s\xE3o apresentados cen\xE1rios em que o eixo sangu\xEDneo floresce (ambientes relacionais, criativos, comunicativos) e cen\xE1rios em que precisa de compensa\xE7\xF5es (tarefas repetitivas, isolamento prolongado, excesso de burocracia). Voc\xEA encontrar\xE1 sugest\xF5es de como usar seu carisma, entusiasmo e empatia ao servi\xE7o de algo est\xE1vel, construindo uma trajet\xF3ria coerente no longo prazo."
  });
  return blocks;
}
function buildSanguineGrowth(primary, secondary) {
  const blocks = [];
  blocks.push({
    id: "temp-growth-stress",
    access: "free",
    title: "Rea\xE7\xE3o do sangu\xEDneo ao estresse e \xE0s crises",
    body: `Sob press\xE3o, o sangu\xEDneo tende a buscar al\xEDvio r\xE1pido: conversas, distra\xE7\xF5es, mudan\xE7as de foco. Quando a dor \xE9 grande, pode tentar \u201Cabafar\u201D o que sente com atividades, humor ou fuga para est\xEDmulos externos. A resili\xEAncia natural existe, mas se apoia muito no ambiente; se est\xE1 cercado de apoio e movimento saud\xE1vel, levanta-se com mais facilidade.

O desafio \xE9 aprender a permanecer um pouco mais diante do que d\xF3i, sem fugir imediatamente. A confian\xE7a e a determina\xE7\xE3o crescem quando ele percebe que \xE9 capaz de atravessar momentos dif\xEDceis sem perder totalmente a alegria, nem sacrificar v\xEDnculos importantes em nome de prazeres imediatos.`
  });
  if (secondary && secondary.groupId === "choleric") {
    blocks.push({
      id: "temp-growth-hidden",
      access: "free",
      title: "Sangu\xEDneo-col\xE9rico em momentos de instabilidade",
      body: `No sangu\xEDneo-col\xE9rico, crises podem provocar rea\xE7\xF5es intensas: discursos fortes, decis\xF5es abruptas, mudan\xE7as de rota feitas na emo\xE7\xE3o do momento. H\xE1 risco de oscilar entre vontade de \u201Cdar a volta por cima\u201D e tenta\xE7\xE3o de abandonar tudo em busca de algo mais estimulante.

O crescimento passa por cultivar disciplina interior, pedir conselhos antes de decis\xF5es grandes e aprender a escutar a dor pr\xF3pria e alheia sem imediatamente transform\xE1-la em a\xE7\xE3o impulsiva. Virtudes como prud\xEAncia, temperan\xE7a e mansid\xE3o ajudam a canalizar a energia para reconstru\xE7\xF5es reais, n\xE3o apenas para recome\xE7os sucessivos.`
    });
  } else if (secondary && secondary.groupId === "phlegmatic") {
    blocks.push({
      id: "temp-growth-hidden",
      access: "free",
      title: "Sangu\xEDneo-fleum\xE1tico em momentos de crise",
      body: `No sangu\xEDneo-fleum\xE1tico, crises podem levar a um misto de busca por distra\xE7\xF5es e fuga silenciosa. Voc\xEA pode tentar manter o clima leve por fora enquanto, por dentro, adia decis\xF5es ou conversas dif\xEDceis para \u201Cquando estiver melhor\u201D.

O crescimento passa por reconhecer cedo essa tend\xEAncia, escolher uma pessoa de confian\xE7a para falar com sinceridade e estabelecer pequenos passos concretos, em vez de esperar que o tempo resolva tudo. Virtudes como perseveran\xE7a, coragem e responsabilidade ajudam a equilibrar o desejo de paz com a necessidade de verdade.`
    });
  } else if (secondary && secondary.groupId === "melancholic") {
    blocks.push({
      id: "temp-growth-hidden",
      access: "free",
      title: "Sangu\xEDneo-melanc\xF3lico em crise",
      body: `No sangu\xEDneo-melanc\xF3lico, crises podem trazer altern\xE2ncia entre momentos de grande abatimento interior e tentativas de manter a alegria para n\xE3o preocupar os outros. Voc\xEA sente muito e tende a interpretar profundamente o que acontece, o que \xE9 uma riqueza, mas tamb\xE9m pode gerar rumina\xE7\xF5es e autocobran\xE7a.

O caminho de crescimento envolve aprender a acolher a pr\xF3pria sensibilidade como dom, sem us\xE1-la para se condenar. Ajuda muito ter acompanhamento espiritual ou psicol\xF3gico, desenvolver rotinas simples de ora\xE7\xE3o e cuidado de si, e praticar a virtude da esperan\xE7a: lembrar-se, com fatos concretos, de vezes em que Deus o sustentou no passado.`
    });
  }
  blocks.push({
    id: "temp-growth-virtues",
    access: "free",
    title: "Virtudes que equilibram o sangu\xEDneo",
    body: "O sangu\xEDneo tem facilidade natural para virtudes ligadas \xE0 alegria, hospitalidade, otimismo e abertura ao outro. Por outro lado, precisa trabalhar com mais empenho const\xE2ncia, disciplina, sobriedade, paci\xEAncia e profundidade. O crescimento passa por aprender a dizer \u201Cn\xE3o\u201D a certos impulsos, cuidar dos compromissos assumidos e cultivar momentos de sil\xEAncio, nos quais possa ordenar afetos e desejos diante de Deus."
  });
  blocks.push({
    id: "temp-growth-premium",
    access: "premium",
    title: "Plano de crescimento por etapas (Premium)",
    body: "No relat\xF3rio em PDF voc\xEA encontrar\xE1 um caminho em etapas pensado para o eixo sangu\xEDneo e suas misturas: exerc\xEDcios simples de disciplina di\xE1ria, formas concretas de aprofundar a vida espiritual sem perder a alegria, e sugest\xF5es para transformar carisma e sensibilidade em servi\xE7o fiel e constante."
  });
  return blocks;
}
function buildSanguineRelationships(primary, secondary) {
  const blocks = [];
  blocks.push({
    id: "temp-rel-dynamics",
    access: "free",
    title: "Como o sangu\xEDneo se relaciona",
    body: `O sangu\xEDneo tende a viver os relacionamentos com espontaneidade, calor e desejo de proximidade. Gosta de estar com as pessoas, conversar, partilhar experi\xEAncias e, muitas vezes, usa o humor como forma de aproximar e aliviar tens\xF5es. A autenticidade aparece na transpar\xEAncia do que sente; a lealdade se manifesta em gestos concretos de presen\xE7a e apoio, sobretudo quando a rela\xE7\xE3o \xE9 significativa.

O ponto fr\xE1gil costuma ser a const\xE2ncia: h\xE1 risco de prometer mais contato do que consegue manter, de se dispersar entre muitos v\xEDnculos ou de evitar conflitos para n\xE3o estragar o clima. A intelig\xEAncia emocional cresce quando aprende a ouvir com profundidade, a reparar feridas que causou sem minimizar e a sustentar v\xEDnculos mesmo quando o encanto inicial passa.`
  });
  if (secondary && secondary.groupId === "choleric") {
    blocks.push({
      id: "temp-rel-mix",
      access: "free",
      title: "Sangu\xEDneo-col\xE9rico nos v\xEDnculos",
      body: `O sangu\xEDneo-col\xE9rico tende a ser intenso e marcante nos relacionamentos: puxa conversas, prop\xF5e planos, confronta quando acha necess\xE1rio e, ao mesmo tempo, gosta de fazer o outro se sentir especial. Pode ser extremamente leal e protetor, mas tamb\xE9m mais ciumento ou controlador quando inseguro.

O crescimento passa por equilibrar franqueza com delicadeza, aprender a dar espa\xE7o e reconhecer que nem todos vivem as rela\xE7\xF5es na mesma velocidade ou intensidade que voc\xEA.`
    });
  } else if (secondary && secondary.groupId === "phlegmatic") {
    blocks.push({
      id: "temp-rel-mix",
      access: "free",
      title: "Sangu\xEDneo-fleum\xE1tico nos v\xEDnculos",
      body: `O sangu\xEDneo-fleum\xE1tico costuma ser uma companhia muito apreciada: faz os outros rirem, acolhe, evita julgamentos precipitados e, em geral, \xE9 f\xE1cil de perdoar. Gosta de estar com pessoas, mas tamb\xE9m aprecia momentos tranquilos com poucos amigos \xEDntimos.

O risco \xE9 deixar conversas importantes para depois, aceitar tudo em nome da paz e, com isso, acumular pequenas frustra\xE7\xF5es silenciosas. A maturidade afetiva pede que aprenda a nomear o que sente com calma e verdade, sem perder a do\xE7ura caracter\xEDstica.`
    });
  } else if (secondary && secondary.groupId === "melancholic") {
    blocks.push({
      id: "temp-rel-mix",
      access: "free",
      title: "Sangu\xEDneo-melanc\xF3lico nos v\xEDnculos",
      body: `O sangu\xEDneo-melanc\xF3lico vive os relacionamentos de modo profundo e afetivo: une calor, empatia e desejo de proximidade com grande sensibilidade a rejei\xE7\xF5es, incoer\xEAncias e mudan\xE7as no clima afetivo. \xC9 capaz de oferecer escuta atenta, consolo e presen\xE7a alegre aos outros, mas pode se magoar com facilidade e custar a esquecer feridas.

A intelig\xEAncia emocional cresce quando aprende a comunicar as pr\xF3prias dores sem dramatizar, a perdoar de verdade e a n\xE3o interpretar toda oscila\xE7\xE3o do outro como sinal de desamor. Assim, consegue amar com ternura sem perder o equil\xEDbrio interior.`
    });
  }
  blocks.push({
    id: "temp-rel-premium",
    access: "premium",
    title: "Orienta\xE7\xF5es para amizades, fam\xEDlia e vida afetiva (Premium)",
    body: "No relat\xF3rio em PDF, o eixo sangu\xEDneo \xE9 aplicado de forma concreta \xE0s amizades, \xE0 fam\xEDlia e \xE0 vida afetiva: como voc\xEA costuma se aproximar, o que o faz se afastar, quais s\xE3o suas maiores riquezas relacionais e onde tende a se perder. S\xE3o oferecidas sugest\xF5es pr\xE1ticas para transformar generosidade espont\xE2nea em presen\xE7a fiel, construindo v\xEDnculos maduros que sobrevivem ao tempo e \xE0s mudan\xE7as de humor."
  });
  return blocks;
}

function buildPhlegmaticIntro(primary, secondary) {
  const blocks = [];
  if (!primary) return blocks;
  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary != null ? secondary : null);
  const comboText = secondary ? `Seu temperamento predominante \xE9 ${primary.name}, com influ\xEAncia significativa de ${secondary.name}.` : `Seu temperamento predominante \xE9 ${primary.name}, formando um perfil marcadamente ${primaryLabel}.`;
  blocks.push({
    id: "temp-overview",
    access: "free",
    title: "Seu perfil de temperamento",
    body: `${comboText}

Na pr\xE1tica, isso costuma gerar uma forma de reagir calma, est\xE1vel e observadora. O eixo fleum\xE1tico est\xE1 ligado \xE0 busca de harmonia, \xE0 capacidade de manter a serenidade em situa\xE7\xF5es de press\xE3o e a um ritmo mais constante do que explosivo. A intensidade atual desse temperamento em voc\xEA foi classificada como ${intensityLabel(primary.average)}.

Nos grandes tra\xE7os de personalidade, o fleum\xE1tico tende mais \xE0 introvers\xE3o tranquila (energia voltada para dentro, para a reflex\xE3o) ou \xE0 ambivers\xE3o discreta; \xE9 mais realista do que abstrato, gosta do concreto que funciona; equilibra mente anal\xEDtica com forte senso pr\xE1tico; prefere planejar com calma em vez de desbravar impulsivamente; e costuma ser pouco agressivo, mais sereno do que assertivo no sentido combativo. Essas tend\xEAncias n\xE3o o definem por completo, mas ajudam a explicar o seu jeito de \u201Cn\xE3o se abalar f\xE1cil\u201D e de evitar conflitos desnecess\xE1rios.`
  });
  if (secondary) {
    const mixId = secondary.groupId;
    let comboBody = "";
    if (mixId === "choleric") {
      comboBody = `A combina\xE7\xE3o ${primaryLabel}-${secondaryLabel} une a calma e estabilidade do fleum\xE1tico \xE0 energia orientada para metas do col\xE9rico. \xC9 um perfil de \u201Cgestor tranquilo\u201D: voc\xEA tende a ser realista, objetivo e capaz de manter a cabe\xE7a fria quando todos se agitam.

Em termos de tra\xE7os, costuma oscilar entre introvers\xE3o e uma extrovers\xE3o funcional - aparece e assume a frente quando \xE9 preciso, mas prefere n\xE3o disputar os holofotes o tempo todo. Mant\xE9m o olhar pr\xE1tico e anal\xEDtico, planeja antes de agir, e sua assertividade aumenta quando h\xE1 um objetivo claro ou algu\xE9m a proteger.`;
    } else if (mixId === "melancholic") {
      comboBody = `A combina\xE7\xE3o ${primaryLabel}-${secondaryLabel} junta estabilidade afetiva com profundidade interior. \xC9 um perfil reservado, observador e muito sens\xEDvel, mas que raramente demonstra tudo o que sente logo de in\xEDcio.

Nos tra\xE7os amplos, voc\xEA tende \xE0 introvers\xE3o marcada, \xE0 leitura realista dos fatos com forte componente anal\xEDtico, ao planejamento detalhado e \xE0 baixa agressividade. A presen\xE7a fleum\xE1tica coloca freio em certos exageros melanc\xF3licos, enquanto a presen\xE7a melanc\xF3lica impede que a fleuma vire mera acomoda\xE7\xE3o.`;
    } else if (mixId === "sanguine") {
      comboBody = `A combina\xE7\xE3o ${primaryLabel}-${secondaryLabel} mistura a serenidade fleum\xE1tica com a sociabilidade espont\xE2nea do sangu\xEDneo. Em geral, resulta num perfil af\xE1vel, acess\xEDvel e que gosta de gente, por\xE9m sem exageros.

Na pr\xE1tica, isso se traduz num estilo mais ambivertido: voc\xEA \xE9 capaz de se expressar bem e se conectar com os outros, mas precisa de tempo de sil\xEAncio para recarregar. O olhar \xE9 realista, com boa leitura das pessoas; prefere planejar minimamente e depois ir ajustando no caminho; \xE9 pouco combativo, mas consegue se posicionar quando necess\xE1rio.`;
    } else {
      comboBody = `A combina\xE7\xE3o entre ${primary.name} e ${secondary.name} torna o seu perfil ainda mais est\xE1vel e complexo. Em alguns momentos voc\xEA age como um fleum\xE1tico cl\xE1ssico, buscando paz e const\xE2ncia; em outros, a influ\xEAncia de ${secondary.name} traz mais energia, sensibilidade ou criatividade.

Isso ajuda a explicar por que voc\xEA \xE0s vezes se percebe muito tranquilo e, em outras situa\xE7\xF5es, mais intenso ou emotivo do que esperava.`;
    }
    blocks.push({
      id: "temp-combo",
      access: "free",
      title: "Como a combina\xE7\xE3o de temperamentos aparece em voc\xEA",
      body: comboBody
    });
  }
  blocks.push({
    id: "temp-premium-overview",
    access: "premium",
    title: "Mapa completo do seu temperamento fleum\xE1tico (Premium)",
    body: "No relat\xF3rio em PDF voc\xEA ver\xE1 em detalhes como o eixo fleum\xE1tico, com sua estabilidade, diplomacia e busca de harmonia, se articula com o seu temperamento secund\xE1rio. O material aprofunda tamb\xE9m a vis\xE3o de autores cl\xE1ssicos e espirituais sobre o fleum\xE1tico, indicando caminhos concretos para transformar calma em fortaleza e paz interior, sem cair em passividade."
  });
  return blocks;
}
function buildPhlegmaticTraits(primary, secondary) {
  const blocks = [];
  if (!primary) return blocks;
  if (!secondary || secondary.groupId === "phlegmatic") {
    blocks.push({
      id: "temp-traits-core",
      access: "free",
      title: "Tra\xE7os centrais de personalidade fleum\xE1tica",
      body: `O n\xFAcleo do temperamento fleum\xE1tico \xE9 marcado por serenidade, const\xE2ncia e tend\xEAncia a evitar conflitos. Em voc\xEA, essas caracter\xEDsticas aparecem com intensidade ${intensityLabel(primary.average)}, o que costuma se traduzir num jeito de estar nos ambientes mais calmo, observador e est\xE1vel do que agitado.

No eixo introvertido/extrovertido, o fleum\xE1tico tende \xE0 introvers\xE3o tranquila ou \xE0 ambivers\xE3o discreta: gosta de gente, mas n\xE3o precisa chamar aten\xE7\xE3o; observa muito antes de se expor. \xC9 mais realista que intuitivo: prefere o que \xE9 concreto, comprovado, que funciona na pr\xE1tica. Costuma ter mente anal\xEDtica/pragm\xE1tica, mas com boa sensibilidade para o clima emocional ao redor. \xC9 planejador por natureza - organiza, cria rotinas, prefere o caminho seguro - e pouco desbravador impulsivo. Na assertividade, inclina-se mais \xE0 serenidade do que \xE0 confronta\xE7\xE3o: evita brigas, mas pode ficar em sil\xEAncio mesmo quando gostaria de se posicionar.`
    });
  }
  if (secondary && secondary.groupId === "choleric") {
    blocks.push({
      id: "temp-traits-secondary",
      access: "free",
      title: "Fleum\xE1tico-col\xE9rico: estabilidade com foco em resultados",
      body: `Na combina\xE7\xE3o fleum\xE1tico-col\xE9rico, a calma do fleum\xE1tico se une \xE0 energia orientada para metas do col\xE9rico. Isso gera um perfil que continua sendo moderado e observador, mas que reage com firmeza quando h\xE1 um objetivo n\xEDtido em jogo.

Em termos de tra\xE7os, voc\xEA tende \xE0 ambivers\xE3o: \xE9 capaz de se expor e liderar quando necess\xE1rio, mas n\xE3o precisa de palco o tempo todo. Mant\xE9m o olhar realista, anal\xEDtico, com forte foco em solu\xE7\xE3o de problemas. \xC9 planejador, por\xE9m n\xE3o se perde em planos - sabe sair do papel e executar. A assertividade aparece de modo controlado: quando entende que algo precisa ser dito ou decidido, voc\xEA o faz, mesmo sem gostar de conflito.`
    });
  } else if (secondary && secondary.groupId === "melancholic") {
    blocks.push({
      id: "temp-traits-secondary",
      access: "free",
      title: "Fleum\xE1tico-melanc\xF3lico: profundidade serena",
      body: `Na combina\xE7\xE3o fleum\xE1tico-melanc\xF3lico, a estabilidade fleum\xE1tica encontra o mundo interior intenso do melanc\xF3lico. Voc\xEA tende a ser mais recolhido, contemplativo e sens\xEDvel, mas raramente explosivo.

No dia a dia, isso se expressa em forte introvers\xE3o, grande capacidade de an\xE1lise e observa\xE7\xE3o, prefer\xEAncia por planejamentos detalhados e um estilo pouco combativo. Voc\xEA sente muito, mas costuma elaborar em sil\xEAncio; prefere pensar longamente antes de falar, e muitas vezes prefere escrever ou agir aos poucos em vez de confrontar diretamente.`
    });
  } else if (secondary && secondary.groupId === "sanguine") {
    blocks.push({
      id: "temp-traits-secondary",
      access: "free",
      title: "Fleum\xE1tico-sangu\xEDneo: sociabilidade tranquila",
      body: `Na combina\xE7\xE3o fleum\xE1tico-sangu\xEDneo, a paz interior do fleum\xE1tico se mistura \xE0 leveza e sociabilidade do sangu\xEDneo. O resultado \xE9 um perfil acess\xEDvel, simp\xE1tico e que convive bem com todo tipo de pessoa, sem perder a pr\xF3pria calma.

Em termos de tra\xE7os, isso geralmente gera um ambivertido leve: voc\xEA conversa bem, sabe acolher e fazer os outros se sentirem \xE0 vontade, mas n\xE3o gosta de exageros ou dramas. O olhar permanece realista, com boa leitura emocional dos ambientes. Planeja o m\xEDnimo necess\xE1rio e depois ajusta em movimento, com baixa agressividade e um estilo de influ\xEAncia mais pela presen\xE7a e humor do que pela for\xE7a.`
    });
  }
  blocks.push({
    id: "temp-traits-premium",
    access: "premium",
    title: "An\xE1lise completa dos tra\xE7os fleum\xE1ticos (Premium)",
    body: "No relat\xF3rio em PDF, o eixo fleum\xE1tico \xE9 destrinchado em subt\xF3picos: estilo de rea\xE7\xE3o emocional, ritmo interno, grau de iniciativa, modo de lidar com conflitos, padr\xE3o de acomoda\xE7\xE3o ou coragem, tipo de foco e forma de buscar seguran\xE7a. Tamb\xE9m s\xE3o explorados, em cada combina\xE7\xE3o, como autenticidade, lealdade, altru\xEDsmo e intelig\xEAncia emocional aparecem no seu modo de ser e de se relacionar."
  });
  return blocks;
}
function buildPhlegmaticCareer(primary, secondary) {
  const blocks = [];
  if (!primary) return blocks;
  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary != null ? secondary : null);
  blocks.push({
    id: "temp-career-style",
    access: "free",
    title: "Estilo de trabalho e produtividade fleum\xE1ticos",
    body: `O fleum\xE1tico costuma enxergar o trabalho como lugar de estabilidade, colabora\xE7\xE3o e rotina bem definida. Em voc\xEA, isso aparece como impulso para manter as coisas funcionando, evitar caos desnecess\xE1rio e ser um ponto de equil\xEDbrio nas equipes.

Sua produtividade tende a crescer quando o ambiente \xE9 previs\xEDvel, respeitoso e bem organizado; e a cair quando tudo muda o tempo todo, h\xE1 conflitos constantes ou cobran\xE7as agressivas. Voc\xEA tende a manter um ritmo constante, prefere terminar o que come\xE7ou e raramente age em \u201Cpicos\u201D de energia seguidos de grandes quedas.`
  });
  if (secondary && secondary.groupId === "choleric") {
    blocks.push({
      id: "temp-career-mix",
      access: "free",
      title: "Fleum\xE1tico-col\xE9rico no trabalho",
      body: `No campo profissional, a combina\xE7\xE3o ${primaryLabel}-${secondaryLabel} costuma formar perfis de lideran\xE7a serena: pessoas que unem organiza\xE7\xE3o e calma com foco em resultados e capacidade de decis\xE3o.

Voc\xEA pode ir bem em fun\xE7\xF5es de coordena\xE7\xE3o, gest\xE3o de processos, lideran\xE7a de equipes t\xE9cnicas ou operacionais, onde seja necess\xE1rio manter a ordem, cuidar de pessoas e, ao mesmo tempo, entregar metas. Sua ambi\xE7\xE3o tende a ser moderada: busca efici\xEAncia real mais do que brilho, e prefere que o trabalho fale por si. O ponto de aten\xE7\xE3o \xE9 n\xE3o usar a fleuma como desculpa para adiar decis\xF5es dif\xEDceis que o lado col\xE9rico sabe que precisam ser tomadas.`
    });
  } else if (secondary && secondary.groupId === "melancholic") {
    blocks.push({
      id: "temp-career-mix",
      access: "free",
      title: "Fleum\xE1tico-melanc\xF3lico no trabalho",
      body: `O fleum\xE1tico-melanc\xF3lico \xE9 frequentemente um profissional de confian\xE7a m\xE1xima: est\xE1vel, detalhista e profundamente respons\xE1vel. Voc\xEA tende a se destacar em fun\xE7\xF5es que exigem precis\xE3o, an\xE1lise, const\xE2ncia e discri\xE7\xE3o: pesquisa, \xE1reas t\xE9cnicas, planejamento, administra\xE7\xE3o, ensino, cuidado de sa\xFAde ou servi\xE7os sociais.

A ambi\xE7\xE3o aqui costuma ser mais silenciosa, voltada \xE0 qualidade e ao sentido do que se faz. Voc\xEA pode buscar aperfei\xE7oar m\xE9todos, criar solu\xE7\xF5es discretas e duradouras, mesmo sem almejar cargos de grande visibilidade. O cuidado \xE9 n\xE3o deixar que o pessimismo ou a autocr\xEDtica melanc\xF3lica, somados \xE0 passividade fleum\xE1tica, levem voc\xEA a subestimar seu pr\xF3prio valor ou a se esconder em tarefas menores do que \xE9 capaz de realizar.`
    });
  } else if (secondary && secondary.groupId === "sanguine") {
    blocks.push({
      id: "temp-career-mix",
      access: "free",
      title: "Fleum\xE1tico-sangu\xEDneo no trabalho",
      body: `O fleum\xE1tico-sangu\xEDneo costuma brilhar em contextos que unem gente e rotina: atendimento, RH, coordena\xE7\xE3o de equipes de servi\xE7o, \xE1reas de suporte, ambientes educacionais e pastorais.

Voc\xEA tende a ser organizado o suficiente para manter processos, e leve o bastante para tornar o ambiente mais humano. Sua motiva\xE7\xE3o cresce quando h\xE1 boa conviv\xEAncia e sensa\xE7\xE3o de utilidade; cai quando o clima est\xE1 hostil ou quando o trabalho se torna repetitivo demais sem nenhum contato humano. A ambi\xE7\xE3o \xE9 geralmente baixa em termos de poder, mas alta em querer que o grupo esteja bem - o que o torna candidato natural a pap\xE9is de \u201Cponte\u201D entre dire\xE7\xE3o e equipe.`
    });
  }
  blocks.push({
    id: "temp-career-premium",
    access: "premium",
    title: "Caminhos profissionais alinhados ao seu temperamento fleum\xE1tico (Premium)",
    body: "No relat\xF3rio em PDF, s\xE3o apresentados cen\xE1rios profissionais que dialogam bem com a calma fleum\xE1tica (fun\xE7\xF5es de suporte, gest\xE3o de processos, cuidado, doc\xEAncia, \xE1reas t\xE9cnicas est\xE1veis) e contextos em que voc\xEA precisar\xE1 de estrat\xE9gias espec\xEDficas (ambientes altamente competitivos, agressivos ou ca\xF3ticos). S\xE3o oferecidas sugest\xF5es de como usar sua estabilidade, empatia e diplomacia como pontos fortes, sem cair na acomoda\xE7\xE3o ou na invisibilidade."
  });
  return blocks;
}
function buildPhlegmaticGrowth(primary, secondary) {
  const blocks = [];
  if (!primary) return blocks;
  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary != null ? secondary : null);
  blocks.push({
    id: "temp-growth-stress",
    access: "free",
    title: "Rea\xE7\xE3o do fleum\xE1tico ao estresse e \xE0s crises",
    body: `Sob press\xE3o, o temperamento fleum\xE1tico tende menos a explodir e mais a se retrair. Voc\xEA provavelmente percebe em si a tend\xEAncia a evitar confronto, adiar decis\xF5es dif\xEDceis ou \u201Cengolir\u201D inc\xF4modos para n\xE3o gerar briga.

Ao mesmo tempo, o eixo fleum\xE1tico est\xE1 naturalmente ligado \xE0 resili\xEAncia silenciosa: suporta muito, aguenta bastante peso sem se desestruturar externamente. O risco \xE9 que essa for\xE7a se transforme em fuga (acomoda\xE7\xE3o) ou em cansa\xE7o interno acumulado. Parte do crescimento passa por aprender a reconhecer cedo os sinais de sobrecarga - des\xE2nimo, procrastina\xE7\xE3o, ironia, vontade de se desligar - e buscar ajuda ou ajustar rotas antes que a alma \u201Cdesligue\u201D por completo.`
  });
  if (secondary && secondary.groupId === "choleric") {
    blocks.push({
      id: "temp-growth-hidden",
      access: "free",
      title: "Fleum\xE1tico-col\xE9rico em momentos de crise",
      body: `Na combina\xE7\xE3o ${primaryLabel}-${secondaryLabel}, crises podem provocar um movimento interno duplo: por fora, voc\xEA tenta manter a calma; por dentro, sente a for\xE7a col\xE9rica querendo resolver tudo de uma vez.

Se mal integrado, isso pode gerar um ciclo de adiamentos seguidos de rea\xE7\xF5es bruscas: voc\xEA deixa passar, deixa passar, e de repente explode. O caminho de crescimento envolve aprender a nomear o problema mais cedo, convocar conversas necess\xE1rias e usar a energia col\xE9rica a servi\xE7o da verdade e da justi\xE7a, sem abandonar a delicadeza fleum\xE1tica.`
    });
  } else if (secondary && secondary.groupId === "melancholic") {
    blocks.push({
      id: "temp-growth-hidden",
      access: "free",
      title: "Fleum\xE1tico-melanc\xF3lico em momentos de crise",
      body: `Na combina\xE7\xE3o ${primaryLabel}-${secondaryLabel}, crises costumam ser vividas para dentro: h\xE1 tend\xEAncia a recolhimento, tristeza silenciosa e pensamentos negativos repetitivos.

Aqui, o desafio \xE9 n\xE3o confundir paz com resigna\xE7\xE3o triste. O crescimento passa por cultivar esperan\xE7a, pedir ajuda quando a mente pesa demais e praticar atos concretos de confian\xE7a (em Deus e nas pessoas), em vez de se isolar e ceder ao pessimismo. Virtudes como coragem mansa, alegria simples e caridade ativa ajudam a romper a espiral de \u201Cpensar demais e agir de menos\u201D.`
    });
  } else if (secondary && secondary.groupId === "sanguine") {
    blocks.push({
      id: "temp-growth-hidden",
      access: "free",
      title: "Fleum\xE1tico-sangu\xEDneo em momentos de instabilidade",
      body: `Na combina\xE7\xE3o ${primaryLabel}-${secondaryLabel}, crises podem alternar entre fuga silenciosa e busca de distra\xE7\xF5es. Voc\xEA pode se perceber, em certos momentos, enchendo a agenda de atividades ou conversas para n\xE3o olhar para quest\xF5es dif\xEDceis; em outros, querendo apenas se desligar de tudo.

O crescimento passa por encontrar um meio-termo: n\xE3o se afogar em est\xEDmulos nem se esconder, mas reservar tempos claros para pensar e rezar, e outros para se alegrar com quem voc\xEA ama. Virtudes como temperan\xE7a, disciplina leve e sinceridade consigo mesmo ajudam a usar o melhor do sangu\xEDneo (alegria) e do fleum\xE1tico (paz), sem deixar que nenhum dos dois sirva de fuga.`
    });
  }
  blocks.push({
    id: "temp-growth-virtues",
    access: "free",
    title: "Virtudes que equilibram o fleum\xE1tico",
    body: "O fleum\xE1tico tem facilidade natural para virtudes como paci\xEAncia, toler\xE2ncia, prud\xEAncia e mansid\xE3o. Por outro lado, precisa trabalhar com mais empenho virtudes ligadas \xE0 fortaleza: iniciativa, coragem, decis\xE3o, perseveran\xE7a em come\xE7ar e em terminar o que come\xE7ou. Parte do crescimento passa por aprender a dizer \u201Csim\u201D quando \xE9 hora de agir e \u201Cn\xE3o\u201D quando \xE9 hora de colocar limites, sem abandonar a sua marca de paz, mas tamb\xE9m sem permitir que a acomoda\xE7\xE3o dite o rumo da sua vida."
  });
  blocks.push({
    id: "temp-growth-premium",
    access: "premium",
    title: "Plano de crescimento por etapas (Premium)",
    body: "No relat\xF3rio em PDF voc\xEA encontrar\xE1 um plano em etapas pensado para o fleum\xE1tico e suas combina\xE7\xF5es: exerc\xEDcios concretos para sair da in\xE9rcia sem perder a paz, pr\xE1ticas para enfrentar conversas dif\xEDceis com caridade, pontos de exame de consci\xEAncia sobre acomoda\xE7\xE3o e omiss\xE3o, e meios de canalizar sua estabilidade ao servi\xE7o de um bem maior, sem se esconder atr\xE1s do \u201Ctanto faz\u201D."
  });
  return blocks;
}
function buildPhlegmaticRelationships(primary, secondary) {
  const blocks = [];
  if (!primary) return blocks;
  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary != null ? secondary : null);
  blocks.push({
    id: "temp-rel-dynamics",
    access: "free",
    title: "Como o fleum\xE1tico se relaciona",
    body: `O fleum\xE1tico leva para os relacionamentos a mesma calma que leva para o trabalho: gosta de ambientes pac\xEDficos, evita brigas e tende a ser um ponto de estabilidade para quem convive com ele.

Seu jeito de demonstrar carinho costuma ser discreto, mais por presen\xE7a fiel e pequenos servi\xE7os do que por grandes declara\xE7\xF5es. Valoriza a lealdade e o altru\xEDsmo concreto - estar ali, ajudar, ouvir, fazer o que \xE9 preciso. A intelig\xEAncia emocional aparece na leitura serena das pessoas e na capacidade de n\xE3o reagir de modo explosivo, embora \xE0s vezes falte iniciativa para abrir o pr\xF3prio cora\xE7\xE3o ou para confrontar o que precisa ser dito.`
  });
  if (secondary && secondary.groupId === "choleric") {
    blocks.push({
      id: "temp-rel-mix",
      access: "free",
      title: "Fleum\xE1tico-col\xE9rico nos v\xEDnculos",
      body: `Na combina\xE7\xE3o ${primaryLabel}-${secondaryLabel}, voc\xEA tende a ser leal, protetor e, ao mesmo tempo, relativamente calmo. \xC9 capaz de entrar em cena com for\xE7a quando algu\xE9m querido precisa de defesa, mas n\xE3o vive em modo de combate.

A autenticidade se expressa em franqueza ponderada: voc\xEA n\xE3o gosta de rodeios, por\xE9m mede as palavras para n\xE3o ferir \xE0 toa. A lealdade \xE9 alta, o altru\xEDsmo se manifesta em atitudes consistentes, e a intelig\xEAncia emocional cresce quando voc\xEA aprende a n\xE3o engolir ressentimentos em sil\xEAncio - preferindo conversas firmes e respeitosas em vez de explos\xF5es tardias.`
    });
  } else if (secondary && secondary.groupId === "melancholic") {
    blocks.push({
      id: "temp-rel-mix",
      access: "free",
      title: "Fleum\xE1tico-melanc\xF3lico nos v\xEDnculos",
      body: `Na combina\xE7\xE3o ${primaryLabel}-${secondaryLabel}, os relacionamentos s\xE3o vividos com grande profundidade e discri\xE7\xE3o. Voc\xEA costuma ter poucos v\xEDnculos, mas muito significativos, e tende a ser altamente leal a quem deixa se aproximar.

A autenticidade se manifesta mais pela coer\xEAncia do que por palavras: voc\xEA \xE9 o tipo de pessoa que \u201Cest\xE1 sempre ali\u201D, mesmo sem discursos. O altru\xEDsmo \xE9 grande, mas pode ser silencioso - ajuda, mas nem sempre compartilha o que sente. O desafio est\xE1 em n\xE3o guardar m\xE1goas ou expectativas n\xE3o ditas: sua intelig\xEAncia emocional amadurece quando voc\xEA se permite expressar dores, pedir consolo e dizer com clareza o que precisa, em vez de apenas suportar.`
    });
  } else if (secondary && secondary.groupId === "sanguine") {
    blocks.push({
      id: "temp-rel-mix",
      access: "free",
      title: "Fleum\xE1tico-sangu\xEDneo nos v\xEDnculos",
      body: `Na combina\xE7\xE3o ${primaryLabel}-${secondaryLabel}, voc\xEA tende a ser uma presen\xE7a f\xE1cil de amar: acolhedor, bem-humorado na medida certa, raramente invasivo. Consegue unir autenticidade simples, lealdade constante e um altru\xEDsmo que se manifesta tanto em gestos pr\xE1ticos quanto em boa companhia.

Sua intelig\xEAncia emocional se expressa na capacidade de acalmar ambientes tensos, escutar sem julgar e, ao mesmo tempo, quebrar o gelo com leveza. O ponto de cuidado \xE9 n\xE3o se esconder atr\xE1s do papel de \u201Clegal com todo mundo\u201D para evitar conversas dif\xEDceis: quando voc\xEA se permite colocar limites e expressar o que o incomoda, seus v\xEDnculos se tornam ainda mais maduros e s\xF3lidos.`
    });
  }
  blocks.push({
    id: "temp-rel-premium",
    access: "premium",
    title: "Orienta\xE7\xF5es para amizades, fam\xEDlia e vida afetiva (Premium)",
    body: "No relat\xF3rio em PDF, o eixo fleum\xE1tico \xE9 aplicado de forma concreta \xE0 vida afetiva: como o seu perfil tende a se comportar em amizade, namoro/casamento, rela\xE7\xE3o com filhos, pais e comunidade. S\xE3o oferecidas sugest\xF5es pr\xE1ticas para canalizar sua paz, lealdade e altru\xEDsmo sem cair em passividade, e para crescer em verdadeira intelig\xEAncia emocional - capaz de unir sinceridade e mansid\xE3o nas conversas dif\xEDceis e no cuidado di\xE1rio com quem voc\xEA ama."
  });
  return blocks;
}

function buildMelancholicIntro(primary, secondary) {
  const blocks = [];
  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary);
  const comboText = secondary ? `Seu temperamento predominante \xE9 ${primary.name}, com influ\xEAncia significativa de ${secondary.name}.` : `Seu temperamento predominante \xE9 ${primary.name}, formando um perfil marcadamente ${primaryLabel}.`;
  blocks.push({
    id: "temp-overview",
    access: "free",
    title: "Seu perfil de temperamento",
    body: `${comboText}

Na pr\xE1tica, isso significa que as caracter\xEDsticas cl\xE1ssicas do melanc\xF3lico aparecem em voc\xEA com intensidade ${intensityLabel(primary.average)}: tend\xEAncia \xE0 reflex\xE3o profunda, sensibilidade elevada, consci\xEAncia moral forte e olhar atento para nuances e detalhes. Voc\xEA raramente passa superficialmente pelas coisas; precisa entender, significar e integrar o que vive.

Em termos de tra\xE7os amplos, o melanc\xF3lico tende mais \xE0 introvers\xE3o (o movimento primeiro \xE9 para dentro), com mistura de realismo e intui\xE7\xE3o: enxerga fatos concretos, mas tamb\xE9m l\xEA significados, s\xEDmbolos e poss\xEDveis consequ\xEAncias. A mente \xE9 anal\xEDtica e, ao mesmo tempo, profundamente emocional; o ritmo \xE9 mais de planejador do que de desbravador impulsivo. Quanto \xE0 assertividade, o melanc\xF3lico costuma oscilar: pode ser muito firme em temas de consci\xEAncia ou justi\xE7a, mas turbulento por dentro, ruminando, revendo e duvidando de si mesmo.`
  });
  if (secondary) {
    let comboBody = "";
    if (secondary.groupId === "choleric") {
      comboBody = `Na combina\xE7\xE3o ${primaryLabel}-${secondaryLabel}, a profundidade melanc\xF3lica encontra a for\xE7a de vontade col\xE9rica. Por fora, isso pode se traduzir num perfil mais decidido e firme do que o melanc\xF3lico t\xEDpico; por dentro, h\xE1 grande intensidade afetiva, autocr\xEDtica e senso de responsabilidade.

Voc\xEA tende a ser introvertido-ativo: pensa muito, mas tamb\xE9m sente a necessidade de agir quando est\xE1 convicto. O olhar \xE9 realista e anal\xEDtico; a dimens\xE3o emocional \xE9 forte, mas canalizada para causas e projetos. O estilo \xE9 mais planejador que impulsivo, ainda que exista um impulso desbravador quando a consci\xEAncia manda. A assertividade cresce em temas que considera importantes; a turbul\xEAncia aparece depois, quando revisita tudo o que fez ou disse.`;
    } else if (secondary.groupId === "phlegmatic") {
      comboBody = `Na combina\xE7\xE3o ${primaryLabel}-${secondaryLabel}, a sensibilidade melanc\xF3lica encontra a estabilidade do fleum\xE1tico. O resultado \xE9 um perfil mais sereno, observador e constante, com grande capacidade de escuta e de fidelidade nos v\xEDnculos.

Voc\xEA tende claramente \xE0 introvers\xE3o, com olhar realista, anal\xEDtico e contemplativo. A emo\xE7\xE3o \xE9 profunda, mas muitas vezes silenciosa; prefere planejar, observar e preparar-se antes de dar passos grandes. A assertividade pode ser baixa em situa\xE7\xF5es sociais amplas, mas cresce em temas de consci\xEAncia e justi\xE7a. A turbul\xEAncia costuma ser mais interna (rumina\xE7\xF5es, escr\xFApulos, preocupa\xE7\xF5es), enquanto por fora voc\xEA aparenta calma.`;
    } else if (secondary.groupId === "sanguine") {
      comboBody = `Na combina\xE7\xE3o ${primaryLabel}-${secondaryLabel}, o mundo interior melanc\xF3lico se mistura com momentos de leveza e sociabilidade do sangu\xEDneo. Voc\xEA pode alternar entre fases de recolhimento profundo e per\xEDodos de maior abertura, conversa e criatividade.

No eixo introvers\xE3o/extrovers\xE3o, costuma ser um ambivertido: precisa de muito tempo sozinho para processar, mas tamb\xE9m experimenta picos de extrovers\xE3o em ambientes seguros. O olhar \xE9 intuitivo-realista, com forte componente anal\xEDtico e emocional. H\xE1 um lado planejador bem desenvolvido, mas com lampejos de desbravador quando se sente inspirado ou compreendido. A assertividade varia conforme o estado afetivo: cresce quando o cora\xE7\xE3o est\xE1 aquecido e cai quando o medo de errar ou de ser rejeitado fala mais alto.`;
    } else {
      comboBody = `A combina\xE7\xE3o entre ${primary.name} e ${secondary.name} torna o seu perfil ainda mais complexo: a profundidade melanc\xF3lica ganha nuances de prud\xEAncia, estabilidade ou expansividade, dependendo do temperamento secund\xE1rio. Isso ajuda a explicar por que voc\xEA n\xE3o se reconhece em descri\xE7\xF5es simplistas de \u201Cmelanc\xF3lico puro\u201D.`;
    }
    blocks.push({
      id: "temp-combo",
      access: "free",
      title: "Como a combina\xE7\xE3o melanc\xF3lica aparece em voc\xEA",
      body: comboBody
    });
  }
  blocks.push({
    id: "temp-premium-overview",
    access: "premium",
    title: "Mapa completo do seu temperamento melanc\xF3lico (Premium)",
    body: "No relat\xF3rio em PDF, o eixo melanc\xF3lico \xE9 aprofundado em suas for\xE7as e fragilidades: capacidade de contempla\xE7\xE3o, sensibilidade \xE0s injusti\xE7as, tend\xEAncia \xE0 autocr\xEDtica, busca de sentido e de coer\xEAncia. S\xE3o explorados tamb\xE9m os efeitos das combina\xE7\xF5es com col\xE9rico, fleum\xE1tico e sangu\xEDneo, com exemplos concretos de como isso aparece em decis\xF5es, estudos, vida profissional e espiritual, \xE0 luz de autores cl\xE1ssicos e da tradi\xE7\xE3o crist\xE3."
  });
  return blocks;
}
function buildMelancholicTraits(primary, secondary) {
  const blocks = [];
  if (!secondary || secondary.groupId === "melancholic") {
    blocks.push({
      id: "temp-traits-core",
      access: "free",
      title: "Tra\xE7os centrais da personalidade melanc\xF3lica",
      body: `O n\xFAcleo do temperamento melanc\xF3lico \xE9 marcado por profundidade, senso de responsabilidade e forte vida interior. Voc\xEA tende a perceber nuances que passam despercebidas aos outros, seja em rela\xE7\xF5es, seja em ideias ou projetos. A intensidade atual desse temperamento em voc\xEA foi classificada como ${intensityLabel(primary.average)}, o que geralmente se traduz em grande capacidade de concentra\xE7\xE3o e de an\xE1lise, mas tamb\xE9m em riscos de preocupa\xE7\xE3o excessiva.

No eixo introvers\xE3o/extrovers\xE3o, o melanc\xF3lico \xE9 predominantemente introvertido: precisa de recolhimento para se organizar por dentro. Seu olhar \xE9 realista, mas com forte componente intuitivo \u2013 voc\xEA n\xE3o enxerga apenas o que est\xE1 na superf\xEDcie, mas o que aquilo significa. A mente \xE9 anal\xEDtica e profundamente emocional: voc\xEA sente muito e pensa muito sobre o que sente. Voc\xEA prefere planejar a desbravar impulsivamente; e no eixo assertivo/turbulento tende a ser mais turbulento, oscilando entre convic\xE7\xF5es firmes e d\xFAvidas insistentes, especialmente em temas pessoais.`
    });
  }
  if (secondary && secondary.groupId === "choleric") {
    blocks.push({
      id: "temp-traits-secondary",
      access: "free",
      title: "Melanc\xF3lico-col\xE9rico: profundidade com vontade forte",
      body: `Na combina\xE7\xE3o melanc\xF3lico-col\xE9rico, a reflex\xE3o e a sensibilidade melanc\xF3licas se unem \xE0 energia dirigida do col\xE9rico. Isso pode gerar um perfil intenso, exigente consigo mesmo e com os outros, movido por ideais altos e por um senso forte de miss\xE3o.

Voc\xEA tende a ser mais introvertido na forma de processar as coisas, mas mais decidido e firme ao agir em causas que abra\xE7a. O olhar \xE9 anal\xEDtico e realista; a dimens\xE3o emocional \xE9 profunda e muitas vezes dram\xE1tica. Voc\xEA consegue planejar com cuidado e, quando convencido, se torna desbravador em dire\xE7\xE3o ao que considera justo ou necess\xE1rio. A assertividade aumenta em temas de princ\xEDpio, embora a turbul\xEAncia interna permane\xE7a elevada (autocr\xEDtica, escr\xFApulos, revis\xE3o constante do que faz).`
    });
  } else if (secondary && secondary.groupId === "phlegmatic") {
    blocks.push({
      id: "temp-traits-secondary",
      access: "free",
      title: "Melanc\xF3lico-fleum\xE1tico: profundidade serena",
      body: `Na combina\xE7\xE3o melanc\xF3lico-fleum\xE1tico, o mundo interior intenso do melanc\xF3lico encontra a estabilidade e a prud\xEAncia do fleum\xE1tico. O resultado costuma ser um perfil silencioso, fiel e de grande capacidade de escuta, com um senso muito fino do que \xE9 justo e verdadeiro.

Voc\xEA tende fortemente \xE0 introvers\xE3o; observa muito antes de falar. O olhar \xE9 realista-anal\xEDtico, com grande sensibilidade para dores e injusti\xE7as. A emo\xE7\xE3o \xE9 profunda, mas expressa com discri\xE7\xE3o. O estilo \xE9 claramente planejador: prefere estudar, preparar e organizar antes de agir. A assertividade costuma ser baixa em contextos superficiais, mas cresce bastante quando algu\xE9m em quem voc\xEA acredita ou algo que voc\xEA ama est\xE1 em jogo. A turbul\xEAncia interna tende a se manifestar mais como preocupa\xE7\xE3o silenciosa do que como explos\xF5es vis\xEDveis.`
    });
  } else if (secondary && secondary.groupId === "sanguine") {
    blocks.push({
      id: "temp-traits-secondary",
      access: "free",
      title: "Melanc\xF3lico-sangu\xEDneo: intensidade com luz e sombra",
      body: `Na combina\xE7\xE3o melanc\xF3lico-sangu\xEDneo, a profundidade e a sensibilidade do melanc\xF3lico se misturam com momentos de espontaneidade, humor e sociabilidade do sangu\xEDneo. Isso pode gerar um perfil que alterna entre introspec\xE7\xE3o intensa e per\xEDodos de grande criatividade e presen\xE7a afetiva.

Voc\xEA tende a ser introvertido por estrutura, mas com picos claros de extrovers\xE3o quando est\xE1 com pessoas de confian\xE7a ou em ambientes inspiradores. O olhar \xE9 intuitivo e anal\xEDtico, e as emo\xE7\xF5es s\xE3o ricas, variando de grande alegria a melancolia silenciosa. Voc\xEA planeja com cuidado, mas tamb\xE9m \xE9 capaz de movimentos desbravadores quando se sente compreendido e apoiado. No eixo assertivo/turbulento, h\xE1 grande oscila\xE7\xE3o: em alguns dias, voc\xEA se sente confiante e expressivo; em outros, retra\xEDdo, inseguro e autocr\xEDtico.`
    });
  }
  blocks.push({
    id: "temp-traits-premium",
    access: "premium",
    title: "An\xE1lise completa dos tra\xE7os melanc\xF3licos (Premium)",
    body: "No relat\xF3rio em PDF, o eixo melanc\xF3lico \xE9 detalhado em subdimens\xF5es: n\xEDvel de sensibilidade, tipo de autocr\xEDtica, grau de introspec\xE7\xE3o, capacidade de concentra\xE7\xE3o, tend\xEAncia ao perfeccionismo e modo de reagir a cr\xEDticas. Tamb\xE9m s\xE3o explorados os modos como autenticidade, lealdade e altru\xEDsmo se expressam em voc\xEA, e quais pontos pedem crescimento em intelig\xEAncia emocional, especialmente no lidar com frustra\xE7\xF5es, rejei\xE7\xF5es e erros pr\xF3prios."
  });
  return blocks;
}
function buildMelancholicCareer(primary, secondary) {
  const blocks = [];
  blocks.push({
    id: "temp-career-style",
    access: "free",
    title: "Estilo de trabalho e produtividade melanc\xF3licos",
    body: `O melanc\xF3lico costuma encarar o trabalho como lugar de sentido e coer\xEAncia: mais do que \u201Cfazer\u201D, ele precisa enxergar valor naquilo que realiza. Em voc\xEA, isso tende a aparecer como busca de qualidade, profundidade e exatid\xE3o. A produtividade aumenta quando h\xE1 tempo para pensar, estrutura clara, sil\xEAncio razo\xE1vel e objetivos que fa\xE7am sentido; e cai quando o ambiente \xE9 ca\xF3tico, superficial ou cheio de mudan\xE7as bruscas sem explica\xE7\xE3o.

A ambi\xE7\xE3o melanc\xF3lica nem sempre se traduz em desejo de visibilidade, mas em desejo de perfei\xE7\xE3o: voc\xEA quer entregar algo bem feito, bem pensado, consistente. A motiva\xE7\xE3o cresce quando sente que seu trabalho ajuda pessoas, faz diferen\xE7a real ou responde a um ideal elevado. O desejo de liderar pode ser discreto, mas existe, sobretudo em \xE1reas em que voc\xEA tem compet\xEAncia comprovada ou profunda convic\xE7\xE3o \xE9tica.`
  });
  if (secondary && secondary.groupId === "choleric") {
    blocks.push({
      id: "temp-career-mix",
      access: "free",
      title: "Melanc\xF3lico-col\xE9rico no trabalho",
      body: `No melanc\xF3lico-col\xE9rico, a busca de perfei\xE7\xE3o encontra a vontade forte de realizar. Voc\xEA tende a se destacar em fun\xE7\xF5es que pedem lideran\xE7a t\xE9cnica, pesquisa aplicada, estrat\xE9gia, ensino exigente ou dire\xE7\xE3o de projetos complexos. Costuma unir vis\xE3o profunda com capacidade de decis\xE3o, embora possa ser muito duro consigo mesmo e com a equipe.

A ambi\xE7\xE3o tende a ser alta, mas centrada mais em \u201Cfazer bem\u201D do que em \u201Caparecer mais\u201D. O risco est\xE1 em acumular responsabilidades demais, n\xE3o delegar e se sobrecarregar; quando cansado, pode oscilar entre rigidez e des\xE2nimo. O crescimento profissional passa por aprender a aceitar limites, dividir tarefas e reconhecer progressos parciais sem desprez\xE1-los.`
    });
  } else if (secondary && secondary.groupId === "phlegmatic") {
    blocks.push({
      id: "temp-career-mix",
      access: "free",
      title: "Melanc\xF3lico-fleum\xE1tico no trabalho",
      body: `No melanc\xF3lico-fleum\xE1tico, a profundidade se soma \xE0 const\xE2ncia. Voc\xEA tende a ir bem em \xE1reas que pedem paci\xEAncia, precis\xE3o, continuidade e aten\xE7\xE3o a detalhes: pesquisa, bastidores, contabilidade, documenta\xE7\xE3o, arquivos, suporte especializado, acompanhamento de pessoas em processos longos.

A motiva\xE7\xE3o cresce quando sente que pode trabalhar em paz, com processos est\xE1veis e objetivos bem definidos. O desejo de liderar pode ser mais baixo, mas existe a vontade de ser refer\xEAncia t\xE9cnica, conselheiro seguro ou \u201Cmem\xF3ria viva\u201D de um setor. O ponto de vigil\xE2ncia est\xE1 em evitar a paralisia por medo de errar e a tend\xEAncia a se esconder demais para n\xE3o ser criticado.`
    });
  } else if (secondary && secondary.groupId === "sanguine") {
    blocks.push({
      id: "temp-career-mix",
      access: "free",
      title: "Melanc\xF3lico-sangu\xEDneo no trabalho",
      body: `No melanc\xF3lico-sangu\xEDneo, a pesquisa e a profundidade se encontram com criatividade, comunica\xE7\xE3o e certa versatilidade. Voc\xEA pode se sair muito bem em profiss\xF5es que unam conte\xFAdo s\xE9rio com express\xE3o: doc\xEAncia, produ\xE7\xE3o de conte\xFAdo, escrita, artes, comunica\xE7\xE3o institucional, consultoria, campos em que seja preciso traduzir ideias complexas de modo acess\xEDvel.

A motiva\xE7\xE3o tende a variar em ondas: per\xEDodos de grande entusiasmo intercalados com fases de cansa\xE7o ou autocr\xEDtica intensa. O desejo de liderar pode surgir mais em rela\xE7\xE3o a projetos do que a cargos formais. Uma parte importante do crescimento profissional ser\xE1 aprender a gerir a pr\xF3pria energia, evitar ciclos de \u201Ctudo ou nada\u201D e cultivar rotinas sustent\xE1veis.`
    });
  }
  blocks.push({
    id: "temp-career-premium",
    access: "premium",
    title: "Caminhos profissionais alinhados ao temperamento melanc\xF3lico (Premium)",
    body: "No relat\xF3rio em PDF, s\xE3o apresentados cen\xE1rios de trabalho compat\xEDveis com o eixo melanc\xF3lico: pesquisa, doc\xEAncia, \xE1reas t\xE9cnicas, artes, atendimento em profundidade, escrita, an\xE1lise, al\xE9m de alertas sobre ambientes que tendem a acentuar a autocr\xEDtica e o des\xE2nimo. Tamb\xE9m s\xE3o indicadas estrat\xE9gias concretas para ordenar perfeccionismo, ambi\xE7\xE3o de excel\xEAncia e desejo de coer\xEAncia ao servi\xE7o de um bem maior, sem paralisar-se nem se desgastar desnecessariamente."
  });
  return blocks;
}
function buildMelancholicGrowth(primary, secondary) {
  const blocks = [];
  blocks.push({
    id: "temp-growth-stress",
    access: "free",
    title: "Rea\xE7\xE3o do melanc\xF3lico ao estresse e \xE0s crises",
    body: `Sob press\xE3o, o temperamento melanc\xF3lico tende a intensificar tanto a emo\xE7\xE3o quanto a an\xE1lise. Voc\xEA pode entrar em ciclos de rumina\xE7\xE3o, revisando conversas, decis\xF5es e poss\xEDveis erros; pode sentir a dor com profundidade e ter dificuldade em \u201Cdesligar a mente\u201D \xE0 noite.

Ao mesmo tempo, esse eixo est\xE1 naturalmente ligado \xE0 resili\xEAncia silenciosa: o melanc\xF3lico suporta longos per\xEDodos de prova, desde que veja sentido naquilo. A confian\xE7a, por\xE9m, costuma ser fr\xE1gil \u2013 n\xE3o tanto em rela\xE7\xE3o a Deus ou a princ\xEDpios, mas em rela\xE7\xE3o a si mesmo: medo de fracassar, de decepcionar, de n\xE3o estar \xE0 altura. A determina\xE7\xE3o aparece quando um ideal \xE9 abra\xE7ado; o desafio \xE9 n\xE3o deixar que o perfeccionismo ou a culpa minem esse impulso antes da hora.`
  });
  if (secondary && secondary.groupId === "choleric") {
    blocks.push({
      id: "temp-growth-hidden",
      access: "free",
      title: "Melanc\xF3lico-col\xE9rico em momentos de crise",
      body: `No melanc\xF3lico-col\xE9rico, crises podem provocar simultaneamente dureza e autoacusa\xE7\xE3o. Voc\xEA pode reagir com firmeza externa, tomar decis\xF5es radicais, cortar rela\xE7\xF5es ou assumir pesos enormes; e depois, por dentro, remoer cada palavra, sentindo culpa ou solid\xE3o.

O crescimento passa por aprender a desacelerar na hora de decidir, abrir o cora\xE7\xE3o a conselhos prudentes e cultivar atos concretos de miseric\xF3rdia consigo mesmo e com os outros. Virtudes como humildade, esperan\xE7a e mansid\xE3o ajudam a integrar for\xE7a e sensibilidade, evitando que a sua exig\xEAncia justa se transforme em rigidez destrutiva.`
    });
  } else if (secondary && secondary.groupId === "phlegmatic") {
    blocks.push({
      id: "temp-growth-hidden",
      access: "free",
      title: "Melanc\xF3lico-fleum\xE1tico em momentos de dificuldade",
      body: `No melanc\xF3lico-fleum\xE1tico, crises podem levar a um fechamento silencioso: voc\xEA sente muito, pensa muito, mas nem sempre comunica. H\xE1 risco de paralisia: saber o que seria bom fazer, mas n\xE3o encontrar for\xE7a ou \xE2nimo para dar os passos necess\xE1rios.

O caminho de crescimento envolve identificar sinais precoces de des\xE2nimo (adiamentos, isolamento, cinismo), procurar ajuda antes que a tristeza se aprofunde demais e praticar pequenas decis\xF5es concretas, poss\xEDveis, em vez de esperar o momento perfeito. Virtudes como prud\xEAncia, fortaleza e alegria crist\xE3 ajudam a transformar a sua profundidade em fidelidade alegre, e n\xE3o em peso esmagador.`
    });
  } else if (secondary && secondary.groupId === "sanguine") {
    blocks.push({
      id: "temp-growth-hidden",
      access: "free",
      title: "Melanc\xF3lico-sangu\xEDneo em tempos de instabilidade",
      body: `No melanc\xF3lico-sangu\xEDneo, crises podem se manifestar tanto como explos\xF5es emocionais quanto como per\xEDodos de retraimento intenso. Voc\xEA pode oscilar entre buscar companhia para aliviar a dor e se afastar de todos por medo de incomodar ou de ser incompreendido.

O crescimento passa por aprender a nomear o que sente de forma honesta, sem dramatizar nem minimizar, e por cultivar h\xE1bitos est\xE1veis (ora\xE7\xE3o, amizade s\xF3lida, acompanhamento espiritual ou psicol\xF3gico) que deem estrutura \xE0 sua sensibilidade. Virtudes como temperan\xE7a, paci\xEAncia e perseveran\xE7a s\xE3o fundamentais para estabilizar o humor e integrar luz e sombra em voc\xEA.`
    });
  }
  blocks.push({
    id: "temp-growth-virtues",
    access: "free",
    title: "Virtudes que equilibram o melanc\xF3lico",
    body: "O melanc\xF3lico tem facilidade para virtudes ligadas \xE0 justi\xE7a (sentido de corre\xE7\xE3o, fidelidade, responsabilidade) e \xE0 profundidade (reflex\xE3o, exame de consci\xEAncia). Por outro lado, precisa trabalhar com mais empenho virtudes como esperan\xE7a, alegria, confian\xE7a, simplicidade e miseric\xF3rdia consigo mesmo. Parte essencial do crescimento \xE9 aprender a aceitar a pr\xF3pria limita\xE7\xE3o, celebrar pequenos progressos e reconhecer que Deus age tamb\xE9m atrav\xE9s das imperfei\xE7\xF5es e fracassos aparentes."
  });
  blocks.push({
    id: "temp-growth-premium",
    access: "premium",
    title: "Plano de crescimento pessoal para o melanc\xF3lico (Premium)",
    body: "No relat\xF3rio em PDF, voc\xEA encontrar\xE1 um plano em etapas pensado para o temperamento melanc\xF3lico e suas combina\xE7\xF5es: exames de consci\xEAncia contra o perfeccionismo est\xE9ril, exerc\xEDcios de gratid\xE3o, pr\xE1ticas concretas para fortalecer a esperan\xE7a e sugest\xF5es de como ordenar a sensibilidade para que ela se torne fonte de caridade, e n\xE3o de paralisia ou autoacusa\xE7\xE3o constante."
  });
  return blocks;
}
function buildMelancholicRelationships(primary, secondary) {
  const blocks = [];
  blocks.push({
    id: "temp-rel-dynamics",
    access: "free",
    title: "Como o melanc\xF3lico se relaciona",
    body: `O melanc\xF3lico tende a viver os relacionamentos com grande profundidade. N\xE3o se contenta com la\xE7os superficiais: busca autenticidade, coer\xEAncia e verdade nos v\xEDnculos. Por isso, pode demorar a se abrir, mas quando o faz, entrega muito de si.

A lealdade para esse temperamento \xE9 central: ele valoriza quem permanece, quem cumpre o que promete, quem n\xE3o banaliza confid\xEAncias. O altru\xEDsmo se manifesta muitas vezes em gestos discretos: escuta atenta, presen\xE7a silenciosa, sacrif\xEDcios que poucos veem. A intelig\xEAncia emocional, por\xE9m, pode ser afetada pela tend\xEAncia a interpretar demais olhares e palavras, ou a guardar m\xE1goas por muito tempo. Quando amadurece, torna-se capaz de amar com profundidade, ternura e grande capacidade de empatia pela dor alheia.`
  });
  if (secondary && secondary.groupId === "choleric") {
    blocks.push({
      id: "temp-rel-mix",
      access: "free",
      title: "Melanc\xF3lico-col\xE9rico nos v\xEDnculos",
      body: `No melanc\xF3lico-col\xE9rico, relacionamentos s\xE3o levados muito a s\xE9rio: voc\xEA tende a se envolver com intensidade, a defender quem ama com firmeza e a exigir coer\xEAncia de si e dos outros. Pode ser extremamente leal e disposto a sacrif\xEDcios, mas tamb\xE9m mais sens\xEDvel a injusti\xE7as e rejei\xE7\xF5es.

O risco est\xE1 em reagir com dureza quando se sente ferido e depois remoer o que disse ou fez. A intelig\xEAncia emocional cresce quando aprende a expressar a dor antes que ela se transforme em ressentimento, a perdoar limites reais dos outros e a distinguir entre falhas humanas comuns e verdadeiras trai\xE7\xF5es. Quando amadurecido, esse perfil pode se tornar um apoio s\xF3lido e fiel, capaz de unir verdade e caridade nas rela\xE7\xF5es.`
    });
  } else if (secondary && secondary.groupId === "phlegmatic") {
    blocks.push({
      id: "temp-rel-mix",
      access: "free",
      title: "Melanc\xF3lico-fleum\xE1tico nos v\xEDnculos",
      body: `No melanc\xF3lico-fleum\xE1tico, h\xE1 grande capacidade de const\xE2ncia e de presen\xE7a silenciosa. Voc\xEA provavelmente n\xE3o tem muitos v\xEDnculos, mas os que tem s\xE3o profundos e duradouros. Prefere poucos amigos \xEDntimos a uma grande rede superficial.

A autenticidade se expressa mais por coer\xEAncia do que por palavras: ser o mesmo, ser confi\xE1vel, estar ali. O altru\xEDsmo aparece em gestos concretos de cuidado, mesmo que n\xE3o seja muito verbalizado. O ponto de vigil\xE2ncia est\xE1 em n\xE3o se fechar demais por medo de ser ferido, e em n\xE3o supor que o outro \u201Cdeveria saber\u201D o que voc\xEA sente sem que ningu\xE9m diga. Crescer em comunica\xE7\xE3o afetiva simples e direta \xE9 parte importante da sua maturidade relacional.`
    });
  } else if (secondary && secondary.groupId === "sanguine") {
    blocks.push({
      id: "temp-rel-mix",
      access: "free",
      title: "Melanc\xF3lico-sangu\xEDneo nos v\xEDnculos",
      body: `No melanc\xF3lico-sangu\xEDneo, os v\xEDnculos costumam ser intensos e ricos: voc\xEA \xE9 capaz tanto de escuta profunda quanto de momentos de leveza, humor e criatividade com quem ama. Pode ser extremamente sens\xEDvel \xE0s necessidades dos outros, com forte capacidade de empatia.

O risco est\xE1 na oscila\xE7\xE3o: em alguns momentos, voc\xEA se doa demais e se exp\xF5e muito; em outros, recolhe-se por medo de n\xE3o ser correspondido na mesma medida. A intelig\xEAncia emocional cresce quando aprende a calibrar a doa\xE7\xE3o (nem tudo de uma vez, nem nada), a estabelecer limites saud\xE1veis e a aceitar que nem todos expressam afei\xE7\xE3o da mesma forma que voc\xEA. Quando amadurecido, esse perfil \xE9 capaz de gerar relacionamentos cheios de vida, beleza e profundidade.`
    });
  }
  blocks.push({
    id: "temp-rel-premium",
    access: "premium",
    title: "Orienta\xE7\xF5es para amizades, fam\xEDlia e vida afetiva (Premium)",
    body: "No relat\xF3rio em PDF, o temperamento melanc\xF3lico \xE9 aplicado de modo concreto \xE0 vida afetiva: como voc\xEA tende a reagir em amizade, namoro/casamento, rela\xE7\xE3o com filhos, pais e comunidade. Voc\xEA encontrar\xE1 sugest\xF5es pr\xE1ticas para conciliar autenticidade e delicadeza, lealdade e liberdade, ajustar expectativas realistas sobre os outros e cultivar uma verdadeira intelig\xEAncia emocional, capaz de acolher a pr\xF3pria sensibilidade sem ser escravo dela."
  });
  return blocks;
}

const TEMPERAMENT_TEXTS = {
  detectTemperament(results) {
    const sorted = [...results].sort((a, b) => b.average - a.average);
    const primary = sorted[0];
    const secondary = sorted[1];
    return { primary, secondary };
  },
  buildTitle(primary, secondary) {
    if (!primary) return "Seu perfil de temperamento";
    if (secondary) {
      return `Seu perfil de temperamento: ${primary.name} com tra\xE7os de ${secondary.name}`;
    }
    return `Seu perfil de temperamento: ${primary.name}`;
  },
  buildSubtitle(primary, secondary) {
    if (!primary) {
      return "Retrato de temperamento constru\xEDdo a partir das suas respostas.";
    }
    if (secondary) {
      return `Este retrato foi constru\xEDdo a partir do teste de temperamentos, mostrando como a combina\xE7\xE3o entre ${primary.name} (mais forte) e ${secondary.name} aparece na forma como voc\xEA sente, decide e se relaciona.`;
    }
    return `Este retrato foi constru\xEDdo a partir do teste de temperamentos, mostrando como o temperamento ${primary.name} influencia seu modo de agir, reagir e se relacionar.`;
  },
  // -------------------------------------------------------------------------
  // INTRO / OVERVIEW
  // -------------------------------------------------------------------------
  buildIntro(primary, secondary) {
    if (!primary) {
      return [
        {
          id: "temp-overview-generic",
          access: "free",
          title: "Seu perfil de temperamento",
          body: "Retrato de temperamento constru\xEDdo a partir das suas respostas, indicando tend\xEAncias est\xE1veis de rea\xE7\xE3o, ritmo, sensibilidade e modo de buscar seguran\xE7a."
        }
      ];
    }
    switch (primary.groupId) {
      case "choleric":
        return buildCholericIntro(primary, secondary);
      case "sanguine":
        return buildSanguineIntro(primary, secondary);
      case "phlegmatic":
        return buildPhlegmaticIntro(primary, secondary);
      case "melancholic":
        return buildMelancholicIntro(primary, secondary);
    }
    const blocks = [];
    const comboText = secondary ? `Seu temperamento predominante \xE9 ${primary.name}, com influ\xEAncia significativa de ${secondary.name}.` : `Seu temperamento predominante \xE9 ${primary.name}.`;
    blocks.push({
      id: "temp-overview",
      access: "free",
      title: "Seu perfil de temperamento",
      body: `${comboText}

Na pr\xE1tica, isso significa que as caracter\xEDsticas cl\xE1ssicas desse temperamento aparecem em voc\xEA com intensidade ${intensityLabel(primary.average)}. A forma como voc\xEA reage sob press\xE3o, toma decis\xF5es, se comunica e organiza a vida di\xE1ria passa fortemente por esse eixo.

O temperamento n\xE3o \xE9 uma \u201Ccaixinha\u201D que define tudo, mas um mapa de tend\xEAncias est\xE1veis: impulsos, ritmos, fragilidades e formas de buscar seguran\xE7a.`
    });
    if (secondary) {
      blocks.push({
        id: "temp-combo",
        access: "free",
        title: "Como a combina\xE7\xE3o de temperamentos aparece em voc\xEA",
        body: `A combina\xE7\xE3o entre ${primary.name} e ${secondary.name} torna o seu perfil mais complexo e rico. Em alguns momentos voc\xEA atua como um ${primary.name} t\xEDpico; em outros, a influ\xEAncia de ${secondary.name} traz nuances de sensibilidade, prud\xEAncia, estabilidade ou expansividade, dependendo da mistura espec\xEDfica.

Isso explica por que voc\xEA n\xE3o se v\xEA totalmente em descri\xE7\xF5es simplistas de um \xFAnico temperamento.`
      });
    }
    blocks.push({
      id: "temp-premium-overview",
      access: "premium",
      title: "Mapa completo do seu temperamento (Premium)",
      body: "No relat\xF3rio em PDF voc\xEA ver\xE1 a leitura detalhada de cada temperamento presente em voc\xEA, com exemplos concretos de situa\xE7\xF5es do dia a dia em que essas tend\xEAncias aparecem - inclusive como elas mudam quando voc\xEA est\xE1 descansado, cansado, sob press\xE3o ou em paz."
    });
    return blocks;
  },
  // -------------------------------------------------------------------------
  // TRAÇOS / PERSONALIDADE
  // -------------------------------------------------------------------------
  buildTraits(primary, secondary) {
    if (!primary) return [];
    switch (primary.groupId) {
      case "choleric":
        return buildCholericTraits(primary, secondary);
      case "sanguine":
        return buildSanguineTraits(primary, secondary);
      case "phlegmatic":
        return buildPhlegmaticTraits(primary, secondary);
      case "melancholic":
        return buildMelancholicTraits(primary, secondary);
    }
    const blocks = [];
    blocks.push({
      id: "temp-traits-core",
      access: "free",
      title: "Tra\xE7os centrais de personalidade",
      body: `O n\xFAcleo do seu temperamento \xE9 marcado por tra\xE7os associados a ${primary.name}. Eles aparecem na rapidez das suas rea\xE7\xF5es, na forma de expressar emo\xE7\xF5es e na energia que voc\xEA leva para os ambientes.

Pessoas com esse temperamento costumam sentir com for\xE7a o que vivem, sejam entusiasmos ou irrita\xE7\xF5es. O jeito de impor presen\xE7a, mesmo em sil\xEAncio, muitas vezes \xE9 percebido por quem convive com voc\xEA.`
    });
    if (secondary) {
      blocks.push({
        id: "temp-traits-secondary",
        access: "free",
        title: "Como o temperamento secund\xE1rio modifica o seu jeito",
        body: `A presen\xE7a de ${secondary.name} como temperamento secund\xE1rio atua como um \u201Cfiltro\u201D sobre o principal. Em algumas situa\xE7\xF5es voc\xEA reage de forma t\xEDpica de ${primary.name}; em outras, a marca de ${secondary.name} aparece com mais for\xE7a, tornando-o mais reservado, mais diplom\xE1tico, mais est\xE1vel ou mais emotivo.

Essa altern\xE2ncia n\xE3o \xE9 incoer\xEAncia; \xE9 justamente a riqueza do seu perfil.`
      });
    }
    blocks.push({
      id: "temp-traits-premium",
      access: "premium",
      title: "An\xE1lise completa dos tra\xE7os (Premium)",
      body: "No relat\xF3rio em PDF voc\xEA encontrar\xE1 uma leitura organizada dos principais tra\xE7os do seu temperamento (influ\xEAncia, ritmo, estabilidade, sensibilidade, foco, iniciativa etc.), comentando como cada um aparece na sua hist\xF3ria concreta."
    });
    return blocks;
  },
  // -------------------------------------------------------------------------
  // CARREIRA / TRABALHO
  // -------------------------------------------------------------------------
  buildCareer(primary, secondary) {
    if (!primary) return [];
    switch (primary.groupId) {
      case "choleric":
        return buildCholericCareer(primary, secondary);
      case "sanguine":
        return buildSanguineCareer(primary, secondary);
      case "phlegmatic":
        return buildPhlegmaticCareer(primary, secondary);
      case "melancholic":
        return buildMelancholicCareer(primary, secondary);
    }
    const blocks = [];
    blocks.push({
      id: "temp-career-style",
      access: "free",
      title: "Estilo de trabalho e produtividade",
      body: `Seu temperamento influencia fortemente a forma como voc\xEA organiza tarefas, lida com prazos e responde a cobran\xE7as.

No padr\xE3o de ${primary.name}, \xE9 comum ter um jeito muito pr\xF3prio de come\xE7ar projetos, mant\xEA-los e finaliz\xE1-los. Quando o ambiente respeita esse ritmo, sua produtividade cresce; quando o contradiz o tempo todo, surgem procrastina\xE7\xE3o, irrita\xE7\xE3o ou desligamento.`
    });
    blocks.push({
      id: "temp-career-motivation",
      access: "free",
      title: "Ambi\xE7\xE3o, motiva\xE7\xE3o e desejo de liderar",
      body: `Certos temperamentos buscam naturalmente protagonismo; outros preferem contribuir nos bastidores. O seu teste aponta que o eixo ligado a ambi\xE7\xE3o e motiva\xE7\xE3o segue o padr\xE3o de ${primary.name}, o que influencia o quanto voc\xEA se sente vivo ao receber desafios, metas claras ou espa\xE7o de autonomia.`
    });
    if (secondary) {
      blocks.push({
        id: "temp-career-combo",
        access: "free",
        title: "Combina\xE7\xE3o de temperamentos na carreira",
        body: `A mistura entre ${primary.name} e ${secondary.name} pode gerar um profissional que alterna entre grande iniciativa e per\xEDodos de maior cautela, an\xE1lise ou sensibilidade. Quando essa combina\xE7\xE3o est\xE1 integrada, voc\xEA equilibra a\xE7\xE3o e prud\xEAncia; quando n\xE3o est\xE1, pode oscilar entre agir demais sem pensar ou pensar demais sem agir.`
      });
    }
    blocks.push({
      id: "temp-career-premium",
      access: "premium",
      title: "Caminhos profissionais alinhados ao seu temperamento (Premium)",
      body: "No relat\xF3rio em PDF voc\xEA ter\xE1 exemplos de tipos de fun\xE7\xE3o e ambiente que costumam dialogar melhor com o seu temperamento (gest\xE3o, bastidores, pesquisa, atendimento, \xE1reas criativas, planejamento estrat\xE9gico etc.), bem como alertas sobre contextos que tendem a drenar muito a sua energia."
    });
    return blocks;
  },
  // -------------------------------------------------------------------------
  // CRESCIMENTO / VIRTUDES
  // -------------------------------------------------------------------------
  buildGrowth(primary, secondary) {
    if (!primary) return [];
    switch (primary.groupId) {
      case "choleric":
        return buildCholericGrowth(primary, secondary);
      case "sanguine":
        return buildSanguineGrowth(primary, secondary);
      case "phlegmatic":
        return buildPhlegmaticGrowth(primary, secondary);
      case "melancholic":
        return buildMelancholicGrowth(primary, secondary);
    }
    const blocks = [];
    blocks.push({
      id: "temp-growth-stress",
      access: "free",
      title: "Rea\xE7\xE3o ao estresse e \xE0s crises",
      body: `Sob press\xE3o, o temperamento ${primary.name} costuma aparecer com ainda mais nitidez. Algumas emo\xE7\xF5es s\xE3o amplificadas (raiva, ansiedade, tristeza, apatia), e certos comportamentos autom\xE1ticos se repetem (falar demais, se fechar, querer resolver tudo na hora, fugir de conflitos etc.).

Aprender a reconhecer esses sinais precoces \xE9 fundamental para evitar explos\xF5es ou implos\xF5es emocionais.`
    });
    if (secondary) {
      blocks.push({
        id: "temp-growth-hidden",
        access: "free",
        title: "Tend\xEAncias ocultas em momentos de crise",
        body: `Em crises mais profundas, o temperamento secund\xE1rio ${secondary.name} tamb\xE9m entra em cena: voc\xEA pode se perceber mais impulsivo, mais frio, mais dram\xE1tico ou mais distante do que o habitual. Essa mudan\xE7a n\xE3o \xE9 falsidade, mas um modo de defesa. Quanto mais consci\xEAncia voc\xEA tem disso, mais consegue pedir ajuda e escolher respostas maduras.`
      });
    }
    blocks.push({
      id: "temp-growth-virtues",
      access: "free",
      title: "Virtudes que equilibram o seu temperamento",
      body: "Cada temperamento tem virtudes que surgem com facilidade e virtudes que exigem mais esfor\xE7o. Parte do crescimento passa por fortalecer justamente aquilo que corrige os exageros t\xEDpicos do seu perfil, sem sufocar o que h\xE1 de bom nele."
    });
    blocks.push({
      id: "temp-growth-premium",
      access: "premium",
      title: "Plano de crescimento por etapas (Premium)",
      body: "No relat\xF3rio em PDF voc\xEA encontrar\xE1 um plano em etapas adaptado ao seu temperamento, com exerc\xEDcios pr\xE1ticos, pontos de exame de consci\xEAncia e atitudes di\xE1rias para canalizar sua energia para o bem."
    });
    return blocks;
  },
  // -------------------------------------------------------------------------
  // RELACIONAMENTOS
  // -------------------------------------------------------------------------
  buildRelationships(primary, secondary) {
    if (!primary) return [];
    switch (primary.groupId) {
      case "choleric":
        return buildCholericRelationships(primary, secondary);
      case "sanguine":
        return buildSanguineRelationships(primary, secondary);
      case "phlegmatic":
        return buildPhlegmaticRelationships(primary, secondary);
      case "melancholic":
        return buildMelancholicRelationships(primary, secondary);
    }
    const blocks = [];
    blocks.push({
      id: "temp-rel-dynamics",
      access: "free",
      title: "Din\xE2mica dos seus relacionamentos",
      body: `Seu temperamento influencia como voc\xEA demonstra carinho, o quanto precisa de proximidade ou espa\xE7o e como reage a conflitos. O temperamento ${primary.name} tem um estilo t\xEDpico de lidar com amizade, fam\xEDlia e afetividade (mais intenso, mais est\xE1vel, mais sens\xEDvel, mais reservado etc.).`
    });
    if (secondary) {
      blocks.push({
        id: "temp-rel-mix",
        access: "free",
        title: "Impacto da combina\xE7\xE3o nas rela\xE7\xF5es",
        body: `A combina\xE7\xE3o entre ${primary.name} e ${secondary.name} pode fazer voc\xEA alternar entre momentos de grande presen\xE7a e per\xEDodos de recolhimento. Algumas pessoas percebem voc\xEA como muito forte; outras enxergam um lado mais vulner\xE1vel que poucos conhecem. Entender essa din\xE2mica ajuda a comunicar melhor o que voc\xEA sente.`
      });
    }
    blocks.push({
      id: "temp-rel-premium",
      access: "premium",
      title: "Orienta\xE7\xF5es para amizades, fam\xEDlia e vida afetiva (Premium)",
      body: "No relat\xF3rio em PDF voc\xEA ter\xE1 orienta\xE7\xF5es espec\xEDficas para cada tipo de rela\xE7\xE3o - amizades, fam\xEDlia, namoro/casamento - mostrando como o seu temperamento costuma reagir em cada contexto e quais atitudes ajudam a construir v\xEDnculos mais maduros e est\xE1veis."
    });
    return blocks;
  }
};

function resolveTemperamentId(score) {
  if (!score) return null;
  return isTemperamentId(score.groupId) ? score.groupId : null;
}
function firstSentence(value) {
  var _a;
  const sentenceMatch = value.match(/^.*?[.!?](?:\s|$)/);
  return ((_a = sentenceMatch == null ? void 0 : sentenceMatch[0]) != null ? _a : value).trim();
}
function composePremiumSection(primaryText, secondaryText, secondaryId) {
  if (!secondaryText || !secondaryId) {
    return primaryText;
  }
  const secondaryLabel = TEMPERAMENT_LABELS_PT[secondaryId].toLowerCase();
  const secondarySummary = firstSentence(secondaryText);
  return `${primaryText} Em combinacao com ${secondaryLabel}, ${secondarySummary}`;
}
function withPremiumNarrative(blocks, premiumBlock) {
  const freeBlocks = blocks.filter((block) => block.access === "free");
  return [...freeBlocks, premiumBlock];
}
const PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER = "Conteudo premium temporariamente indisponivel. Tente novamente mais tarde.";
function buildPremiumFallback(temperament) {
  return {
    temperament,
    overview: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    strengths: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    risks: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    practices: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    work: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    relationships: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    checklist: [PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER],
    weaknesses: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    career: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER
  };
}
function safeGetPremiumTemperamentText(temperament) {
  try {
    return getPremiumTemperamentText(temperament);
  } catch (error) {
    console.error(
      `[temperaments] failed to load premium text for "${temperament}". Falling back to placeholder.`,
      error
    );
    return buildPremiumFallback(temperament);
  }
}
function buildTemperamentsReport(entry) {
  const normalizedScores = entry.results.filter((result) => isTemperamentId(result.groupId)).map((result) => ({
    ...result,
    average: normalizeAvgTo0to10(result.average, 1, 7)
  }));
  const { primary, secondary } = TEMPERAMENT_TEXTS.detectTemperament(
    normalizedScores
  );
  if (!primary) {
    throw new Error("Unable to determine primary temperament.");
  }
  const primaryId = resolveTemperamentId(primary);
  if (!primaryId) {
    throw new Error("Unknown primary temperament id.");
  }
  const secondaryId = resolveTemperamentId(secondary);
  const primaryPremium = safeGetPremiumTemperamentText(primaryId);
  const secondaryPremium = secondaryId ? safeGetPremiumTemperamentText(secondaryId) : null;
  const overallBlocks = withPremiumNarrative(
    TEMPERAMENT_TEXTS.buildIntro(primary, secondary),
    {
      id: "temp-premium-overview-assets",
      access: "premium",
      title: "Mapa completo do seu temperamento (Premium)",
      body: composePremiumSection(
        primaryPremium.overview,
        secondaryPremium == null ? void 0 : secondaryPremium.overview,
        secondaryId
      )
    }
  );
  const traitsBlocks = withPremiumNarrative(
    TEMPERAMENT_TEXTS.buildTraits(primary, secondary),
    {
      id: "temp-premium-traits-assets",
      access: "premium",
      title: "Forcas e fragilidades predominantes (Premium)",
      body: `${composePremiumSection(
        primaryPremium.strengths,
        secondaryPremium == null ? void 0 : secondaryPremium.strengths,
        secondaryId
      )} ${composePremiumSection(
        primaryPremium.weaknesses,
        secondaryPremium == null ? void 0 : secondaryPremium.weaknesses,
        secondaryId
      )}`
    }
  );
  const careerBlocks = withPremiumNarrative(
    TEMPERAMENT_TEXTS.buildCareer(primary, secondary),
    {
      id: "temp-premium-career-assets",
      access: "premium",
      title: "Carreira e ambiente de trabalho (Premium)",
      body: composePremiumSection(
        primaryPremium.career,
        secondaryPremium == null ? void 0 : secondaryPremium.career,
        secondaryId
      )
    }
  );
  const growthBlocks = withPremiumNarrative(
    TEMPERAMENT_TEXTS.buildGrowth(primary, secondary),
    {
      id: "temp-premium-growth-assets",
      access: "premium",
      title: "Praticas de crescimento (Premium)",
      body: composePremiumSection(
        primaryPremium.practices,
        secondaryPremium == null ? void 0 : secondaryPremium.practices,
        secondaryId
      )
    }
  );
  const relationshipsBlocks = withPremiumNarrative(
    TEMPERAMENT_TEXTS.buildRelationships(primary, secondary),
    {
      id: "temp-premium-relationships-assets",
      access: "premium",
      title: "Relacionamentos e vinculos (Premium)",
      body: composePremiumSection(
        primaryPremium.relationships,
        secondaryPremium == null ? void 0 : secondaryPremium.relationships,
        secondaryId
      )
    }
  );
  relationshipsBlocks.push({
    id: "temp-premium-checklist",
    access: "premium",
    title: "Checklist pratico (resumo)",
    body: "Resumo pratico para aplicar no dia a dia, consolidando forcas, riscos e ajustes prioritarios.",
    content: {
      kind: "bullets",
      bullets: primaryPremium.checklist.slice(0, 5)
    }
  });
  return {
    kind: "temperaments",
    sessionId: entry.id,
    temperament: {
      scores: normalizedScores,
      primary,
      secondary: secondary != null ? secondary : void 0
    },
    overall: {
      title: TEMPERAMENT_TEXTS.buildTitle(primary, secondary),
      subtitle: TEMPERAMENT_TEXTS.buildSubtitle(primary, secondary),
      blocks: overallBlocks
    },
    traits: { blocks: traitsBlocks },
    career: { blocks: careerBlocks },
    growth: { blocks: growthBlocks },
    relationships: { blocks: relationshipsBlocks }
  };
}

export { PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER, buildTemperamentsReport };
//# sourceMappingURL=temperaments.mjs.map
