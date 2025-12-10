// server/texts/temperaments.phlegmatic.ts
import type { ResultBlock, TemperamentScore } from './temperaments.shared';
import { intensityLabel, lowerLabel } from './temperaments.shared';

// ---------------------------------------------------------------------------
// INTRO / OVERVIEW
// ---------------------------------------------------------------------------
export function buildPhlegmaticIntro(
  primary: TemperamentScore,
  secondary?: TemperamentScore | null,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];
  if (!primary) return blocks;

  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary ?? null);

  const comboText = secondary
    ? `Seu temperamento predominante é ${primary.name}, com influência significativa de ${secondary.name}.`
    : `Seu temperamento predominante é ${primary.name}, formando um perfil marcadamente ${primaryLabel}.`;

  blocks.push({
    id: 'temp-overview',
    access: 'free',
    title: 'Seu perfil de temperamento',
    body:
      `${comboText}\n\n` +
      `Na prática, isso costuma gerar uma forma de reagir calma, estável e observadora. ` +
      `O eixo fleumático está ligado à busca de harmonia, à capacidade de manter a serenidade em situações de pressão ` +
      `e a um ritmo mais constante do que explosivo. A intensidade atual desse temperamento em você foi classificada como ` +
      `${intensityLabel(primary.average)}.\n\n` +
      `Nos grandes traços de personalidade, o fleumático tende mais à introversão tranquila (energia voltada para dentro, ` +
      `para a reflexão) ou à ambiversão discreta; é mais realista do que abstrato, gosta do concreto que funciona; ` +
      `equilibra mente analítica com forte senso prático; prefere planejar com calma em vez de desbravar impulsivamente; ` +
      `e costuma ser pouco agressivo, mais sereno do que assertivo no sentido combativo. ` +
      `Essas tendências não o definem por completo, mas ajudam a explicar o seu jeito de “não se abalar fácil” e de evitar conflitos desnecessários.`,
  });

  if (secondary) {
    const mixId = secondary.groupId;
    let comboBody = '';

    if (mixId === 'choleric') {
      comboBody =
        `A combinação ${primaryLabel}-${secondaryLabel} une a calma e estabilidade do fleumático ` +
        `à energia orientada para metas do colérico. É um perfil de “gestor tranquilo”: você tende a ser realista, ` +
        `objetivo e capaz de manter a cabeça fria quando todos se agitam.\n\n` +
        `Em termos de traços, costuma oscilar entre introversão e uma extroversão funcional — aparece e assume a frente quando é preciso, ` +
        `mas prefere não disputar os holofotes o tempo todo. Mantém o olhar prático e analítico, planeja antes de agir, ` +
        `e sua assertividade aumenta quando há um objetivo claro ou alguém a proteger.`;
    } else if (mixId === 'melancholic') {
      comboBody =
        `A combinação ${primaryLabel}-${secondaryLabel} junta estabilidade afetiva com profundidade interior. ` +
        `É um perfil reservado, observador e muito sensível, mas que raramente demonstra tudo o que sente logo de início.\n\n` +
        `Nos traços amplos, você tende à introversão marcada, à leitura realista dos fatos com forte componente analítico, ` +
        `ao planejamento detalhado e à baixa agressividade. A presença fleumática coloca freio em certos exageros ` +
        `melancólicos, enquanto a presença melancólica impede que a fleuma vire mera acomodação.`;
    } else if (mixId === 'sanguine') {
      comboBody =
        `A combinação ${primaryLabel}-${secondaryLabel} mistura a serenidade fleumática com a sociabilidade espontânea do sanguíneo. ` +
        `Em geral, resulta num perfil afável, acessível e que gosta de gente, porém sem exageros.\n\n` +
        `Na prática, isso se traduz num estilo mais ambivertido: você é capaz de se expressar bem e se conectar com os outros, ` +
        `mas precisa de tempo de silêncio para recarregar. O olhar é realista, com boa leitura das pessoas; ` +
        `prefere planejar minimamente e depois ir ajustando no caminho; é pouco combativo, mas consegue se posicionar quando necessário.`;
    } else {
      comboBody =
        `A combinação entre ${primary.name} e ${secondary.name} torna o seu perfil ainda mais estável e complexo. ` +
        `Em alguns momentos você age como um fleumático clássico, buscando paz e constância; em outros, a influência de ${secondary.name} ` +
        `traz mais energia, sensibilidade ou criatividade.\n\n` +
        `Isso ajuda a explicar por que você às vezes se percebe muito tranquilo e, em outras situações, mais intenso ou emotivo do que esperava.`;
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
    title: 'Mapa completo do seu temperamento fleumático (Premium)',
    body:
      'No relatório em PDF você verá em detalhes como o eixo fleumático, com sua estabilidade, diplomacia e busca de harmonia, ' +
      'se articula com o seu temperamento secundário. O material aprofunda também a visão de autores clássicos e espirituais ' +
      'sobre o fleumático, indicando caminhos concretos para transformar calma em fortaleza e paz interior, sem cair em passividade.',
  });

  return blocks;
}

