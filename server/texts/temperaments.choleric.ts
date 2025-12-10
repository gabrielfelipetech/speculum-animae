// server/texts/temperaments.choleric.ts
import type { ResultBlock, TemperamentScore } from './temperaments.shared';
import { intensityLabel, lowerLabel } from './temperaments.shared';

// ---------------------------------------------------------------------------
// INTRO / OVERVIEW – COLÉRICO
// ---------------------------------------------------------------------------
export function buildCholericIntro(
  primary: TemperamentScore,
  secondary?: TemperamentScore,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];

  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary);

  const comboText = secondary
    ? `Seu temperamento predominante é ${primary.name}, com influência significativa de ${secondary.name}.`
    : `Seu temperamento predominante é ${primary.name}, formando um perfil fortemente ${primaryLabel}.`;

  blocks.push({
    id: 'temp-overview',
    access: 'free',
    title: 'Seu perfil de temperamento',
    body:
      `${comboText}\n\n` +
      `Na prática, isso costuma gerar uma forma de reagir rápida, intensa e orientada para resultados. ` +
      `O eixo colérico está ligado a vontade forte, foco em objetivos concretos e facilidade para tomar decisões, ` +
      `mesmo em ambientes de pressão. A intensidade atual desse temperamento em você foi classificada como ` +
      `${intensityLabel(primary.average)}.\n\n` +
      `Em termos de traços amplos, o colérico tende a ser mais extrovertido que introvertido (a energia vai para fora, em ações), ` +
      `mais realista que puramente intuitivo (gosta do concreto, do que funciona), mais analítico/pragmático do que sentimental, ` +
      `mais “desbravador” do que apenas planejador, e fortemente assertivo (em oposição a turbulento/passivo). ` +
      `Essas tendências não o definem por completo, mas ajudam a explicar o impulso de “ir para frente” que provavelmente você reconhece em si mesmo.`,
  });

  if (secondary) {
    const mixId = secondary.groupId;

    let comboBody = '';

    if (mixId === 'sanguine') {
      comboBody =
        `A combinação ${primaryLabel}-${secondaryLabel} costuma intensificar ainda mais a dimensão extrovertida: ` +
        `é um perfil que mistura vontade firme com sociabilidade, entusiasmo e capacidade de contagiar ambientes. ` +
        `Em linguagem de traços, isso se traduz num estilo claramente extrovertido, realista, mas com grande abertura ao novo; ` +
        `analítico quando se trata de resultado, mas emocional na forma de se expressar; muito desbravador, ` +
        `com assertividade alta e certa turbulência quando contrariado.\n\n` +
        `É um tipo de pessoa que tende a inspirar, convencer e arrastar outros, mas que precisa vigiar a impulsividade, ` +
        `a tendência a prometer mais do que consegue entregar e o risco de atropelar sensibilidades alheias.`;
    } else if (mixId === 'phlegmatic') {
      comboBody =
        `A combinação ${primaryLabel}-${secondaryLabel} une a vontade firme do colérico à estabilidade e calma do fleumático. ` +
        `O resultado é um perfil mais “gestor”: alguém que continua sendo realista e orientado a metas, mas com mais paciência, ` +
        `capacidade de observar e tolerância a ritmos diferentes.\n\n` +
        `Em termos de traços, tende a ser um ambivertido (nem tão explosivo quanto o colérico puro, nem tão reservado), ` +
        `com forte senso de realidade, análise fria em decisões importantes, estilo mais planejador do que aventureiro e assertividade alta, ` +
        `mas muitas vezes controlada por um desejo sincero de evitar conflitos desnecessários.`;
    } else if (mixId === 'melancholic') {
      comboBody =
        `A combinação ${primaryLabel}-${secondaryLabel} junta intensidade de vontade com profundidade afetiva e mental. ` +
        `É um perfil que pode se mostrar mais introvertido do que um colérico típico, mas não por falta de força – e sim por ` +
        `reflexão, perfeccionismo e certa reserva.\n\n` +
        `Nos traços amplos, você tende a oscilar entre momentos de extroversão focada (quando há um objetivo claro) e períodos de recolhimento, ` +
        `em que analisa tudo com cuidado. O olhar é realista, mas com forte componente analítico e sensível; ` +
        `há impulso para desbravar, mas controlado por planejamento e autocrítica. A assertividade é alta, ` +
        `embora às vezes modulada por inseguranças internas ou medo de falhar.`;
    } else {
      comboBody =
        `A combinação entre ${primary.name} e ${secondary.name} torna o seu perfil mais complexo e rico. ` +
        `Em alguns momentos você atua como um ${primary.name} típico; em outros, a influência de ${secondary.name} ` +
        `traz nuances de sensibilidade, prudência, estabilidade ou expansividade.\n\n` +
        `Isso ajuda a explicar por que você não se vê totalmente em descrições simplistas de um único temperamento.`;
    }

    blocks.push({
      id: 'temp-combo',
      access: 'free',
      title: 'Como a combinação de temperamentos aparece em você',
      body: comboBody,
    });
  }

  blocks.push({
    id: 'temp-premium-overview',
    access: 'premium',
    title: 'Mapa completo do seu temperamento (Premium)',
    body:
      'No relatório em PDF você verá a leitura detalhada de como o eixo colérico se articula com o seu temperamento secundário, ' +
      'combinando análise de traços (introversão/extroversão, realismo/intuição, mente analítica/afetiva, perfil planejador/desbravador, ' +
      'assertividade/turbulência) com exemplos concretos do dia a dia. O material aprofunda também a perspectiva de autores clássicos ' +
      'sobre o colérico, indicando caminhos de maturidade e integração interior.',
  });

  return blocks;
}

