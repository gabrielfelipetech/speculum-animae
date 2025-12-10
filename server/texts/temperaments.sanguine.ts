// server/texts/temperaments.sanguine.ts
import type { ResultBlock, TemperamentScore } from './temperaments.shared';
import { intensityLabel, lowerLabel } from './temperaments.shared';

// ---------------------------------------------------------------------------
// INTRO / OVERVIEW – SANGUÍNEO
// ---------------------------------------------------------------------------
export function buildSanguineIntro(
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
      `O eixo sanguíneo está ligado à sociabilidade, espontaneidade e rapidez em responder ao que acontece ao redor. ` +
      `Em você, essas características aparecem com intensidade ${intensityLabel(primary.average)}, ` +
      `o que costuma se traduzir em facilidade para iniciar conversas, criar vínculos e trazer leveza aos ambientes.\n\n` +
      `Nos grandes traços, o sanguíneo tende a ser claramente extrovertido (a energia vai para as pessoas), ` +
      `mais intuitivo e criativo do que rigidamente lógico, mais emocional do que analítico, ` +
      `mais desbravador e explorador do que planejador rígido, e assertivo de forma calorosa – ainda que, às vezes, ` +
      `um pouco turbulento, mudando de ideia conforme o clima e as emoções do momento.`,
  });

  if (secondary) {
    const mixId = secondary.groupId;
    let comboBody = '';

    if (mixId === 'choleric') {
      comboBody =
        `Na combinação ${primaryLabel}-${secondaryLabel}, o entusiasmo sanguíneo se junta à vontade firme do colérico. ` +
        `Costuma surgir um perfil carismático, com grande presença de palco, capaz de contagiar grupos e assumir a dianteira sem medo. ` +
        `Em termos de traços, isso reforça a extroversão, o realismo prático e o espírito desbravador, ` +
        `com alta assertividade e grande foco em impacto visível.\n\n` +
        `O risco está em oscilar entre o entusiasmo contagiante e a impaciência dura, ` +
        `prometendo mais do que consegue sustentar e atropelando sensibilidades alheias quando está irritado.`;
    } else if (mixId === 'phlegmatic') {
      comboBody =
        `Na combinação ${primaryLabel}-${secondaryLabel}, a leveza do sanguíneo encontra a calma estável do fleumático. ` +
        `O resultado é um perfil acolhedor, bem-humorado e pacífico, que costuma ser fácil de conviver e de aproximar. ` +
        `Os traços tendem para uma extroversão suave (capaz de falar e ouvir), forte abertura ao novo, ` +
        `mas com gosto por ambientes previsíveis e relacionalmente seguros.\n\n` +
        `A turbulência emocional é atenuada pelo lado fleumático, mas pode aparecer na forma de procrastinação, ` +
        `evitar conversas difíceis ou fugir de conflitos em nome da “paz”.`;
    } else if (mixId === 'melancholic') {
      comboBody =
        `Na combinação ${primaryLabel}-${secondaryLabel}, o entusiasmo e a sociabilidade sanguíneos se unem a uma grande profundidade afetiva e reflexiva. ` +
        `É comum haver alternância entre momentos de grande abertura e alegria com as pessoas e períodos de recolhimento, análise e certa autocrítica. ` +
        `Nos traços, isso cria um tipo ambivertido: por fora, caloroso; por dentro, sensível e atento aos detalhes e nuances.\n\n` +
        `Esse perfil é altamente intuitivo e emocional, com boa capacidade de empatia, mas precisa vigiar ` +
        `a tendência a dispersar-se quando as coisas ficam difíceis e a oscilar de humor com certa facilidade.`;
    } else {
      comboBody =
        `A combinação entre ${primary.name} e ${secondary.name} torna o seu perfil mais complexo e rico. ` +
        `Em alguns momentos você atua como um ${primary.name} típico; em outros, a influência de ${secondary.name} ` +
        `traz nuances de sensibilidade, prudência, estabilidade ou intensidade interior.\n\n` +
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
      'No relatório em PDF você verá em detalhe como o eixo sanguíneo colore sua forma de perceber o mundo: ' +
      'nível de extroversão, sensibilidade às novidades, padrão de oscilação emocional e modo de lidar com frustração. ' +
      'Também serão exploradas as misturas com o seu temperamento secundário, mostrando como isso impacta foco, disciplina e profundidade nos vínculos.',
  });

  return blocks;
}

