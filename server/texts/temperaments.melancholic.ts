// server/texts/temperaments.melancholic.ts
import type { ResultBlock, TemperamentScore } from './temperaments.shared';
import { intensityLabel, lowerLabel } from './temperaments.shared';

export function buildMelancholicIntro(
  primary: TemperamentScore,
  secondary?: TemperamentScore,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];

  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary);

  const comboText = secondary
    ? `Seu temperamento predominante é ${primary.name}, com influência significativa de ${secondary.name}.`
    : `Seu temperamento predominante é ${primary.name}, formando um perfil marcadamente ${primaryLabel}.`;

  blocks.push({
    id: 'temp-overview',
    access: 'free',
    title: 'Seu perfil de temperamento',
    body:
      `${comboText}\n\n` +
      `Na prática, isso significa que as características clássicas do melancólico aparecem em você ` +
      `com intensidade ${intensityLabel(primary.average)}: tendência à reflexão profunda, sensibilidade elevada, ` +
      `consciência moral forte e olhar atento para nuances e detalhes. Você raramente passa superficialmente pelas coisas; ` +
      `precisa entender, significar e integrar o que vive.\n\n` +
      `Em termos de traços amplos, o melancólico tende mais à introversão (o movimento primeiro é para dentro), ` +
      `com mistura de realismo e intuição: enxerga fatos concretos, mas também lê significados, símbolos e possíveis consequências. ` +
      `A mente é analítica e, ao mesmo tempo, profundamente emocional; o ritmo é mais de planejador do que de desbravador impulsivo. ` +
      `Quanto à assertividade, o melancólico costuma oscilar: pode ser muito firme em temas de consciência ou justiça, ` +
      `mas turbulento por dentro, ruminando, revendo e duvidando de si mesmo.`,
  });

  if (secondary) {
    let comboBody = '';

    if (secondary.groupId === 'choleric') {
      comboBody =
        `Na combinação ${primaryLabel}-${secondaryLabel}, a profundidade melancólica encontra a força de vontade colérica. ` +
        `Por fora, isso pode se traduzir num perfil mais decidido e firme do que o melancólico típico; por dentro, ` +
        `há grande intensidade afetiva, autocrítica e senso de responsabilidade.\n\n` +
        `Você tende a ser introvertido-ativo: pensa muito, mas também sente a necessidade de agir quando está convicto. ` +
        `O olhar é realista e analítico; a dimensão emocional é forte, mas canalizada para causas e projetos. ` +
        `O estilo é mais planejador que impulsivo, ainda que exista um impulso desbravador quando a consciência manda. ` +
        `A assertividade cresce em temas que considera importantes; a turbulência aparece depois, quando revisita tudo o que fez ou disse.`;
    } else if (secondary.groupId === 'phlegmatic') {
      comboBody =
        `Na combinação ${primaryLabel}-${secondaryLabel}, a sensibilidade melancólica encontra a estabilidade do fleumático. ` +
        `O resultado é um perfil mais sereno, observador e constante, com grande capacidade de escuta e de fidelidade nos vínculos.\n\n` +
        `Você tende claramente à introversão, com olhar realista, analítico e contemplativo. ` +
        `A emoção é profunda, mas muitas vezes silenciosa; prefere planejar, observar e preparar-se antes de dar passos grandes. ` +
        `A assertividade pode ser baixa em situações sociais amplas, mas cresce em temas de consciência e justiça. ` +
        `A turbulência costuma ser mais interna (ruminações, escrúpulos, preocupações), enquanto por fora você aparenta calma.`;
    } else if (secondary.groupId === 'sanguine') {
      comboBody =
        `Na combinação ${primaryLabel}-${secondaryLabel}, o mundo interior melancólico se mistura com momentos de leveza e sociabilidade do sanguíneo. ` +
        `Você pode alternar entre fases de recolhimento profundo e períodos de maior abertura, conversa e criatividade.\n\n` +
        `No eixo introversão/extroversão, costuma ser um ambivertido: precisa de muito tempo sozinho para processar, mas ` +
        `também experimenta picos de extroversão em ambientes seguros. O olhar é intuitivo-realista, com forte componente analítico e emocional. ` +
        `Há um lado planejador bem desenvolvido, mas com lampejos de desbravador quando se sente inspirado ou compreendido. ` +
        `A assertividade varia conforme o estado afetivo: cresce quando o coração está aquecido e cai quando o medo de errar ou de ser rejeitado fala mais alto.`;
    } else {
      comboBody =
        `A combinação entre ${primary.name} e ${secondary.name} torna o seu perfil ainda mais complexo: ` +
        `a profundidade melancólica ganha nuances de prudência, estabilidade ou expansividade, dependendo do temperamento secundário. ` +
        `Isso ajuda a explicar por que você não se reconhece em descrições simplistas de “melancólico puro”.`;
    }

    blocks.push({
      id: 'temp-combo',
      access: 'free',
      title: 'Como a combinação melancólica aparece em você',
      body: comboBody,
    });
  }

  blocks.push({
    id: 'temp-premium-overview',
    access: 'premium',
    title: 'Mapa completo do seu temperamento melancólico (Premium)',
    body:
      'No relatório em PDF, o eixo melancólico é aprofundado em suas forças e fragilidades: capacidade de contemplação, ' +
      'sensibilidade às injustiças, tendência à autocrítica, busca de sentido e de coerência. São explorados também os efeitos ' +
      'das combinações com colérico, fleumático e sanguíneo, com exemplos concretos de como isso aparece em decisões, estudos, ' +
      'vida profissional e espiritual, à luz de autores clássicos e da tradição cristã.',
  });

  return blocks;
}