// ---------------------------------------------------------------------------
// TRAÇOS / PERSONALIDADE – COLÉRICO
// ---------------------------------------------------------------------------
export function buildCholericTraits(
  primary: TemperamentScore,
  secondary?: TemperamentScore,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];

  // colérico "puro" (ou sem secundário relevante)
  if (!secondary || secondary.groupId === 'choleric') {
    blocks.push({
      id: 'temp-traits-core',
      access: 'free',
      title: 'Traços centrais de personalidade colérica',
      body:
        `O núcleo do temperamento colérico é marcado por energia direcionada, foco em objetivos concretos e ` +
        `reação rápida a pessoas e situações. Em você, essas características aparecem com intensidade ${intensityLabel(
          primary.average,
        )}, o que costuma se traduzir em um senso forte de missão e dificuldade em ficar indiferente.\n\n` +
        `No eixo introvertido/extrovertido, o colérico tende naturalmente ao lado extrovertido – não tanto por gostar de festas, ` +
        `mas por projetar a sua vontade para fora, tentando influenciar o ambiente. É mais realista do que abstrato: ` +
        `valoriza o que funciona e o que entrega resultado. A mente costuma ser analítica e estratégica, embora as emoções ` +
        `sejam muito fortes e, às vezes, explosivas. Você tende a ser mais desbravador do que apenas planejador, ` +
        `e fortemente assertivo: prefere decidir, correr riscos calculados e assumir a responsabilidade, em vez de ficar à margem.`,
    });
  }

  if (secondary && secondary.groupId === 'sanguine') {
    blocks.push({
      id: 'temp-traits-secondary',
      access: 'free',
      title: 'Colérico-sanguíneo: energia expansiva',
      body:
        `Na combinação colérico-sanguíneo, a vontade firme do colérico se junta à sociabilidade e espontaneidade do sanguíneo. ` +
        `Isso costuma gerar um perfil fortemente extrovertido, comunicativo e capaz de “puxar” ambientes inteiros. ` +
        `Você tende a ler o mundo de forma realista, mas com otimismo; alterna entre análise objetiva (quando há metas claras) ` +
        `e respostas emocionais intensas (entusiasmo, indignação, animação).\n\n` +
        `O lado desbravador aparece com força: há gosto por iniciar projetos, enfrentar desafios e abrir caminho onde outros hesitam. ` +
        `A assertividade é alta: você fala, propõe e se posiciona com facilidade. O ponto de atenção está na turbulência interna: ` +
        `quando contrariado ou entediado, pode oscilar entre irritação e dispersão, falando mais do que convém ou assumindo mais coisas do que é saudável.`,
    });
  } else if (secondary && secondary.groupId === 'phlegmatic') {
    blocks.push({
      id: 'temp-traits-secondary',
      access: 'free',
      title: 'Colérico-fleumático: firmeza com estabilidade',
      body:
        `Na combinação colérico-fleumático, a energia dirigida do colérico se encontra com a calma e a constância do fleumático. ` +
        `O resultado é um perfil que pode ser visto por muitos como “equilibrado”: há força de decisão, mas também capacidade de ouvir, ` +
        `esperar e manter a serenidade.\n\n` +
        `Nos eixos de traço, isso costuma gerar um tipo ambivertido (nem tão explosivo, nem tão apagado), realista, analítico, ` +
        `com boa capacidade de planejar antes de agir. O impulso desbravador existe, mas é filtrado por prudência e aversão a conflitos gratuitos. ` +
        `A assertividade é alta, porém mais controlada, o que pode torná-lo um mediador natural em grupos – desde que não caia na tentação de ` +
        `usar essa calma apenas para “proteger” o próprio jeito de fazer as coisas.`,
    });
  } else if (secondary && secondary.groupId === 'melancholic') {
    blocks.push({
      id: 'temp-traits-secondary',
      access: 'free',
      title: 'Colérico-melancólico: intensidade com profundidade',
      body:
        `Na combinação colérico-melancólico, a vontade forte encontra um mundo interior intenso, crítico e sensível. ` +
        `É comum haver aparência de firmeza por fora e grande complexidade afetiva por dentro. Esse perfil tende mais à introversão, ` +
        `não por falta de energia, mas porque pensa, revê e rumina muito o que faz.\n\n` +
        `O olhar é realista, mas com forte viés analítico e perfeccionista: você percebe nuances, falhas e incoerências com facilidade. ` +
        `Há impulso para desbravar, mas o planejamento e a autocrítica às vezes travam ou atrasam movimentos. ` +
        `A assertividade é alta em temas que você considera justos ou importantes, mas pode ser acompanhada de culpa ou dúvida depois, ` +
        `quando a mente melancólica revisita tudo o que foi dito ou feito.`,
    });
  }

  blocks.push({
    id: 'temp-traits-premium',
    access: 'premium',
    title: 'Análise completa dos traços coléricos (Premium)',
    body:
      'No relatório em PDF, o eixo colérico é destrinchado em subtópicos: força de vontade, reação à frustração, ' +
      'grau de impulsividade, capacidade de planejamento, estilo de liderança, padrão de autocrítica e modo como você lida com limites. ' +
      'Também são apresentados exemplos concretos de como o seu temperamento mistura traços de autenticidade, lealdade e altruísmo ' +
      'com a necessidade de aprender inteligência emocional e domínio de si.',
  });

  return blocks;
}