// ---------------------------------------------------------------------------
// TRAÇOS / PERSONALIDADE
// ---------------------------------------------------------------------------
export function buildPhlegmaticTraits(
  primary: TemperamentScore,
  secondary?: TemperamentScore | null,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];
  if (!primary) return blocks;

  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary ?? null);

  // Fleumático "puro" (ou muito destacado)
  if (!secondary || secondary.groupId === 'phlegmatic') {
    blocks.push({
      id: 'temp-traits-core',
      access: 'free',
      title: 'Traços centrais de personalidade fleumática',
      body:
        `O núcleo do temperamento fleumático é marcado por serenidade, constância e tendência a evitar conflitos. ` +
        `Em você, essas características aparecem com intensidade ${intensityLabel(primary.average)}, o que costuma se traduzir ` +
        `num jeito de estar nos ambientes mais calmo, observador e estável do que agitado.\n\n` +
        `No eixo introvertido/extrovertido, o fleumático tende à introversão tranquila ou à ambiversão discreta: ` +
        `gosta de gente, mas não precisa chamar atenção; observa muito antes de se expor. ` +
        `É mais realista que intuitivo: prefere o que é concreto, comprovado, que funciona na prática. ` +
        `Costuma ter mente analítica/pragmática, mas com boa sensibilidade para o clima emocional ao redor. ` +
        `É planejador por natureza — organiza, cria rotinas, prefere o caminho seguro — e pouco desbravador impulsivo. ` +
        `Na assertividade, inclina-se mais à serenidade do que à confrontação: evita brigas, mas pode ficar em silêncio mesmo quando gostaria de se posicionar.`,
    });
  }

  if (secondary && secondary.groupId === 'choleric') {
    blocks.push({
      id: 'temp-traits-secondary',
      access: 'free',
      title: 'Fleumático-colérico: estabilidade com foco em resultados',
      body:
        `Na combinação fleumático-colérico, a calma do fleumático se une à energia orientada para metas do colérico. ` +
        `Isso gera um perfil que continua sendo moderado e observador, mas que reage com firmeza quando há um objetivo nítido em jogo.\n\n` +
        `Em termos de traços, você tende à ambiversão: é capaz de se expor e liderar quando necessário, mas não precisa de palco o tempo todo. ` +
        `Mantém o olhar realista, analítico, com forte foco em solução de problemas. É planejador, porém não se perde em planos — sabe sair do papel e executar. ` +
        `A assertividade aparece de modo controlado: quando entende que algo precisa ser dito ou decidido, você o faz, mesmo sem gostar de conflito.`,
    });
  } else if (secondary && secondary.groupId === 'melancholic') {
    blocks.push({
      id: 'temp-traits-secondary',
      access: 'free',
      title: 'Fleumático-melancólico: profundidade serena',
      body:
        `Na combinação fleumático-melancólico, a estabilidade fleumática encontra o mundo interior intenso do melancólico. ` +
        `Você tende a ser mais recolhido, contemplativo e sensível, mas raramente explosivo.\n\n` +
        `No dia a dia, isso se expressa em forte introversão, grande capacidade de análise e observação, ` +
        `preferência por planejamentos detalhados e um estilo pouco combativo. ` +
        `Você sente muito, mas costuma elaborar em silêncio; prefere pensar longamente antes de falar, ` +
        `e muitas vezes prefere escrever ou agir aos poucos em vez de confrontar diretamente.`,
    });
  } else if (secondary && secondary.groupId === 'sanguine') {
    blocks.push({
      id: 'temp-traits-secondary',
      access: 'free',
      title: 'Fleumático-sanguíneo: sociabilidade tranquila',
      body:
        `Na combinação fleumático-sanguíneo, a paz interior do fleumático se mistura à leveza e sociabilidade do sanguíneo. ` +
        `O resultado é um perfil acessível, simpático e que convive bem com todo tipo de pessoa, sem perder a própria calma.\n\n` +
        `Em termos de traços, isso geralmente gera um ambivertido leve: você conversa bem, sabe acolher e fazer os outros se sentirem à vontade, ` +
        `mas não gosta de exageros ou dramas. O olhar permanece realista, com boa leitura emocional dos ambientes. ` +
        `Planeja o mínimo necessário e depois ajusta em movimento, com baixa agressividade e um estilo de influência mais pela presença e humor do que pela força.`,
    });
  }

  blocks.push({
    id: 'temp-traits-premium',
    access: 'premium',
    title: 'Análise completa dos traços fleumáticos (Premium)',
    body:
      'No relatório em PDF, o eixo fleumático é destrinchado em subtópicos: estilo de reação emocional, ritmo interno, ' +
      'grau de iniciativa, modo de lidar com conflitos, padrão de acomodação ou coragem, tipo de foco e forma de buscar segurança. ' +
      'Também são explorados, em cada combinação, como autenticidade, lealdade, altruísmo e inteligência emocional aparecem no seu modo de ser e de se relacionar.',
  });

  return blocks;
}