export function buildMelancholicTraits(
  primary: TemperamentScore,
  secondary?: TemperamentScore,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];

  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary);

  // melancólico "puro" ou muito destacado
  if (!secondary || secondary.groupId === 'melancholic') {
    blocks.push({
      id: 'temp-traits-core',
      access: 'free',
      title: 'Traços centrais da personalidade melancólica',
      body:
        `O núcleo do temperamento melancólico é marcado por profundidade, senso de responsabilidade e forte vida interior. ` +
        `Você tende a perceber nuances que passam despercebidas aos outros, seja em relações, seja em ideias ou projetos. ` +
        `A intensidade atual desse temperamento em você foi classificada como ${intensityLabel(primary.average)}, ` +
        `o que geralmente se traduz em grande capacidade de concentração e de análise, mas também em riscos de preocupação excessiva.\n\n` +
        `No eixo introversão/extroversão, o melancólico é predominantemente introvertido: precisa de recolhimento para se organizar por dentro. ` +
        `Seu olhar é realista, mas com forte componente intuitivo – você não enxerga apenas o que está na superfície, mas o que aquilo significa. ` +
        `A mente é analítica e profundamente emocional: você sente muito e pensa muito sobre o que sente. ` +
        `Você prefere planejar a desbravar impulsivamente; e no eixo assertivo/turbulento tende a ser mais turbulento, ` +
        `oscilando entre convicções firmes e dúvidas insistentes, especialmente em temas pessoais.`,
    });
  }

  if (secondary && secondary.groupId === 'choleric') {
    blocks.push({
      id: 'temp-traits-secondary',
      access: 'free',
      title: 'Melancólico-colérico: profundidade com vontade forte',
      body:
        `Na combinação melancólico-colérico, a reflexão e a sensibilidade melancólicas se unem à energia dirigida do colérico. ` +
        `Isso pode gerar um perfil intenso, exigente consigo mesmo e com os outros, movido por ideais altos e por um senso forte de missão.\n\n` +
        `Você tende a ser mais introvertido na forma de processar as coisas, mas mais decidido e firme ao agir em causas que abraça. ` +
        `O olhar é analítico e realista; a dimensão emocional é profunda e muitas vezes dramática. ` +
        `Você consegue planejar com cuidado e, quando convencido, se torna desbravador em direção ao que considera justo ou necessário. ` +
        `A assertividade aumenta em temas de princípio, embora a turbulência interna permaneça elevada (autocrítica, escrúpulos, revisão constante do que faz).`,
    });
  } else if (secondary && secondary.groupId === 'phlegmatic') {
    blocks.push({
      id: 'temp-traits-secondary',
      access: 'free',
      title: 'Melancólico-fleumático: profundidade serena',
      body:
        `Na combinação melancólico-fleumático, o mundo interior intenso do melancólico encontra a estabilidade e a prudência do fleumático. ` +
        `O resultado costuma ser um perfil silencioso, fiel e de grande capacidade de escuta, com um senso muito fino do que é justo e verdadeiro.\n\n` +
        `Você tende fortemente à introversão; observa muito antes de falar. O olhar é realista-analítico, com grande sensibilidade para dores e injustiças. ` +
        `A emoção é profunda, mas expressa com discrição. O estilo é claramente planejador: prefere estudar, preparar e organizar antes de agir. ` +
        `A assertividade costuma ser baixa em contextos superficiais, mas cresce bastante quando alguém em quem você acredita ou algo que você ama está em jogo. ` +
        `A turbulência interna tende a se manifestar mais como preocupação silenciosa do que como explosões visíveis.`,
    });
  } else if (secondary && secondary.groupId === 'sanguine') {
    blocks.push({
      id: 'temp-traits-secondary',
      access: 'free',
      title: 'Melancólico-sanguíneo: intensidade com luz e sombra',
      body:
        `Na combinação melancólico-sanguíneo, a profundidade e a sensibilidade do melancólico se misturam com momentos de espontaneidade, humor e sociabilidade do sanguíneo. ` +
        `Isso pode gerar um perfil que alterna entre introspecção intensa e períodos de grande criatividade e presença afetiva.\n\n` +
        `Você tende a ser introvertido por estrutura, mas com picos claros de extroversão quando está com pessoas de confiança ou em ambientes inspiradores. ` +
        `O olhar é intuitivo e analítico, e as emoções são ricas, variando de grande alegria a melancolia silenciosa. ` +
        `Você planeja com cuidado, mas também é capaz de movimentos desbravadores quando se sente compreendido e apoiado. ` +
        `No eixo assertivo/turbulento, há grande oscilação: em alguns dias, você se sente confiante e expressivo; em outros, retraído, inseguro e autocrítico.`,
    });
  }

  blocks.push({
    id: 'temp-traits-premium',
    access: 'premium',
    title: 'Análise completa dos traços melancólicos (Premium)',
    body:
      'No relatório em PDF, o eixo melancólico é detalhado em subdimensões: nível de sensibilidade, tipo de autocrítica, ' +
      'grau de introspecção, capacidade de concentração, tendência ao perfeccionismo e modo de reagir a críticas. ' +
      'Também são explorados os modos como autenticidade, lealdade e altruísmo se expressam em você, e quais pontos pedem ' +
      'crescimento em inteligência emocional, especialmente no lidar com frustrações, rejeições e erros próprios.',
  });

  return blocks;
}