// ---------------------------------------------------------------------------
// CARREIRA / TRABALHO – COLÉRICO
// ---------------------------------------------------------------------------
export function buildCholericCareer(
  primary: TemperamentScore,
  secondary?: TemperamentScore,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];

  blocks.push({
    id: 'temp-career-style',
    access: 'free',
    title: 'Estilo de trabalho e produtividade coléricos',
    body:
      `O colérico costuma enxergar o trabalho como lugar natural para realizar, ordenar e liderar. ` +
      `Em você, isso aparece como impulso para assumir responsabilidade, definir rumo e cobrar de si e dos outros. ` +
      `A produtividade tende a crescer quando há metas claras, autonomia e um grau saudável de pressão; ` +
      `e a cair quando o ambiente é difuso, lento ou excessivamente burocrático.\n\n` +
      `Em termos de traços, é comum haver ambição (no sentido de querer ir além), forte motivação frente a desafios difíceis ` +
      `e desejo espontâneo de liderar ou, ao menos, de influenciar a direção que as coisas tomam. ` +
      `Quando desordenado, esse impulso pode virar domínio, dureza ou impaciência com os mais lentos. ` +
      `Quando bem trabalhado, torna-se serviço: liderança que entrega, protege, organiza e puxa os outros para o melhor.`,
  });

  if (secondary && secondary.groupId === 'sanguine') {
    blocks.push({
      id: 'temp-career-mix',
      access: 'free',
      title: 'Colérico-sanguíneo no trabalho',
      body:
        `O colérico-sanguíneo tende a brilhar em contextos dinâmicos, com contato humano, metas desafiadoras e espaço para criatividade prática: ` +
        `gestão de equipes, vendas consultivas, empreendedorismo, comunicação, liderança em projetos que exigem energia e presença constante.\n\n` +
        `A ambição costuma se expressar em forma de desejo de impacto visível. A motivação sobe quando há reconhecimento, desafios e variedade, ` +
        `e cai em rotinas monótonas. O ponto de vigilância está em prometer demais, iniciar muitas frentes e não cuidar o suficiente da continuidade, ` +
        `da documentação e dos detalhes. O aperfeiçoamento aqui passa por criar sistemas que obriguem a concluir aquilo que foi começado.`,
    });
  } else if (secondary && secondary.groupId === 'phlegmatic') {
    blocks.push({
      id: 'temp-career-mix',
      access: 'free',
      title: 'Colérico-fleumático no trabalho',
      body:
        `O colérico-fleumático é frequentemente percebido como um “tipo gestor”: combina visão de resultado com capacidade de manter processos estáveis. ` +
        `Costuma ir bem em funções de coordenação, liderança de áreas operacionais, gestão de times técnicos ou administrativos, ` +
        `ou em qualquer função que peça ao mesmo tempo firmeza e serenidade.\n\n` +
        `A ambição existe, mas costuma ser mais silenciosa; busca mais a eficácia real do que o brilho. ` +
        `Quando imaturo, pode cair na tentação de usar a calma fleumática como fuga de decisões difíceis ou confrontos necessários. ` +
        `Quando cresce, torna-se referência de estabilidade firme, capaz de sustentar mudanças sem “explodir” o ambiente.`,
    });
  } else if (secondary && secondary.groupId === 'melancholic') {
    blocks.push({
      id: 'temp-career-mix',
      access: 'free',
      title: 'Colérico-melancólico no trabalho',
      body:
        `O colérico-melancólico tende a unir alta exigência consigo mesmo e com o trabalho à busca de profundidade e coerência. ` +
        `Pode ir muito bem em funções que pedem liderança técnica, pesquisa aplicada, estratégia, direção de projetos complexos, ` +
        `áreas em que seja preciso unir visão de conjunto com atenção aos detalhes.\n\n` +
        `A ambição aqui muitas vezes assume a forma de perfeccionismo: desejo de entregar algo impecável, bem pensado, bem fundamentado. ` +
        `Quando desequilibrado, isso pode levar a sobrecarga, dificuldade de delegar, autocrítica cruel e pouca tolerância a falhas. ` +
        `Parte do crescimento passa por aceitar limites, aprender a delegar e reconhecer que nem todo projeto precisa ser “o projeto da vida”.`,
    });
  }

  blocks.push({
    id: 'temp-career-premium',
    access: 'premium',
    title: 'Caminhos profissionais alinhados ao seu temperamento (Premium)',
    body:
      'No relatório em PDF, são apresentados cenários profissionais que costumam dialogar bem com o eixo colérico (liderança, gestão, ' +
      'funções estratégicas, empreendedorismo, áreas que exigem decisão rápida) e cenários que pedem compensações (ambientes muito burocráticos, ' +
      'sem autonomia ou sem clareza de direção). Também são exploradas formas concretas de ordenar ambição, perfeccionismo e desejo de estar no comando ' +
      'ao serviço de um bem maior, sem esmagar quem caminha ao seu lado.',
  });

  return blocks;
}

