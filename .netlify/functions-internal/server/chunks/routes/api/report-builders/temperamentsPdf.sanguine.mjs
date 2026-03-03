function buildSanguinePdfProfile(ctx) {
  var _a;
  const { secondary } = ctx;
  const secondaryId = (_a = secondary == null ? void 0 : secondary.id) != null ? _a : null;
  const isPure = !secondaryId || secondaryId === "sanguine";
  const isWithCholeric = secondaryId === "choleric";
  const isWithPhlegmatic = secondaryId === "phlegmatic";
  const isWithMelancholic = secondaryId === "melancholic";
  const label = "Sangu\xEDneo";
  let overview = "";
  if (isPure) {
    overview = "O temperamento sangu\xEDneo \xE9 o \u201Car\u201D entre os temperamentos cl\xE1ssicos: quente, \xFAmido, m\xF3vel, sempre em troca com o ambiente. Na linguagem da tradi\xE7\xE3o, \xE9 o tipo de excitabilidade r\xE1pida e forte, mas de dura\xE7\xE3o breve: reage com intensidade, por\xE9m logo passa para o pr\xF3ximo est\xEDmulo. \xC9 o temperamento do \u201Cagora\u201D.\n\nIsso n\xE3o significa falsidade ou teatralidade vazia. Quando o sangu\xEDneo se emociona, a emo\xE7\xE3o \xE9 real naquele momento: a alegria, a compaix\xE3o, o arrependimento, o entusiasmo s\xE3o sinceros. O problema n\xE3o est\xE1 na autenticidade do sentimento, mas na sua dura\xE7\xE3o. \xC9 como escrever na areia: enquanto a onda n\xE3o vem, a palavra est\xE1 n\xEDtida; passado o est\xEDmulo, a \xE1gua apaga o registro e o cora\xE7\xE3o corre para outra impress\xE3o.\n\nEssa fisiologia da alma explica por que o sangu\xEDneo \xE9 simultaneamente um dos temperamentos mais generosos e um dos mais inconstantes. Ele perdoa com facilidade porque n\xE3o guarda a ofensa na mem\xF3ria afetiva; mas tamb\xE9m abandona promessas e prop\xF3sitos com a mesma facilidade, pois o entusiasmo inicial n\xE3o cria ra\xEDzes profundas. \xC9 capaz de atos heroicos num retiro ou numa experi\xEAncia forte de f\xE9, e de esquecer quase tudo na segunda-feira seguinte se n\xE3o tiver ajuda externa e uma regra de vida concreta.\n\nMotivado por aceita\xE7\xE3o e prazer leg\xEDtimo, o sangu\xEDneo vive orientado para rela\xE7\xE3o, conex\xE3o e experi\xEAncia. Enquanto o col\xE9rico busca o poder e o melanc\xF3lico busca a perfei\xE7\xE3o, o sangu\xEDneo busca ser amado e desfrutar o bem que encontra: \xE9 o temperamento da comunh\xE3o humana, do clima, da alegria compartilhada. Por isso tende a ser soci\xE1vel, acess\xEDvel, com senso de humor e capacidade de transformar ambientes pesados em lugares habit\xE1veis.\n\nAo mesmo tempo, essa abertura radical ao exterior o torna muito influenci\xE1vel: ambientes, grupos, modas e discursos t\xEAm enorme impacto sobre o seu interior. Sua \u201Cvida interior\u201D corre o risco de ser apenas um espelho daquilo que o cerca. Sem crit\xE9rios claros, sem dire\xE7\xE3o espiritual e sem disciplina progressiva, o sangu\xEDneo pode passar a vida inteira sendo decidido pelo ambiente, sempre de boa vontade, mas raramente de vontade profunda. Quando, por\xE9m, ele aprende a ordenar essa riqueza afetiva, torna-se um dos instrumentos mais poderosos para difundir alegria, evangelizar, reconciliar e aproximar pessoas.";
  } else if (isWithCholeric) {
    overview = "Na combina\xE7\xE3o sangu\xEDneo-col\xE9rico, o ar quente do sangu\xEDneo encontra o fogo do col\xE9rico. Trata-se de uma das misturas mais energ\xE9ticas, vis\xEDveis e carism\xE1ticas entre os temperamentos cl\xE1ssicos. Aqui, a sociabilidade, o humor e a empatia t\xE1tica do sangu\xEDneo se unem \xE0 decis\xE3o, \xE0 objetividade e \xE0 tenacidade do col\xE9rico.\n\nO sangu\xEDneo-col\xE9rico (San-Col) vive habitualmente tensionado entre duas for\xE7as: o desejo de ser amado e aceito (sangu\xEDneo) e o impulso de alcan\xE7ar resultados, metas e conquistas (col\xE9rico). Quer agradar, mas tamb\xE9m quer vencer. Isso o torna um negociador nato: sabe falar \xE0s pessoas, percebe o clima emocional da sala, mas n\xE3o perde de vista o objetivo final.\n\nEm termos de energia, \xE9 uma verdadeira \u201Cm\xE1quina\u201D: dificilmente fica parado. Onde o sangu\xEDneo puro tende a dispersar-se em mil est\xEDmulos, o componente col\xE9rico fornece foco, dire\xE7\xE3o e capacidade de empurrar projetos at\xE9 o fim. \xC9 o tipo que n\xE3o apenas tem ideias, mas tamb\xE9m monta equipe, define prazo e cobra entrega.\n\nNa comunica\xE7\xE3o, \xE9 um dos perfis mais fortes que existem. A eloqu\xEAncia natural do sangu\xEDneo, com fluidez verbal, humor e linguagem acess\xEDvel, \xE9 refor\xE7ada pela assertividade l\xF3gica do col\xE9rico, que sabe pedir, confrontar, defender e negociar sem medo. Da\xED surgem grandes vendedores, pol\xEDticos de campanha, empreendedores, l\xEDderes comunit\xE1rios e pregadores carism\xE1ticos.\n\nO grande risco, por\xE9m, est\xE1 na impulsividade. O mesmo sistema ps\xEDquico que reage r\xE1pido, fala r\xE1pido e decide r\xE1pido pode passar por cima de dados, pessoas e consequ\xEAncias. Se n\xE3o aprende a ouvir, a consultar e a ponderar, o sangu\xEDneo-col\xE9rico pode usar seu charme para encobrir uma ambi\xE7\xE3o feroz ou acreditar que todo impulso forte j\xE1 \xE9, por si, uma luz de Deus. Quando amadurece, por\xE9m, torna-se um l\xEDder que tanto cuida de gente quanto faz as coisas acontecerem.";
  } else if (isWithPhlegmatic) {
    overview = "Na combina\xE7\xE3o sangu\xEDneo-fleum\xE1tico, o ar quente e leve do sangu\xEDneo encontra a \xE1gua calma e est\xE1vel do fleum\xE1tico. O resultado \xE9 uma das personalidades mais af\xE1veis, am\xE1veis e f\xE1ceis de conviver de todo o espectro temperamental. \xC9 o \u201Charmonizador bem-humorado\u201D: algu\xE9m que dificilmente perde a paz e quase sempre encontra algo de bom a dizer.\n\nEnquanto o sangu\xEDneo puro pode ser explosivo e inconstante, o componente fleum\xE1tico traz uma esp\xE9cie de amortecedor interior: os afetos continuam r\xE1pidos, mas s\xE3o menos dram\xE1ticos; os entusiasmos continuam vivos, mas s\xE3o menos bruscos. Em vez de altos e baixos intensos, tende a haver uma alegria mansa, uma boa vontade constante, uma estabilidade doce.\n\nA necessidade sangu\xEDnea de ser querido alia-se ao desejo fleum\xE1tico de evitar conflitos. O sangu\xEDneo-fleum\xE1tico (San-Fle) \xE9 o tipo de pessoa que prefere ceder a discutir, que muda de opini\xE3o para manter a paz, que adia conversas dif\xEDceis at\xE9 o \xFAltimo limite. Tem horror a brigas e climas pesados, e seu primeiro impulso \xE9 acalmar, contornar, fazer piada ou oferecer consolo em vez de entrar de cabe\xE7a no confronto.\n\nEm contrapartida, essa docilidade o torna extremamente leal, constante e previs\xEDvel nos v\xEDnculos. Onde o sangu\xEDneo puro tende a esquecer pessoas \xE0 medida que novos est\xEDmulos aparecem, o fleum\xE1tico ancora o cora\xE7\xE3o, fazendo com que amizades e la\xE7os se prolonguem no tempo. \xC9 um excelente confidente, um bom colega de trabalho, um membro de fam\xEDlia que \u201Csegura\u201D a estrutura dom\xE9stica pelo simples fato de estar sempre ali, tranquilo, bem-disposto.\n\nSeu desafio est\xE1 menos no risco de explodir e mais no risco de acomodar: pode tolerar o que n\xE3o deveria tolerar, pode deixar passar oportunidades importantes e pode evitar decis\xF5es dif\xEDceis at\xE9 que outros decidam por ele. Quando fr\xE1gil, refugia-se na zona de conforto; quando amadurecido, torna-se um dos maiores especialistas em criar ambientes saud\xE1veis, harmoniosos e carregados de boa vontade.";
  } else if (isWithMelancholic) {
    overview = "No sangu\xEDneo-melanc\xF3lico, dois mundos aparentemente opostos se encontram: a extrovers\xE3o leve, otimista e relacional do sangu\xEDneo e a profundidade sens\xEDvel, introspectiva e idealista do melanc\xF3lico. \xC9 uma combina\xE7\xE3o complexa, fascinante e, muitas vezes, dolorosa, capaz de produzir personalidades riqu\xEDssimas \u2013 artistas, pensadores, comunicadores intensos \u2013 mas tamb\xE9m sujeitos a oscila\xE7\xF5es emocionais marcantes.\n\nO sangu\xEDneo-melanc\xF3lico (San-Mel) vive num movimento de expans\xE3o e retra\xE7\xE3o. H\xE1 fases em que o lado sangu\xEDneo toma a dianteira: sociabilidade, humor, criatividade, capacidade de conquistar pessoas com carisma. Logo depois, por\xE9m, o lado melanc\xF3lico entra em campo com sua autocr\xEDtica severa, sua tend\xEAncia a revisitar conversas, a rever o que disse, a imaginar como foi percebido. O que era euforia pode converter-se em vergonha, d\xFAvida ou tristeza.\n\nA sensibilidade desse tipo \xE9 extrema. A necessidade sangu\xEDnea de aprova\xE7\xE3o se une ao perfeccionismo melanc\xF3lico: o resultado \xE9 algu\xE9m que sente profundamente cada elogio e cada cr\xEDtica. Uma palavra dura que um sangu\xEDneo-col\xE9rico ignoraria pode atravessar o cora\xE7\xE3o do San-Mel por dias. Ao mesmo tempo, essa hipersensibilidade multiplica sua capacidade de empatia, de compreender nuances, de captar o n\xE3o-dito nas rela\xE7\xF5es.\n\nDo ponto de vista do talento, trata-se de um dos perfis mais criativos. O sangue oferece expressividade, humor, teatralidade; a melancolia oferece conte\xFAdo, profundidade, mem\xF3ria, riqueza de contraste. Da\xED surgem m\xFAsicos, escritores, atores, professores e pastores capazes de falar ao cora\xE7\xE3o com beleza e subst\xE2ncia. Se, por\xE9m, essa riqueza interior n\xE3o \xE9 disciplinada, acaba gerando dramas, autossabotagem, procrastina\xE7\xE3o e uma sensa\xE7\xE3o cr\xF4nica de \u201Cnunca estar \xE0 altura\u201D.\n\nO caminho de maturidade passa por aprender a n\xE3o absolutizar nem o entusiasmo nem o abatimento: nem tudo \xE9 t\xE3o maravilhoso quanto o lado sangu\xEDneo imagina em seus picos, nem tudo \xE9 t\xE3o tr\xE1gico quanto o lado melanc\xF3lico sugere em suas vales. Quando consegue educar essa oscila\xE7\xE3o, o sangu\xEDneo-melanc\xF3lico se torna um int\xE9rprete privilegiado da experi\xEAncia humana \u2013 algu\xE9m que sente muito, mas que tamb\xE9m sabe transformar esse sentir em servi\xE7o, arte, consola\xE7\xE3o e evangeliza\xE7\xE3o.";
  } else {
    overview = "O temperamento sangu\xEDneo, em qualquer combina\xE7\xE3o, \xE9 marcado por rea\xE7\xE3o r\xE1pida, calor humano e grande capacidade de adapta\xE7\xE3o. \xC9 o tipo que se volta espontaneamente para pessoas, ambientes e experi\xEAncias, que capta o clima do momento e procura torn\xE1-lo mais leve, mais alegre e mais suport\xE1vel para todos.\n\nQuando bem educado, torna-se um difusor de esperan\xE7a, de comunh\xE3o e de confian\xE7a em Deus; quando desordenado, dispersa-se em mil impress\xF5es, persegue apenas o prazer imediato e foge de qualquer esfor\xE7o prolongado. Em todos os casos, o segredo est\xE1 em unir seu cora\xE7\xE3o grande a uma vontade igualmente grande.";
  }
  const strengths = [
    "Rea\xE7\xE3o r\xE1pida e calorosa aos est\xEDmulos: consegue acolher, responder e adaptar-se com grande velocidade.",
    "Facilidade em criar v\xEDnculos, quebrar o gelo e fazer com que as pessoas se sintam vistas e bem-vindas.",
    "Otimismo espont\xE2neo: tende a acreditar que as coisas v\xE3o melhorar e transmite essa esperan\xE7a ao ambiente.",
    "Capacidade de perdoar e recome\xE7ar com rapidez, sem guardar rancor por longos per\xEDodos.",
    "Flexibilidade elevada: lida bem com mudan\xE7as de planos, imprevistos e contextos variados.",
    "Expressividade verbal e n\xE3o verbal: comunica-se com naturalidade, usando gestos, humor e imagens vivas.",
    "Senso de oportunidade social: costuma saber quando falar, quando animar, quando descontrair um clima pesado.",
    "Imagina\xE7\xE3o viva e criatividade em situa\xE7\xF5es que exigem improviso, narrativa, teatro ou orat\xF3ria.",
    "Empatia afetiva imediata: sente a alegria e a dor do outro com facilidade, reagindo de forma acolhedora.",
    "Capacidade de animar grupos, iniciar conversas, promover encontros e construir redes de relacionamento."
  ];
  if (isPure) {
    strengths.push(
      "Alegria contagiante e simplicidade de cora\xE7\xE3o, tornando ambientes mais humanos e acess\xEDveis.",
      "Grande capacidade de levantar-se ap\xF3s fracassos: n\xE3o se deixa prender por quedas passadas e volta a tentar.",
      "Esp\xEDrito de crian\xE7a na confian\xE7a: tende a confiar na Provid\xEAncia e nas pessoas com uma certa despreocupa\xE7\xE3o saud\xE1vel.",
      "Quando educado, converte sua espontaneidade em sinceridade virtuosa: fala a verdade com leveza, sem crueldade."
    );
  }
  if (isWithCholeric) {
    strengths.push(
      "Carisma de lideran\xE7a: combina presen\xE7a forte, capacidade de falar em p\xFAblico e firmeza nas decis\xF5es.",
      "Alt\xEDssima energia para iniciar e conduzir projetos, unindo entusiasmo sangu\xEDneo com foco col\xE9rico.",
      "Habilidade especial em persuadir, negociar e mobilizar pessoas em torno de uma causa ou meta concreta.",
      "Resili\xEAncia pr\xE1tica: reage bem a cr\xEDticas e desafios, usando-os como combust\xEDvel para melhorar resultados."
    );
  }
  if (isWithPhlegmatic) {
    strengths.push(
      "Afetividade est\xE1vel: une calor humano com serenidade, evitando dramas desnecess\xE1rios.",
      "Grande capacidade de ouvir com paci\xEAncia, acolher confid\xEAncias e consolar sem se desesperar com o problema do outro.",
      "Perfil de \u201Coleo social\u201D: facilita a conviv\xEAncia, reduz tens\xF5es e favorece ambientes harmoniosos e alegres.",
      "Lealdade tranquila: tende a manter amizades e v\xEDnculos por muito tempo, sem fazer exig\xEAncias excessivas."
    );
  }
  if (isWithMelancholic) {
    strengths.push(
      "Profunda sensibilidade est\xE9tica e simb\xF3lica: percebe beleza em palavras, gestos, liturgias, artes e rela\xE7\xF5es.",
      "Capacidade de unir express\xE3o calorosa com conte\xFAdo profundo, tornando-se comunicador, professor ou artista muito impactante.",
      "Autoconhecimento mais rico do que o sangu\xEDneo puro, devido \xE0 reflex\xE3o melanc\xF3lica sobre as pr\xF3prias emo\xE7\xF5es.",
      "Empatia refinada: entende n\xE3o apenas que o outro sofre, mas tamb\xE9m por qu\xEA sofre, e encontra modos criativos de consolar."
    );
  }
  const risks = [
    "Superficialidade na dura\xE7\xE3o das impress\xF5es: entusiasmos, prop\xF3sitos e decis\xF5es tendem a durar pouco se n\xE3o houver apoio externo.",
    "Inconst\xE2ncia em compromissos de longo prazo, sobretudo quando a novidade inicial desaparece.",
    "Busca excessiva de aprova\xE7\xE3o: tend\xEAncia a adaptar o discurso e o comportamento para n\xE3o desagradar, mesmo ao custo da verdade.",
    "Propens\xE3o a fugir de esfor\xE7os prolongados, preferindo o prazer imediato ou o caminho mais f\xE1cil.",
    "Distra\xE7\xE3o e desorganiza\xE7\xE3o cr\xF4nicas: esquece compromissos, perde prazos, subestima o tempo necess\xE1rio para as tarefas.",
    "Risco de falar demais e ouvir de menos, expondo-se a indiscri\xE7\xF5es e ferindo pessoas sem inten\xE7\xE3o.",
    "Vulnerabilidade a ambientes e modas: pode mudar de opini\xE3o ou de estilo de vida pela simples press\xE3o do grupo.",
    "Tend\xEAncia a minimizar problemas graves, transformando tudo em piada ou em ocasi\xE3o de leveza quando \xE9 preciso seriedade."
  ];
  if (isPure) {
    risks.push(
      "Risco de permanecer \u201Ceternamente adolescente\u201D se n\xE3o abra\xE7ar responsabilidades e rotinas est\xE1veis.",
      "Facilidade em cair em pecados de sensualidade (gula, lux\xFAria, curiosidade excessiva) por reagir r\xE1pido aos est\xEDmulos dos sentidos.",
      "Tend\xEAncia a prometer muito (especialmente em contexto emocional ou espiritual) e cumprir pouco no dia a dia.",
      "Perigo de usar a alegria como fuga: encher-se de distra\xE7\xF5es para n\xE3o encarar sofrimentos e quest\xF5es profundas."
    );
  }
  if (isWithCholeric) {
    risks.push(
      "Impulsividade elevada: decis\xF5es r\xE1pidas demais, baseadas em sensa\xE7\xE3o ou intui\xE7\xE3o, sem an\xE1lise adequada dos fatos.",
      "Risco de manipula\xE7\xE3o: pode usar charme, humor e discurso convincente para impor sua pr\xF3pria vontade.",
      "Propens\xE3o a atropelar temperamentos mais lentos (fleum\xE1ticos e melanc\xF3licos), sem lhes dar espa\xE7o para falar ou participar das decis\xF5es.",
      "Possibilidade de confundir ambi\xE7\xE3o pessoal com zelo pelo bem comum, revestindo planos pessoais de linguagem idealista."
    );
  }
  if (isWithPhlegmatic) {
    risks.push(
      "Avers\xE3o quase cr\xF4nica a conflitos: adia conversas necess\xE1rias, concorda sem realmente concordar, engole m\xE1goas em sil\xEAncio.",
      "Procrastina\xE7\xE3o em decis\xF5es importantes, mantendo situa\xE7\xF5es indefinidas para n\xE3o ter de assumir posi\xE7\xE3o clara.",
      "Risco de viver num n\xEDvel de vida muito abaixo de suas capacidades por simples comodismo afetivo.",
      "Dificuldade em dizer \u201Cn\xE3o\u201D, sobrecarregando-se de deveres que depois n\xE3o conseguir\xE1 cumprir com qualidade."
    );
  }
  if (isWithMelancholic) {
    risks.push(
      "Oscila\xE7\xF5es fortes de humor: fases de grande euforia seguidas de per\xEDodos de abatimento, d\xFAvida e autocr\xEDtica.",
      "Perfeccionismo afetivo: necessidade intensa de ser amado e ao mesmo tempo medo de n\xE3o estar \xE0 altura, gerando inseguran\xE7a cr\xF4nica.",
      "Risco de dramatizar conflitos e rejei\xE7\xF5es, ampliando internamente situa\xE7\xF5es que talvez fossem menores.",
      "Tend\xEAncia a alternar exposi\xE7\xE3o exagerada (contar demais) com fechamento s\xFAbito (sil\xEAncio ressentido) nos relacionamentos."
    );
  }
  const work = [
    "Funciona melhor em ambientes com pessoas, movimento e variedade de tarefas.",
    "Brilha em fun\xE7\xF5es que exigem comunica\xE7\xE3o, negocia\xE7\xE3o, atendimento ou presen\xE7a p\xFAblica.",
    "Aprende com rapidez intuitiva, sobretudo quando o conte\xFAdo \xE9 apresentado de forma concreta e envolvente.",
    "Responde bem a feedback positivo, reconhecimento e metas claras, ainda que curtas.",
    "Tende a ter boas ideias e sugerir melhorias criativas, especialmente em processos que envolvam experi\xEAncia do usu\xE1rio ou relacionamento com o cliente."
  ];
  if (isPure) {
    work.push(
      "Tem voca\xE7\xE3o natural para vendas, rela\xE7\xF5es p\xFAblicas, turismo, hospitalidade, educa\xE7\xE3o infantil, artes c\xEAnicas e \xE1reas de entretenimento.",
      "Sofre em fun\xE7\xF5es extremamente t\xE9cnicas, solit\xE1rias ou repetitivas, nas quais n\xE3o v\xEA rostos e hist\xF3rias.",
      "Precisa de sistemas simples de organiza\xE7\xE3o (checklists, lembretes visuais, acompanhamento de pares) para manter const\xE2ncia.",
      "Pode mudar de emprego com frequ\xEAncia em busca de novidade ou de ambientes mais agrad\xE1veis, se n\xE3o aprofunda o sentido do trabalho atual."
    );
  }
  if (isWithCholeric) {
    work.push(
      "Tem perfil de lideran\xE7a vis\xEDvel: dire\xE7\xE3o comercial, gest\xE3o de equipes, pol\xEDtica, evangeliza\xE7\xE3o p\xFAblica, empreendimentos de alto contato.",
      "Consegue conduzir reuni\xF5es, inspirar equipes e ao mesmo tempo cobrar resultados concretos.",
      "Vai bem em gest\xE3o de crise: comunica, acalma o p\xFAblico, mas tamb\xE9m toma decis\xF5es r\xE1pidas para corrigir a rota.",
      "Precisa cercar-se de perfis mais anal\xEDticos (melanc\xF3licos) e sistem\xE1ticos (fleum\xE1ticos) para garantir qualidade e continuidade dos projetos."
    );
  }
  if (isWithPhlegmatic) {
    work.push(
      "Destaca-se em \xE1reas de cuidado e servi\xE7o: educa\xE7\xE3o b\xE1sica, enfermagem, recursos humanos focado em bem-estar, atendimento pastoral e social.",
      "Mant\xE9m um clima relacional saud\xE1vel no trabalho, servindo como ponte entre perfis mais duros ou conflituosos.",
      "N\xE3o busca tanto cargos altos, mas sim um ambiente onde possa servir com tranquilidade e sem excesso de press\xE3o.",
      "Pode precisar de est\xEDmulo a assumir mais iniciativas e n\xE3o se limitar ao \u201Cm\xEDnimo confort\xE1vel\u201D de desempenho."
    );
  }
  if (isWithMelancholic) {
    work.push(
      "Tem voca\xE7\xE3o forte para \xE1reas criativas e human\xEDsticas: artes, m\xFAsica, literatura, psicologia, ensino, comunica\xE7\xE3o, design, minist\xE9rio pastoral.",
      "Consegue produzir trabalhos de grande impacto emocional e intelectual quando est\xE1 motivado.",
      "Pode sofrer com ambientes corporativos muito agressivos, preferindo contextos em que haja sentido, valores e algum grau de liberdade criativa.",
      "Precisa aprender a equilibrar ideal de perfei\xE7\xE3o com prazos reais, para n\xE3o travar projetos por medo de n\xE3o ficarem \u201C\xE0 altura\u201D."
    );
  }
  const relationships = [
    "Tende a ser caloroso, acess\xEDvel e espont\xE2neo nos v\xEDnculos; aproxima-se das pessoas com facilidade.",
    "Gosta de conversa, de contato frequente e de demonstra\xE7\xF5es concretas de carinho.",
    "Tem talento para descontrair situa\xE7\xF5es tensas com humor e leveza, sem deixar de mostrar proximidade.",
    "Raramente guarda rancor por muito tempo; tende a perdoar, esquecer e recome\xE7ar com relativa facilidade.",
    "Valoriza ser querido e apreciado, o que o torna atencioso e disposto a ajudar quem est\xE1 perto."
  ];
  if (isPure) {
    relationships.push(
      "Pode espalhar-se demais: muitos v\xEDnculos superficiais e poucos v\xEDnculos realmente profundos e est\xE1veis.",
      "Corre o risco de dizer \u201Csim\u201D a todos, n\xE3o conseguir sustentar tudo e acabar frustrando pessoas queridas.",
      "Precisa aprender a ficar um pouco com a dor do outro sem fugir imediatamente para a piada ou para a distra\xE7\xE3o.",
      "Quando amadurecido, torna-se amigo fiel, capaz de usar sua popularidade para proteger e sustentar quem \xE9 mais fr\xE1gil."
    );
  }
  if (isWithCholeric) {
    relationships.push(
      "Une intensidade afetiva com assertividade: fala com paix\xE3o, defende quem ama, toma posi\xE7\xE3o clara em conflitos.",
      "Pode ser percebido como dominante ou controlador se n\xE3o aprende a escutar com aten\xE7\xE3o real.",
      "Tende a gostar de rela\xE7\xF5es em que haja crescimento, desafio e projetos em comum, n\xE3o apenas conviv\xEAncia passiva.",
      "Precisa vigiar para n\xE3o usar o v\xEDnculo como palco para sua pr\xF3pria necessidade de lideran\xE7a e reconhecimento."
    );
  }
  if (isWithPhlegmatic) {
    relationships.push(
      "\xC9 um companheiro extremamente agrad\xE1vel, paciente e confi\xE1vel no cotidiano.",
      "Prefere rela\xE7\xF5es sem drama, com humor, acolhimento e poucos conflitos diretos.",
      "Pode evitar discutir quest\xF5es importantes para n\xE3o \u201Cestragar o clima\u201D, acumulando inc\xF4modos quietamente.",
      "Quando amadurece, aprende a unir sua ternura e sua paz interior a conversas mais francas, sem perder a caridade."
    );
  }
  if (isWithMelancholic) {
    relationships.push(
      "Busca v\xEDnculos profundos, intensos e significativos: n\xE3o se contenta eternamente com superficialidade.",
      "Pode oscilar entre expressar demais (exposi\xE7\xE3o intensa) e calar demais (fechamento melanc\xF3lico) quando se sente ferido.",
      "Toma cr\xEDticas e rejei\xE7\xF5es de forma muito pessoal, precisando de tempo e acolhimento para elaborar o que sente.",
      "Tem grande capacidade de consolar outros que vivem conflitos emocionais, pois conhece a pr\xF3pria complexidade interior."
    );
  }
  const family = [
    "No ambiente familiar, tende a ser quem anima, brinca, conta hist\xF3rias e puxa conversas \xE0 mesa.",
    "Cria uma atmosfera de acolhimento, espontaneidade e proximidade afetiva, especialmente com crian\xE7as e jovens.",
    "Gosta de celebrar, organizar encontros, festas e pequenos gestos de carinho que marcam a mem\xF3ria afetiva da casa."
  ];
  if (isPure) {
    family.push(
      "Pode ter dificuldade com rotina dom\xE9stica, hor\xE1rios, finan\xE7as e tarefas repetitivas, precisando de acordos claros e lembretes concretos.",
      "Corre o risco de prometer programas e mudan\xE7as em fam\xEDlia (viagens, h\xE1bitos, hor\xE1rios) e n\xE3o sustentar no dia a dia.",
      "Quando educa filhos, tende a ser permissivo e amig\xE1vel; precisa aprender a manter limites firmes sem perder a ternura."
    );
  }
  if (isWithCholeric) {
    family.push(
      "Une clima de alegria com senso de dire\xE7\xE3o: gosta de definir rumos, valores e objetivos familiares.",
      "Pode assumir naturalmente o papel de lideran\xE7a expl\xEDcita, decidindo sobre estudos, f\xE9, finan\xE7as e rotina da casa.",
      "Precisa vigiar para n\xE3o transformar o lar num \u201Cprojeto\u201D e a fam\xEDlia numa \u201Cequipe\u201D, esquecendo a necessidade de escuta e vulnerabilidade."
    );
  }
  if (isWithPhlegmatic) {
    family.push(
      "Tende a criar um lar equilibrado, com espa\xE7o para conversa, descanso e conviv\xEAncia tranquila.",
      "\xC9 um estabilizador de tens\xF5es: ajuda a acalmar brigas, acolher quem est\xE1 magoado e manter a uni\xE3o da fam\xEDlia.",
      "Seu desafio \xE9 n\xE3o ceder demais por medo de conflito, abrindo m\xE3o de pontos importantes na educa\xE7\xE3o ou na organiza\xE7\xE3o do lar."
    );
  }
  if (isWithMelancholic) {
    family.push(
      "Pode oferecer um ambiente familiar ao mesmo tempo alegre e profundo, com espa\xE7o para conversa s\xE9ria e tamb\xE9m para humor.",
      "Tem alta preocupa\xE7\xE3o com a forma\xE7\xE3o emocional e espiritual dos filhos, desejando que cres\xE7am com valores s\xF3lidos e cora\xE7\xE3o sens\xEDvel.",
      "Precisa cuidar para que suas fases de tristeza ou cansa\xE7o n\xE3o se tornem um \u201Cclima permanente\u201D na casa, especialmente diante de crian\xE7as."
    );
  }
  const spiritual = [
    "\xC9 naturalmente tocado por experi\xEAncias espirituais concretas: retiros, encontros, testemunhos, m\xFAsicas, ambientes de f\xE9 vivos.",
    "Tem facilidade para se entusiasmar com ideais de santidade, miss\xF5es apost\xF3licas, causas e obras de caridade.",
    "Costuma reconhecer com facilidade os pr\xF3prios erros logo ap\xF3s comet\xEA-los, sem cair em justificativas rebuscadas.",
    "Confessa-se e pede ajuda com relativa simplicidade quando confia no confessor ou diretor espiritual."
  ];
  if (isPure) {
    spiritual.push(
      "Seu grande inimigo espiritual \xE9 a superficialidade: rezar apenas com os l\xE1bios ou apenas enquanto sente consolo sens\xEDvel.",
      "Precisa aprender a permanecer fiel na ora\xE7\xE3o mesmo sem gosto, sustentado pela vontade e pela f\xE9, n\xE3o pela emo\xE7\xE3o do momento.",
      "A inconst\xE2ncia \xE9 outro desafio: prop\xF3sitos magn\xEDficos tomados em retiros tendem a esfriar rapidamente sem regras de vida e acompanhamento.",
      "\xC9 muito ajudado por dire\xE7\xE3o espiritual regular, na qual preste contas de prop\xF3sitos concretos e receba orienta\xE7\xF5es claras."
    );
  }
  if (isWithCholeric) {
    spiritual.push(
      "Tem predisposi\xE7\xE3o a grande zelo apost\xF3lico: evangeliza\xE7\xE3o, lideran\xE7a de grupos, miss\xF5es, defesa p\xFAblica da f\xE9.",
      "\xC9 tentado a confundir ardor com ira santa, justificando dureza e impaci\xEAncia como se fossem sempre zelo pela verdade.",
      "Precisa cultivar mansid\xE3o, humildade e obedi\xEAncia, lembrando que a gra\xE7a n\xE3o se identifica automaticamente com seus impulsos fortes.",
      "Quando se deixa purificar, torna-se um ap\xF3stolo extraordin\xE1rio: firme na doutrina, mas profundamente pr\xF3ximo das pessoas."
    );
  }
  if (isWithPhlegmatic) {
    spiritual.push(
      "Possui terreno excelente para uma fidelidade serena: quando decide seguir a Deus, tende a permanecer est\xE1vel por longos per\xEDodos.",
      "Corre o risco de confundir paz com acomoda\xE7\xE3o, fazendo apenas o m\xEDnimo exigido e evitando qualquer chamado mais exigente.",
      "Beneficia-se de metas simples, por\xE9m objetivas: momentos fixos de ora\xE7\xE3o, frequ\xEAncia est\xE1vel aos sacramentos, pequenas mortifica\xE7\xF5es constantes.",
      "Pode tornar-se um grande apoio discreto na par\xF3quia ou comunidade, sustentando silenciosamente muitas obras com sua presen\xE7a fiel."
    );
  }
  if (isWithMelancholic) {
    spiritual.push(
      "Traz enorme capacidade de unir devo\xE7\xE3o afetiva (sangu\xEDnea) com profundidade contemplativa (melanc\xF3lica).",
      "\xC9 vulner\xE1vel tanto \xE0 superficialidade (fogo de palha) quanto ao escr\xFApulo e \xE0 tristeza espiritual; precisa de dire\xE7\xE3o que o ajude a discernir.",
      "A medita\xE7\xE3o met\xF3dica, a leitura espiritual s\xE9ria e o exame di\xE1rio da caridade s\xE3o rem\xE9dios centrais para equilibrar entusiasmo e des\xE2nimo.",
      "Pode tornar-se um \u201Cpoeta da f\xE9\u201D: algu\xE9m que traduz em palavras, m\xFAsica ou gestos a beleza da vida com Deus, ajudando muitos a rezar."
    );
  }
  spiritual.push(
    "Quando a gra\xE7a educa sua afetividade e sua vontade, o sangu\xEDneo transforma seu entusiasmo passageiro em fidelidade duradoura. A alegria deixa de ser apenas estado de \xE2nimo para tornar-se virtude: uma esperan\xE7a firme em Deus que ilumina os outros, n\xE3o pela for\xE7a do espet\xE1culo, mas pela const\xE2ncia serena de quem aprendeu a amar de verdade."
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

export { buildSanguinePdfProfile };
//# sourceMappingURL=temperamentsPdf.sanguine.mjs.map
