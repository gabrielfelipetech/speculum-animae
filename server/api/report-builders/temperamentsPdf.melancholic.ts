// server/api/report-builders/temperamentsPdf.melancholic.ts
import type {
  TemperamentProfile,
  TemperamentsBuilderContext,
} from './temperamentsPdf';

/**
 * Constrói o perfil PDF para o temperamento melancólico,
 * levando em conta a combinação principal + secundário.
 *
 * Combinações tratadas:
 *  - Melancólico puro / melancólico-melancólico
 *  - Melancólico-colérico
 *  - Melancólico-sanguíneo
 *  - Melancólico-fleumático
 */
export function buildMelancholicPdfProfile(
  ctx: TemperamentsBuilderContext,
): TemperamentProfile {
  const { secondary } = ctx;
  const secondaryId = secondary?.id ?? null;

  const isPure = !secondaryId || secondaryId === 'melancholic';
  const isWithCholeric = secondaryId === 'choleric';
  const isWithSanguine = secondaryId === 'sanguine';
  const isWithPhlegmatic = secondaryId === 'phlegmatic';

  const label = 'Melancólico';

  // -------------------------------------------------------------------------
  // OVERVIEW
  // -------------------------------------------------------------------------
  let overview = '';

  if (isPure) {
    overview =
      'O temperamento melancólico é a “terra” entre os temperamentos clássicos: frio, seco, profundo, orientado para a reflexão e para o sentido. ' +
      'Enquanto o sanguíneo reage rápido e logo esquece, o melancólico reage devagar, mas guarda por muito tempo aquilo que o tocou. ' +
      'As impressões não apenas passam pelos seus sentidos: afundam, criam raízes, tornam-se parte de um mundo interior complexo e intenso.\n\n' +
      'Na linguagem da tradição, o melancólico é o tipo contemplativo: pensa, analisa, observa, volta sobre os próprios passos. ' +
      'Raramente toma decisões impulsivas; precisa de tempo para considerar consequências, motivos, nuances. ' +
      'Sua memória afetiva e intelectual é profunda: lembra frases, detalhes, expressões faciais, atmosferas inteiras. ' +
      'Isso o torna capaz de compreender em profundidade situações e pessoas, mas também o expõe ao risco de ruminações intermináveis.\n\n' +
      'O melancólico tem senso agudo de verdade, de justiça e de coerência. Ele sofre quando percebe que algo é incoerente, malfeito ou moralmente errado. ' +
      'Não se contenta com a superfície; pressente quase instintivamente a distância entre o ideal e a realidade. ' +
      'Por isso, é frequentemente visto como “crítico” ou “pessimista”, quando, na verdade, sua sensibilidade apenas enxerga fissuras que outros não notam. ' +
      'Se essa lucidez não é temperada pela esperança e pela caridade, pode degenerar em amargura; se é purificada, torna-se sabedoria.\n\n' +
      'Do ponto de vista psicológico, a vida do melancólico é marcada por um movimento de interiorização. ' +
      'Depois de cada experiência importante, ele volta para dentro, repassa o que aconteceu, procura entender significados, pergunta-se o que poderia ter feito de outro modo. ' +
      'Esse exercício constante de exame dá grande capacidade de autoconhecimento e profundidade espiritual, mas traz o risco de uma autoanálise paralisante, ' +
      'em que tudo é pesado, medido e julgado com dureza excessiva.\n\n' +
      'Na história espiritual, o temperamento melancólico está frequentemente ligado a grandes místicos, pensadores e reformadores silenciosos: ' +
      'pessoas que não necessariamente fizeram barulho, mas que aprofundaram como poucos o mistério de Deus e da alma humana. ' +
      'Santas como Teresa de Lisieux, Edith Stein ou figuras como São Tomás de Aquino ilustram bem esse casamento entre profundidade intelectual e sensibilidade delicada. ' +
      'Quando amadurecido, o melancólico torna-se um guardião da verdade, da beleza e da fidelidade, tanto na vida interior quanto na vida concreta.';    
  } else if (isWithCholeric) {
    overview =
      'Na combinação melancólico-colérico, a profundidade analítica e idealista do melancólico encontra a vontade firme e combativa do colérico. ' +
      'É uma das misturas mais exigentes e intensas entre os temperamentos: pensa muito, sente muito e decide com grande força, ' +
      'buscando não apenas que as coisas funcionem, mas que funcionem de maneira justa, coerente e impecável.\n\n' +
      'O melancólico-colérico (Mel-Col) vive num eixo entre o ideal e a execução. ' +
      'De um lado, o melancólico percebe princípios, valores, fragilidades estruturais e injustiças ocultas; ' +
      'de outro, o colérico se recusa a ficar apenas na crítica, exigindo ação, reforma, combate. ' +
      'Quando essa combinação é bem integrada, surgem personalidades que não apenas veem o que está errado, mas também têm coragem e capacidade de corrigir com firmeza.\n\n' +
      'Trata-se de um perfil sério, intenso e de alta exigência. ' +
      'Não se satisfaz com “mais ou menos”; quer o certo, o bem feito, o coerente com os princípios. ' +
      'Isso o torna excelente planejador, estrategista e condutor de mudanças profundas, mas também alguém sujeito a tensões internas: ' +
      'o padrão interno costuma ser tão alto que quase nada parece estar à altura, nem o próprio desempenho nem o dos outros.\n\n' +
      'Em termos de presença, o Mel-Col não costuma ser espalhafatoso. Sua autoridade é silenciosa, nascida da competência, da constância e da clareza de visão. ' +
      'Quando fala, porém, suas palavras carregam peso: têm lógica, conteúdo e um certo tom de inevitabilidade. ' +
      'Se aprende a unir essa força a um estilo de comunicação paciente e misericordioso, torna-se um líder profundamente confiável; ' +
      'se não, pode ser percebido como duro, inflexível e pouco acessível.';    
  } else if (isWithSanguine) {
    overview =
      'No melancólico-sanguíneo, a profundidade introspectiva do melancólico encontra a leveza, a sociabilidade e a expressividade do sanguíneo. ' +
      'É uma combinação rica e complexa: por dentro, mundos profundos; por fora, simpatia, imaginação e certa facilidade de convivência.\n\n' +
      'O melancólico-sanguíneo (Mel-San) costuma oscilar entre momentos de extroversão criativa e fases de recolhimento silencioso. ' +
      'Há dias em que fala, brinca, conta histórias, entusiasma-se com projetos; e outros em que se recolhe, analisa, questiona tudo o que disse, ' +
      'repensa relações e sente o peso das imperfeições próprias e alheias. ' +
      'Enquanto o sanguíneo puro esquece rápido o que o feriu, o componente melancólico grava profundamente essas experiências, ' +
      'fazendo com que críticas e rejeições tenham um impacto duradouro.\n\n' +
      'Trata-se de um perfil especialmente apto para a arte, a comunicação e o acompanhamento humano. ' +
      'O lado sanguíneo oferece espontaneidade, cor, narrativa; o melancólico dá conteúdo, textura, densidade. ' +
      'Daí podem surgir professores marcantes, escritores, músicos, catequistas, pregadores e terapeutas que falam ao coração com delicadeza e precisão. ' +
      'Ao mesmo tempo, essa mesma sensibilidade torna o Mel-San vulnerável a instabilidades de humor e a sentimentos de inadequação, ' +
      'sobretudo quando acredita não correspondê-lo ao ideal que abraçou.\n\n' +
      'O caminho de crescimento passa por aprender a não absolutizar nem as euforias nem os abatimentos: ' +
      'nem tudo é tão maravilhoso quanto parece nos dias de entusiasmo, nem tudo é tão trágico quanto parece nos dias de sombra. ' +
      'Quando encontra ritmo de vida estável, bons vínculos e acompanhamento espiritual, o melancólico-sanguíneo torna-se um grande mediador ' +
      'entre o mundo das ideias e o mundo das emoções das pessoas ao seu redor.';    
  } else if (isWithPhlegmatic) {
    overview =
      'No melancólico-fleumático, a profundidade sensível do melancólico une-se à calma, à estabilidade e à prudência do fleumático. ' +
      'É uma combinação de grande serenidade potencial: pensa muito, sente muito, mas tende a reagir de forma menos explosiva e mais contida.\n\n' +
      'O melancólico-fleumático (Mel-Fle) é o “observador silencioso”: nota detalhes, percebe nuances, capta ambientes, mas raramente se impõe com força. ' +
      'Prefere analisar antes de falar, escutar antes de intervir, refletir antes de decidir. ' +
      'Isso o torna confiável em contextos que exigem discrição, estabilidade e visão de conjunto, ' +
      'embora possa ser interpretado como distante ou indiferente por quem espera manifestações afetivas exuberantes.\n\n' +
      'Em termos de ritmo, trata-se de um temperamento mais lento, tanto para iniciar quanto para mudar. ' +
      'Uma vez que decide algo em consciência, porém, mantém o rumo com grande constância, ' +
      'pois o melancólico oferece profundidade de convicção e o fleumático oferece resistência à agitação externa. ' +
      'Esse tipo de pessoa é particularmente valioso em funções de cuidado prolongado, acompanhamento, docência e administração de médio e longo prazo.\n\n' +
      'O principal risco está na acomodação triste: sentir muito, enxergar muito, mas fazer pouco. ' +
      'O medo de errar (melancólico) somado ao medo de conflitos (fleumático) pode gerar adiamentos crônicos, ' +
      'projetos nunca iniciados e uma sensação de vida “pela metade”. ' +
      'Quando supera esse bloqueio e aprende a dar passos simples, ainda que pequenos, o Mel-Fle torna-se um dos perfis mais fiéis, prudentes e sólidos que existem.';    
  } else {
    overview =
      'O temperamento melancólico, em qualquer combinação, é marcado por profundidade, memória longa e forte senso de coerência. ' +
      'É o tipo que percebe fissuras em estruturas, contradições em discursos e injustiças escondidas, mesmo quando ninguém parece incomodado. ' +
      'Enquanto outros se adaptam facilmente, o melancólico sente a necessidade de compreender, de dar nome, de buscar um porquê.\n\n' +
      'Essa sensibilidade pode ser tanto fonte de sabedoria quanto de sofrimento: ' +
      'quando unida à esperança e à caridade, faz do melancólico um conselheiro seguro, um amigo leal e um contemplativo fecundo; ' +
      'quando dominada pelo medo ou pela amargura, fecha-o num mundo interior pesado, crítico e desanimado. ' +
      'O processo de maturidade espiritual consiste justamente em aprender a oferecer a Deus essa profundidade, ' +
      'de modo que ela se torne lugar de encontro e não apenas de análise.';    
  }

  // -------------------------------------------------------------------------
  // STRENGTHS
  // -------------------------------------------------------------------------
  const strengths: string[] = [
    'Profundidade de reflexão: tende a analisar causas, fundamentos e consequências, não se contentando com explicações superficiais.',
    'Memória rica e seletiva: guarda detalhes significativos, palavras, gestos e atmosferas, o que favorece compreensão fina de pessoas e situações.',
    'Senso agudo de justiça e verdade: percebe incoerências, injustiças e falsidades com grande rapidez interior, mesmo que demore a expressá-las.',
    'Capacidade de concentração: consegue dedicar longos períodos a um mesmo tema, estudo ou projeto, sem necessidade constante de estímulos externos.',
    'Sensibilidade estética e simbólica: tende a perceber beleza na arte, na liturgia, na natureza, em gestos pequenos e discretos.',
    'Empatia profunda: não apenas nota que o outro sofre, mas intui o tipo de sofrimento, as motivações e as feridas ocultas.',
    'Lealdade duradoura: cria vínculos poucos, mas muito sérios; quando ama, tende a permanecer fiel mesmo em tempos difíceis.',
    'Capacidade de suportar sacrifícios silenciosos, sem necessidade de reconhecimento público.',
    'Inclinação para a coerência de vida: busca alinhar discurso, valores e comportamento, sofrendo quando percebe que vive abaixo do ideal.',
    'Olhar crítico construtivo: quando amadurecido, é capaz de identificar problemas estruturais e propor melhorias sólidas, não apenas críticas destrutivas.',
    'Facilidade para trabalhos que exigem precisão, método, pesquisa, escrita e organização intelectual.',
    'Vocação natural para o recolhimento, o estudo e a vida interior, o que favorece aprofundamento espiritual e intelectual ao longo dos anos.',
  ];

  if (isWithCholeric) {
    strengths.push(
      'União de profundidade analítica com capacidade de execução: não apenas vê o que está errado, mas sabe planejar como corrigir e agir com firmeza.',
      'Grande força de vontade quando encontra uma causa justa: trabalha com intensidade e resiliência acima da média.',
      'Perfil ideal para liderar reformas, revisões doutrinais, correções de rota e projetos que exijam rigor e coragem moral.',
      'Capacidade de tomar decisões difíceis baseadas em princípios, ainda que sejam impopulares no curto prazo.',
      'Constância na defesa de valores: não se dobra facilmente à pressão do ambiente quando está convicto de algo em consciência.',
    );
  }

  if (isWithSanguine) {
    strengths.push(
      'Capacidade de comunicar conteúdos profundos de forma acessível, imagética e envolvente.',
      'Boa combinação de sensibilidade e espontaneidade: percebe nuances internas e consegue expressá-las com certa leveza.',
      'Talento para atividades artísticas, pedagógicas e pastorais em que seja necessário unir emoção, beleza e substância.',
      'Facilidade em acolher pessoas feridas: ouve com atenção, compreende em profundidade e oferece uma palavra que toca o coração.',
      'Possibilidade de criar ambientes em que se fala de coisas sérias sem perder totalmente o humor e a alegria.',
    );
  }

  if (isWithPhlegmatic) {
    strengths.push(
      'Estabilidade emocional maior do que a do melancólico puro, com menos explosões e reações dramáticas.',
      'Grande capacidade de acompanhar processos longos: estudos extensos, projetos de médio prazo, histórias de vida complexas.',
      'Perfil de conselheiro sereno: escuta muito, julga com prudência e fala apenas quando já ponderou o suficiente.',
      'Tendência a manter rotinas e compromissos quando bem estabelecidos, mesmo sem grande entusiasmo sensível.',
      'Discrição e confiabilidade: sabe guardar segredos, respeitar limites e não expor o outro desnecessariamente.',
    );
  }

  // -------------------------------------------------------------------------
  // RISKS
  // -------------------------------------------------------------------------
  const risks: string[] = [
    'Pessimismo habitual: tendência a fixar-se mais no que falta, no que está errado ou no que pode dar errado do que nas possibilidades de bem.',
    'Autoexigência excessiva, com facilidade para culpar-se e para interpretar falhas como prova de indignidade profunda.',
    'Risco de ruminação mental: repassar muitas vezes as mesmas cenas, frases e decisões, sem chegar a resoluções concretas.',
    'Dificuldade em iniciar projetos por medo de não conseguir terminá-los com perfeição.',
    'Tendência a interpretar críticas ou correções em chave pessoal, com feridas profundas que levam tempo para cicatrizar.',
    'Possibilidade de alimentar ressentimentos escondidos, sobretudo quando não se sente compreendido ou valorizado.',
    'Inclinação à retração social: isolar-se quando sofre, em vez de buscar ajuda ou diálogo.',
    'Risco de usar a lucidez para justificar imobilismo: como enxerga os riscos, pode concluir que “não vale a pena tentar”.',
    'Perigo de endurecer juízos sobre pessoas e instituições, criando imagens internas difíceis de revisar mesmo diante de fatos novos.',
    'Vulnerabilidade a estados de tristeza prolongada, desânimo e sensação de inadequação crônica.',
  ];

  if (isPure || isWithCholeric) {
    risks.push(
      'Perfeccionismo rígido: dificuldade em aceitar soluções suficientemente boas, preferindo muitas vezes adiar ou abandonar algo a fazê-lo de forma imperfeita.',
      'Tendência a julgar com severidade tanto a si mesmo quanto aos outros, confundindo erro pontual com falha de caráter.',
      'Risco de tornar-se duro, sarcástico ou amargo quando acumula decepções sem trabalhá-las à luz da fé e da caridade.',
      'Inclinação a assumir a posição de “guardião solitário da verdade”, com pouca disposição para escutar e rever percepções.',
    );
  }

  if (isWithSanguine) {
    risks.push(
      'Oscilações fortes de humor: alternância entre fases de grande sociabilidade e períodos de recolhimento melancólico.',
      'Perigo de dramatizar conflitos, ampliando internamente situações que objetivamente poderiam ser mais simples.',
      'Tendência a prometer mudanças ou iniciativas em momentos de entusiasmo, mas a paralisar diante do medo de não fazê-las com perfeição.',
      'Vulnerabilidade elevada a rejeições e críticas, que podem desencadear crises de autoestima e autossabotagem.',
    );
  }

  if (isWithPhlegmatic) {
    risks.push(
      'Acomodação triste: perceber que algo está errado, mas não encontrar força para mudar, permanecendo numa insatisfação silenciosa.',
      'Procrastinação crônica em decisões importantes, tanto por medo de errar quanto por resistência a conflitos.',
      'Risco de criar um mundo interior rico, porém pouco traduzido em ações concretas de serviço e caridade.',
      'Possibilidade de conformar-se com um nível de vida espiritual e profissional abaixo de suas capacidades por medo de sair da zona de conforto.',
    );
  }

  // -------------------------------------------------------------------------
  // WORK / CAREER
  // -------------------------------------------------------------------------
  const work: string[] = [
    'Funciona melhor em ambientes estruturados, relativamente silenciosos e com espaço para concentração e profundidade.',
    'Prefere tarefas que tenham sentido claro, coerência interna e repercussão real na vida das pessoas, ainda que discretamente.',
    'Tende a ser cuidadoso com prazos, qualidade e detalhes, evitando entregar algo que considere malfeito.',
    'Gosta de ter tempo para estudar, preparar-se e refletir antes de executar ou falar em público.',
    'Valoriza lideranças coerentes e competentes, sofrendo profundamente quando percebe injustiça, arbitrariedade ou amadorismo.',
    'Lida bem com trabalhos que exigem análise de dados, pesquisa, redação, revisão, sistematização e planejamento.',
    'Sente-se realizado quando pode aprofundar um tema ao longo dos anos, tornando-se referência naquela área.',
  ];

  if (isPure) {
    work.push(
      'Tem aptidão para carreiras intelectuais, acadêmicas, jurídicas, científicas, artísticas ou ligadas à formação doutrinal e filosófica.',
      'Pode experimentar grande frustração em ambientes muito superficiais, competitivos sem sentido ou guiados apenas por modismos.',
      'Precisa proteger-se contra o excesso de autocrítica que paralisa: pequenos passos constantes produzem mais fruto que eternos planos perfeitos.',
      'Beneficia-se de trabalhar com colegas mais práticos e extrovertidos que ajudem a tirar boas ideias do papel.',
    );
  }

  if (isWithCholeric) {
    work.push(
      'Perfil ideal para liderar projetos complexos que exijam visão de conjunto, rigor técnico e capacidade de decisão.',
      'Destaca-se em funções de coordenação, direção acadêmica, gestão de qualidade, estratégia institucional e reforma de estruturas.',
      'Consegue construir sistemas, normas e procedimentos sólidos, coerentes com princípios bem definidos.',
      'Precisa apenas cuidar para que a busca de excelência não se torne fonte de tensão permanente para si e para a equipe.',
    );
  }

  if (isWithSanguine) {
    work.push(
      'Vai bem em funções que combinem conteúdo e comunicação: ensino, pregação, formação de adultos, produção de conteúdo, arte e cultura.',
      'Consegue traduzir temas complexos em linguagem viva, cheia de imagens e exemplos concretos.',
      'Precisa de algum grau de liberdade criativa e de um ambiente minimamente humano para produzir bem; contextos muito mecanizados o sufocam.',
      'Ganha muito quando aprende a organizar melhor o tempo, evitando que oscilações de humor determinem o ritmo do trabalho.',
    );
  }

  if (isWithPhlegmatic) {
    work.push(
      'Tem perfil de profissional estável, confiável e atento, ideal para funções de acompanhamento de casos, tutoria, secretariado acadêmico, direção de estudos, biblioteca e arquivo.',
      'Pode ser um excelente “segundo de bordo”: alguém que sustenta o trabalho com constância, mesmo sem buscar grande visibilidade.',
      'Tende a construir rotinas sólidas e a manter a mesma linha de trabalho por muitos anos, o que favorece obras duradouras.',
      'Precisa ser encorajado a assumir, de tempos em tempos, desafios um pouco maiores, para não se instalar em tarefas aquém de sua capacidade real.',
    );
  }

  // -------------------------------------------------------------------------
  // RELATIONSHIPS
  // -------------------------------------------------------------------------
  const relationships: string[] = [
    'Tende a ser reservado no início, mas muito profundo quando decide confiar em alguém.',
    'Valoriza lealdade, sinceridade e coerência: prefere poucos amigos, porém muito fiéis, a muitos vínculos superficiais.',
    'Escuta com atenção e costuma lembrar detalhes importantes da história dos outros, o que faz com que as pessoas se sintam realmente vistas.',
    'Prefere conversas significativas a pequenas conversas sociais; tende a cansar-se de interações muito superficiais.',
    'Tem dificuldade em expressar espontaneamente elogios e carinho, mesmo quando ama profundamente; muitas vezes demonstra amor mais por serviço do que por palavras.',
    'Pode interpretar comportamentos ambíguos em chave negativa, imaginando desinteresse, rejeição ou julgamento mesmo quando isso não corresponde à intenção alheia.',
    'Quando se sente ferido, tende a recolher-se, silenciar e ruminar internamente, o que pode agravar mal-entendidos.',
    'É capaz de grande fidelidade afetiva: não abandona facilmente quem considera estar sob sua responsabilidade ou amizade.',
  ];

  if (isPure || isWithCholeric) {
    relationships.push(
      'Pode ser percebido como duro ou crítico quando fala, sobretudo se não vigia o tom de voz ou o momento adequado para apontar problemas.',
      'Tem tendência a guardar por muito tempo certas frases ou atitudes que o feriram, revivendo mentalmente discussões passadas.',
      'Precisa aprender a comunicar dores e expectativas de forma explícita, em vez de esperar que o outro adivinhe.',
    );
  }

  if (isWithSanguine) {
    relationships.push(
      'Une profundidade com certa leveza relacional, sendo capaz de alternar conversa séria e humor de forma natural.',
      'Pode tornar-se muito dependente da aprovação afetiva de pessoas significativas, sofrendo quando não recebe sinais claros de carinho.',
      'Corre o risco de entrar em dinâmicas de “tudo ou nada”: vínculos extremamente intensos seguidos de afastamentos abruptos quando se sente ferido.',
      'Quando amadurece, é um amigo que sabe animar, consolar e, ao mesmo tempo, dizer verdades importantes com delicadeza.',
    );
  }

  if (isWithPhlegmatic) {
    relationships.push(
      'É geralmente percebido como pessoa calma, séria e disponível, mesmo que não fale muito.',
      'Gosta de relações estáveis, previsíveis, com espaço para silêncio e para partilhas mais profundas em momentos escolhidos.',
      'Pode evitar conflitos diretos, preferindo engolir incômodos até que estes se acumulem e explodam em momentos de desabafo mais intenso.',
      'Quando aprende a falar cedo e com serenidade, torna-se um parceiro relacional de grande segurança e maturidade.',
    );
  }

  // -------------------------------------------------------------------------
  // FAMILY
  // -------------------------------------------------------------------------
  const family: string[] = [
    'No ambiente familiar, tende a ser aquela pessoa que observa tudo: atmosferas, reações, injustiças e necessidades silenciosas.',
    'Valoriza muito a estabilidade do lar, a coerência entre discurso e prática e o respeito mútuo entre os membros da família.',
    'Costuma ser sensível a injustiças dentro de casa: favoritismos, grosserias, humilhações ou incoerências entre o que se prega e o que se vive.',
    'Geralmente assume silenciosamente muitas responsabilidades, sobretudo quando percebe que são necessárias para o bem dos demais.',
  ];

  if (isPure) {
    family.push(
      'Pode ser um pai ou mãe muito atento à formação moral e intelectual dos filhos, porém sujeito a apontar mais falhas do que virtudes.',
      'Precisa lembrar-se conscientemente de elogiar, agradecer e celebrar pequenas conquistas, não apenas corrigir e advertir.',
      'Corre o risco de deixar que o clima interior de tristeza ou cansaço se torne atmosfera constante do lar se não busca cuidar da própria afetividade.',
    );
  }

  if (isWithCholeric) {
    family.push(
      'Tende a assumir naturalmente a direção das grandes decisões familiares, buscando o que considera justo e correto.',
      'Pode estabelecer regras claras, horários, critérios de estudo, de fé e de vida comunitária, o que traz ordem, mas também pode gerar rigidez se não houver espaço para diálogo.',
      'Precisa vigiar para não transformar a casa em extensão de um projeto ou instituição, lembrando-se de que a família não é apenas “estrutura”, mas comunhão de pessoas.',
    );
  }

  if (isWithSanguine) {
    family.push(
      'Pode oferecer um ambiente em que há, ao mesmo tempo, profundidade e momentos de alegria leve, histórias, músicas e partilhas ricas.',
      'Tende a preocupar-se muito com o clima emocional da casa, sofrendo quando percebe tensões não resolvidas.',
      'Precisa cuidar para que suas oscilações internas não definam totalmente o humor familiar, sobretudo diante de crianças mais sensíveis.',
    );
  }

  if (isWithPhlegmatic) {
    family.push(
      'Tende a criar um lar organizado, sereno e relativamente previsível, com rotinas que trazem segurança.',
      'É um pilar silencioso: sustenta financeiramente, logisticamente e emocionalmente o dia a dia, muitas vezes sem grande visibilidade.',
      'O desafio está em não deixar que o lar se reduza a uma soma de tarefas e obrigações, mantendo espaço para festa, ternura e diálogo aberto.',
    );
  }

  // -------------------------------------------------------------------------
  // SPIRITUAL
  // -------------------------------------------------------------------------
  const spiritual: string[] = [
    'É naturalmente inclinado à reflexão espiritual, à leitura séria e à busca de sentido profundo na fé.',
    'Tende a levar muito a sério as verdades que descobre: não gosta de viver de forma incoerente com o que reconhece como vontade de Deus.',
    'Tem facilidade para a oração silenciosa, meditativa, sobretudo quando encontra métodos claros e textos ricos.',
    'É capaz de grande fidelidade em práticas espirituais, sobretudo quando as assume por convicção e não apenas por emoção do momento.',
  ];

  if (isPure || isWithCholeric) {
    spiritual.push(
      'Está especialmente sujeito ao escrúpulo: exagerar a gravidade de faltas leves, duvidar do perdão de Deus e revisar confessões passadas.',
      'Precisa de direção espiritual firme e misericordiosa, que o ajude a distinguir entre verdadeira contrição e culpa neurótica.',
      'Corre o risco de confundir dureza consigo e com os outros com “zelo pela verdade”, quando, na realidade, falta caridade.',
      'A meditação da misericórdia divina, das parábolas do perdão e da paciência de Cristo é um remédio central para equilibrar justiça e amor.',
    );
  }

  if (isWithSanguine) {
    spiritual.push(
      'Vive tensões entre momentos de grande consolação sensível e períodos de aridez e questionamento; precisa aprender que a fidelidade vale mais que o sentimento.',
      'Pode experimentar fortes desejos de santidade acompanhados de medos intensos de fracassar; o segredo está em dar passos pequenos e concretos, não em promessas grandiosas.',
      'Beneficia-se de formas de oração que integrem imaginação, afeto e doutrina, como a lectio divina bem orientada ou meditações guiadas.',
      'Tem potencial para comunicar a fé com linguagem rica, imagens vivas e sensibilidade poética, ajudando outros a rezar.',
    );
  }

  if (isWithPhlegmatic) {
    spiritual.push(
      'Possui terreno privilegiado para uma vida espiritual estável e perseverante, ainda que pouco emotiva.',
      'Corre o risco de transformar a vida de oração em rotina sem alma, mantendo as práticas, mas perdendo progressivamente o sentido interior.',
      'É muito ajudado por retiros periódicos, nos quais possa reavivar as motivações profundas e reordenar o coração à luz do Evangelho.',
      'Pode tornar-se suporte silencioso de muitas obras de apostolado, oferecendo sacrifícios ocultos, intercessão e fidelidade simples no cotidiano.',
    );
  }

  spiritual.push(
    'Quando a graça cura suas feridas, educa seu perfeccionismo e acende nele a virtude da esperança, o melancólico torna-se um dos instrumentos mais firmes de Deus. ' +
      'Sua profundidade deixa de ser peso e torna-se fonte de conselho, consolação e sabedoria para muitos. ' +
      'A cruz que um dia o fez sofrer em silêncio converte-se em lugar de comunhão com Cristo, ' +
      'e sua capacidade de ver o que falta transforma-se em desejo de reparar com amor aquilo que o pecado destruiu.',
  );

  // -------------------------------------------------------------------------
  // RESULTADO
  // -------------------------------------------------------------------------
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