// ---------------------------------------------------------------------------
// CRESCIMENTO / VIRTUDES – COLÉRICO
// ---------------------------------------------------------------------------
export function buildCholericGrowth(
  primary: TemperamentScore,
  secondary?: TemperamentScore,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];

  blocks.push({
    id: 'temp-growth-stress',
    access: 'free',
    title: 'Reação do colérico ao estresse e às crises',
    body:
      `Sob pressão, o temperamento colérico costuma aparecer com ainda mais nitidez. ` +
      `A paciência encurta, a necessidade de controlar aumenta e a linguagem tende a ficar mais direta ou dura. ` +
      `Em você, isso pode se manifestar como explosões de impaciência, vontade intensa de “resolver tudo agora” ` +
      `ou dificuldade em aceitar limites e lentidões alheias.\n\n` +
      `Ao mesmo tempo, o eixo colérico é naturalmente ligado à resiliência, confiança e determinação: ` +
      `quando amadurecido, suporta bem o peso de decisões difíceis e tem forte senso de responsabilidade. ` +
      `O desafio está em transformar essa força em serviço – não em imposição – e aprender a sentir-se no comando ` +
      `sem sufocar a liberdade de quem caminha ao lado.`,
  });

  if (secondary && secondary.groupId === 'sanguine') {
    blocks.push({
      id: 'temp-growth-hidden',
      access: 'free',
      title: 'Colérico-sanguíneo em momentos de instabilidade',
      body:
        `No colérico-sanguíneo, crises podem provocar oscilações rápidas: da confiança ao desânimo, da determinação à dispersão. ` +
        `Você pode reagir com discursos fortes, decisões abruptas ou mudanças repentinas de foco. Em vez de aprofundar a dor, ` +
        `há uma tendência a “fugir para a ação” ou para estímulos externos.\n\n` +
        `O crescimento aqui passa por aprender a parar, nomear o que sente, pedir conselho e não se deixar conduzir apenas pelo impulso do momento. ` +
        `Virtudes como temperança, prudência e mansidão ajudam a ordenar a enorme energia para um bem real, e não apenas para o alívio imediato.`,
    });
  } else if (secondary && secondary.groupId === 'phlegmatic') {
    blocks.push({
      id: 'temp-growth-hidden',
      access: 'free',
      title: 'Colérico-fleumático em momentos de crise',
      body:
        `No colérico-fleumático, crises podem levar ora a reações firmes e decisivas, ora a um recuo silencioso. ` +
        `Você pode sentir simultaneamente o impulso de resolver tudo e o desejo de se afastar para não piorar a situação. ` +
        `Se mal integrado, isso pode gerar adiamentos, ressentimentos guardados e decisões tomadas tarde demais.\n\n` +
        `O crescimento passa por reconhecer cedo os sinais de fuga (procrastinação, ironia, “tanto faz”) e confrontar com caridade o que precisa ser dito. ` +
        `Virtudes como coragem, perseverança e caridade paciente ajudam a unir a firmeza colérica à paz fleumática, em vez de deixá-las se sabotarem.`,
    });
  } else if (secondary && secondary.groupId === 'melancholic') {
    blocks.push({
      id: 'temp-growth-hidden',
      access: 'free',
      title: 'Colérico-melancólico em crise',
      body:
        `No colérico-melancólico, crises podem intensificar tanto a dureza para fora quanto a dureza para dentro. ` +
        `Você pode reagir com firmeza, exigir demais de si e dos outros e, depois, remoer tudo por dentro, ` +
        `com sensação de culpa, fracasso ou solidão.\n\n` +
        `O caminho de crescimento envolve aprender a aceitar a própria fragilidade, pedir ajuda antes de chegar ao limite e praticar ` +
        `atos explícitos de misericórdia consigo mesmo e com os outros. Virtudes como humildade, esperança e paciência consigo mesmo ` +
        `são cruciais para que a sua determinação não se transforme em rigidez destrutiva.`,
    });
  }

  blocks.push({
    id: 'temp-growth-virtues',
    access: 'free',
    title: 'Virtudes que equilibram o colérico',
    body:
      'O colérico tem facilidade natural para virtudes ligadas à fortaleza: coragem, constância, decisão. ' +
      'Por outro lado, precisa trabalhar com mais empenho virtudes como paciência, mansidão, docilidade, ' +
      'humildade e caridade concreta. Parte do crescimento passa por reconhecer que nem toda batalha precisa ser travada, ' +
      'que nem toda verdade precisa ser dita na hora, e que ceder por amor não é fraqueza, mas força ordenada.',
  });

  blocks.push({
    id: 'temp-growth-premium',
    access: 'premium',
    title: 'Plano de crescimento por etapas (Premium)',
    body:
      'No relatório em PDF você encontrará um plano em etapas especificamente pensado para o colérico e suas combinações: ' +
      'exames de consciência focados nos exageros típicos (controle, dureza, impaciência), exercícios concretos de mansidão, ' +
      'práticas de confiança em Deus e formas de canalizar a força de vontade para o bem das pessoas que lhe foram confiadas.',
  });

  return blocks;
}

