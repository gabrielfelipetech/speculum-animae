// server/api/report-builders/temperamentsPdf.choleric.ts
import type {
  TemperamentProfile,
  TemperamentsBuilderContext,
} from './temperamentsPdf';

/**
 * Constrói o perfil PDF para o temperamento colérico,
 * levando em conta a combinação principal + secundário.
 *
 * Combinações tratadas:
 *  - Colérico puro / colérico-colérico
 *  - Colérico-sanguíneo
 *  - Colérico-melancólico
 *  - Colérico-fleumático
 */
export function buildCholericPdfProfile(
  ctx: TemperamentsBuilderContext,
): TemperamentProfile {
  const { main, secondary } = ctx;
  const secondaryId = secondary?.id ?? null;

  const isPure =
    !secondaryId || secondaryId === 'choleric'; // colérico muito dominante
  const isWithSanguine = secondaryId === 'sanguine';
  const isWithMelancholic = secondaryId === 'melancholic';
  const isWithPhlegmatic = secondaryId === 'phlegmatic';

  const label = 'Colérico';

  // ---------------------------------------------------------------------------
  // OVERVIEW
  // ---------------------------------------------------------------------------
  let overview = '';

  if (isPure) {
    overview =
      'Quando o temperamento colérico aparece de forma quase pura - o chamado colérico-colérico - ' +
      'temos o “fogo” em estado concentrado entre os temperamentos clássicos. Antigos autores ' +
      'dirão que ele é quente e seco, ligado à antiga imagem da bílis amarela e ao elemento fogo. ' +
      'Psicologicamente, isso se traduz em reação rápida, intensa e duradoura: o colérico percebe um estímulo, ' +
      'reage com força e guarda a impressão por muito tempo. Uma ofensa, um ideal ou uma decisão não passam ' +
      'rapidamente; eles ficam gravados fundo na memória e na vontade.\n\n' +
      'A alma colérica é teleológica: pensa em termos de metas, resultados e conquistas. Onde outros veem ' +
      'situações, o colérico enxerga objetivos e obstáculos. A inteligência é prática e orientada à solução: ' +
      'ele não raciocina por gosto abstrato, mas para descobrir o caminho mais eficiente. Por isso, tem baixa ' +
      'tolerância a desperdício de tempo, incompetência e indecisão. A sensação de impotência o incomoda ' +
      'profundamente; o impulso quase instintivo é tomar a frente, organizar, corrigir, reformar.\n\n' +
      'No colérico puro, a vontade ocupa o centro do palco. Essa vontade forte o torna empreendedor, ' +
      'capaz de assumir riscos e carregar projetos nas costas, muitas vezes em contextos hostis. Ele prefere ' +
      'o peso da responsabilidade ao desconforto de depender de outros. Trabalhar muito por algo que considera ' +
      '“seu” cansa menos do que obedecer passivamente a um líder inseguro ou incompetente. Daí nasceram tantos ' +
      'fundadores, conquistadores e reformadores com traços nitidamente coléricos.\n\n' +
      'Ao mesmo tempo, o colérico puro nasce com pontos cegos claros: tende a colocar a tarefa acima da ' +
      'pessoa, a verdade acima da delicadeza, a eficiência acima do ritmo humano. A empatia não é o seu ' +
      'instinto primário; ele corrige pensando que está prestando um serviço e se surpreende ao ver o outro ' +
      'ferido. A ira e a soberba são tentações fortes: é fácil confundir a própria vontade com o que é justo ' +
      'e verdadeiro. Sem purificação interior, o mesmo fogo que move grandes obras pode devastar relações e ' +
      'ferir profundamente os mais frágeis.\n\n' +
      'Quando esse temperamento é educado, disciplinado e trabalhado pela graça, porém, o quadro se inverte: ' +
      'a mesma energia que um dia perseguiu pode tornar-se energia que sustenta, constrói e defende. ' +
      'Santos como São Paulo Apóstolo, reformadores como Santo Inácio de Loyola ou figuras fortes como ' +
      'Santa Teresa de Ávila mostram esse fogo colérico convertido em zelo firme, coragem perseverante e ' +
      'capacidade de carregar grandes responsabilidades sem fugir da cruz.';
  } else if (isWithSanguine) {
    overview =
      'No colérico-sanguíneo, o fogo do colérico se associa ao ar leve, comunicativo e expansivo do sanguíneo. ' +
      'Surge uma combinação altamente extrovertida, expressiva e visível: vontade forte, foco em resultados, ' +
      'mas revestidos de carisma, entusiasmo e grande facilidade de contato humano. É o perfil do “executivo ' +
      'carismático”, do líder que fala, contagia, convence e arrasta pessoas para uma causa.\n\n' +
      'Enquanto o colérico puro é mais seco nas relações, o colérico-sanguíneo tende a ser mais caloroso e ' +
      'sociável. Ele gosta de gente, de movimento, de conversas e cenários dinâmicos. Toma iniciativa com a mesma ' +
      'rapidez, mas agora com um elemento extra de espontaneidade e humor. Explode com facilidade - seja em ' +
      'entusiasmo, seja em irritação - porém costuma esquecer mais rapidamente as ofensas do que outras variações ' +
      'coléricas. A ferida emocional tende a ser intensa, mas menos duradoura.\n\n' +
      'Esse temperamento aparece com frequência em líderes de campanha, comunicadores públicos, empreendedores ' +
      'de palco, políticos carismáticos e evangelizadores que vivem falando para grandes grupos. O mesmo ' +
      'impulso para organizar e mandar é suavizado pela capacidade de contar histórias, usar imagens, manter ' +
      'a atenção das pessoas e criar um clima de “vamos juntos”. A palavra, o microfone e a interação social ' +
      'se tornam ferramentas naturais de trabalho.\n\n' +
      'Por outro lado, essa mistura também torna o colérico-sanguíneo mais vulnerável à dispersão e à ' +
      'impulsividade. A necessidade de novidade e de estímulo pode competir com a perseverança em projetos ' +
      'longos e silenciosos. Ele se lança com facilidade, assume muitos compromissos, promete muito, mas precisa ' +
      'aprender a sustentar o mesmo nível de disciplina quando o brilho inicial passa. Seu caminho de maturidade ' +
      'inclui desenvolver foco, prudência e uma atenção mais fiel aos detalhes que sustentarão o que ele próprio ' +
      'constrói com tanto entusiasmo.';
  } else if (isWithMelancholic) {
    overview =
      'O colérico-melancólico é o “estrategista perfeccionista”: a força de vontade e a objetividade do colérico ' +
      'se encontram com a profundidade analítica, o senso de ideal e o perfeccionismo do melancólico. Não basta ' +
      'vencer; é preciso vencer com coerência, com precisão e da maneira certa. A frase típica dessa combinação ' +
      'é algo como: “Se é para fazer, que seja bem feito e do jeito certo”.\n\n' +
      'Aqui a extroversão colérica é temperada por uma introversão reflexiva. Em público, essa pessoa pode ser ' +
      'firme, articulada e combativa; em privado, tende a ser mais recolhida, crítica consigo mesma e exigente ' +
      'com seus próprios critérios internos. Há um diálogo permanente entre o impulso de agir rápido e o impulso ' +
      'de analisar mais um pouco, repensar, revisar, planejar em profundidade.\n\n' +
      'Isso gera um perfil de altíssima competência: mente lógica, capacidade de planejamento de longo prazo, ' +
      'atenção a riscos, cenários e detalhes. São pessoas que estudam, anotam, comparam, constroem estruturas, ' +
      'criando sistemas e obras duradouras. Ao mesmo tempo, essa mesma combinação pode gerar grande tensão ' +
      'interna: o colérico quer andar, o melancólico teme o erro. Resultado: períodos de atividade intensa, ' +
      'quase obsessiva, seguidos de fases de cansaço, autocrítica severa e sensação de que “nunca está bom o ' +
      'suficiente”.\n\n' +
      'Historicamente, essa configuração aparece em grandes generais, reformadores, cirurgiões, juristas e ' +
      'fundadores de obras complexas. Santo Inácio de Loyola, por exemplo, canalizou esse perfil para os ' +
      'Exercícios Espirituais e a fundação da Companhia de Jesus: método rigoroso, disciplina, visão estratégica ' +
      'e vontade de ferro colocadas a serviço de um ideal elevado. O desafio constante do colérico-melancólico ' +
      'é aprender a integrar verdade e caridade, rigor e misericórdia, perfeição e limites humanos - em si mesmo ' +
      'e nos outros.';
  } else if (isWithPhlegmatic) {
    overview =
      'Na combinação colérico-fleumático, o fogo do colérico é resfriado pela água calma do fleumático. ' +
      'Surge uma figura de “diretor estóico”: alguém firme, organizado, muito estável, que raramente se perde ' +
      'em explosões visíveis, mas que também dificilmente volta atrás quando decidiu algo. É uma força tranquila, ' +
      'mais silenciosa do que os outros coléricos, porém igualmente determinada.\n\n' +
      'O colérico fornece a vontade, o senso de objetivo e a coragem para decidir; o fleumático acrescenta ' +
      'paciência, método, diplomacia e grande estabilidade emocional. Em vez de um líder que grita e gesticula, ' +
      'temos alguém que fala pouco, pensa antes, organiza processos e sustenta as decisões com constância. ' +
      'Explosões são raras; a teimosia, porém, pode ser grande. Quando não concorda, pode simplesmente fechar ' +
      'a cara, não ceder e continuar fazendo o que julga correto.\n\n' +
      'Esse perfil aparece com frequência em administradores sólidos, coordenadores de longo prazo, figuras ' +
      'políticas serenas e gestores capazes de manter estruturas funcionando por anos. Ele gosta de rotina ' +
      'bem desenhada, procedimentos claros, regras estáveis e previsibilidade. Não tem fascínio por holofotes, ' +
      'mas assume naturalmente a dianteira quando é preciso alguém confiável e equilibrado para segurar o leme ' +
      'em períodos de crise ou de grande responsabilidade.\n\n' +
      'O risco, aqui, é que a mesma estabilidade se transforme em rigidez: apego excessivo a métodos, baixa ' +
      'tolerância ao novo, certa dificuldade em expressar afeto e em partilhar vulnerabilidades. Quando cresce, ' +
      'o colérico-fleumático consegue unir justiça e mansidão, firmeza e serenidade, tornando-se um tipo de ' +
      'liderança muito procurado: previsível, coerente e difícil de abalar.';
  } else {
    overview =
      'O temperamento colérico, em qualquer combinação, traz como núcleo uma vontade forte, reatividade rápida ' +
      'e capacidade de guardar impressões por longo tempo. É o temperamento naturalmente orientado a metas: ' +
      'enxerga o mundo como algo que deve ser organizado, transformado, conquistado. Tem facilidade para assumir ' +
      'responsabilidades grandes, tomar decisões sob pressão e avançar mesmo quando o ambiente é hostil.\n\n' +
      'Quando bem integrado, o colérico se torna motor de reformas, avanços, fundações e grandes obras; quando ' +
      'mal trabalhado, cai na dureza, na impaciência e na tendência a atropelar pessoas em nome da “eficiência”. ' +
      'A história mostra que esse fogo pode tanto incendiar quanto aquecer. A questão central não é apagar o ' +
      'fogo, mas aprender a colocá-lo na lareira certa: a serviço de algo que realmente valha a pena, com ' +
      'caridade, justiça e humildade.';
  }

  // ---------------------------------------------------------------------------
  // STRENGTHS
  // ---------------------------------------------------------------------------
  const strengths: string[] = [
    'Energia elevada diante de desafios, reagindo rapidamente e com vigor quando algo exige decisão ou ação imediata.',
    'Capacidade de manter decisões, projetos e compromissos por longo prazo, transformando impressões fortes em perseverança concreta.',
    'Coragem natural para enfrentar conflitos, problemas complexos e situações em que muitos evitam se posicionar.',
    'Foco em resultados: facilidade em distinguir o que é essencial do que é acessório e concentrar esforços no que realmente gera impacto.',
    'Estilo de pensamento prático e objetivo, que busca soluções em vez de se perder em lamentações ou análises intermináveis.',
    'Gosto por responsabilidade: sente-se melhor quando tem algo grande nas mãos a ser conduzido, mesmo que seja pesado.',
    'Alta tolerância à pressão externa: prazos curtos, metas ousadas e ambientes competitivos tendem a despertá-lo, não a paralisá-lo.',
    'Facilidade em tomar decisões com informações parciais, ajustando a rota em movimento em vez de esperar a segurança absoluta.',
    'Disposição para sacrificar conforto, descanso e caminhos fáceis em nome de algo que considera importante ou justo.',
    'Capacidade de separar decisões práticas de simpatias pessoais, avaliando competência e resultado com grande objetividade.',
    'Inclinação a proteger os mais fracos quando percebe injustiças claras, especialmente quando sente que pode intervir de forma eficaz.',
    'Talento natural para estabelecer prioridades, organizar recursos, pessoas e processos em torno de um objetivo definido.',
    'Capacidade de aprender com erros de forma rápida e pragmática: uma vez percebida a falha, tende a corrigi-la com decisão.',
    'Espírito combativo saudável: diante de dificuldades, é mais inclinado a dizer “vamos ver como resolvemos isso” do que a desistir.',
  ];

  if (isWithSanguine) {
    strengths.push(
      'Carisma e poder de persuasão: une firmeza colérica com humor, entusiasmo e facilidade de comunicação.',
      'Capacidade de mobilizar grupos, inspirar equipes e sustentar um clima de energia e motivação em torno de uma causa.',
      'Habilidade rara de traduzir objetivos complexos em mensagens simples, concretas e envolventes.',
      'Facilidade em fazer networking, criar conexões estratégicas e aproximar pessoas de perfis diferentes em torno de um mesmo projeto.',
      'Capacidade de se recuperar rápido de frustrações: tende a levantar, sacudir a poeira e recomeçar com novo ânimo depois de um fracasso.'
    );
  }

  if (isWithMelancholic) {
    strengths.push(
      'Visão estratégica de longo prazo, com grande atenção a detalhes, riscos, cenários e consequências.',
      'Alto senso de responsabilidade, disciplina e capacidade de trabalho intenso em projetos complexos e demorados.',
      'Tendência a estruturar o que faz com método: planos, processos, cronogramas e critérios bem definidos.',
      'Capacidade de unir idealismo e pragmatismo: formula grandes objetivos, mas também desenha o passo a passo concreto para alcançá-los.',
      'Perfil de “construtor de obras duradouras”: gosta de deixar legado, instituições sólidas e estruturas bem pensadas.'
    );
  }

  if (isWithPhlegmatic) {
    strengths.push(
      'Estabilidade emocional acima da média, mantendo a cabeça fria mesmo em crises prolongadas ou altamente tensas.',
      'Grande capacidade organizacional: aprecia sistemas, rotinas e processos eficientes, e consegue mantê-los funcionando com constância.',
      'Diplomacia prática: sabe quando falar e quando corrigir de forma discreta, evitando conflitos desnecessários sem abandonar a verdade.',
      'Perfil de liderança serena: inspira confiança pela coerência, previsibilidade e senso de justiça mais do que por discursos dramáticos.',
      'Capacidade de sustentar a mesma decisão por muito tempo sem perder o foco, graças à combinação de tenacidade colérica com constância fleumática.'
    );
  }

  // ---------------------------------------------------------------------------
  // RISKS
  // ---------------------------------------------------------------------------
  const risks: string[] = [
    'Impaciência com lentidão, dúvidas ou fragilidades alheias, o que pode gerar críticas duras e clima de medo ao redor.',
    'Tendência a identificar a própria vontade com a “verdade” ou a “justiça”, justificando explosões de irritação como se fossem sempre zelo correto.',
    'Inclinação a controlar pessoas e ambientes, tratando-os como meios para atingir metas em vez de enxergar primeiro as pessoas.',
    'Risco de soberba: supervalorização da própria capacidade e dificuldade em admitir erros, pedir ajuda ou reconhecer dependência.',
    'Tendência a falar de forma brusca e excessivamente direta, ferindo com palavras que, para si, parecem apenas “objetas”.',
    'Perigo de transformar todos os ambientes em campo de batalha: família, trabalho e vida espiritual podem virar lugares constantes de cobrança e correção.',
    'Dificuldade em aceitar limites humanos - tanto os próprios (cansaço, doença, tempo finito) quanto os dos outros.',
    'Inclinação a tomar decisões sem consultar quem será diretamente afetado, por acreditar já saber o que é melhor.',
    'Risco de ativismo: encher a agenda de tarefas, causas e projetos a ponto de descuidar da vida interior e dos vínculos mais profundos.',
    'Tendência a interpretar discordâncias como ameaça à própria autoridade ou competência, reagindo com rigidez ou agressividade.',
    'Perigo de “queimar” pessoas competentes, porém mais lentas ou sensíveis, por não entender ou respeitar ritmos diferentes.',
    'Risco de isolamento afetivo: com o tempo, pode se tornar alguém respeitado e temido, mas pouco amado e pouco acessível.',
    'Dificuldade real em descansar de verdade: mesmo no lazer, a mente continua em modo planejamento, correção ou preocupação.',
  ];

  if (isPure || isWithMelancholic) {
    risks.push(
      'Capacidade de guardar ofensas e ressentimentos por muito tempo, alimentando rancor e vontade de “acertar contas” mais tarde.',
      'Inclinação a revisitar mentalmente discussões antigas, reescrevendo o diálogo na cabeça e reforçando a própria posição.',
      'Perigo de endurecer os julgamentos, classificando pessoas e situações de modo definitivo, com pouca abertura para enxergar mudanças.'
    );
  }

  if (isWithSanguine) {
    risks.push(
      'Impulsividade na fala e nas decisões: pode prometer demais, falar demais ou agir rápido demais antes de ponderar as consequências.',
      'Superficialidade em detalhes importantes: foca na visão geral e nas pessoas, deixando lacunas técnicas e administrativas para depois.',
      'Tendência a assumir mais compromissos do que consegue acompanhar com profundidade, superestimando o próprio tempo e energia.',
      'Risco de transformar qualquer ambiente em palco, buscando atenção e espaço excessivo em vez de apenas servir e liderar.',
      'Possibilidade de relativizar promessas antigas em nome de novos entusiasmos, deixando pessoas e projetos pelo caminho.'
    );
  }

  if (isWithMelancholic) {
    risks.push(
      'Perfeccionismo rígido: dificuldade em aceitar soluções boas o suficiente, o que pode atrasar decisões e desgastar relações.',
      'Crítica implacável consigo e com os outros, gerando clima de exigência extrema e pouca palavra de encorajamento.',
      'Tendência a interpretar quase tudo em chave moral: erro técnico vira falha de caráter, divergência vira suspeita de má vontade.',
      'Risco de oscilar entre períodos de trabalho exaustivo e fases de exaustão, desânimo e autocrítica severa.',
      'Possibilidade de se tornar alguém temido pela dureza dos julgamentos e pela memória longa das falhas alheias.'
    );
  }

  if (isWithPhlegmatic) {
    risks.push(
      'Teimosia silenciosa: uma vez tomada uma decisão, tende a mantê-la mesmo quando as circunstâncias mudam bastante.',
      'Déficit de calor afetivo: pode parecer frio, distante ou “apenas funcional”, expressando pouco carinho e emoção.',
      'Tendência a resolver conflitos com decisões unilaterais em vez de diálogos abertos, esperando que a ordem simplesmente seja obedecida.',
      'Perigo de mascarar mágoas com aparente calma: por fora é tranquilo, mas por dentro pode acumular ressentimento difícil de acessar.',
      'Inclinação a valorizar demais estabilidade e controle, resistindo a mudanças necessárias pelo medo de mexer em estruturas consolidadas.'
    );
  }

  // ---------------------------------------------------------------------------
  // WORK / CAREER
  // ---------------------------------------------------------------------------
  const work: string[] = [
    'Funciona melhor em ambientes com metas claras, indicadores objetivos e espaço real de autonomia e decisão.',
    'Tende a assumir naturalmente liderança de projetos ou equipes, especialmente em contextos de crise, mudança ou competição.',
    'Enxerga o trabalho como campo de conquista: prefere tarefas difíceis, missões desafiadoras e responsabilidades de alto impacto.',
    'Costuma ser auto-motivado: não precisa de muita cobrança externa, mas aprecia desafios bem definidos e confiança explícita em sua capacidade.',
    'Gosta de medir resultados: metas, números e feedbacks objetivos ajudam a canalizar sua energia e ajustar a rota.',
    'Tem facilidade para tomar decisões impopulares quando julga que são necessárias para o bem do conjunto.',
    'Em ambientes caóticos, tende a propor rapidamente estruturas, rotinas, fluxos e prioridades.',
    'Quando encontra uma missão que considera nobre, é capaz de trabalhar por anos com intensidade e foco, sem se desviar por modismos.',
    'Valoriza colaboradores independentes, responsáveis e confiáveis; respeita quem entrega resultado e honra compromissos.',
    'Em reuniões, prefere objetividade: agenda clara, decisões concretas, divisão de responsabilidades e próximos passos definidos.',
    'Em cargos de comando, tende a puxar a equipe para cima, elevando o nível de exigência e de desempenho.',
  ];

  if (isPure) {
    work.push(
      'Como colérico mais “puro”, pode ter grande dificuldade em permanecer por muito tempo sob liderança que considera fraca ou incoerente.',
      'Tem forte perfil empreendedor ou de comando: sente-se mais vivo quando pode montar seu próprio caminho em vez de apenas executar ordens.',
      'Sofre ao ver desperdício de tempo, talentos ou recursos em estruturas mal geridas, e costuma se tornar voz de reforma nesses ambientes.',
      'Pode ser um agente importante de mudança em organizações engessadas, desde que aprenda a dialogar e construir alianças em vez de apenas confrontar.'
    );
  }

  if (isWithSanguine) {
    work.push(
      'Brilha em funções de liderança visível: direção comercial, marketing, política, evangelização pública, vendas complexas.',
      'Precisa cercar-se de perfis mais analíticos e metódicos para cuidar de contratos, processos e detalhes que tende a negligenciar.',
      'Vai bem em contextos em que falar em público, negociar e representar uma causa fazem parte do dia a dia.',
      'Tem talento especial para “vender” internamente projetos e mudanças, construindo entusiasmo e apoio político.',
      'Precisa aprender a dizer “não” a oportunidades boas para proteger o que é essencial e concluí-las bem.'
    );
  }

  if (isWithMelancholic) {
    work.push(
      'Destaca-se em áreas que exigem alta competência técnica combinada com decisões firmes: direito, medicina, engenharia, gestão de projetos complexos, estratégia.',
      'Pode cair facilmente no excesso de trabalho, sacrificando descanso e vida afetiva em nome de padrões de excelência quase impossíveis.',
      'Tem perfil ideal para liderar equipes técnicas, departamentos de alta responsabilidade ou projetos de longo prazo que exigem planejamento minucioso.',
      'Geralmente prefere cargos em que tenha autoridade formal e liberdade para implementar sistemas que garantam qualidade e coerência.',
      'Precisa aprender a delegar sem microgerenciar, confiando que outros podem fazer bem, ainda que não exatamente do seu jeito.'
    );
  }

  if (isWithPhlegmatic) {
    work.push(
      'Tem perfil de gestor/administrador estável: excelente para estruturar processos, organizar equipes e manter sistemas funcionando ao longo do tempo.',
      'É valioso em cargos de direção ou coordenação em que seja preciso unir firmeza de decisão com diplomacia e senso de justiça.',
      'Consegue equilibrar a pressão por metas com razoável cuidado pelo clima da equipe, evitando tanto dureza quanto permissividade excessivas.',
      'Costuma ser bom em funções de coordenação geral, articulando vários setores, integrando rotinas e garantindo fluxo contínuo.',
      'Pode subestimar o próprio valor quando não está em funções “heroicas”; é importante reconhecer que a estabilidade que oferece é, em si, um grande serviço.'
    );
  }

  // ---------------------------------------------------------------------------
  // RELATIONSHIPS
  // ---------------------------------------------------------------------------
  const relationships: string[] = [
    'Tende a ser muito autêntico e direto: fala o que pensa e dificilmente mantém um clima de “faz de conta”.',
    'Valoriza lealdade e confiabilidade: respeita profundamente quem mantém a palavra, assume responsabilidade e enfrenta a verdade de frente.',
    'Em conflitos, prefere resolver logo: busca o diálogo direto ou a decisão clara, em vez de deixar o assunto se arrastar indefinidamente.',
    'Pode ter dificuldade para perceber nuances emocionais, esperando que o outro “aguente firme” e interpretando vulnerabilidade como exagero.',
    'Costuma admirar pessoas fortes e responsáveis, e sentir pouca paciência com vitimismo, desculpas repetidas ou falta de compromisso.',
    'Tende a demonstrar carinho mais por atos de serviço, proteção e provisão do que por gestos constantes de afeto verbal.',
    'Em amizades, costuma ser aquele que dá conselhos muito francos, às vezes desconfortáveis, mas difíceis de ignorar.',
    'Quando se sente traído ou profundamente injustiçado, pode cortar relações com firmeza, em vez de prolongar um diálogo desgastante.',
    'Na convivência diária, tende a se preocupar com organização, responsabilidades e cumprimento de deveres tanto quanto - ou mais do que - com pequenos gestos românticos.',
    'Quando aprende a escutar com atenção real, torna-se um aliado valioso: defende quem ama e toma atitudes concretas para ajudar.',
  ];

  if (isPure || isWithMelancholic) {
    relationships.push(
      'Se não vigiar o coração, pode acumular mágoas antigas, reinterpretando constantemente conflitos passados.',
      'Tem tendência a refazer mentalmente discussões, imaginando respostas melhores e alimentando argumentos internos.',
      'Pode demorar a perdoar de verdade, mesmo depois de uma reconciliação aparente; precisa trabalhar o ato interior de misericórdia.'
    );
  }

  if (isWithSanguine) {
    relationships.push(
      'Costuma ser intenso e comunicativo: ama com entusiasmo, mas precisa moderar o tom das palavras e o ritmo das reações.',
      'Tem facilidade em pedir desculpas depois de explosões, porém precisa aprender a evitar que elas se tornem tão frequentes.',
      'Traz muita vida, humor e movimento para os vínculos, mas pode provocar sensação de “montanha-russa” emocional em pessoas mais sensíveis.',
      'Gosta de momentos sociais, festas, encontros e grupos, e tende a incluir quem ama nesse dinamismo.'
    );
  }

  if (isWithMelancholic) {
    relationships.push(
      'Pode ser um parceiro exigente: cobra coerência, consistência e profundidade, tanto de si quanto de quem caminha ao seu lado.',
      'Quando amadurece, torna-se um apoio sólido e fiel, capaz de orientar, proteger e sustentar quem ama com grande seriedade.',
      'Tem dificuldade em expressar verbalmente a própria afeição; muitas vezes ama em silêncio, por meio de sacrifícios e cuidados concretos.',
      'Precisa lembrar conscientemente de elogiar, agradecer e reconhecer o bem, não apenas apontar o que falta ou precisa melhorar.'
    );
  }

  if (isWithPhlegmatic) {
    relationships.push(
      'Costuma demonstrar amor mais através de estabilidade, cuidado concreto e presença fiel do que por grandes demonstrações afetivas.',
      'Tende a evitar discussões longas, preferindo encerrar o assunto com uma decisão; precisa abrir espaço para que o outro fale e seja escutado.',
      'É visto como alguém confiável e previsível, o que traz segurança afetiva para quem convive consigo.',
      'O desafio é não confundir paz com silêncio: às vezes será necessário entrar em conversas difíceis para que a relação aprofunde.'
    );
  }

  // ---------------------------------------------------------------------------
  // FAMILY
  // ---------------------------------------------------------------------------
  const family: string[] = [
    'No contexto familiar, tende a assumir naturalmente o papel de quem decide rumos, define limites e protege os seus.',
    'Pode ser exigente com cônjuge e filhos, cobrando responsabilidade, disciplina e bom desempenho.',
    'Quando amadurecido, é um grande protetor: assume tarefas difíceis, enfrenta problemas práticos e não foge de responsabilidades pesadas.',
    'Costuma sentir forte senso de dever em relação à provisão material e à segurança da família.',
    'Em crises, tende a ser a pessoa que imediatamente procura soluções concretas: falar com médico, reorganizar finanças, ajustar rotinas.',
    'Pode transformar sem perceber o lar em extensão do ambiente profissional, levando para dentro de casa a mesma lógica de metas e cobranças.',
    'Tem dificuldade em aceitar que membros da família falhem repetidamente nas mesmas coisas; precisa aprender a acompanhar processos de crescimento mais lentos.',
    'Valoriza a verdade: não gosta de fingir que está tudo bem quando vê problemas claros na educação, na vida moral ou na organização doméstica.',
  ];

  if (isPure) {
    family.push(
      'Precisa vigiar para não transformar o lar em quartel: ordem é importante, mas não pode sufocar a ternura, o elogio e o tempo gratuito com os seus.',
      'Pode ser tentado a tomar sozinho todas as decisões relevantes, reduzindo o cônjuge a mero executante; é essencial perguntar, ouvir e considerar de fato a opinião do outro.'
    );
  }

  if (isWithSanguine) {
    family.push(
      'Traz muita vida e movimento para dentro de casa, animando encontros, viagens e celebrações.',
      'Pode, porém, gerar um clima de altos e baixos de humor se não aprender a moderar explosões e frustrações.'
    );
  }

  if (isWithMelancholic) {
    family.push(
      'Pode ser pai ou mãe muito atento(a) à formação moral, intelectual e espiritual dos filhos, acompanhando de perto estudos, escolhas e amizades.',
      'Corre o risco de criticar mais do que encorajar; precisa deliberadamente cultivar elogio, carinho e reconhecimento sincero.'
    );
  }

  if (isWithPhlegmatic) {
    family.push(
      'Tende a criar um lar organizado e previsível, em que todos sabem o que esperar e quais são os combinados.',
      'Pode ser um excelente “pilar silencioso” da família, sustentando financeiramente e logisticamente o dia a dia com constância admirável.'
    );
  }

  // ---------------------------------------------------------------------------
  // SPIRITUAL
  // ---------------------------------------------------------------------------
  const spiritual: string[] = [
    'É naturalmente atraído por ideais fortes, clareza doutrinária, metas espirituais exigentes e desafios de santidade.',
    'Os vícios dominantes costumam girar em torno da soberba (confiança excessiva em si) e da ira (reação forte quando a vontade é contrariada).',
    'Precisa cultivar humildade real: reconhecer que a própria energia é dom recebido, obedecer a orientações prudentes e aceitar serviços simples e escondidos.',
    'Na vida de oração, corre o risco do ativismo: fazer muito por Deus, mas permanecer pouco em silêncio diante d’Ele.',
    'Tem facilidade para propósitos firmes, promessas e resoluções; o desafio é não transformar tudo em desempenho, esquecendo que a graça precede o esforço.',
    'Costuma sentir atração por espiritualidades que falam de combate, disciplina, missão, reforma e clareza moral.',
    'Pode confundir zelo com dureza: dizer que “defende a verdade” quando, na prática, está apenas despejando irritações pessoais.',
    'Precisa lembrar que, na perspectiva cristã, a medida da santidade não é a quantidade de coisas feitas, mas a qualidade da caridade colocada em cada ato.',
    'Tem grande capacidade de perseverar em práticas de piedade quando as assume com consciência: missa frequente, confissão regular, direção espiritual, obras de misericórdia.',
    'Pode beneficiar-se muito de retiros bem estruturados e de tempos fortes de recolhimento para reorientar a vontade e purificar intenções.',
    'A virtude da mansidão não é opcional para o colérico: é a força sob controle, que permite que a energia não se converta em violência ou dureza.',
  ];

  if (isPure || isWithMelancholic) {
    spiritual.push(
      'A meditação da Paixão de Cristo, a contemplação da mansidão do Cordeiro e o exame rigoroso da caridade fraterna são remédios centrais para o ressentimento e a dureza.',
      'Práticas concretas como pedir desculpas de iniciativa própria, reparar injustiças e elogiar sinceramente quem costuma apenas corrigir ajudam a purificar o coração.'
    );
  }

  if (isWithSanguine) {
    spiritual.push(
      'Pode viver grandes entusiasmos espirituais - retiros, missões, obras apostólicas - mas é chamado a traduzir esse fogo em perseverança diária na oração e nos sacramentos.',
      'Precisa vigiar para não confundir emoção com conversão: sentir muito em certos momentos não substitui passos concretos de mudança de vida.'
    );
  }

  if (isWithPhlegmatic) {
    spiritual.push(
      'Tem potencial para uma fidelidade estável: quando decide servir a Deus com seriedade, tende a manter-se fiel, desde que não confunda paz com acomodação.',
      'Precisa cultivar momentos em que permita que a Palavra o questione e desinstale, evitando que a vida espiritual se reduza a uma rotina confortável demais.'
    );
  }

  spiritual.push(
    'Quando o fogo colérico é disciplinado pela graça e pelas virtudes - mansidão, paciência, humildade - torna-se motor de grandes obras de Deus: ' +
      'o mesmo impulso que um dia perseguiu pode, como em São Paulo, tornar-se impulso para evangelizar, construir, reparar e defender os mais frágeis.',
  );

  // ---------------------------------------------------------------------------
  // RESULTADO
  // ---------------------------------------------------------------------------
  const profile: TemperamentProfile = {
    label,
    overview,
    strengths,
    risks,
    work,
    relationships,
    family,
    spiritual,
  };

  return profile;
}