export function buildMelancholicCareer(
  primary: TemperamentScore,
  secondary?: TemperamentScore,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];

  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary);

  blocks.push({
    id: 'temp-career-style',
    access: 'free',
    title: 'Estilo de trabalho e produtividade melancólicos',
    body:
      `O melancólico costuma encarar o trabalho como lugar de sentido e coerência: mais do que “fazer”, ele precisa enxergar valor naquilo que realiza. ` +
      `Em você, isso tende a aparecer como busca de qualidade, profundidade e exatidão. ` +
      `A produtividade aumenta quando há tempo para pensar, estrutura clara, silêncio razoável e objetivos que façam sentido; ` +
      `e cai quando o ambiente é caótico, superficial ou cheio de mudanças bruscas sem explicação.\n\n` +
      `A ambição melancólica nem sempre se traduz em desejo de visibilidade, mas em desejo de perfeição: você quer entregar algo bem feito, bem pensado, consistente. ` +
      `A motivação cresce quando sente que seu trabalho ajuda pessoas, faz diferença real ou responde a um ideal elevado. ` +
      `O desejo de liderar pode ser discreto, mas existe, sobretudo em áreas em que você tem competência comprovada ou profunda convicção ética.`,
  });

  if (secondary && secondary.groupId === 'choleric') {
    blocks.push({
      id: 'temp-career-mix',
      access: 'free',
      title: 'Melancólico-colérico no trabalho',
      body:
        `No melancólico-colérico, a busca de perfeição encontra a vontade forte de realizar. ` +
        `Você tende a se destacar em funções que pedem liderança técnica, pesquisa aplicada, estratégia, ensino exigente ou direção de projetos complexos. ` +
        `Costuma unir visão profunda com capacidade de decisão, embora possa ser muito duro consigo mesmo e com a equipe.\n\n` +
        `A ambição tende a ser alta, mas centrada mais em “fazer bem” do que em “aparecer mais”. ` +
        `O risco está em acumular responsabilidades demais, não delegar e se sobrecarregar; quando cansado, pode oscilar entre rigidez e desânimo. ` +
        `O crescimento profissional passa por aprender a aceitar limites, dividir tarefas e reconhecer progressos parciais sem desprezá-los.`,
    });
  } else if (secondary && secondary.groupId === 'phlegmatic') {
    blocks.push({
      id: 'temp-career-mix',
      access: 'free',
      title: 'Melancólico-fleumático no trabalho',
      body:
        `No melancólico-fleumático, a profundidade se soma à constância. ` +
        `Você tende a ir bem em áreas que pedem paciência, precisão, continuidade e atenção a detalhes: pesquisa, bastidores, contabilidade, documentação, ` +
        `arquivos, suporte especializado, acompanhamento de pessoas em processos longos.\n\n` +
        `A motivação cresce quando sente que pode trabalhar em paz, com processos estáveis e objetivos bem definidos. ` +
        `O desejo de liderar pode ser mais baixo, mas existe a vontade de ser referência técnica, conselheiro seguro ou “memória viva” de um setor. ` +
        `O ponto de vigilância está em evitar a paralisia por medo de errar e a tendência a se esconder demais para não ser criticado.`,
    });
  } else if (secondary && secondary.groupId === 'sanguine') {
    blocks.push({
      id: 'temp-career-mix',
      access: 'free',
      title: 'Melancólico-sanguíneo no trabalho',
      body:
        `No melancólico-sanguíneo, a pesquisa e a profundidade se encontram com criatividade, comunicação e certa versatilidade. ` +
        `Você pode se sair muito bem em profissões que unam conteúdo sério com expressão: docência, produção de conteúdo, escrita, artes, ` +
        `comunicação institucional, consultoria, campos em que seja preciso traduzir ideias complexas de modo acessível.\n\n` +
        `A motivação tende a variar em ondas: períodos de grande entusiasmo intercalados com fases de cansaço ou autocrítica intensa. ` +
        `O desejo de liderar pode surgir mais em relação a projetos do que a cargos formais. ` +
        `Uma parte importante do crescimento profissional será aprender a gerir a própria energia, evitar ciclos de “tudo ou nada” e cultivar rotinas sustentáveis.`,
    });
  }

  blocks.push({
    id: 'temp-career-premium',
    access: 'premium',
    title: 'Caminhos profissionais alinhados ao temperamento melancólico (Premium)',
    body:
      'No relatório em PDF, são apresentados cenários de trabalho compatíveis com o eixo melancólico: pesquisa, docência, áreas técnicas, artes, ' +
      'atendimento em profundidade, escrita, análise, além de alertas sobre ambientes que tendem a acentuar a autocrítica e o desânimo. ' +
      'Também são indicadas estratégias concretas para ordenar perfeccionismo, ambição de excelência e desejo de coerência ao serviço de um bem maior, ' +
      'sem paralisar-se nem se desgastar desnecessariamente.',
  });

  return blocks;
}