// ---------------------------------------------------------------------------
// RELACIONAMENTOS – COLÉRICO
// ---------------------------------------------------------------------------
export function buildCholericRelationships(
  primary: TemperamentScore,
  secondary?: TemperamentScore,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];

  blocks.push({
    id: 'temp-rel-dynamics',
    access: 'free',
    title: 'Como o colérico se relaciona',
    body:
      `O colérico tende a levar para os relacionamentos a mesma força que leva para o trabalho: ` +
      `fala com franqueza, reage rápido e quer resolver problemas de forma direta. Isso pode ser percebido como autenticidade e lealdade, ` +
      `mas também pode soar como dureza quando não vem acompanhado de delicadeza.\n\n` +
      `Em geral, o colérico valoriza muito a lealdade (admira quem permanece, quem assume compromissos) e o altruísmo concretizado em ações ` +
      `(fazer, ajudar, resolver). A inteligência emocional, porém, nem sempre acompanha a velocidade da vontade: ` +
      `há risco de pouca escuta, de pouca leitura das nuances afetivas e de impaciência com fragilidades alheias. ` +
      `Quando amadurece, esse temperamento torna-se um apoio firme para os outros: alguém em quem se pode confiar nos momentos difíceis.`,
  });

  if (secondary && secondary.groupId === 'sanguine') {
    blocks.push({
      id: 'temp-rel-mix',
      access: 'free',
      title: 'Colérico-sanguíneo nos vínculos',
      body:
        `O colérico-sanguíneo costuma ser intenso, presente e expansivo nas relações: gosta de proximidade, conversa, ` +
        `projetos em comum e movimento. Em amizades e afetos, tende a tomar iniciativa, propor programas, animar o ambiente. ` +
        `A autenticidade vem acompanhada de calor humano, mas, se não for ordenada, pode virar invasão, ciúme ou impaciência com ritmos diferentes.\n\n` +
        `A inteligência emocional cresce quando aprende a ouvir tanto quanto fala, a respeitar limites e a perceber que nem toda pessoa ` +
        `aguenta o mesmo ritmo de intensidade e mudança. Quando integra essas dimensões, torna-se amigo fiel, cônjuge comprometido e presença que levanta os outros.`,
    });
  } else if (secondary && secondary.groupId === 'phlegmatic') {
    blocks.push({
      id: 'temp-rel-mix',
      access: 'free',
      title: 'Colérico-fleumático nos vínculos',
      body:
        `O colérico-fleumático tende a ser alguém de poucas relações, mas profundas. Consegue unir firmeza com estabilidade afetiva, ` +
        `sendo muitas vezes percebido como “porto seguro”: não se abala fácil, é consistente e costuma cumprir o que promete.\n\n` +
        `O risco está em usar a calma fleumática para evitar conversas difíceis ou emoções incômodas, mantendo o outro próximo, mas sem acesso real ao seu interior. ` +
        `O crescimento passa por abrir mais o coração, partilhar fragilidades e permitir que a lealdade não se reduza a “estar sempre ali”, mas se estenda à disposição de ser vulnerável.`,
    });
  } else if (secondary && secondary.groupId === 'melancholic') {
    blocks.push({
      id: 'temp-rel-mix',
      access: 'free',
      title: 'Colérico-melancólico nos vínculos',
      body:
        `O colérico-melancólico pode viver os relacionamentos com grande intensidade e profundidade: ` +
        `exige muito de si e dos outros, busca coerência, teme a superficialidade. Pode ser extremamente leal e disposto a sacrifícios, ` +
        `mas também mais sensível a feridas, rejeições e incoerências.\n\n` +
        `A inteligência emocional cresce quando aprende a nomear o que sente antes de explodir ou se fechar, ` +
        `a perdoar limites reais dos outros e a aceitar que vínculos humanos sempre terão uma certa dose de imperfeição. ` +
        `Quando amadurecido, esse perfil se torna capaz de amar com firmeza e ternura ao mesmo tempo.`,
    });
  }

  blocks.push({
    id: 'temp-rel-premium',
    access: 'premium',
    title: 'Orientações para amizades, família e vida afetiva (Premium)',
    body:
      'No relatório em PDF, o eixo colérico é aplicado de forma concreta à vida afetiva: ' +
      'como o seu perfil tende a se comportar em amizade, namoro/casamento, relação com filhos, pais e comunidade. ' +
      'São oferecidas sugestões práticas para canalizar autenticidade, lealdade e altruísmo sem sufocar o outro, ' +
      'e para crescer em verdadeira inteligência emocional, capaz de unir verdade e caridade nos vínculos diários.',
  });

  return blocks;
}