// ---------------------------------------------------------------------------
// TRAÇOS / PERSONALIDADE – SANGUÍNEO
// ---------------------------------------------------------------------------
export function buildSanguineTraits(
  primary: TemperamentScore,
  secondary?: TemperamentScore,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];

  // sanguíneo "puro" (ou dominante)
  if (!secondary || secondary.groupId === 'sanguine') {
    blocks.push({
      id: 'temp-traits-core',
      access: 'free',
      title: 'Traços centrais de personalidade sanguínea',
      body:
        `O núcleo do temperamento sanguíneo é marcado por abertura, curiosidade e resposta rápida ao ambiente. ` +
        `Em você, essas características aparecem com intensidade ${intensityLabel(
          primary.average,
        )}, traduzindo-se em facilidade para iniciar conversas, se adaptar a contextos novos ` +
        `e encontrar algo de interessante mesmo em situações comuns.\n\n` +
        `No eixo introvertido/extrovertido, o sanguíneo tende claramente à extroversão: sente-se alimentado pela presença de pessoas. ` +
        `É mais intuitivo e imaginativo do que rigorosamente lógico, com mente criativa que associa ideias com rapidez. ` +
        `A leitura da realidade é muito afetiva (o que agrada, anima ou incomoda), e o impulso é mais desbravador ` +
        `do que planejador formal: prefere começar, experimentar, testar. A assertividade normalmente se manifesta em forma de simpatia, ` +
        `humor e persuasão, mais do que em enfrentamento direto.`,
    });
  }

  if (secondary && secondary.groupId === 'choleric') {
    blocks.push({
      id: 'temp-traits-secondary',
      access: 'free',
      title: 'Sanguíneo-colérico: carisma com força de vontade',
      body:
        `No perfil sanguíneo-colérico, o encanto relacional se soma a uma vontade firme orientada a resultados. ` +
        `Isso gera um tipo de pessoa que fala, convoca e conduz – muitas vezes assumindo naturalmente a liderança em grupos. ` +
        `Os traços mostram alta extroversão, forte componente realista (sobretudo quando há metas claras), ` +
        `pensamento rápido e estratégico e grande gosto por desbravar novos projetos.\n\n` +
        `O ponto de atenção está na turbulência: quando as coisas não saem como o esperado, a frustração pode virar irritação, ironia ou dureza. ` +
        `A mente oscila entre o emocional e o analítico; quando integrado, esse perfil é capaz de unir empatia e decisão com muita força.`,
    });
  } else if (secondary && secondary.groupId === 'phlegmatic') {
    blocks.push({
      id: 'temp-traits-secondary',
      access: 'free',
      title: 'Sanguíneo-fleumático: leveza com estabilidade',
      body:
        `No sanguíneo-fleumático, o entusiasmo se apoia numa base tranquila e estável. ` +
        `É um perfil de convivência fácil: gosta de conversar, fazer graça, incluir pessoas, ` +
        `mas tende a evitar conflitos diretos e não se abala facilmente com imprevistos.\n\n` +
        `Nos grandes traços, isso gera uma extroversão serena, grande empatia e boa capacidade de escuta. ` +
        `A mente é mais emocional e relacional do que técnica, e o estilo é mais de explorador moderado: ` +
        `gosta de novidades, mas aprecia ter um “porto seguro” para onde voltar. O perigo está em acomodar-se, ` +
        `deixando que a disciplina, a profundidade e o enfrentamento de temas difíceis fiquem sempre para depois.`,
    });
  } else if (secondary && secondary.groupId === 'melancholic') {
    blocks.push({
      id: 'temp-traits-secondary',
      access: 'free',
      title: 'Sanguíneo-melancólico: calor e profundidade',
      body:
        `No sanguíneo-melancólico, o calor humano do sanguíneo convive com a sensibilidade e a profundidade do melancólico. ` +
        `Você pode ser muito comunicativo e afável em público, mas guardar um mundo interior rico, com reflexões, dúvidas e emoções intensas. ` +
        `É um perfil que alterna entre extroversão e recolhimento, frequentemente percebido como “intenso, mas delicado”.\n\n` +
        `Há forte capacidade intuitiva, atenção às nuances e empatia com dores alheias. ` +
        `Por outro lado, existe tendência a oscilar de humor, a se magoar com certa facilidade e a usar o humor ou a leveza ` +
        `como forma de mascarar feridas mais profundas. A integração desse perfil passa por dar espaço tanto à alegria quanto à verdade do que se sente.`,
    });
  }

  blocks.push({
    id: 'temp-traits-premium',
    access: 'premium',
    title: 'Análise completa dos traços sanguíneos (Premium)',
    body:
      'No relatório em PDF, o eixo sanguíneo é detalhado em aspectos como busca de novidades, resistência à rotina, ' +
      'forma de lidar com frustrações, padrão de foco e dispersão, e modo como a sua afetividade influencia decisões. ' +
      'Também são apresentados caminhos concretos para integrar criatividade, empatia e leveza com disciplina interior e constância.',
  });

  return blocks;
}