export function buildMelancholicGrowth(
  primary: TemperamentScore,
  secondary?: TemperamentScore,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];

  blocks.push({
    id: 'temp-growth-stress',
    access: 'free',
    title: 'Reação do melancólico ao estresse e às crises',
    body:
      `Sob pressão, o temperamento melancólico tende a intensificar tanto a emoção quanto a análise. ` +
      `Você pode entrar em ciclos de ruminação, revisando conversas, decisões e possíveis erros; ` +
      `pode sentir a dor com profundidade e ter dificuldade em “desligar a mente” à noite.\n\n` +
      `Ao mesmo tempo, esse eixo está naturalmente ligado à resiliência silenciosa: o melancólico suporta longos períodos de prova, ` +
      `desde que veja sentido naquilo. A confiança, porém, costuma ser frágil – não tanto em relação a Deus ou a princípios, ` +
      `mas em relação a si mesmo: medo de fracassar, de decepcionar, de não estar à altura. ` +
      `A determinação aparece quando um ideal é abraçado; o desafio é não deixar que o perfeccionismo ou a culpa minem esse impulso antes da hora.`,
  });

  if (secondary && secondary.groupId === 'choleric') {
    blocks.push({
      id: 'temp-growth-hidden',
      access: 'free',
      title: 'Melancólico-colérico em momentos de crise',
      body:
        `No melancólico-colérico, crises podem provocar simultaneamente dureza e autoacusação. ` +
        `Você pode reagir com firmeza externa, tomar decisões radicais, cortar relações ou assumir pesos enormes; ` +
        `e depois, por dentro, remoer cada palavra, sentindo culpa ou solidão.\n\n` +
        `O crescimento passa por aprender a desacelerar na hora de decidir, abrir o coração a conselhos prudentes e cultivar atos concretos de misericórdia consigo mesmo e com os outros. ` +
        `Virtudes como humildade, esperança e mansidão ajudam a integrar força e sensibilidade, evitando que a sua exigência justa se transforme em rigidez destrutiva.`,
    });
  } else if (secondary && secondary.groupId === 'phlegmatic') {
    blocks.push({
      id: 'temp-growth-hidden',
      access: 'free',
      title: 'Melancólico-fleumático em momentos de dificuldade',
      body:
        `No melancólico-fleumático, crises podem levar a um fechamento silencioso: você sente muito, pensa muito, mas nem sempre comunica. ` +
        `Há risco de paralisia: saber o que seria bom fazer, mas não encontrar força ou ânimo para dar os passos necessários.\n\n` +
        `O caminho de crescimento envolve identificar sinais precoces de desânimo (adiamentos, isolamento, cinismo), procurar ajuda antes que a tristeza se aprofunde demais ` +
        `e praticar pequenas decisões concretas, possíveis, em vez de esperar o momento perfeito. ` +
        `Virtudes como prudência, fortaleza e alegria cristã ajudam a transformar a sua profundidade em fidelidade alegre, e não em peso esmagador.`,
    });
  } else if (secondary && secondary.groupId === 'sanguine') {
    blocks.push({
      id: 'temp-growth-hidden',
      access: 'free',
      title: 'Melancólico-sanguíneo em tempos de instabilidade',
      body:
        `No melancólico-sanguíneo, crises podem se manifestar tanto como explosões emocionais quanto como períodos de retraimento intenso. ` +
        `Você pode oscilar entre buscar companhia para aliviar a dor e se afastar de todos por medo de incomodar ou de ser incompreendido.\n\n` +
        `O crescimento passa por aprender a nomear o que sente de forma honesta, sem dramatizar nem minimizar, ` +
        `e por cultivar hábitos estáveis (oração, amizade sólida, acompanhamento espiritual ou psicológico) que deem estrutura à sua sensibilidade. ` +
        `Virtudes como temperança, paciência e perseverança são fundamentais para estabilizar o humor e integrar luz e sombra em você.`,
    });
  }

  blocks.push({
    id: 'temp-growth-virtues',
    access: 'free',
    title: 'Virtudes que equilibram o melancólico',
    body:
      'O melancólico tem facilidade para virtudes ligadas à justiça (sentido de correção, fidelidade, responsabilidade) e à profundidade (reflexão, exame de consciência). ' +
      'Por outro lado, precisa trabalhar com mais empenho virtudes como esperança, alegria, confiança, simplicidade e misericórdia consigo mesmo. ' +
      'Parte essencial do crescimento é aprender a aceitar a própria limitação, celebrar pequenos progressos e reconhecer que Deus age também através das imperfeições e fracassos aparentes.',
  });

  blocks.push({
    id: 'temp-growth-premium',
    access: 'premium',
    title: 'Plano de crescimento pessoal para o melancólico (Premium)',
    body:
      'No relatório em PDF, você encontrará um plano em etapas pensado para o temperamento melancólico e suas combinações: ' +
      'exames de consciência contra o perfeccionismo estéril, exercícios de gratidão, práticas concretas para fortalecer a esperança ' +
      'e sugestões de como ordenar a sensibilidade para que ela se torne fonte de caridade, e não de paralisia ou autoacusação constante.',
  });

  return blocks;
}