// ---------------------------------------------------------------------------
// CARREIRA / TRABALHO
// ---------------------------------------------------------------------------
export function buildPhlegmaticCareer(
  primary: TemperamentScore,
  secondary?: TemperamentScore | null,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];
  if (!primary) return blocks;

  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary ?? null);

  blocks.push({
    id: 'temp-career-style',
    access: 'free',
    title: 'Estilo de trabalho e produtividade fleumáticos',
    body:
      `O fleumático costuma enxergar o trabalho como lugar de estabilidade, colaboração e rotina bem definida. ` +
      `Em você, isso aparece como impulso para manter as coisas funcionando, evitar caos desnecessário e ser um ponto de equilíbrio nas equipes.\n\n` +
      `Sua produtividade tende a crescer quando o ambiente é previsível, respeitoso e bem organizado; ` +
      `e a cair quando tudo muda o tempo todo, há conflitos constantes ou cobranças agressivas. ` +
      `Você tende a manter um ritmo constante, prefere terminar o que começou e raramente age em “picos” de energia seguidos de grandes quedas.`,
  });

  if (secondary && secondary.groupId === 'choleric') {
    blocks.push({
      id: 'temp-career-mix',
      access: 'free',
      title: 'Fleumático-colérico no trabalho',
      body:
        `No campo profissional, a combinação ${primaryLabel}-${secondaryLabel} costuma formar perfis de liderança serena: ` +
        `pessoas que unem organização e calma com foco em resultados e capacidade de decisão.\n\n` +
        `Você pode ir bem em funções de coordenação, gestão de processos, liderança de equipes técnicas ou operacionais, ` +
        `onde seja necessário manter a ordem, cuidar de pessoas e, ao mesmo tempo, entregar metas. ` +
        `Sua ambição tende a ser moderada: busca eficiência real mais do que brilho, e prefere que o trabalho fale por si. ` +
        `O ponto de atenção é não usar a fleuma como desculpa para adiar decisões difíceis que o lado colérico sabe que precisam ser tomadas.`,
    });
  } else if (secondary && secondary.groupId === 'melancholic') {
    blocks.push({
      id: 'temp-career-mix',
      access: 'free',
      title: 'Fleumático-melancólico no trabalho',
      body:
        `O fleumático-melancólico é frequentemente um profissional de confiança máxima: estável, detalhista e profundamente responsável. ` +
        `Você tende a se destacar em funções que exigem precisão, análise, constância e discrição: pesquisa, áreas técnicas, planejamento, ` +
        `administração, ensino, cuidado de saúde ou serviços sociais.\n\n` +
        `A ambição aqui costuma ser mais silenciosa, voltada à qualidade e ao sentido do que se faz. ` +
        `Você pode buscar aperfeiçoar métodos, criar soluções discretas e duradouras, mesmo sem almejar cargos de grande visibilidade. ` +
        `O cuidado é não deixar que o pessimismo ou a autocrítica melancólica, somados à passividade fleumática, ` +
        `levem você a subestimar seu próprio valor ou a se esconder em tarefas menores do que é capaz de realizar.`,
    });
  } else if (secondary && secondary.groupId === 'sanguine') {
    blocks.push({
      id: 'temp-career-mix',
      access: 'free',
      title: 'Fleumático-sanguíneo no trabalho',
      body:
        `O fleumático-sanguíneo costuma brilhar em contextos que unem gente e rotina: atendimento, RH, coordenação de equipes de serviço, ` +
        `áreas de suporte, ambientes educacionais e pastorais.\n\n` +
        `Você tende a ser organizado o suficiente para manter processos, e leve o bastante para tornar o ambiente mais humano. ` +
        `Sua motivação cresce quando há boa convivência e sensação de utilidade; cai quando o clima está hostil ou quando o trabalho se torna repetitivo demais sem nenhum contato humano. ` +
        `A ambição é geralmente baixa em termos de poder, mas alta em querer que o grupo esteja bem — o que o torna candidato natural a papéis de “ponte” entre direção e equipe.`,
    });
  }

  blocks.push({
    id: 'temp-career-premium',
    access: 'premium',
    title: 'Caminhos profissionais alinhados ao seu temperamento fleumático (Premium)',
    body:
      'No relatório em PDF, são apresentados cenários profissionais que dialogam bem com a calma fleumática (funções de suporte, gestão de processos, cuidado, docência, áreas técnicas estáveis) ' +
      'e contextos em que você precisará de estratégias específicas (ambientes altamente competitivos, agressivos ou caóticos). ' +
      'São oferecidas sugestões de como usar sua estabilidade, empatia e diplomacia como pontos fortes, sem cair na acomodação ou na invisibilidade.',
  });

  return blocks;
}