// ---------------------------------------------------------------------------
// CARREIRA / TRABALHO – SANGUÍNEO
// ---------------------------------------------------------------------------
export function buildSanguineCareer(
  primary: TemperamentScore,
  secondary?: TemperamentScore,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];

  blocks.push({
    id: 'temp-career-style',
    access: 'free',
    title: 'Estilo de trabalho e produtividade sanguíneos',
    body:
      `O sanguíneo costuma trabalhar melhor onde há pessoas, variedade e algum grau de movimento. ` +
      `Rotinas muito rígidas, silenciosas ou repetitivas tendem a drenar sua energia, enquanto ambientes vivos, ` +
      `com troca de ideias e espaço para criatividade, a fazem crescer.\n\n` +
      `Em geral, a motivação sobe na presença de desafios interessantes, projetos novos e contatos humanos significativos, ` +
      `e cai quando tudo se torna previsível demais. Há grande capacidade de começar coisas e gerar impacto imediato; ` +
      `o ponto de atenção é sustentar a continuidade, a organização e o cuidado com detalhes ao longo do tempo.`,
  });

  if (secondary && secondary.groupId === 'choleric') {
    blocks.push({
      id: 'temp-career-mix',
      access: 'free',
      title: 'Sanguíneo-colérico no trabalho',
      body:
        `O sanguíneo-colérico tende a se destacar em funções que pedem presença, persuasão e direção: liderança de equipes comerciais, ` +
        `empreendedorismo, comunicação, ambientes pastorais ou educacionais dinâmicos, áreas em que seja preciso tanto falar quanto executar. \n\n` +
        `A ambição costuma focar em impacto visível e resultados mensuráveis. ` +
        `Quando imaturo, esse perfil pode superestimar a própria capacidade de sustentar todos os projetos que inicia; ` +
        `quando amadurece, aprende a selecionar melhor batalhas, delegar e cuidar para que o brilho do começo se traduza em frutos estáveis.`,
    });
  } else if (secondary && secondary.groupId === 'phlegmatic') {
    blocks.push({
      id: 'temp-career-mix',
      access: 'free',
      title: 'Sanguíneo-fleumático no trabalho',
      body:
        `O sanguíneo-fleumático costuma ir bem em funções de atendimento, acolhimento, ensino, suporte, mediação de conflitos leves ` +
        `e qualquer trabalho que combine relacionamento estável com um clima relativamente tranquilo. ` +
        `É o tipo de pessoa que cria bons ambientes de equipe, ajuda a quebrar tensões e faz os outros se sentirem à vontade.\n\n` +
        `A ambição tende a ser moderada: mais voltada para qualidade de vida e segurança relacional do que para grandes cargos. ` +
        `O desafio está em não deixar que a busca por conforto impeça assumir responsabilidades maiores e enfrentar conversas difíceis necessárias para o crescimento profissional.`,
    });
  } else if (secondary && secondary.groupId === 'melancholic') {
    blocks.push({
      id: 'temp-career-mix',
      access: 'free',
      title: 'Sanguíneo-melancólico no trabalho',
      body:
        `O sanguíneo-melancólico pode unir grande capacidade relacional com profundidade de reflexão, indo bem em áreas que pedem contato humano ` +
        `e, ao mesmo tempo, sensibilidade às histórias e às nuances: educação, aconselhamento, comunicação de conteúdo denso, artes, áreas criativas, pastoral, pesquisa qualitativa.\n\n` +
        `A motivação aumenta quando sente que o trabalho tem sentido humano e não é apenas “produção mecânica”. ` +
        `Quando desordenado, oscila entre entusiasmo e desânimo, iniciando projetos inspiradores que depois perdem fôlego. ` +
        `Parte do crescimento passa por criar rotinas mínimas e estruturas de apoio que o ajudem a perseverar mesmo quando o humor cai.`,
    });
  }

  blocks.push({
    id: 'temp-career-premium',
    access: 'premium',
    title: 'Caminhos profissionais alinhados ao seu temperamento (Premium)',
    body:
      'No relatório em PDF são apresentados cenários em que o eixo sanguíneo floresce (ambientes relacionais, criativos, comunicativos) ' +
      'e cenários em que precisa de compensações (tarefas repetitivas, isolamento prolongado, excesso de burocracia). ' +
      'Você encontrará sugestões de como usar seu carisma, entusiasmo e empatia ao serviço de algo estável, construindo uma trajetória coerente no longo prazo.',
  });

  return blocks;
}