export function buildMelancholicRelationships(
  primary: TemperamentScore,
  secondary?: TemperamentScore,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];

  blocks.push({
    id: 'temp-rel-dynamics',
    access: 'free',
    title: 'Como o melancólico se relaciona',
    body:
      `O melancólico tende a viver os relacionamentos com grande profundidade. ` +
      `Não se contenta com laços superficiais: busca autenticidade, coerência e verdade nos vínculos. ` +
      `Por isso, pode demorar a se abrir, mas quando o faz, entrega muito de si.\n\n` +
      `A lealdade para esse temperamento é central: ele valoriza quem permanece, quem cumpre o que promete, quem não banaliza confidências. ` +
      `O altruísmo se manifesta muitas vezes em gestos discretos: escuta atenta, presença silenciosa, sacrifícios que poucos veem. ` +
      `A inteligência emocional, porém, pode ser afetada pela tendência a interpretar demais olhares e palavras, ou a guardar mágoas por muito tempo. ` +
      `Quando amadurece, torna-se capaz de amar com profundidade, ternura e grande capacidade de empatia pela dor alheia.`,
  });

  if (secondary && secondary.groupId === 'choleric') {
    blocks.push({
      id: 'temp-rel-mix',
      access: 'free',
      title: 'Melancólico-colérico nos vínculos',
      body:
        `No melancólico-colérico, relacionamentos são levados muito a sério: você tende a se envolver com intensidade, ` +
        `a defender quem ama com firmeza e a exigir coerência de si e dos outros. ` +
        `Pode ser extremamente leal e disposto a sacrifícios, mas também mais sensível a injustiças e rejeições.\n\n` +
        `O risco está em reagir com dureza quando se sente ferido e depois remoer o que disse ou fez. ` +
        `A inteligência emocional cresce quando aprende a expressar a dor antes que ela se transforme em ressentimento, ` +
        `a perdoar limites reais dos outros e a distinguir entre falhas humanas comuns e verdadeiras traições. ` +
        `Quando amadurecido, esse perfil pode se tornar um apoio sólido e fiel, capaz de unir verdade e caridade nas relações.`,
    });
  } else if (secondary && secondary.groupId === 'phlegmatic') {
    blocks.push({
      id: 'temp-rel-mix',
      access: 'free',
      title: 'Melancólico-fleumático nos vínculos',
      body:
        `No melancólico-fleumático, há grande capacidade de constância e de presença silenciosa. ` +
        `Você provavelmente não tem muitos vínculos, mas os que tem são profundos e duradouros. ` +
        `Prefere poucos amigos íntimos a uma grande rede superficial.\n\n` +
        `A autenticidade se expressa mais por coerência do que por palavras: ser o mesmo, ser confiável, estar ali. ` +
        `O altruísmo aparece em gestos concretos de cuidado, mesmo que não seja muito verbalizado. ` +
        `O ponto de vigilância está em não se fechar demais por medo de ser ferido, e em não supor que o outro “deveria saber” o que você sente sem que ninguém diga. ` +
        `Crescer em comunicação afetiva simples e direta é parte importante da sua maturidade relacional.`,
    });
  } else if (secondary && secondary.groupId === 'sanguine') {
    blocks.push({
      id: 'temp-rel-mix',
      access: 'free',
      title: 'Melancólico-sanguíneo nos vínculos',
      body:
        `No melancólico-sanguíneo, os vínculos costumam ser intensos e ricos: você é capaz tanto de escuta profunda quanto de momentos de leveza, humor e criatividade com quem ama. ` +
        `Pode ser extremamente sensível às necessidades dos outros, com forte capacidade de empatia.\n\n` +
        `O risco está na oscilação: em alguns momentos, você se doa demais e se expõe muito; em outros, recolhe-se por medo de não ser correspondido na mesma medida. ` +
        `A inteligência emocional cresce quando aprende a calibrar a doação (nem tudo de uma vez, nem nada), ` +
        `a estabelecer limites saudáveis e a aceitar que nem todos expressam afeição da mesma forma que você. ` +
        `Quando amadurecido, esse perfil é capaz de gerar relacionamentos cheios de vida, beleza e profundidade.`,
    });
  }

  blocks.push({
    id: 'temp-rel-premium',
    access: 'premium',
    title: 'Orientações para amizades, família e vida afetiva (Premium)',
    body:
      'No relatório em PDF, o temperamento melancólico é aplicado de modo concreto à vida afetiva: ' +
      'como você tende a reagir em amizade, namoro/casamento, relação com filhos, pais e comunidade. ' +
      'Você encontrará sugestões práticas para conciliar autenticidade e delicadeza, lealdade e liberdade, ' +
      'ajustar expectativas realistas sobre os outros e cultivar uma verdadeira inteligência emocional, capaz de acolher a própria sensibilidade sem ser escravo dela.',
  });

  return blocks;
}