// ---------------------------------------------------------------------------
// CRESCIMENTO / VIRTUDES
// ---------------------------------------------------------------------------
export function buildPhlegmaticGrowth(
  primary: TemperamentScore,
  secondary?: TemperamentScore | null,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];
  if (!primary) return blocks;

  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary ?? null);

  blocks.push({
    id: 'temp-growth-stress',
    access: 'free',
    title: 'Reação do fleumático ao estresse e às crises',
    body:
      `Sob pressão, o temperamento fleumático tende menos a explodir e mais a se retrair. ` +
      `Você provavelmente percebe em si a tendência a evitar confronto, adiar decisões difíceis ou “engolir” incômodos para não gerar briga.\n\n` +
      `Ao mesmo tempo, o eixo fleumático está naturalmente ligado à resiliência silenciosa: suporta muito, aguenta bastante peso sem se desestruturar externamente. ` +
      `O risco é que essa força se transforme em fuga (acomodação) ou em cansaço interno acumulado. Parte do crescimento passa por aprender a reconhecer cedo ` +
      `os sinais de sobrecarga — desânimo, procrastinação, ironia, vontade de se desligar — e buscar ajuda ou ajustar rotas antes que a alma “desligue” por completo.`,
  });

  if (secondary && secondary.groupId === 'choleric') {
    blocks.push({
      id: 'temp-growth-hidden',
      access: 'free',
      title: 'Fleumático-colérico em momentos de crise',
      body:
        `Na combinação ${primaryLabel}-${secondaryLabel}, crises podem provocar um movimento interno duplo: ` +
        `por fora, você tenta manter a calma; por dentro, sente a força colérica querendo resolver tudo de uma vez.\n\n` +
        `Se mal integrado, isso pode gerar um ciclo de adiamentos seguidos de reações bruscas: você deixa passar, deixa passar, e de repente explode. ` +
        `O caminho de crescimento envolve aprender a nomear o problema mais cedo, convocar conversas necessárias e usar a energia colérica ` +
        `a serviço da verdade e da justiça, sem abandonar a delicadeza fleumática.`,
    });
  } else if (secondary && secondary.groupId === 'melancholic') {
    blocks.push({
      id: 'temp-growth-hidden',
      access: 'free',
      title: 'Fleumático-melancólico em momentos de crise',
      body:
        `Na combinação ${primaryLabel}-${secondaryLabel}, crises costumam ser vividas para dentro: ` +
        `há tendência a recolhimento, tristeza silenciosa e pensamentos negativos repetitivos.\n\n` +
        `Aqui, o desafio é não confundir paz com resignação triste. O crescimento passa por cultivar esperança, pedir ajuda quando a mente pesa demais ` +
        `e praticar atos concretos de confiança (em Deus e nas pessoas), em vez de se isolar e ceder ao pessimismo. ` +
        `Virtudes como coragem mansa, alegria simples e caridade ativa ajudam a romper a espiral de “pensar demais e agir de menos”.`,
    });
  } else if (secondary && secondary.groupId === 'sanguine') {
    blocks.push({
      id: 'temp-growth-hidden',
      access: 'free',
      title: 'Fleumático-sanguíneo em momentos de instabilidade',
      body:
        `Na combinação ${primaryLabel}-${secondaryLabel}, crises podem alternar entre fuga silenciosa e busca de distrações. ` +
        `Você pode se perceber, em certos momentos, enchendo a agenda de atividades ou conversas para não olhar para questões difíceis; ` +
        `em outros, querendo apenas se desligar de tudo.\n\n` +
        `O crescimento passa por encontrar um meio-termo: não se afogar em estímulos nem se esconder, mas reservar tempos claros para pensar e rezar, ` +
        `e outros para se alegrar com quem você ama. Virtudes como temperança, disciplina leve e sinceridade consigo mesmo ajudam a usar ` +
        `o melhor do sanguíneo (alegria) e do fleumático (paz), sem deixar que nenhum dos dois sirva de fuga.`,
    });
  }

  blocks.push({
    id: 'temp-growth-virtues',
    access: 'free',
    title: 'Virtudes que equilibram o fleumático',
    body:
      'O fleumático tem facilidade natural para virtudes como paciência, tolerância, prudência e mansidão. ' +
      'Por outro lado, precisa trabalhar com mais empenho virtudes ligadas à fortaleza: iniciativa, coragem, decisão, perseverança em começar e em terminar o que começou. ' +
      'Parte do crescimento passa por aprender a dizer “sim” quando é hora de agir e “não” quando é hora de colocar limites, ' +
      'sem abandonar a sua marca de paz, mas também sem permitir que a acomodação dite o rumo da sua vida.',
  });

  blocks.push({
    id: 'temp-growth-premium',
    access: 'premium',
    title: 'Plano de crescimento por etapas (Premium)',
    body:
      'No relatório em PDF você encontrará um plano em etapas pensado para o fleumático e suas combinações: ' +
      'exercícios concretos para sair da inércia sem perder a paz, práticas para enfrentar conversas difíceis com caridade, ' +
      'pontos de exame de consciência sobre acomodação e omissão, e meios de canalizar sua estabilidade ao serviço de um bem maior, ' +
      'sem se esconder atrás do “tanto faz”.',
  });

  return blocks;
}

