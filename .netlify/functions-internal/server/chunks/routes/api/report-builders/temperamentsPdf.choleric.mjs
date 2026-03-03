function buildCholericPdfProfile(ctx) {
  var _a;
  const { secondary } = ctx;
  const secondaryId = (_a = secondary == null ? void 0 : secondary.id) != null ? _a : null;
  const isPure = !secondaryId || secondaryId === "choleric";
  const isWithSanguine = secondaryId === "sanguine";
  const isWithMelancholic = secondaryId === "melancholic";
  const isWithPhlegmatic = secondaryId === "phlegmatic";
  const label = "Col\xE9rico";
  let overview = "";
  if (isPure) {
    overview = "Quando o temperamento col\xE9rico aparece de forma quase pura - o chamado col\xE9rico-col\xE9rico - temos o \u201Cfogo\u201D em estado concentrado entre os temperamentos cl\xE1ssicos. Antigos autores dir\xE3o que ele \xE9 quente e seco, ligado \xE0 antiga imagem da b\xEDlis amarela e ao elemento fogo. Psicologicamente, isso se traduz em rea\xE7\xE3o r\xE1pida, intensa e duradoura: o col\xE9rico percebe um est\xEDmulo, reage com for\xE7a e guarda a impress\xE3o por muito tempo. Uma ofensa, um ideal ou uma decis\xE3o n\xE3o passam rapidamente; eles ficam gravados fundo na mem\xF3ria e na vontade.\n\nA alma col\xE9rica \xE9 teleol\xF3gica: pensa em termos de metas, resultados e conquistas. Onde outros veem situa\xE7\xF5es, o col\xE9rico enxerga objetivos e obst\xE1culos. A intelig\xEAncia \xE9 pr\xE1tica e orientada \xE0 solu\xE7\xE3o: ele n\xE3o raciocina por gosto abstrato, mas para descobrir o caminho mais eficiente. Por isso, tem baixa toler\xE2ncia a desperd\xEDcio de tempo, incompet\xEAncia e indecis\xE3o. A sensa\xE7\xE3o de impot\xEAncia o incomoda profundamente; o impulso quase instintivo \xE9 tomar a frente, organizar, corrigir, reformar.\n\nNo col\xE9rico puro, a vontade ocupa o centro do palco. Essa vontade forte o torna empreendedor, capaz de assumir riscos e carregar projetos nas costas, muitas vezes em contextos hostis. Ele prefere o peso da responsabilidade ao desconforto de depender de outros. Trabalhar muito por algo que considera \u201Cseu\u201D cansa menos do que obedecer passivamente a um l\xEDder inseguro ou incompetente. Da\xED nasceram tantos fundadores, conquistadores e reformadores com tra\xE7os nitidamente col\xE9ricos.\n\nAo mesmo tempo, o col\xE9rico puro nasce com pontos cegos claros: tende a colocar a tarefa acima da pessoa, a verdade acima da delicadeza, a efici\xEAncia acima do ritmo humano. A empatia n\xE3o \xE9 o seu instinto prim\xE1rio; ele corrige pensando que est\xE1 prestando um servi\xE7o e se surpreende ao ver o outro ferido. A ira e a soberba s\xE3o tenta\xE7\xF5es fortes: \xE9 f\xE1cil confundir a pr\xF3pria vontade com o que \xE9 justo e verdadeiro. Sem purifica\xE7\xE3o interior, o mesmo fogo que move grandes obras pode devastar rela\xE7\xF5es e ferir profundamente os mais fr\xE1geis.\n\nQuando esse temperamento \xE9 educado, disciplinado e trabalhado pela gra\xE7a, por\xE9m, o quadro se inverte: a mesma energia que um dia perseguiu pode tornar-se energia que sustenta, constr\xF3i e defende. Santos como S\xE3o Paulo Ap\xF3stolo, reformadores como Santo In\xE1cio de Loyola ou figuras fortes como Santa Teresa de \xC1vila mostram esse fogo col\xE9rico convertido em zelo firme, coragem perseverante e capacidade de carregar grandes responsabilidades sem fugir da cruz.";
  } else if (isWithSanguine) {
    overview = "No col\xE9rico-sangu\xEDneo, o fogo do col\xE9rico se associa ao ar leve, comunicativo e expansivo do sangu\xEDneo. Surge uma combina\xE7\xE3o altamente extrovertida, expressiva e vis\xEDvel: vontade forte, foco em resultados, mas revestidos de carisma, entusiasmo e grande facilidade de contato humano. \xC9 o perfil do \u201Cexecutivo carism\xE1tico\u201D, do l\xEDder que fala, contagia, convence e arrasta pessoas para uma causa.\n\nEnquanto o col\xE9rico puro \xE9 mais seco nas rela\xE7\xF5es, o col\xE9rico-sangu\xEDneo tende a ser mais caloroso e soci\xE1vel. Ele gosta de gente, de movimento, de conversas e cen\xE1rios din\xE2micos. Toma iniciativa com a mesma rapidez, mas agora com um elemento extra de espontaneidade e humor. Explode com facilidade - seja em entusiasmo, seja em irrita\xE7\xE3o - por\xE9m costuma esquecer mais rapidamente as ofensas do que outras varia\xE7\xF5es col\xE9ricas. A ferida emocional tende a ser intensa, mas menos duradoura.\n\nEsse temperamento aparece com frequ\xEAncia em l\xEDderes de campanha, comunicadores p\xFAblicos, empreendedores de palco, pol\xEDticos carism\xE1ticos e evangelizadores que vivem falando para grandes grupos. O mesmo impulso para organizar e mandar \xE9 suavizado pela capacidade de contar hist\xF3rias, usar imagens, manter a aten\xE7\xE3o das pessoas e criar um clima de \u201Cvamos juntos\u201D. A palavra, o microfone e a intera\xE7\xE3o social se tornam ferramentas naturais de trabalho.\n\nPor outro lado, essa mistura tamb\xE9m torna o col\xE9rico-sangu\xEDneo mais vulner\xE1vel \xE0 dispers\xE3o e \xE0 impulsividade. A necessidade de novidade e de est\xEDmulo pode competir com a perseveran\xE7a em projetos longos e silenciosos. Ele se lan\xE7a com facilidade, assume muitos compromissos, promete muito, mas precisa aprender a sustentar o mesmo n\xEDvel de disciplina quando o brilho inicial passa. Seu caminho de maturidade inclui desenvolver foco, prud\xEAncia e uma aten\xE7\xE3o mais fiel aos detalhes que sustentar\xE3o o que ele pr\xF3prio constr\xF3i com tanto entusiasmo.";
  } else if (isWithMelancholic) {
    overview = "O col\xE9rico-melanc\xF3lico \xE9 o \u201Cestrategista perfeccionista\u201D: a for\xE7a de vontade e a objetividade do col\xE9rico se encontram com a profundidade anal\xEDtica, o senso de ideal e o perfeccionismo do melanc\xF3lico. N\xE3o basta vencer; \xE9 preciso vencer com coer\xEAncia, com precis\xE3o e da maneira certa. A frase t\xEDpica dessa combina\xE7\xE3o \xE9 algo como: \u201CSe \xE9 para fazer, que seja bem feito e do jeito certo\u201D.\n\nAqui a extrovers\xE3o col\xE9rica \xE9 temperada por uma introvers\xE3o reflexiva. Em p\xFAblico, essa pessoa pode ser firme, articulada e combativa; em privado, tende a ser mais recolhida, cr\xEDtica consigo mesma e exigente com seus pr\xF3prios crit\xE9rios internos. H\xE1 um di\xE1logo permanente entre o impulso de agir r\xE1pido e o impulso de analisar mais um pouco, repensar, revisar, planejar em profundidade.\n\nIsso gera um perfil de alt\xEDssima compet\xEAncia: mente l\xF3gica, capacidade de planejamento de longo prazo, aten\xE7\xE3o a riscos, cen\xE1rios e detalhes. S\xE3o pessoas que estudam, anotam, comparam, constroem estruturas, criando sistemas e obras duradouras. Ao mesmo tempo, essa mesma combina\xE7\xE3o pode gerar grande tens\xE3o interna: o col\xE9rico quer andar, o melanc\xF3lico teme o erro. Resultado: per\xEDodos de atividade intensa, quase obsessiva, seguidos de fases de cansa\xE7o, autocr\xEDtica severa e sensa\xE7\xE3o de que \u201Cnunca est\xE1 bom o suficiente\u201D.\n\nHistoricamente, essa configura\xE7\xE3o aparece em grandes generais, reformadores, cirurgi\xF5es, juristas e fundadores de obras complexas. Santo In\xE1cio de Loyola, por exemplo, canalizou esse perfil para os Exerc\xEDcios Espirituais e a funda\xE7\xE3o da Companhia de Jesus: m\xE9todo rigoroso, disciplina, vis\xE3o estrat\xE9gica e vontade de ferro colocadas a servi\xE7o de um ideal elevado. O desafio constante do col\xE9rico-melanc\xF3lico \xE9 aprender a integrar verdade e caridade, rigor e miseric\xF3rdia, perfei\xE7\xE3o e limites humanos - em si mesmo e nos outros.";
  } else if (isWithPhlegmatic) {
    overview = "Na combina\xE7\xE3o col\xE9rico-fleum\xE1tico, o fogo do col\xE9rico \xE9 resfriado pela \xE1gua calma do fleum\xE1tico. Surge uma figura de \u201Cdiretor est\xF3ico\u201D: algu\xE9m firme, organizado, muito est\xE1vel, que raramente se perde em explos\xF5es vis\xEDveis, mas que tamb\xE9m dificilmente volta atr\xE1s quando decidiu algo. \xC9 uma for\xE7a tranquila, mais silenciosa do que os outros col\xE9ricos, por\xE9m igualmente determinada.\n\nO col\xE9rico fornece a vontade, o senso de objetivo e a coragem para decidir; o fleum\xE1tico acrescenta paci\xEAncia, m\xE9todo, diplomacia e grande estabilidade emocional. Em vez de um l\xEDder que grita e gesticula, temos algu\xE9m que fala pouco, pensa antes, organiza processos e sustenta as decis\xF5es com const\xE2ncia. Explos\xF5es s\xE3o raras; a teimosia, por\xE9m, pode ser grande. Quando n\xE3o concorda, pode simplesmente fechar a cara, n\xE3o ceder e continuar fazendo o que julga correto.\n\nEsse perfil aparece com frequ\xEAncia em administradores s\xF3lidos, coordenadores de longo prazo, figuras pol\xEDticas serenas e gestores capazes de manter estruturas funcionando por anos. Ele gosta de rotina bem desenhada, procedimentos claros, regras est\xE1veis e previsibilidade. N\xE3o tem fasc\xEDnio por holofotes, mas assume naturalmente a dianteira quando \xE9 preciso algu\xE9m confi\xE1vel e equilibrado para segurar o leme em per\xEDodos de crise ou de grande responsabilidade.\n\nO risco, aqui, \xE9 que a mesma estabilidade se transforme em rigidez: apego excessivo a m\xE9todos, baixa toler\xE2ncia ao novo, certa dificuldade em expressar afeto e em partilhar vulnerabilidades. Quando cresce, o col\xE9rico-fleum\xE1tico consegue unir justi\xE7a e mansid\xE3o, firmeza e serenidade, tornando-se um tipo de lideran\xE7a muito procurado: previs\xEDvel, coerente e dif\xEDcil de abalar.";
  } else {
    overview = "O temperamento col\xE9rico, em qualquer combina\xE7\xE3o, traz como n\xFAcleo uma vontade forte, reatividade r\xE1pida e capacidade de guardar impress\xF5es por longo tempo. \xC9 o temperamento naturalmente orientado a metas: enxerga o mundo como algo que deve ser organizado, transformado, conquistado. Tem facilidade para assumir responsabilidades grandes, tomar decis\xF5es sob press\xE3o e avan\xE7ar mesmo quando o ambiente \xE9 hostil.\n\nQuando bem integrado, o col\xE9rico se torna motor de reformas, avan\xE7os, funda\xE7\xF5es e grandes obras; quando mal trabalhado, cai na dureza, na impaci\xEAncia e na tend\xEAncia a atropelar pessoas em nome da \u201Cefici\xEAncia\u201D. A hist\xF3ria mostra que esse fogo pode tanto incendiar quanto aquecer. A quest\xE3o central n\xE3o \xE9 apagar o fogo, mas aprender a coloc\xE1-lo na lareira certa: a servi\xE7o de algo que realmente valha a pena, com caridade, justi\xE7a e humildade.";
  }
  const strengths = [
    "Energia elevada diante de desafios, reagindo rapidamente e com vigor quando algo exige decis\xE3o ou a\xE7\xE3o imediata.",
    "Capacidade de manter decis\xF5es, projetos e compromissos por longo prazo, transformando impress\xF5es fortes em perseveran\xE7a concreta.",
    "Coragem natural para enfrentar conflitos, problemas complexos e situa\xE7\xF5es em que muitos evitam se posicionar.",
    "Foco em resultados: facilidade em distinguir o que \xE9 essencial do que \xE9 acess\xF3rio e concentrar esfor\xE7os no que realmente gera impacto.",
    "Estilo de pensamento pr\xE1tico e objetivo, que busca solu\xE7\xF5es em vez de se perder em lamenta\xE7\xF5es ou an\xE1lises intermin\xE1veis.",
    "Gosto por responsabilidade: sente-se melhor quando tem algo grande nas m\xE3os a ser conduzido, mesmo que seja pesado.",
    "Alta toler\xE2ncia \xE0 press\xE3o externa: prazos curtos, metas ousadas e ambientes competitivos tendem a despert\xE1-lo, n\xE3o a paralis\xE1-lo.",
    "Facilidade em tomar decis\xF5es com informa\xE7\xF5es parciais, ajustando a rota em movimento em vez de esperar a seguran\xE7a absoluta.",
    "Disposi\xE7\xE3o para sacrificar conforto, descanso e caminhos f\xE1ceis em nome de algo que considera importante ou justo.",
    "Capacidade de separar decis\xF5es pr\xE1ticas de simpatias pessoais, avaliando compet\xEAncia e resultado com grande objetividade.",
    "Inclina\xE7\xE3o a proteger os mais fracos quando percebe injusti\xE7as claras, especialmente quando sente que pode intervir de forma eficaz.",
    "Talento natural para estabelecer prioridades, organizar recursos, pessoas e processos em torno de um objetivo definido.",
    "Capacidade de aprender com erros de forma r\xE1pida e pragm\xE1tica: uma vez percebida a falha, tende a corrigi-la com decis\xE3o.",
    "Esp\xEDrito combativo saud\xE1vel: diante de dificuldades, \xE9 mais inclinado a dizer \u201Cvamos ver como resolvemos isso\u201D do que a desistir."
  ];
  if (isWithSanguine) {
    strengths.push(
      "Carisma e poder de persuas\xE3o: une firmeza col\xE9rica com humor, entusiasmo e facilidade de comunica\xE7\xE3o.",
      "Capacidade de mobilizar grupos, inspirar equipes e sustentar um clima de energia e motiva\xE7\xE3o em torno de uma causa.",
      "Habilidade rara de traduzir objetivos complexos em mensagens simples, concretas e envolventes.",
      "Facilidade em fazer networking, criar conex\xF5es estrat\xE9gicas e aproximar pessoas de perfis diferentes em torno de um mesmo projeto.",
      "Capacidade de se recuperar r\xE1pido de frustra\xE7\xF5es: tende a levantar, sacudir a poeira e recome\xE7ar com novo \xE2nimo depois de um fracasso."
    );
  }
  if (isWithMelancholic) {
    strengths.push(
      "Vis\xE3o estrat\xE9gica de longo prazo, com grande aten\xE7\xE3o a detalhes, riscos, cen\xE1rios e consequ\xEAncias.",
      "Alto senso de responsabilidade, disciplina e capacidade de trabalho intenso em projetos complexos e demorados.",
      "Tend\xEAncia a estruturar o que faz com m\xE9todo: planos, processos, cronogramas e crit\xE9rios bem definidos.",
      "Capacidade de unir idealismo e pragmatismo: formula grandes objetivos, mas tamb\xE9m desenha o passo a passo concreto para alcan\xE7\xE1-los.",
      "Perfil de \u201Cconstrutor de obras duradouras\u201D: gosta de deixar legado, institui\xE7\xF5es s\xF3lidas e estruturas bem pensadas."
    );
  }
  if (isWithPhlegmatic) {
    strengths.push(
      "Estabilidade emocional acima da m\xE9dia, mantendo a cabe\xE7a fria mesmo em crises prolongadas ou altamente tensas.",
      "Grande capacidade organizacional: aprecia sistemas, rotinas e processos eficientes, e consegue mant\xEA-los funcionando com const\xE2ncia.",
      "Diplomacia pr\xE1tica: sabe quando falar e quando corrigir de forma discreta, evitando conflitos desnecess\xE1rios sem abandonar a verdade.",
      "Perfil de lideran\xE7a serena: inspira confian\xE7a pela coer\xEAncia, previsibilidade e senso de justi\xE7a mais do que por discursos dram\xE1ticos.",
      "Capacidade de sustentar a mesma decis\xE3o por muito tempo sem perder o foco, gra\xE7as \xE0 combina\xE7\xE3o de tenacidade col\xE9rica com const\xE2ncia fleum\xE1tica."
    );
  }
  const risks = [
    "Impaci\xEAncia com lentid\xE3o, d\xFAvidas ou fragilidades alheias, o que pode gerar cr\xEDticas duras e clima de medo ao redor.",
    "Tend\xEAncia a identificar a pr\xF3pria vontade com a \u201Cverdade\u201D ou a \u201Cjusti\xE7a\u201D, justificando explos\xF5es de irrita\xE7\xE3o como se fossem sempre zelo correto.",
    "Inclina\xE7\xE3o a controlar pessoas e ambientes, tratando-os como meios para atingir metas em vez de enxergar primeiro as pessoas.",
    "Risco de soberba: supervaloriza\xE7\xE3o da pr\xF3pria capacidade e dificuldade em admitir erros, pedir ajuda ou reconhecer depend\xEAncia.",
    "Tend\xEAncia a falar de forma brusca e excessivamente direta, ferindo com palavras que, para si, parecem apenas \u201Cobjetas\u201D.",
    "Perigo de transformar todos os ambientes em campo de batalha: fam\xEDlia, trabalho e vida espiritual podem virar lugares constantes de cobran\xE7a e corre\xE7\xE3o.",
    "Dificuldade em aceitar limites humanos - tanto os pr\xF3prios (cansa\xE7o, doen\xE7a, tempo finito) quanto os dos outros.",
    "Inclina\xE7\xE3o a tomar decis\xF5es sem consultar quem ser\xE1 diretamente afetado, por acreditar j\xE1 saber o que \xE9 melhor.",
    "Risco de ativismo: encher a agenda de tarefas, causas e projetos a ponto de descuidar da vida interior e dos v\xEDnculos mais profundos.",
    "Tend\xEAncia a interpretar discord\xE2ncias como amea\xE7a \xE0 pr\xF3pria autoridade ou compet\xEAncia, reagindo com rigidez ou agressividade.",
    "Perigo de \u201Cqueimar\u201D pessoas competentes, por\xE9m mais lentas ou sens\xEDveis, por n\xE3o entender ou respeitar ritmos diferentes.",
    "Risco de isolamento afetivo: com o tempo, pode se tornar algu\xE9m respeitado e temido, mas pouco amado e pouco acess\xEDvel.",
    "Dificuldade real em descansar de verdade: mesmo no lazer, a mente continua em modo planejamento, corre\xE7\xE3o ou preocupa\xE7\xE3o."
  ];
  if (isPure || isWithMelancholic) {
    risks.push(
      "Capacidade de guardar ofensas e ressentimentos por muito tempo, alimentando rancor e vontade de \u201Cacertar contas\u201D mais tarde.",
      "Inclina\xE7\xE3o a revisitar mentalmente discuss\xF5es antigas, reescrevendo o di\xE1logo na cabe\xE7a e refor\xE7ando a pr\xF3pria posi\xE7\xE3o.",
      "Perigo de endurecer os julgamentos, classificando pessoas e situa\xE7\xF5es de modo definitivo, com pouca abertura para enxergar mudan\xE7as."
    );
  }
  if (isWithSanguine) {
    risks.push(
      "Impulsividade na fala e nas decis\xF5es: pode prometer demais, falar demais ou agir r\xE1pido demais antes de ponderar as consequ\xEAncias.",
      "Superficialidade em detalhes importantes: foca na vis\xE3o geral e nas pessoas, deixando lacunas t\xE9cnicas e administrativas para depois.",
      "Tend\xEAncia a assumir mais compromissos do que consegue acompanhar com profundidade, superestimando o pr\xF3prio tempo e energia.",
      "Risco de transformar qualquer ambiente em palco, buscando aten\xE7\xE3o e espa\xE7o excessivo em vez de apenas servir e liderar.",
      "Possibilidade de relativizar promessas antigas em nome de novos entusiasmos, deixando pessoas e projetos pelo caminho."
    );
  }
  if (isWithMelancholic) {
    risks.push(
      "Perfeccionismo r\xEDgido: dificuldade em aceitar solu\xE7\xF5es boas o suficiente, o que pode atrasar decis\xF5es e desgastar rela\xE7\xF5es.",
      "Cr\xEDtica implac\xE1vel consigo e com os outros, gerando clima de exig\xEAncia extrema e pouca palavra de encorajamento.",
      "Tend\xEAncia a interpretar quase tudo em chave moral: erro t\xE9cnico vira falha de car\xE1ter, diverg\xEAncia vira suspeita de m\xE1 vontade.",
      "Risco de oscilar entre per\xEDodos de trabalho exaustivo e fases de exaust\xE3o, des\xE2nimo e autocr\xEDtica severa.",
      "Possibilidade de se tornar algu\xE9m temido pela dureza dos julgamentos e pela mem\xF3ria longa das falhas alheias."
    );
  }
  if (isWithPhlegmatic) {
    risks.push(
      "Teimosia silenciosa: uma vez tomada uma decis\xE3o, tende a mant\xEA-la mesmo quando as circunst\xE2ncias mudam bastante.",
      "D\xE9ficit de calor afetivo: pode parecer frio, distante ou \u201Capenas funcional\u201D, expressando pouco carinho e emo\xE7\xE3o.",
      "Tend\xEAncia a resolver conflitos com decis\xF5es unilaterais em vez de di\xE1logos abertos, esperando que a ordem simplesmente seja obedecida.",
      "Perigo de mascarar m\xE1goas com aparente calma: por fora \xE9 tranquilo, mas por dentro pode acumular ressentimento dif\xEDcil de acessar.",
      "Inclina\xE7\xE3o a valorizar demais estabilidade e controle, resistindo a mudan\xE7as necess\xE1rias pelo medo de mexer em estruturas consolidadas."
    );
  }
  const work = [
    "Funciona melhor em ambientes com metas claras, indicadores objetivos e espa\xE7o real de autonomia e decis\xE3o.",
    "Tende a assumir naturalmente lideran\xE7a de projetos ou equipes, especialmente em contextos de crise, mudan\xE7a ou competi\xE7\xE3o.",
    "Enxerga o trabalho como campo de conquista: prefere tarefas dif\xEDceis, miss\xF5es desafiadoras e responsabilidades de alto impacto.",
    "Costuma ser auto-motivado: n\xE3o precisa de muita cobran\xE7a externa, mas aprecia desafios bem definidos e confian\xE7a expl\xEDcita em sua capacidade.",
    "Gosta de medir resultados: metas, n\xFAmeros e feedbacks objetivos ajudam a canalizar sua energia e ajustar a rota.",
    "Tem facilidade para tomar decis\xF5es impopulares quando julga que s\xE3o necess\xE1rias para o bem do conjunto.",
    "Em ambientes ca\xF3ticos, tende a propor rapidamente estruturas, rotinas, fluxos e prioridades.",
    "Quando encontra uma miss\xE3o que considera nobre, \xE9 capaz de trabalhar por anos com intensidade e foco, sem se desviar por modismos.",
    "Valoriza colaboradores independentes, respons\xE1veis e confi\xE1veis; respeita quem entrega resultado e honra compromissos.",
    "Em reuni\xF5es, prefere objetividade: agenda clara, decis\xF5es concretas, divis\xE3o de responsabilidades e pr\xF3ximos passos definidos.",
    "Em cargos de comando, tende a puxar a equipe para cima, elevando o n\xEDvel de exig\xEAncia e de desempenho."
  ];
  if (isPure) {
    work.push(
      "Como col\xE9rico mais \u201Cpuro\u201D, pode ter grande dificuldade em permanecer por muito tempo sob lideran\xE7a que considera fraca ou incoerente.",
      "Tem forte perfil empreendedor ou de comando: sente-se mais vivo quando pode montar seu pr\xF3prio caminho em vez de apenas executar ordens.",
      "Sofre ao ver desperd\xEDcio de tempo, talentos ou recursos em estruturas mal geridas, e costuma se tornar voz de reforma nesses ambientes.",
      "Pode ser um agente importante de mudan\xE7a em organiza\xE7\xF5es engessadas, desde que aprenda a dialogar e construir alian\xE7as em vez de apenas confrontar."
    );
  }
  if (isWithSanguine) {
    work.push(
      "Brilha em fun\xE7\xF5es de lideran\xE7a vis\xEDvel: dire\xE7\xE3o comercial, marketing, pol\xEDtica, evangeliza\xE7\xE3o p\xFAblica, vendas complexas.",
      "Precisa cercar-se de perfis mais anal\xEDticos e met\xF3dicos para cuidar de contratos, processos e detalhes que tende a negligenciar.",
      "Vai bem em contextos em que falar em p\xFAblico, negociar e representar uma causa fazem parte do dia a dia.",
      "Tem talento especial para \u201Cvender\u201D internamente projetos e mudan\xE7as, construindo entusiasmo e apoio pol\xEDtico.",
      "Precisa aprender a dizer \u201Cn\xE3o\u201D a oportunidades boas para proteger o que \xE9 essencial e conclu\xED-las bem."
    );
  }
  if (isWithMelancholic) {
    work.push(
      "Destaca-se em \xE1reas que exigem alta compet\xEAncia t\xE9cnica combinada com decis\xF5es firmes: direito, medicina, engenharia, gest\xE3o de projetos complexos, estrat\xE9gia.",
      "Pode cair facilmente no excesso de trabalho, sacrificando descanso e vida afetiva em nome de padr\xF5es de excel\xEAncia quase imposs\xEDveis.",
      "Tem perfil ideal para liderar equipes t\xE9cnicas, departamentos de alta responsabilidade ou projetos de longo prazo que exigem planejamento minucioso.",
      "Geralmente prefere cargos em que tenha autoridade formal e liberdade para implementar sistemas que garantam qualidade e coer\xEAncia.",
      "Precisa aprender a delegar sem microgerenciar, confiando que outros podem fazer bem, ainda que n\xE3o exatamente do seu jeito."
    );
  }
  if (isWithPhlegmatic) {
    work.push(
      "Tem perfil de gestor/administrador est\xE1vel: excelente para estruturar processos, organizar equipes e manter sistemas funcionando ao longo do tempo.",
      "\xC9 valioso em cargos de dire\xE7\xE3o ou coordena\xE7\xE3o em que seja preciso unir firmeza de decis\xE3o com diplomacia e senso de justi\xE7a.",
      "Consegue equilibrar a press\xE3o por metas com razo\xE1vel cuidado pelo clima da equipe, evitando tanto dureza quanto permissividade excessivas.",
      "Costuma ser bom em fun\xE7\xF5es de coordena\xE7\xE3o geral, articulando v\xE1rios setores, integrando rotinas e garantindo fluxo cont\xEDnuo.",
      "Pode subestimar o pr\xF3prio valor quando n\xE3o est\xE1 em fun\xE7\xF5es \u201Cheroicas\u201D; \xE9 importante reconhecer que a estabilidade que oferece \xE9, em si, um grande servi\xE7o."
    );
  }
  const relationships = [
    "Tende a ser muito aut\xEAntico e direto: fala o que pensa e dificilmente mant\xE9m um clima de \u201Cfaz de conta\u201D.",
    "Valoriza lealdade e confiabilidade: respeita profundamente quem mant\xE9m a palavra, assume responsabilidade e enfrenta a verdade de frente.",
    "Em conflitos, prefere resolver logo: busca o di\xE1logo direto ou a decis\xE3o clara, em vez de deixar o assunto se arrastar indefinidamente.",
    "Pode ter dificuldade para perceber nuances emocionais, esperando que o outro \u201Caguente firme\u201D e interpretando vulnerabilidade como exagero.",
    "Costuma admirar pessoas fortes e respons\xE1veis, e sentir pouca paci\xEAncia com vitimismo, desculpas repetidas ou falta de compromisso.",
    "Tende a demonstrar carinho mais por atos de servi\xE7o, prote\xE7\xE3o e provis\xE3o do que por gestos constantes de afeto verbal.",
    "Em amizades, costuma ser aquele que d\xE1 conselhos muito francos, \xE0s vezes desconfort\xE1veis, mas dif\xEDceis de ignorar.",
    "Quando se sente tra\xEDdo ou profundamente injusti\xE7ado, pode cortar rela\xE7\xF5es com firmeza, em vez de prolongar um di\xE1logo desgastante.",
    "Na conviv\xEAncia di\xE1ria, tende a se preocupar com organiza\xE7\xE3o, responsabilidades e cumprimento de deveres tanto quanto - ou mais do que - com pequenos gestos rom\xE2nticos.",
    "Quando aprende a escutar com aten\xE7\xE3o real, torna-se um aliado valioso: defende quem ama e toma atitudes concretas para ajudar."
  ];
  if (isPure || isWithMelancholic) {
    relationships.push(
      "Se n\xE3o vigiar o cora\xE7\xE3o, pode acumular m\xE1goas antigas, reinterpretando constantemente conflitos passados.",
      "Tem tend\xEAncia a refazer mentalmente discuss\xF5es, imaginando respostas melhores e alimentando argumentos internos.",
      "Pode demorar a perdoar de verdade, mesmo depois de uma reconcilia\xE7\xE3o aparente; precisa trabalhar o ato interior de miseric\xF3rdia."
    );
  }
  if (isWithSanguine) {
    relationships.push(
      "Costuma ser intenso e comunicativo: ama com entusiasmo, mas precisa moderar o tom das palavras e o ritmo das rea\xE7\xF5es.",
      "Tem facilidade em pedir desculpas depois de explos\xF5es, por\xE9m precisa aprender a evitar que elas se tornem t\xE3o frequentes.",
      "Traz muita vida, humor e movimento para os v\xEDnculos, mas pode provocar sensa\xE7\xE3o de \u201Cmontanha-russa\u201D emocional em pessoas mais sens\xEDveis.",
      "Gosta de momentos sociais, festas, encontros e grupos, e tende a incluir quem ama nesse dinamismo."
    );
  }
  if (isWithMelancholic) {
    relationships.push(
      "Pode ser um parceiro exigente: cobra coer\xEAncia, consist\xEAncia e profundidade, tanto de si quanto de quem caminha ao seu lado.",
      "Quando amadurece, torna-se um apoio s\xF3lido e fiel, capaz de orientar, proteger e sustentar quem ama com grande seriedade.",
      "Tem dificuldade em expressar verbalmente a pr\xF3pria afei\xE7\xE3o; muitas vezes ama em sil\xEAncio, por meio de sacrif\xEDcios e cuidados concretos.",
      "Precisa lembrar conscientemente de elogiar, agradecer e reconhecer o bem, n\xE3o apenas apontar o que falta ou precisa melhorar."
    );
  }
  if (isWithPhlegmatic) {
    relationships.push(
      "Costuma demonstrar amor mais atrav\xE9s de estabilidade, cuidado concreto e presen\xE7a fiel do que por grandes demonstra\xE7\xF5es afetivas.",
      "Tende a evitar discuss\xF5es longas, preferindo encerrar o assunto com uma decis\xE3o; precisa abrir espa\xE7o para que o outro fale e seja escutado.",
      "\xC9 visto como algu\xE9m confi\xE1vel e previs\xEDvel, o que traz seguran\xE7a afetiva para quem convive consigo.",
      "O desafio \xE9 n\xE3o confundir paz com sil\xEAncio: \xE0s vezes ser\xE1 necess\xE1rio entrar em conversas dif\xEDceis para que a rela\xE7\xE3o aprofunde."
    );
  }
  const family = [
    "No contexto familiar, tende a assumir naturalmente o papel de quem decide rumos, define limites e protege os seus.",
    "Pode ser exigente com c\xF4njuge e filhos, cobrando responsabilidade, disciplina e bom desempenho.",
    "Quando amadurecido, \xE9 um grande protetor: assume tarefas dif\xEDceis, enfrenta problemas pr\xE1ticos e n\xE3o foge de responsabilidades pesadas.",
    "Costuma sentir forte senso de dever em rela\xE7\xE3o \xE0 provis\xE3o material e \xE0 seguran\xE7a da fam\xEDlia.",
    "Em crises, tende a ser a pessoa que imediatamente procura solu\xE7\xF5es concretas: falar com m\xE9dico, reorganizar finan\xE7as, ajustar rotinas.",
    "Pode transformar sem perceber o lar em extens\xE3o do ambiente profissional, levando para dentro de casa a mesma l\xF3gica de metas e cobran\xE7as.",
    "Tem dificuldade em aceitar que membros da fam\xEDlia falhem repetidamente nas mesmas coisas; precisa aprender a acompanhar processos de crescimento mais lentos.",
    "Valoriza a verdade: n\xE3o gosta de fingir que est\xE1 tudo bem quando v\xEA problemas claros na educa\xE7\xE3o, na vida moral ou na organiza\xE7\xE3o dom\xE9stica."
  ];
  if (isPure) {
    family.push(
      "Precisa vigiar para n\xE3o transformar o lar em quartel: ordem \xE9 importante, mas n\xE3o pode sufocar a ternura, o elogio e o tempo gratuito com os seus.",
      "Pode ser tentado a tomar sozinho todas as decis\xF5es relevantes, reduzindo o c\xF4njuge a mero executante; \xE9 essencial perguntar, ouvir e considerar de fato a opini\xE3o do outro."
    );
  }
  if (isWithSanguine) {
    family.push(
      "Traz muita vida e movimento para dentro de casa, animando encontros, viagens e celebra\xE7\xF5es.",
      "Pode, por\xE9m, gerar um clima de altos e baixos de humor se n\xE3o aprender a moderar explos\xF5es e frustra\xE7\xF5es."
    );
  }
  if (isWithMelancholic) {
    family.push(
      "Pode ser pai ou m\xE3e muito atento(a) \xE0 forma\xE7\xE3o moral, intelectual e espiritual dos filhos, acompanhando de perto estudos, escolhas e amizades.",
      "Corre o risco de criticar mais do que encorajar; precisa deliberadamente cultivar elogio, carinho e reconhecimento sincero."
    );
  }
  if (isWithPhlegmatic) {
    family.push(
      "Tende a criar um lar organizado e previs\xEDvel, em que todos sabem o que esperar e quais s\xE3o os combinados.",
      "Pode ser um excelente \u201Cpilar silencioso\u201D da fam\xEDlia, sustentando financeiramente e logisticamente o dia a dia com const\xE2ncia admir\xE1vel."
    );
  }
  const spiritual = [
    "\xC9 naturalmente atra\xEDdo por ideais fortes, clareza doutrin\xE1ria, metas espirituais exigentes e desafios de santidade.",
    "Os v\xEDcios dominantes costumam girar em torno da soberba (confian\xE7a excessiva em si) e da ira (rea\xE7\xE3o forte quando a vontade \xE9 contrariada).",
    "Precisa cultivar humildade real: reconhecer que a pr\xF3pria energia \xE9 dom recebido, obedecer a orienta\xE7\xF5es prudentes e aceitar servi\xE7os simples e escondidos.",
    "Na vida de ora\xE7\xE3o, corre o risco do ativismo: fazer muito por Deus, mas permanecer pouco em sil\xEAncio diante d\u2019Ele.",
    "Tem facilidade para prop\xF3sitos firmes, promessas e resolu\xE7\xF5es; o desafio \xE9 n\xE3o transformar tudo em desempenho, esquecendo que a gra\xE7a precede o esfor\xE7o.",
    "Costuma sentir atra\xE7\xE3o por espiritualidades que falam de combate, disciplina, miss\xE3o, reforma e clareza moral.",
    "Pode confundir zelo com dureza: dizer que \u201Cdefende a verdade\u201D quando, na pr\xE1tica, est\xE1 apenas despejando irrita\xE7\xF5es pessoais.",
    "Precisa lembrar que, na perspectiva crist\xE3, a medida da santidade n\xE3o \xE9 a quantidade de coisas feitas, mas a qualidade da caridade colocada em cada ato.",
    "Tem grande capacidade de perseverar em pr\xE1ticas de piedade quando as assume com consci\xEAncia: missa frequente, confiss\xE3o regular, dire\xE7\xE3o espiritual, obras de miseric\xF3rdia.",
    "Pode beneficiar-se muito de retiros bem estruturados e de tempos fortes de recolhimento para reorientar a vontade e purificar inten\xE7\xF5es.",
    "A virtude da mansid\xE3o n\xE3o \xE9 opcional para o col\xE9rico: \xE9 a for\xE7a sob controle, que permite que a energia n\xE3o se converta em viol\xEAncia ou dureza."
  ];
  if (isPure || isWithMelancholic) {
    spiritual.push(
      "A medita\xE7\xE3o da Paix\xE3o de Cristo, a contempla\xE7\xE3o da mansid\xE3o do Cordeiro e o exame rigoroso da caridade fraterna s\xE3o rem\xE9dios centrais para o ressentimento e a dureza.",
      "Pr\xE1ticas concretas como pedir desculpas de iniciativa pr\xF3pria, reparar injusti\xE7as e elogiar sinceramente quem costuma apenas corrigir ajudam a purificar o cora\xE7\xE3o."
    );
  }
  if (isWithSanguine) {
    spiritual.push(
      "Pode viver grandes entusiasmos espirituais - retiros, miss\xF5es, obras apost\xF3licas - mas \xE9 chamado a traduzir esse fogo em perseveran\xE7a di\xE1ria na ora\xE7\xE3o e nos sacramentos.",
      "Precisa vigiar para n\xE3o confundir emo\xE7\xE3o com convers\xE3o: sentir muito em certos momentos n\xE3o substitui passos concretos de mudan\xE7a de vida."
    );
  }
  if (isWithPhlegmatic) {
    spiritual.push(
      "Tem potencial para uma fidelidade est\xE1vel: quando decide servir a Deus com seriedade, tende a manter-se fiel, desde que n\xE3o confunda paz com acomoda\xE7\xE3o.",
      "Precisa cultivar momentos em que permita que a Palavra o questione e desinstale, evitando que a vida espiritual se reduza a uma rotina confort\xE1vel demais."
    );
  }
  spiritual.push(
    "Quando o fogo col\xE9rico \xE9 disciplinado pela gra\xE7a e pelas virtudes - mansid\xE3o, paci\xEAncia, humildade - torna-se motor de grandes obras de Deus: o mesmo impulso que um dia perseguiu pode, como em S\xE3o Paulo, tornar-se impulso para evangelizar, construir, reparar e defender os mais fr\xE1geis."
  );
  const profile = {
    label,
    overview,
    strengths,
    risks,
    work,
    relationships,
    family,
    spiritual
  };
  return profile;
}

export { buildCholericPdfProfile };
//# sourceMappingURL=temperamentsPdf.choleric.mjs.map