// ---------------------------------------------------------------------------
// CRESCIMENTO / VIRTUDES – SANGUÍNEO
// ---------------------------------------------------------------------------
export function buildSanguineGrowth(
  primary: TemperamentScore,
  secondary?: TemperamentScore,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];

  blocks.push({
    id: 'temp-growth-stress',
    access: 'free',
    title: 'Reação do sanguíneo ao estresse e às crises',
    body:
      `Sob pressão, o sanguíneo tende a buscar alívio rápido: conversas, distrações, mudanças de foco. ` +
      `Quando a dor é grande, pode tentar “abafar” o que sente com atividades, humor ou fuga para estímulos externos. ` +
      `A resiliência natural existe, mas se apoia muito no ambiente; se está cercado de apoio e movimento saudável, levanta-se com mais facilidade.\n\n` +
      `O desafio é aprender a permanecer um pouco mais diante do que dói, sem fugir imediatamente. ` +
      `A confiança e a determinação crescem quando ele percebe que é capaz de atravessar momentos difíceis sem perder totalmente a alegria, ` +
      `nem sacrificar vínculos importantes em nome de prazeres imediatos.`,
  });

  if (secondary && secondary.groupId === 'choleric') {
    blocks.push({
      id: 'temp-growth-hidden',
      access: 'free',
      title: 'Sanguíneo-colérico em momentos de instabilidade',
      body:
        `No sanguíneo-colérico, crises podem provocar reações intensas: discursos fortes, decisões abruptas, ` +
        `mudanças de rota feitas na emoção do momento. Há risco de oscilar entre vontade de “dar a volta por cima” ` +
        `e tentação de abandonar tudo em busca de algo mais estimulante.\n\n` +
        `O crescimento passa por cultivar disciplina interior, pedir conselhos antes de decisões grandes e aprender a ` +
        `escutar a dor própria e alheia sem imediatamente transformá-la em ação impulsiva. Virtudes como prudência, temperança e mansidão ` +
        `ajudam a canalizar a energia para reconstruções reais, não apenas para recomeços sucessivos.`,
    });
  } else if (secondary && secondary.groupId === 'phlegmatic') {
    blocks.push({
      id: 'temp-growth-hidden',
      access: 'free',
      title: 'Sanguíneo-fleumático em momentos de crise',
      body:
        `No sanguíneo-fleumático, crises podem levar a um misto de busca por distrações e fuga silenciosa. ` +
        `Você pode tentar manter o clima leve por fora enquanto, por dentro, adia decisões ou conversas difíceis para “quando estiver melhor”.\n\n` +
        `O crescimento passa por reconhecer cedo essa tendência, escolher uma pessoa de confiança para falar com sinceridade e estabelecer pequenos passos concretos, ` +
        `em vez de esperar que o tempo resolva tudo. Virtudes como perseverança, coragem e responsabilidade ajudam a equilibrar o desejo de paz com a necessidade de verdade.`,
    });
  } else if (secondary && secondary.groupId === 'melancholic') {
    blocks.push({
      id: 'temp-growth-hidden',
      access: 'free',
      title: 'Sanguíneo-melancólico em crise',
      body:
        `No sanguíneo-melancólico, crises podem trazer alternância entre momentos de grande abatimento interior e tentativas de manter a alegria para não preocupar os outros. ` +
        `Você sente muito e tende a interpretar profundamente o que acontece, o que é uma riqueza, mas também pode gerar ruminações e autocobrança.\n\n` +
        `O caminho de crescimento envolve aprender a acolher a própria sensibilidade como dom, sem usá-la para se condenar. ` +
        `Ajuda muito ter acompanhamento espiritual ou psicológico, desenvolver rotinas simples de oração e cuidado de si, ` +
        `e praticar a virtude da esperança: lembrar-se, com fatos concretos, de vezes em que Deus o sustentou no passado.`,
    });
  }

  blocks.push({
    id: 'temp-growth-virtues',
    access: 'free',
    title: 'Virtudes que equilibram o sanguíneo',
    body:
      'O sanguíneo tem facilidade natural para virtudes ligadas à alegria, hospitalidade, otimismo e abertura ao outro. ' +
      'Por outro lado, precisa trabalhar com mais empenho constância, disciplina, sobriedade, paciência e profundidade. ' +
      'O crescimento passa por aprender a dizer “não” a certos impulsos, cuidar dos compromissos assumidos e cultivar momentos de silêncio, ' +
      'nos quais possa ordenar afetos e desejos diante de Deus.',
  });

  blocks.push({
    id: 'temp-growth-premium',
    access: 'premium',
    title: 'Plano de crescimento por etapas (Premium)',
    body:
      'No relatório em PDF você encontrará um caminho em etapas pensado para o eixo sanguíneo e suas misturas: ' +
      'exercícios simples de disciplina diária, formas concretas de aprofundar a vida espiritual sem perder a alegria, ' +
      'e sugestões para transformar carisma e sensibilidade em serviço fiel e constante.',
  });

  return blocks;
}