// ---------------------------------------------------------------------------
// RELACIONAMENTOS
// ---------------------------------------------------------------------------
export function buildPhlegmaticRelationships(
  primary: TemperamentScore,
  secondary?: TemperamentScore | null,
): ResultBlock[] {
  const blocks: ResultBlock[] = [];
  if (!primary) return blocks;

  const primaryLabel = lowerLabel(primary);
  const secondaryLabel = lowerLabel(secondary ?? null);

  blocks.push({
    id: 'temp-rel-dynamics',
    access: 'free',
    title: 'Como o fleumático se relaciona',
    body:
      `O fleumático leva para os relacionamentos a mesma calma que leva para o trabalho: ` +
      `gosta de ambientes pacíficos, evita brigas e tende a ser um ponto de estabilidade para quem convive com ele.\n\n` +
      `Seu jeito de demonstrar carinho costuma ser discreto, mais por presença fiel e pequenos serviços do que por grandes declarações. ` +
      `Valoriza a lealdade e o altruísmo concreto — estar ali, ajudar, ouvir, fazer o que é preciso. ` +
      `A inteligência emocional aparece na leitura serena das pessoas e na capacidade de não reagir de modo explosivo, ` +
      `embora às vezes falte iniciativa para abrir o próprio coração ou para confrontar o que precisa ser dito.`,
  });

  if (secondary && secondary.groupId === 'choleric') {
    blocks.push({
      id: 'temp-rel-mix',
      access: 'free',
      title: 'Fleumático-colérico nos vínculos',
      body:
        `Na combinação ${primaryLabel}-${secondaryLabel}, você tende a ser leal, protetor e, ao mesmo tempo, relativamente calmo. ` +
        `É capaz de entrar em cena com força quando alguém querido precisa de defesa, mas não vive em modo de combate.\n\n` +
        `A autenticidade se expressa em franqueza ponderada: você não gosta de rodeios, porém mede as palavras para não ferir à toa. ` +
        `A lealdade é alta, o altruísmo se manifesta em atitudes consistentes, e a inteligência emocional cresce quando você aprende a não engolir ` +
        `ressentimentos em silêncio — preferindo conversas firmes e respeitosas em vez de explosões tardias.`,
    });
  } else if (secondary && secondary.groupId === 'melancholic') {
    blocks.push({
      id: 'temp-rel-mix',
      access: 'free',
      title: 'Fleumático-melancólico nos vínculos',
      body:
        `Na combinação ${primaryLabel}-${secondaryLabel}, os relacionamentos são vividos com grande profundidade e discrição. ` +
        `Você costuma ter poucos vínculos, mas muito significativos, e tende a ser altamente leal a quem deixa se aproximar.\n\n` +
        `A autenticidade se manifesta mais pela coerência do que por palavras: você é o tipo de pessoa que “está sempre ali”, mesmo sem discursos. ` +
        `O altruísmo é grande, mas pode ser silencioso — ajuda, mas nem sempre compartilha o que sente. ` +
        `O desafio está em não guardar mágoas ou expectativas não ditas: sua inteligência emocional amadurece quando você se permite expressar dores, ` +
        `pedir consolo e dizer com clareza o que precisa, em vez de apenas suportar.`,
    });
  } else if (secondary && secondary.groupId === 'sanguine') {
    blocks.push({
      id: 'temp-rel-mix',
      access: 'free',
      title: 'Fleumático-sanguíneo nos vínculos',
      body:
        `Na combinação ${primaryLabel}-${secondaryLabel}, você tende a ser uma presença fácil de amar: acolhedor, bem-humorado na medida certa, ` +
        `raramente invasivo. ` +
        `Consegue unir autenticidade simples, lealdade constante e um altruísmo que se manifesta tanto em gestos práticos quanto em boa companhia.\n\n` +
        `Sua inteligência emocional se expressa na capacidade de acalmar ambientes tensos, escutar sem julgar e, ao mesmo tempo, quebrar o gelo com leveza. ` +
        `O ponto de cuidado é não se esconder atrás do papel de “legal com todo mundo” para evitar conversas difíceis: ` +
        `quando você se permite colocar limites e expressar o que o incomoda, seus vínculos se tornam ainda mais maduros e sólidos.`,
    });
  }

  blocks.push({
    id: 'temp-rel-premium',
    access: 'premium',
    title: 'Orientações para amizades, família e vida afetiva (Premium)',
    body:
      'No relatório em PDF, o eixo fleumático é aplicado de forma concreta à vida afetiva: ' +
      'como o seu perfil tende a se comportar em amizade, namoro/casamento, relação com filhos, pais e comunidade. ' +
      'São oferecidas sugestões práticas para canalizar sua paz, lealdade e altruísmo sem cair em passividade, ' +
      'e para crescer em verdadeira inteligência emocional — capaz de unir sinceridade e mansidão nas conversas difíceis e no cuidado diário com quem você ama.',
  });

  return blocks;
}
