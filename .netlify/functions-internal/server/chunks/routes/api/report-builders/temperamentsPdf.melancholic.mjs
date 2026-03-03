function buildMelancholicPdfProfile(ctx) {
  var _a;
  const { secondary } = ctx;
  const secondaryId = (_a = secondary == null ? void 0 : secondary.id) != null ? _a : null;
  const isPure = !secondaryId || secondaryId === "melancholic";
  const isWithCholeric = secondaryId === "choleric";
  const isWithSanguine = secondaryId === "sanguine";
  const isWithPhlegmatic = secondaryId === "phlegmatic";
  const label = "Melanc\xF3lico";
  let overview = "";
  if (isPure) {
    overview = "O temperamento melanc\xF3lico \xE9 a \u201Cterra\u201D entre os temperamentos cl\xE1ssicos: frio, seco, profundo, orientado para a reflex\xE3o e para o sentido. Enquanto o sangu\xEDneo reage r\xE1pido e logo esquece, o melanc\xF3lico reage devagar, mas guarda por muito tempo aquilo que o tocou. As impress\xF5es n\xE3o apenas passam pelos seus sentidos: afundam, criam ra\xEDzes, tornam-se parte de um mundo interior complexo e intenso.\n\nNa linguagem da tradi\xE7\xE3o, o melanc\xF3lico \xE9 o tipo contemplativo: pensa, analisa, observa, volta sobre os pr\xF3prios passos. Raramente toma decis\xF5es impulsivas; precisa de tempo para considerar consequ\xEAncias, motivos, nuances. Sua mem\xF3ria afetiva e intelectual \xE9 profunda: lembra frases, detalhes, express\xF5es faciais, atmosferas inteiras. Isso o torna capaz de compreender em profundidade situa\xE7\xF5es e pessoas, mas tamb\xE9m o exp\xF5e ao risco de rumina\xE7\xF5es intermin\xE1veis.\n\nO melanc\xF3lico tem senso agudo de verdade, de justi\xE7a e de coer\xEAncia. Ele sofre quando percebe que algo \xE9 incoerente, malfeito ou moralmente errado. N\xE3o se contenta com a superf\xEDcie; pressente quase instintivamente a dist\xE2ncia entre o ideal e a realidade. Por isso, \xE9 frequentemente visto como \u201Ccr\xEDtico\u201D ou \u201Cpessimista\u201D, quando, na verdade, sua sensibilidade apenas enxerga fissuras que outros n\xE3o notam. Se essa lucidez n\xE3o \xE9 temperada pela esperan\xE7a e pela caridade, pode degenerar em amargura; se \xE9 purificada, torna-se sabedoria.\n\nDo ponto de vista psicol\xF3gico, a vida do melanc\xF3lico \xE9 marcada por um movimento de interioriza\xE7\xE3o. Depois de cada experi\xEAncia importante, ele volta para dentro, repassa o que aconteceu, procura entender significados, pergunta-se o que poderia ter feito de outro modo. Esse exerc\xEDcio constante de exame d\xE1 grande capacidade de autoconhecimento e profundidade espiritual, mas traz o risco de uma autoan\xE1lise paralisante, em que tudo \xE9 pesado, medido e julgado com dureza excessiva.\n\nNa hist\xF3ria espiritual, o temperamento melanc\xF3lico est\xE1 frequentemente ligado a grandes m\xEDsticos, pensadores e reformadores silenciosos: pessoas que n\xE3o necessariamente fizeram barulho, mas que aprofundaram como poucos o mist\xE9rio de Deus e da alma humana. Santas como Teresa de Lisieux, Edith Stein ou figuras como S\xE3o Tom\xE1s de Aquino ilustram bem esse casamento entre profundidade intelectual e sensibilidade delicada. Quando amadurecido, o melanc\xF3lico torna-se um guardi\xE3o da verdade, da beleza e da fidelidade, tanto na vida interior quanto na vida concreta.";
  } else if (isWithCholeric) {
    overview = "Na combina\xE7\xE3o melanc\xF3lico-col\xE9rico, a profundidade anal\xEDtica e idealista do melanc\xF3lico encontra a vontade firme e combativa do col\xE9rico. \xC9 uma das misturas mais exigentes e intensas entre os temperamentos: pensa muito, sente muito e decide com grande for\xE7a, buscando n\xE3o apenas que as coisas funcionem, mas que funcionem de maneira justa, coerente e impec\xE1vel.\n\nO melanc\xF3lico-col\xE9rico (Mel-Col) vive num eixo entre o ideal e a execu\xE7\xE3o. De um lado, o melanc\xF3lico percebe princ\xEDpios, valores, fragilidades estruturais e injusti\xE7as ocultas; de outro, o col\xE9rico se recusa a ficar apenas na cr\xEDtica, exigindo a\xE7\xE3o, reforma, combate. Quando essa combina\xE7\xE3o \xE9 bem integrada, surgem personalidades que n\xE3o apenas veem o que est\xE1 errado, mas tamb\xE9m t\xEAm coragem e capacidade de corrigir com firmeza.\n\nTrata-se de um perfil s\xE9rio, intenso e de alta exig\xEAncia. N\xE3o se satisfaz com \u201Cmais ou menos\u201D; quer o certo, o bem feito, o coerente com os princ\xEDpios. Isso o torna excelente planejador, estrategista e condutor de mudan\xE7as profundas, mas tamb\xE9m algu\xE9m sujeito a tens\xF5es internas: o padr\xE3o interno costuma ser t\xE3o alto que quase nada parece estar \xE0 altura, nem o pr\xF3prio desempenho nem o dos outros.\n\nEm termos de presen\xE7a, o Mel-Col n\xE3o costuma ser espalhafatoso. Sua autoridade \xE9 silenciosa, nascida da compet\xEAncia, da const\xE2ncia e da clareza de vis\xE3o. Quando fala, por\xE9m, suas palavras carregam peso: t\xEAm l\xF3gica, conte\xFAdo e um certo tom de inevitabilidade. Se aprende a unir essa for\xE7a a um estilo de comunica\xE7\xE3o paciente e misericordioso, torna-se um l\xEDder profundamente confi\xE1vel; se n\xE3o, pode ser percebido como duro, inflex\xEDvel e pouco acess\xEDvel.";
  } else if (isWithSanguine) {
    overview = "No melanc\xF3lico-sangu\xEDneo, a profundidade introspectiva do melanc\xF3lico encontra a leveza, a sociabilidade e a expressividade do sangu\xEDneo. \xC9 uma combina\xE7\xE3o rica e complexa: por dentro, mundos profundos; por fora, simpatia, imagina\xE7\xE3o e certa facilidade de conviv\xEAncia.\n\nO melanc\xF3lico-sangu\xEDneo (Mel-San) costuma oscilar entre momentos de extrovers\xE3o criativa e fases de recolhimento silencioso. H\xE1 dias em que fala, brinca, conta hist\xF3rias, entusiasma-se com projetos; e outros em que se recolhe, analisa, questiona tudo o que disse, repensa rela\xE7\xF5es e sente o peso das imperfei\xE7\xF5es pr\xF3prias e alheias. Enquanto o sangu\xEDneo puro esquece r\xE1pido o que o feriu, o componente melanc\xF3lico grava profundamente essas experi\xEAncias, fazendo com que cr\xEDticas e rejei\xE7\xF5es tenham um impacto duradouro.\n\nTrata-se de um perfil especialmente apto para a arte, a comunica\xE7\xE3o e o acompanhamento humano. O lado sangu\xEDneo oferece espontaneidade, cor, narrativa; o melanc\xF3lico d\xE1 conte\xFAdo, textura, densidade. Da\xED podem surgir professores marcantes, escritores, m\xFAsicos, catequistas, pregadores e terapeutas que falam ao cora\xE7\xE3o com delicadeza e precis\xE3o. Ao mesmo tempo, essa mesma sensibilidade torna o Mel-San vulner\xE1vel a instabilidades de humor e a sentimentos de inadequa\xE7\xE3o, sobretudo quando acredita n\xE3o correspond\xEA-lo ao ideal que abra\xE7ou.\n\nO caminho de crescimento passa por aprender a n\xE3o absolutizar nem as euforias nem os abatimentos: nem tudo \xE9 t\xE3o maravilhoso quanto parece nos dias de entusiasmo, nem tudo \xE9 t\xE3o tr\xE1gico quanto parece nos dias de sombra. Quando encontra ritmo de vida est\xE1vel, bons v\xEDnculos e acompanhamento espiritual, o melanc\xF3lico-sangu\xEDneo torna-se um grande mediador entre o mundo das ideias e o mundo das emo\xE7\xF5es das pessoas ao seu redor.";
  } else if (isWithPhlegmatic) {
    overview = "No melanc\xF3lico-fleum\xE1tico, a profundidade sens\xEDvel do melanc\xF3lico une-se \xE0 calma, \xE0 estabilidade e \xE0 prud\xEAncia do fleum\xE1tico. \xC9 uma combina\xE7\xE3o de grande serenidade potencial: pensa muito, sente muito, mas tende a reagir de forma menos explosiva e mais contida.\n\nO melanc\xF3lico-fleum\xE1tico (Mel-Fle) \xE9 o \u201Cobservador silencioso\u201D: nota detalhes, percebe nuances, capta ambientes, mas raramente se imp\xF5e com for\xE7a. Prefere analisar antes de falar, escutar antes de intervir, refletir antes de decidir. Isso o torna confi\xE1vel em contextos que exigem discri\xE7\xE3o, estabilidade e vis\xE3o de conjunto, embora possa ser interpretado como distante ou indiferente por quem espera manifesta\xE7\xF5es afetivas exuberantes.\n\nEm termos de ritmo, trata-se de um temperamento mais lento, tanto para iniciar quanto para mudar. Uma vez que decide algo em consci\xEAncia, por\xE9m, mant\xE9m o rumo com grande const\xE2ncia, pois o melanc\xF3lico oferece profundidade de convic\xE7\xE3o e o fleum\xE1tico oferece resist\xEAncia \xE0 agita\xE7\xE3o externa. Esse tipo de pessoa \xE9 particularmente valioso em fun\xE7\xF5es de cuidado prolongado, acompanhamento, doc\xEAncia e administra\xE7\xE3o de m\xE9dio e longo prazo.\n\nO principal risco est\xE1 na acomoda\xE7\xE3o triste: sentir muito, enxergar muito, mas fazer pouco. O medo de errar (melanc\xF3lico) somado ao medo de conflitos (fleum\xE1tico) pode gerar adiamentos cr\xF4nicos, projetos nunca iniciados e uma sensa\xE7\xE3o de vida \u201Cpela metade\u201D. Quando supera esse bloqueio e aprende a dar passos simples, ainda que pequenos, o Mel-Fle torna-se um dos perfis mais fi\xE9is, prudentes e s\xF3lidos que existem.";
  } else {
    overview = "O temperamento melanc\xF3lico, em qualquer combina\xE7\xE3o, \xE9 marcado por profundidade, mem\xF3ria longa e forte senso de coer\xEAncia. \xC9 o tipo que percebe fissuras em estruturas, contradi\xE7\xF5es em discursos e injusti\xE7as escondidas, mesmo quando ningu\xE9m parece incomodado. Enquanto outros se adaptam facilmente, o melanc\xF3lico sente a necessidade de compreender, de dar nome, de buscar um porqu\xEA.\n\nEssa sensibilidade pode ser tanto fonte de sabedoria quanto de sofrimento: quando unida \xE0 esperan\xE7a e \xE0 caridade, faz do melanc\xF3lico um conselheiro seguro, um amigo leal e um contemplativo fecundo; quando dominada pelo medo ou pela amargura, fecha-o num mundo interior pesado, cr\xEDtico e desanimado. O processo de maturidade espiritual consiste justamente em aprender a oferecer a Deus essa profundidade, de modo que ela se torne lugar de encontro e n\xE3o apenas de an\xE1lise.";
  }
  const strengths = [
    "Profundidade de reflex\xE3o: tende a analisar causas, fundamentos e consequ\xEAncias, n\xE3o se contentando com explica\xE7\xF5es superficiais.",
    "Mem\xF3ria rica e seletiva: guarda detalhes significativos, palavras, gestos e atmosferas, o que favorece compreens\xE3o fina de pessoas e situa\xE7\xF5es.",
    "Senso agudo de justi\xE7a e verdade: percebe incoer\xEAncias, injusti\xE7as e falsidades com grande rapidez interior, mesmo que demore a express\xE1-las.",
    "Capacidade de concentra\xE7\xE3o: consegue dedicar longos per\xEDodos a um mesmo tema, estudo ou projeto, sem necessidade constante de est\xEDmulos externos.",
    "Sensibilidade est\xE9tica e simb\xF3lica: tende a perceber beleza na arte, na liturgia, na natureza, em gestos pequenos e discretos.",
    "Empatia profunda: n\xE3o apenas nota que o outro sofre, mas intui o tipo de sofrimento, as motiva\xE7\xF5es e as feridas ocultas.",
    "Lealdade duradoura: cria v\xEDnculos poucos, mas muito s\xE9rios; quando ama, tende a permanecer fiel mesmo em tempos dif\xEDceis.",
    "Capacidade de suportar sacrif\xEDcios silenciosos, sem necessidade de reconhecimento p\xFAblico.",
    "Inclina\xE7\xE3o para a coer\xEAncia de vida: busca alinhar discurso, valores e comportamento, sofrendo quando percebe que vive abaixo do ideal.",
    "Olhar cr\xEDtico construtivo: quando amadurecido, \xE9 capaz de identificar problemas estruturais e propor melhorias s\xF3lidas, n\xE3o apenas cr\xEDticas destrutivas.",
    "Facilidade para trabalhos que exigem precis\xE3o, m\xE9todo, pesquisa, escrita e organiza\xE7\xE3o intelectual.",
    "Voca\xE7\xE3o natural para o recolhimento, o estudo e a vida interior, o que favorece aprofundamento espiritual e intelectual ao longo dos anos."
  ];
  if (isWithCholeric) {
    strengths.push(
      "Uni\xE3o de profundidade anal\xEDtica com capacidade de execu\xE7\xE3o: n\xE3o apenas v\xEA o que est\xE1 errado, mas sabe planejar como corrigir e agir com firmeza.",
      "Grande for\xE7a de vontade quando encontra uma causa justa: trabalha com intensidade e resili\xEAncia acima da m\xE9dia.",
      "Perfil ideal para liderar reformas, revis\xF5es doutrinais, corre\xE7\xF5es de rota e projetos que exijam rigor e coragem moral.",
      "Capacidade de tomar decis\xF5es dif\xEDceis baseadas em princ\xEDpios, ainda que sejam impopulares no curto prazo.",
      "Const\xE2ncia na defesa de valores: n\xE3o se dobra facilmente \xE0 press\xE3o do ambiente quando est\xE1 convicto de algo em consci\xEAncia."
    );
  }
  if (isWithSanguine) {
    strengths.push(
      "Capacidade de comunicar conte\xFAdos profundos de forma acess\xEDvel, imag\xE9tica e envolvente.",
      "Boa combina\xE7\xE3o de sensibilidade e espontaneidade: percebe nuances internas e consegue express\xE1-las com certa leveza.",
      "Talento para atividades art\xEDsticas, pedag\xF3gicas e pastorais em que seja necess\xE1rio unir emo\xE7\xE3o, beleza e subst\xE2ncia.",
      "Facilidade em acolher pessoas feridas: ouve com aten\xE7\xE3o, compreende em profundidade e oferece uma palavra que toca o cora\xE7\xE3o.",
      "Possibilidade de criar ambientes em que se fala de coisas s\xE9rias sem perder totalmente o humor e a alegria."
    );
  }
  if (isWithPhlegmatic) {
    strengths.push(
      "Estabilidade emocional maior do que a do melanc\xF3lico puro, com menos explos\xF5es e rea\xE7\xF5es dram\xE1ticas.",
      "Grande capacidade de acompanhar processos longos: estudos extensos, projetos de m\xE9dio prazo, hist\xF3rias de vida complexas.",
      "Perfil de conselheiro sereno: escuta muito, julga com prud\xEAncia e fala apenas quando j\xE1 ponderou o suficiente.",
      "Tend\xEAncia a manter rotinas e compromissos quando bem estabelecidos, mesmo sem grande entusiasmo sens\xEDvel.",
      "Discri\xE7\xE3o e confiabilidade: sabe guardar segredos, respeitar limites e n\xE3o expor o outro desnecessariamente."
    );
  }
  const risks = [
    "Pessimismo habitual: tend\xEAncia a fixar-se mais no que falta, no que est\xE1 errado ou no que pode dar errado do que nas possibilidades de bem.",
    "Autoexig\xEAncia excessiva, com facilidade para culpar-se e para interpretar falhas como prova de indignidade profunda.",
    "Risco de rumina\xE7\xE3o mental: repassar muitas vezes as mesmas cenas, frases e decis\xF5es, sem chegar a resolu\xE7\xF5es concretas.",
    "Dificuldade em iniciar projetos por medo de n\xE3o conseguir termin\xE1-los com perfei\xE7\xE3o.",
    "Tend\xEAncia a interpretar cr\xEDticas ou corre\xE7\xF5es em chave pessoal, com feridas profundas que levam tempo para cicatrizar.",
    "Possibilidade de alimentar ressentimentos escondidos, sobretudo quando n\xE3o se sente compreendido ou valorizado.",
    "Inclina\xE7\xE3o \xE0 retra\xE7\xE3o social: isolar-se quando sofre, em vez de buscar ajuda ou di\xE1logo.",
    "Risco de usar a lucidez para justificar imobilismo: como enxerga os riscos, pode concluir que \u201Cn\xE3o vale a pena tentar\u201D.",
    "Perigo de endurecer ju\xEDzos sobre pessoas e institui\xE7\xF5es, criando imagens internas dif\xEDceis de revisar mesmo diante de fatos novos.",
    "Vulnerabilidade a estados de tristeza prolongada, des\xE2nimo e sensa\xE7\xE3o de inadequa\xE7\xE3o cr\xF4nica."
  ];
  if (isPure || isWithCholeric) {
    risks.push(
      "Perfeccionismo r\xEDgido: dificuldade em aceitar solu\xE7\xF5es suficientemente boas, preferindo muitas vezes adiar ou abandonar algo a faz\xEA-lo de forma imperfeita.",
      "Tend\xEAncia a julgar com severidade tanto a si mesmo quanto aos outros, confundindo erro pontual com falha de car\xE1ter.",
      "Risco de tornar-se duro, sarc\xE1stico ou amargo quando acumula decep\xE7\xF5es sem trabalh\xE1-las \xE0 luz da f\xE9 e da caridade.",
      "Inclina\xE7\xE3o a assumir a posi\xE7\xE3o de \u201Cguardi\xE3o solit\xE1rio da verdade\u201D, com pouca disposi\xE7\xE3o para escutar e rever percep\xE7\xF5es."
    );
  }
  if (isWithSanguine) {
    risks.push(
      "Oscila\xE7\xF5es fortes de humor: altern\xE2ncia entre fases de grande sociabilidade e per\xEDodos de recolhimento melanc\xF3lico.",
      "Perigo de dramatizar conflitos, ampliando internamente situa\xE7\xF5es que objetivamente poderiam ser mais simples.",
      "Tend\xEAncia a prometer mudan\xE7as ou iniciativas em momentos de entusiasmo, mas a paralisar diante do medo de n\xE3o faz\xEA-las com perfei\xE7\xE3o.",
      "Vulnerabilidade elevada a rejei\xE7\xF5es e cr\xEDticas, que podem desencadear crises de autoestima e autossabotagem."
    );
  }
  if (isWithPhlegmatic) {
    risks.push(
      "Acomoda\xE7\xE3o triste: perceber que algo est\xE1 errado, mas n\xE3o encontrar for\xE7a para mudar, permanecendo numa insatisfa\xE7\xE3o silenciosa.",
      "Procrastina\xE7\xE3o cr\xF4nica em decis\xF5es importantes, tanto por medo de errar quanto por resist\xEAncia a conflitos.",
      "Risco de criar um mundo interior rico, por\xE9m pouco traduzido em a\xE7\xF5es concretas de servi\xE7o e caridade.",
      "Possibilidade de conformar-se com um n\xEDvel de vida espiritual e profissional abaixo de suas capacidades por medo de sair da zona de conforto."
    );
  }
  const work = [
    "Funciona melhor em ambientes estruturados, relativamente silenciosos e com espa\xE7o para concentra\xE7\xE3o e profundidade.",
    "Prefere tarefas que tenham sentido claro, coer\xEAncia interna e repercuss\xE3o real na vida das pessoas, ainda que discretamente.",
    "Tende a ser cuidadoso com prazos, qualidade e detalhes, evitando entregar algo que considere malfeito.",
    "Gosta de ter tempo para estudar, preparar-se e refletir antes de executar ou falar em p\xFAblico.",
    "Valoriza lideran\xE7as coerentes e competentes, sofrendo profundamente quando percebe injusti\xE7a, arbitrariedade ou amadorismo.",
    "Lida bem com trabalhos que exigem an\xE1lise de dados, pesquisa, reda\xE7\xE3o, revis\xE3o, sistematiza\xE7\xE3o e planejamento.",
    "Sente-se realizado quando pode aprofundar um tema ao longo dos anos, tornando-se refer\xEAncia naquela \xE1rea."
  ];
  if (isPure) {
    work.push(
      "Tem aptid\xE3o para carreiras intelectuais, acad\xEAmicas, jur\xEDdicas, cient\xEDficas, art\xEDsticas ou ligadas \xE0 forma\xE7\xE3o doutrinal e filos\xF3fica.",
      "Pode experimentar grande frustra\xE7\xE3o em ambientes muito superficiais, competitivos sem sentido ou guiados apenas por modismos.",
      "Precisa proteger-se contra o excesso de autocr\xEDtica que paralisa: pequenos passos constantes produzem mais fruto que eternos planos perfeitos.",
      "Beneficia-se de trabalhar com colegas mais pr\xE1ticos e extrovertidos que ajudem a tirar boas ideias do papel."
    );
  }
  if (isWithCholeric) {
    work.push(
      "Perfil ideal para liderar projetos complexos que exijam vis\xE3o de conjunto, rigor t\xE9cnico e capacidade de decis\xE3o.",
      "Destaca-se em fun\xE7\xF5es de coordena\xE7\xE3o, dire\xE7\xE3o acad\xEAmica, gest\xE3o de qualidade, estrat\xE9gia institucional e reforma de estruturas.",
      "Consegue construir sistemas, normas e procedimentos s\xF3lidos, coerentes com princ\xEDpios bem definidos.",
      "Precisa apenas cuidar para que a busca de excel\xEAncia n\xE3o se torne fonte de tens\xE3o permanente para si e para a equipe."
    );
  }
  if (isWithSanguine) {
    work.push(
      "Vai bem em fun\xE7\xF5es que combinem conte\xFAdo e comunica\xE7\xE3o: ensino, prega\xE7\xE3o, forma\xE7\xE3o de adultos, produ\xE7\xE3o de conte\xFAdo, arte e cultura.",
      "Consegue traduzir temas complexos em linguagem viva, cheia de imagens e exemplos concretos.",
      "Precisa de algum grau de liberdade criativa e de um ambiente minimamente humano para produzir bem; contextos muito mecanizados o sufocam.",
      "Ganha muito quando aprende a organizar melhor o tempo, evitando que oscila\xE7\xF5es de humor determinem o ritmo do trabalho."
    );
  }
  if (isWithPhlegmatic) {
    work.push(
      "Tem perfil de profissional est\xE1vel, confi\xE1vel e atento, ideal para fun\xE7\xF5es de acompanhamento de casos, tutoria, secretariado acad\xEAmico, dire\xE7\xE3o de estudos, biblioteca e arquivo.",
      "Pode ser um excelente \u201Csegundo de bordo\u201D: algu\xE9m que sustenta o trabalho com const\xE2ncia, mesmo sem buscar grande visibilidade.",
      "Tende a construir rotinas s\xF3lidas e a manter a mesma linha de trabalho por muitos anos, o que favorece obras duradouras.",
      "Precisa ser encorajado a assumir, de tempos em tempos, desafios um pouco maiores, para n\xE3o se instalar em tarefas aqu\xE9m de sua capacidade real."
    );
  }
  const relationships = [
    "Tende a ser reservado no in\xEDcio, mas muito profundo quando decide confiar em algu\xE9m.",
    "Valoriza lealdade, sinceridade e coer\xEAncia: prefere poucos amigos, por\xE9m muito fi\xE9is, a muitos v\xEDnculos superficiais.",
    "Escuta com aten\xE7\xE3o e costuma lembrar detalhes importantes da hist\xF3ria dos outros, o que faz com que as pessoas se sintam realmente vistas.",
    "Prefere conversas significativas a pequenas conversas sociais; tende a cansar-se de intera\xE7\xF5es muito superficiais.",
    "Tem dificuldade em expressar espontaneamente elogios e carinho, mesmo quando ama profundamente; muitas vezes demonstra amor mais por servi\xE7o do que por palavras.",
    "Pode interpretar comportamentos amb\xEDguos em chave negativa, imaginando desinteresse, rejei\xE7\xE3o ou julgamento mesmo quando isso n\xE3o corresponde \xE0 inten\xE7\xE3o alheia.",
    "Quando se sente ferido, tende a recolher-se, silenciar e ruminar internamente, o que pode agravar mal-entendidos.",
    "\xC9 capaz de grande fidelidade afetiva: n\xE3o abandona facilmente quem considera estar sob sua responsabilidade ou amizade."
  ];
  if (isPure || isWithCholeric) {
    relationships.push(
      "Pode ser percebido como duro ou cr\xEDtico quando fala, sobretudo se n\xE3o vigia o tom de voz ou o momento adequado para apontar problemas.",
      "Tem tend\xEAncia a guardar por muito tempo certas frases ou atitudes que o feriram, revivendo mentalmente discuss\xF5es passadas.",
      "Precisa aprender a comunicar dores e expectativas de forma expl\xEDcita, em vez de esperar que o outro adivinhe."
    );
  }
  if (isWithSanguine) {
    relationships.push(
      "Une profundidade com certa leveza relacional, sendo capaz de alternar conversa s\xE9ria e humor de forma natural.",
      "Pode tornar-se muito dependente da aprova\xE7\xE3o afetiva de pessoas significativas, sofrendo quando n\xE3o recebe sinais claros de carinho.",
      "Corre o risco de entrar em din\xE2micas de \u201Ctudo ou nada\u201D: v\xEDnculos extremamente intensos seguidos de afastamentos abruptos quando se sente ferido.",
      "Quando amadurece, \xE9 um amigo que sabe animar, consolar e, ao mesmo tempo, dizer verdades importantes com delicadeza."
    );
  }
  if (isWithPhlegmatic) {
    relationships.push(
      "\xC9 geralmente percebido como pessoa calma, s\xE9ria e dispon\xEDvel, mesmo que n\xE3o fale muito.",
      "Gosta de rela\xE7\xF5es est\xE1veis, previs\xEDveis, com espa\xE7o para sil\xEAncio e para partilhas mais profundas em momentos escolhidos.",
      "Pode evitar conflitos diretos, preferindo engolir inc\xF4modos at\xE9 que estes se acumulem e explodam em momentos de desabafo mais intenso.",
      "Quando aprende a falar cedo e com serenidade, torna-se um parceiro relacional de grande seguran\xE7a e maturidade."
    );
  }
  const family = [
    "No ambiente familiar, tende a ser aquela pessoa que observa tudo: atmosferas, rea\xE7\xF5es, injusti\xE7as e necessidades silenciosas.",
    "Valoriza muito a estabilidade do lar, a coer\xEAncia entre discurso e pr\xE1tica e o respeito m\xFAtuo entre os membros da fam\xEDlia.",
    "Costuma ser sens\xEDvel a injusti\xE7as dentro de casa: favoritismos, grosserias, humilha\xE7\xF5es ou incoer\xEAncias entre o que se prega e o que se vive.",
    "Geralmente assume silenciosamente muitas responsabilidades, sobretudo quando percebe que s\xE3o necess\xE1rias para o bem dos demais."
  ];
  if (isPure) {
    family.push(
      "Pode ser um pai ou m\xE3e muito atento \xE0 forma\xE7\xE3o moral e intelectual dos filhos, por\xE9m sujeito a apontar mais falhas do que virtudes.",
      "Precisa lembrar-se conscientemente de elogiar, agradecer e celebrar pequenas conquistas, n\xE3o apenas corrigir e advertir.",
      "Corre o risco de deixar que o clima interior de tristeza ou cansa\xE7o se torne atmosfera constante do lar se n\xE3o busca cuidar da pr\xF3pria afetividade."
    );
  }
  if (isWithCholeric) {
    family.push(
      "Tende a assumir naturalmente a dire\xE7\xE3o das grandes decis\xF5es familiares, buscando o que considera justo e correto.",
      "Pode estabelecer regras claras, hor\xE1rios, crit\xE9rios de estudo, de f\xE9 e de vida comunit\xE1ria, o que traz ordem, mas tamb\xE9m pode gerar rigidez se n\xE3o houver espa\xE7o para di\xE1logo.",
      "Precisa vigiar para n\xE3o transformar a casa em extens\xE3o de um projeto ou institui\xE7\xE3o, lembrando-se de que a fam\xEDlia n\xE3o \xE9 apenas \u201Cestrutura\u201D, mas comunh\xE3o de pessoas."
    );
  }
  if (isWithSanguine) {
    family.push(
      "Pode oferecer um ambiente em que h\xE1, ao mesmo tempo, profundidade e momentos de alegria leve, hist\xF3rias, m\xFAsicas e partilhas ricas.",
      "Tende a preocupar-se muito com o clima emocional da casa, sofrendo quando percebe tens\xF5es n\xE3o resolvidas.",
      "Precisa cuidar para que suas oscila\xE7\xF5es internas n\xE3o definam totalmente o humor familiar, sobretudo diante de crian\xE7as mais sens\xEDveis."
    );
  }
  if (isWithPhlegmatic) {
    family.push(
      "Tende a criar um lar organizado, sereno e relativamente previs\xEDvel, com rotinas que trazem seguran\xE7a.",
      "\xC9 um pilar silencioso: sustenta financeiramente, logisticamente e emocionalmente o dia a dia, muitas vezes sem grande visibilidade.",
      "O desafio est\xE1 em n\xE3o deixar que o lar se reduza a uma soma de tarefas e obriga\xE7\xF5es, mantendo espa\xE7o para festa, ternura e di\xE1logo aberto."
    );
  }
  const spiritual = [
    "\xC9 naturalmente inclinado \xE0 reflex\xE3o espiritual, \xE0 leitura s\xE9ria e \xE0 busca de sentido profundo na f\xE9.",
    "Tende a levar muito a s\xE9rio as verdades que descobre: n\xE3o gosta de viver de forma incoerente com o que reconhece como vontade de Deus.",
    "Tem facilidade para a ora\xE7\xE3o silenciosa, meditativa, sobretudo quando encontra m\xE9todos claros e textos ricos.",
    "\xC9 capaz de grande fidelidade em pr\xE1ticas espirituais, sobretudo quando as assume por convic\xE7\xE3o e n\xE3o apenas por emo\xE7\xE3o do momento."
  ];
  if (isPure || isWithCholeric) {
    spiritual.push(
      "Est\xE1 especialmente sujeito ao escr\xFApulo: exagerar a gravidade de faltas leves, duvidar do perd\xE3o de Deus e revisar confess\xF5es passadas.",
      "Precisa de dire\xE7\xE3o espiritual firme e misericordiosa, que o ajude a distinguir entre verdadeira contri\xE7\xE3o e culpa neur\xF3tica.",
      "Corre o risco de confundir dureza consigo e com os outros com \u201Czelo pela verdade\u201D, quando, na realidade, falta caridade.",
      "A medita\xE7\xE3o da miseric\xF3rdia divina, das par\xE1bolas do perd\xE3o e da paci\xEAncia de Cristo \xE9 um rem\xE9dio central para equilibrar justi\xE7a e amor."
    );
  }
  if (isWithSanguine) {
    spiritual.push(
      "Vive tens\xF5es entre momentos de grande consola\xE7\xE3o sens\xEDvel e per\xEDodos de aridez e questionamento; precisa aprender que a fidelidade vale mais que o sentimento.",
      "Pode experimentar fortes desejos de santidade acompanhados de medos intensos de fracassar; o segredo est\xE1 em dar passos pequenos e concretos, n\xE3o em promessas grandiosas.",
      "Beneficia-se de formas de ora\xE7\xE3o que integrem imagina\xE7\xE3o, afeto e doutrina, como a lectio divina bem orientada ou medita\xE7\xF5es guiadas.",
      "Tem potencial para comunicar a f\xE9 com linguagem rica, imagens vivas e sensibilidade po\xE9tica, ajudando outros a rezar."
    );
  }
  if (isWithPhlegmatic) {
    spiritual.push(
      "Possui terreno privilegiado para uma vida espiritual est\xE1vel e perseverante, ainda que pouco emotiva.",
      "Corre o risco de transformar a vida de ora\xE7\xE3o em rotina sem alma, mantendo as pr\xE1ticas, mas perdendo progressivamente o sentido interior.",
      "\xC9 muito ajudado por retiros peri\xF3dicos, nos quais possa reavivar as motiva\xE7\xF5es profundas e reordenar o cora\xE7\xE3o \xE0 luz do Evangelho.",
      "Pode tornar-se suporte silencioso de muitas obras de apostolado, oferecendo sacrif\xEDcios ocultos, intercess\xE3o e fidelidade simples no cotidiano."
    );
  }
  spiritual.push(
    "Quando a gra\xE7a cura suas feridas, educa seu perfeccionismo e acende nele a virtude da esperan\xE7a, o melanc\xF3lico torna-se um dos instrumentos mais firmes de Deus. Sua profundidade deixa de ser peso e torna-se fonte de conselho, consola\xE7\xE3o e sabedoria para muitos. A cruz que um dia o fez sofrer em sil\xEAncio converte-se em lugar de comunh\xE3o com Cristo, e sua capacidade de ver o que falta transforma-se em desejo de reparar com amor aquilo que o pecado destruiu."
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

export { buildMelancholicPdfProfile };
//# sourceMappingURL=temperamentsPdf.melancholic.mjs.map