// ---------------------------------------------------------------------------
// RELACIONAMENTOS – SANGUÍNEO
// ---------------------------------------------------------------------------
export function buildSanguineRelationships(
  primary: TemperamentScore,
  secondary?: TemperamentScore,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];

  blocks.push({
    id: 'temp-rel-dynamics',
    access: 'free',
    title: 'Como o sanguíneo se relaciona',
    body:
      `O sanguíneo tende a viver os relacionamentos com espontaneidade, calor e desejo de proximidade. ` +
      `Gosta de estar com as pessoas, conversar, partilhar experiências e, muitas vezes, usa o humor como forma de aproximar e aliviar tensões. ` +
      `A autenticidade aparece na transparência do que sente; a lealdade se manifesta em gestos concretos de presença e apoio, ` +
      `sobretudo quando a relação é significativa.\n\n` +
      `O ponto frágil costuma ser a constância: há risco de prometer mais contato do que consegue manter, ` +
      `de se dispersar entre muitos vínculos ou de evitar conflitos para não estragar o clima. ` +
      `A inteligência emocional cresce quando aprende a ouvir com profundidade, a reparar feridas que causou sem minimizar ` +
      `e a sustentar vínculos mesmo quando o encanto inicial passa.`,
  });

  if (secondary && secondary.groupId === 'choleric') {
    blocks.push({
      id: 'temp-rel-mix',
      access: 'free',
      title: 'Sanguíneo-colérico nos vínculos',
      body:
        `O sanguíneo-colérico tende a ser intenso e marcante nos relacionamentos: ` +
        `puxa conversas, propõe planos, confronta quando acha necessário e, ao mesmo tempo, gosta de fazer o outro se sentir especial. ` +
        `Pode ser extremamente leal e protetor, mas também mais ciumento ou controlador quando inseguro.\n\n` +
        `O crescimento passa por equilibrar franqueza com delicadeza, aprender a dar espaço e ` +
        `reconhecer que nem todos vivem as relações na mesma velocidade ou intensidade que você.`,
    });
  } else if (secondary && secondary.groupId === 'phlegmatic') {
    blocks.push({
      id: 'temp-rel-mix',
      access: 'free',
      title: 'Sanguíneo-fleumático nos vínculos',
      body:
        `O sanguíneo-fleumático costuma ser uma companhia muito apreciada: faz os outros rirem, acolhe, evita julgamentos precipitados ` +
        `e, em geral, é fácil de perdoar. Gosta de estar com pessoas, mas também aprecia momentos tranquilos com poucos amigos íntimos.\n\n` +
        `O risco é deixar conversas importantes para depois, aceitar tudo em nome da paz e, com isso, acumular pequenas frustrações silenciosas. ` +
        `A maturidade afetiva pede que aprenda a nomear o que sente com calma e verdade, sem perder a doçura característica.`,
    });
  } else if (secondary && secondary.groupId === 'melancholic') {
    blocks.push({
      id: 'temp-rel-mix',
      access: 'free',
      title: 'Sanguíneo-melancólico nos vínculos',
      body:
        `O sanguíneo-melancólico vive os relacionamentos de modo profundo e afetivo: ` +
        `une calor, empatia e desejo de proximidade com grande sensibilidade a rejeições, incoerências e mudanças no clima afetivo. ` +
        `É capaz de oferecer escuta atenta, consolo e presença alegre aos outros, mas pode se magoar com facilidade e custar a esquecer feridas.\n\n` +
        `A inteligência emocional cresce quando aprende a comunicar as próprias dores sem dramatizar, a perdoar de verdade e ` +
        `a não interpretar toda oscilação do outro como sinal de desamor. Assim, consegue amar com ternura sem perder o equilíbrio interior.`,
    });
  }

  blocks.push({
    id: 'temp-rel-premium',
    access: 'premium',
    title: 'Orientações para amizades, família e vida afetiva (Premium)',
    body:
      'No relatório em PDF, o eixo sanguíneo é aplicado de forma concreta às amizades, à família e à vida afetiva: ' +
      'como você costuma se aproximar, o que o faz se afastar, quais são suas maiores riquezas relacionais e onde tende a se perder. ' +
      'São oferecidas sugestões práticas para transformar generosidade espontânea em presença fiel, ' +
      'construindo vínculos maduros que sobrevivem ao tempo e às mudanças de humor.',
  });

  return blocks;
}
