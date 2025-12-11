// server/api/report-builders/temperamentsPdf.sanguine.ts
import type {
  TemperamentProfile,
  TemperamentsBuilderContext,
} from './temperamentsPdf';

/**
 * Constrói o perfil PDF para o temperamento sanguíneo,
 * levando em conta a combinação principal + secundário.
 *
 * Combinações tratadas:
 *  - Sanguíneo puro / sanguíneo-sanguíneo
 *  - Sanguíneo-colérico
 *  - Sanguíneo-fleumático
 *  - Sanguíneo-melancólico
 */
export function buildSanguinePdfProfile(
  ctx: TemperamentsBuilderContext,
): TemperamentProfile {
  const { secondary } = ctx;
  const secondaryId = secondary?.id ?? null;

  const isPure = !secondaryId || secondaryId === 'sanguine';
  const isWithCholeric = secondaryId === 'choleric';
  const isWithPhlegmatic = secondaryId === 'phlegmatic';
  const isWithMelancholic = secondaryId === 'melancholic';

  const label = 'Sanguíneo';

  // -------------------------------------------------------------------------
  // OVERVIEW
  // -------------------------------------------------------------------------
  let overview = '';

  if (isPure) {
    overview =
      'O temperamento sanguíneo é o “ar” entre os temperamentos clássicos: quente, úmido, móvel, sempre em troca com o ambiente. ' +
      'Na linguagem da tradição, é o tipo de excitabilidade rápida e forte, mas de duração breve: reage com intensidade, porém logo passa para o próximo estímulo. ' +
      'É o temperamento do “agora”.\n\n' +
      'Isso não significa falsidade ou teatralidade vazia. Quando o sanguíneo se emociona, a emoção é real naquele momento: a alegria, a compaixão, o arrependimento, ' +
      'o entusiasmo são sinceros. O problema não está na autenticidade do sentimento, mas na sua duração. É como escrever na areia: enquanto a onda não vem, ' +
      'a palavra está nítida; passado o estímulo, a água apaga o registro e o coração corre para outra impressão.\n\n' +
      'Essa fisiologia da alma explica por que o sanguíneo é simultaneamente um dos temperamentos mais generosos e um dos mais inconstantes. ' +
      'Ele perdoa com facilidade porque não guarda a ofensa na memória afetiva; mas também abandona promessas e propósitos com a mesma facilidade, ' +
      'pois o entusiasmo inicial não cria raízes profundas. É capaz de atos heroicos num retiro ou numa experiência forte de fé, ' +
      'e de esquecer quase tudo na segunda-feira seguinte se não tiver ajuda externa e uma regra de vida concreta.\n\n' +
      'Motivado por aceitação e prazer legítimo, o sanguíneo vive orientado para relação, conexão e experiência. ' +
      'Enquanto o colérico busca o poder e o melancólico busca a perfeição, o sanguíneo busca ser amado e desfrutar o bem que encontra: ' +
      'é o temperamento da comunhão humana, do clima, da alegria compartilhada. Por isso tende a ser sociável, acessível, ' +
      'com senso de humor e capacidade de transformar ambientes pesados em lugares habitáveis.\n\n' +
      'Ao mesmo tempo, essa abertura radical ao exterior o torna muito influenciável: ambientes, grupos, modas e discursos têm enorme impacto sobre o seu interior. ' +
      'Sua “vida interior” corre o risco de ser apenas um espelho daquilo que o cerca. Sem critérios claros, sem direção espiritual e sem disciplina progressiva, ' +
      'o sanguíneo pode passar a vida inteira sendo decidido pelo ambiente, sempre de boa vontade, mas raramente de vontade profunda. ' +
      'Quando, porém, ele aprende a ordenar essa riqueza afetiva, torna-se um dos instrumentos mais poderosos para difundir alegria, evangelizar, reconciliar e aproximar pessoas.';
  } else if (isWithCholeric) {
    overview =
      'Na combinação sanguíneo-colérico, o ar quente do sanguíneo encontra o fogo do colérico. ' +
      'Trata-se de uma das misturas mais energéticas, visíveis e carismáticas entre os temperamentos clássicos. ' +
      'Aqui, a sociabilidade, o humor e a empatia tática do sanguíneo se unem à decisão, à objetividade e à tenacidade do colérico.\n\n' +
      'O sanguíneo-colérico (San-Col) vive habitualmente tensionado entre duas forças: o desejo de ser amado e aceito (sanguíneo) ' +
      'e o impulso de alcançar resultados, metas e conquistas (colérico). Quer agradar, mas também quer vencer. ' +
      'Isso o torna um negociador nato: sabe falar às pessoas, percebe o clima emocional da sala, mas não perde de vista o objetivo final.\n\n' +
      'Em termos de energia, é uma verdadeira “máquina”: dificilmente fica parado. Onde o sanguíneo puro tende a dispersar-se em mil estímulos, ' +
      'o componente colérico fornece foco, direção e capacidade de empurrar projetos até o fim. É o tipo que não apenas tem ideias, ' +
      'mas também monta equipe, define prazo e cobra entrega.\n\n' +
      'Na comunicação, é um dos perfis mais fortes que existem. A eloquência natural do sanguíneo, com fluidez verbal, humor e linguagem acessível, ' +
      'é reforçada pela assertividade lógica do colérico, que sabe pedir, confrontar, defender e negociar sem medo. ' +
      'Daí surgem grandes vendedores, políticos de campanha, empreendedores, líderes comunitários e pregadores carismáticos.\n\n' +
      'O grande risco, porém, está na impulsividade. O mesmo sistema psíquico que reage rápido, fala rápido e decide rápido pode passar por cima de dados, ' +
      'pessoas e consequências. Se não aprende a ouvir, a consultar e a ponderar, o sanguíneo-colérico pode usar seu charme para encobrir uma ambição feroz ' +
      'ou acreditar que todo impulso forte já é, por si, uma luz de Deus. Quando amadurece, porém, torna-se um líder que tanto cuida de gente quanto faz as coisas acontecerem.';
  } else if (isWithPhlegmatic) {
    overview =
      'Na combinação sanguíneo-fleumático, o ar quente e leve do sanguíneo encontra a água calma e estável do fleumático. ' +
      'O resultado é uma das personalidades mais afáveis, amáveis e fáceis de conviver de todo o espectro temperamental. ' +
      'É o “harmonizador bem-humorado”: alguém que dificilmente perde a paz e quase sempre encontra algo de bom a dizer.\n\n' +
      'Enquanto o sanguíneo puro pode ser explosivo e inconstante, o componente fleumático traz uma espécie de amortecedor interior: ' +
      'os afetos continuam rápidos, mas são menos dramáticos; os entusiasmos continuam vivos, mas são menos bruscos. ' +
      'Em vez de altos e baixos intensos, tende a haver uma alegria mansa, uma boa vontade constante, uma estabilidade doce.\n\n' +
      'A necessidade sanguínea de ser querido alia-se ao desejo fleumático de evitar conflitos. ' +
      'O sanguíneo-fleumático (San-Fle) é o tipo de pessoa que prefere ceder a discutir, que muda de opinião para manter a paz, ' +
      'que adia conversas difíceis até o último limite. Tem horror a brigas e climas pesados, e seu primeiro impulso é acalmar, ' +
      'contornar, fazer piada ou oferecer consolo em vez de entrar de cabeça no confronto.\n\n' +
      'Em contrapartida, essa docilidade o torna extremamente leal, constante e previsível nos vínculos. ' +
      'Onde o sanguíneo puro tende a esquecer pessoas à medida que novos estímulos aparecem, o fleumático ancora o coração, ' +
      'fazendo com que amizades e laços se prolonguem no tempo. É um excelente confidente, um bom colega de trabalho, ' +
      'um membro de família que “segura” a estrutura doméstica pelo simples fato de estar sempre ali, tranquilo, bem-disposto.\n\n' +
      'Seu desafio está menos no risco de explodir e mais no risco de acomodar: pode tolerar o que não deveria tolerar, ' +
      'pode deixar passar oportunidades importantes e pode evitar decisões difíceis até que outros decidam por ele. ' +
      'Quando frágil, refugia-se na zona de conforto; quando amadurecido, torna-se um dos maiores especialistas em criar ambientes saudáveis, ' +
      'harmoniosos e carregados de boa vontade.';
  } else if (isWithMelancholic) {
    overview =
      'No sanguíneo-melancólico, dois mundos aparentemente opostos se encontram: a extroversão leve, otimista e relacional do sanguíneo ' +
      'e a profundidade sensível, introspectiva e idealista do melancólico. É uma combinação complexa, fascinante e, muitas vezes, dolorosa, ' +
      'capaz de produzir personalidades riquíssimas – artistas, pensadores, comunicadores intensos – mas também sujeitos a oscilações emocionais marcantes.\n\n' +
      'O sanguíneo-melancólico (San-Mel) vive num movimento de expansão e retração. Há fases em que o lado sanguíneo toma a dianteira: ' +
      'sociabilidade, humor, criatividade, capacidade de conquistar pessoas com carisma. ' +
      'Logo depois, porém, o lado melancólico entra em campo com sua autocrítica severa, sua tendência a revisitar conversas, ' +
      'a rever o que disse, a imaginar como foi percebido. O que era euforia pode converter-se em vergonha, dúvida ou tristeza.\n\n' +
      'A sensibilidade desse tipo é extrema. A necessidade sanguínea de aprovação se une ao perfeccionismo melancólico: ' +
      'o resultado é alguém que sente profundamente cada elogio e cada crítica. Uma palavra dura que um sanguíneo-colérico ignoraria ' +
      'pode atravessar o coração do San-Mel por dias. Ao mesmo tempo, essa hipersensibilidade multiplica sua capacidade de empatia, ' +
      'de compreender nuances, de captar o não-dito nas relações.\n\n' +
      'Do ponto de vista do talento, trata-se de um dos perfis mais criativos. O sangue oferece expressividade, humor, teatralidade; ' +
      'a melancolia oferece conteúdo, profundidade, memória, riqueza de contraste. Daí surgem músicos, escritores, atores, professores e pastores capazes de falar ao coração com beleza e substância. ' +
      'Se, porém, essa riqueza interior não é disciplinada, acaba gerando dramas, autossabotagem, procrastinação e uma sensação crônica de “nunca estar à altura”.\n\n' +
      'O caminho de maturidade passa por aprender a não absolutizar nem o entusiasmo nem o abatimento: ' +
      'nem tudo é tão maravilhoso quanto o lado sanguíneo imagina em seus picos, nem tudo é tão trágico quanto o lado melancólico sugere em suas vales. ' +
      'Quando consegue educar essa oscilação, o sanguíneo-melancólico se torna um intérprete privilegiado da experiência humana – ' +
      'alguém que sente muito, mas que também sabe transformar esse sentir em serviço, arte, consolação e evangelização.';
  } else {
    overview =
      'O temperamento sanguíneo, em qualquer combinação, é marcado por reação rápida, calor humano e grande capacidade de adaptação. ' +
      'É o tipo que se volta espontaneamente para pessoas, ambientes e experiências, que capta o clima do momento e procura torná-lo mais leve, ' +
      'mais alegre e mais suportável para todos.\n\n' +
      'Quando bem educado, torna-se um difusor de esperança, de comunhão e de confiança em Deus; quando desordenado, dispersa-se em mil impressões, ' +
      'persegue apenas o prazer imediato e foge de qualquer esforço prolongado. Em todos os casos, o segredo está em unir seu coração grande a uma vontade igualmente grande.';
  }

  // -------------------------------------------------------------------------
  // STRENGTHS
  // -------------------------------------------------------------------------
  const strengths: string[] = [
    'Reação rápida e calorosa aos estímulos: consegue acolher, responder e adaptar-se com grande velocidade.',
    'Facilidade em criar vínculos, quebrar o gelo e fazer com que as pessoas se sintam vistas e bem-vindas.',
    'Otimismo espontâneo: tende a acreditar que as coisas vão melhorar e transmite essa esperança ao ambiente.',
    'Capacidade de perdoar e recomeçar com rapidez, sem guardar rancor por longos períodos.',
    'Flexibilidade elevada: lida bem com mudanças de planos, imprevistos e contextos variados.',
    'Expressividade verbal e não verbal: comunica-se com naturalidade, usando gestos, humor e imagens vivas.',
    'Senso de oportunidade social: costuma saber quando falar, quando animar, quando descontrair um clima pesado.',
    'Imaginação viva e criatividade em situações que exigem improviso, narrativa, teatro ou oratória.',
    'Empatia afetiva imediata: sente a alegria e a dor do outro com facilidade, reagindo de forma acolhedora.',
    'Capacidade de animar grupos, iniciar conversas, promover encontros e construir redes de relacionamento.',
  ];

  if (isPure) {
    strengths.push(
      'Alegria contagiante e simplicidade de coração, tornando ambientes mais humanos e acessíveis.',
      'Grande capacidade de levantar-se após fracassos: não se deixa prender por quedas passadas e volta a tentar.',
      'Espírito de criança na confiança: tende a confiar na Providência e nas pessoas com uma certa despreocupação saudável.',
      'Quando educado, converte sua espontaneidade em sinceridade virtuosa: fala a verdade com leveza, sem crueldade.',
    );
  }

  if (isWithCholeric) {
    strengths.push(
      'Carisma de liderança: combina presença forte, capacidade de falar em público e firmeza nas decisões.',
      'Altíssima energia para iniciar e conduzir projetos, unindo entusiasmo sanguíneo com foco colérico.',
      'Habilidade especial em persuadir, negociar e mobilizar pessoas em torno de uma causa ou meta concreta.',
      'Resiliência prática: reage bem a críticas e desafios, usando-os como combustível para melhorar resultados.',
    );
  }

  if (isWithPhlegmatic) {
    strengths.push(
      'Afetividade estável: une calor humano com serenidade, evitando dramas desnecessários.',
      'Grande capacidade de ouvir com paciência, acolher confidências e consolar sem se desesperar com o problema do outro.',
      'Perfil de “oleo social”: facilita a convivência, reduz tensões e favorece ambientes harmoniosos e alegres.',
      'Lealdade tranquila: tende a manter amizades e vínculos por muito tempo, sem fazer exigências excessivas.',
    );
  }

  if (isWithMelancholic) {
    strengths.push(
      'Profunda sensibilidade estética e simbólica: percebe beleza em palavras, gestos, liturgias, artes e relações.',
      'Capacidade de unir expressão calorosa com conteúdo profundo, tornando-se comunicador, professor ou artista muito impactante.',
      'Autoconhecimento mais rico do que o sanguíneo puro, devido à reflexão melancólica sobre as próprias emoções.',
      'Empatia refinada: entende não apenas que o outro sofre, mas também por quê sofre, e encontra modos criativos de consolar.',
    );
  }

  // -------------------------------------------------------------------------
  // RISKS
  // -------------------------------------------------------------------------
  const risks: string[] = [
    'Superficialidade na duração das impressões: entusiasmos, propósitos e decisões tendem a durar pouco se não houver apoio externo.',
    'Inconstância em compromissos de longo prazo, sobretudo quando a novidade inicial desaparece.',
    'Busca excessiva de aprovação: tendência a adaptar o discurso e o comportamento para não desagradar, mesmo ao custo da verdade.',
    'Propensão a fugir de esforços prolongados, preferindo o prazer imediato ou o caminho mais fácil.',
    'Distração e desorganização crônicas: esquece compromissos, perde prazos, subestima o tempo necessário para as tarefas.',
    'Risco de falar demais e ouvir de menos, expondo-se a indiscrições e ferindo pessoas sem intenção.',
    'Vulnerabilidade a ambientes e modas: pode mudar de opinião ou de estilo de vida pela simples pressão do grupo.',
    'Tendência a minimizar problemas graves, transformando tudo em piada ou em ocasião de leveza quando é preciso seriedade.',
  ];

  if (isPure) {
    risks.push(
      'Risco de permanecer “eternamente adolescente” se não abraçar responsabilidades e rotinas estáveis.',
      'Facilidade em cair em pecados de sensualidade (gula, luxúria, curiosidade excessiva) por reagir rápido aos estímulos dos sentidos.',
      'Tendência a prometer muito (especialmente em contexto emocional ou espiritual) e cumprir pouco no dia a dia.',
      'Perigo de usar a alegria como fuga: encher-se de distrações para não encarar sofrimentos e questões profundas.',
    );
  }

  if (isWithCholeric) {
    risks.push(
      'Impulsividade elevada: decisões rápidas demais, baseadas em sensação ou intuição, sem análise adequada dos fatos.',
      'Risco de manipulação: pode usar charme, humor e discurso convincente para impor sua própria vontade.',
      'Propensão a atropelar temperamentos mais lentos (fleumáticos e melancólicos), sem lhes dar espaço para falar ou participar das decisões.',
      'Possibilidade de confundir ambição pessoal com zelo pelo bem comum, revestindo planos pessoais de linguagem idealista.',
    );
  }

  if (isWithPhlegmatic) {
    risks.push(
      'Aversão quase crônica a conflitos: adia conversas necessárias, concorda sem realmente concordar, engole mágoas em silêncio.',
      'Procrastinação em decisões importantes, mantendo situações indefinidas para não ter de assumir posição clara.',
      'Risco de viver num nível de vida muito abaixo de suas capacidades por simples comodismo afetivo.',
      'Dificuldade em dizer “não”, sobrecarregando-se de deveres que depois não conseguirá cumprir com qualidade.',
    );
  }

  if (isWithMelancholic) {
    risks.push(
      'Oscilações fortes de humor: fases de grande euforia seguidas de períodos de abatimento, dúvida e autocrítica.',
      'Perfeccionismo afetivo: necessidade intensa de ser amado e ao mesmo tempo medo de não estar à altura, gerando insegurança crônica.',
      'Risco de dramatizar conflitos e rejeições, ampliando internamente situações que talvez fossem menores.',
      'Tendência a alternar exposição exagerada (contar demais) com fechamento súbito (silêncio ressentido) nos relacionamentos.',
    );
  }

  // -------------------------------------------------------------------------
  // WORK / CAREER
  // -------------------------------------------------------------------------
  const work: string[] = [
    'Funciona melhor em ambientes com pessoas, movimento e variedade de tarefas.',
    'Brilha em funções que exigem comunicação, negociação, atendimento ou presença pública.',
    'Aprende com rapidez intuitiva, sobretudo quando o conteúdo é apresentado de forma concreta e envolvente.',
    'Responde bem a feedback positivo, reconhecimento e metas claras, ainda que curtas.',
    'Tende a ter boas ideias e sugerir melhorias criativas, especialmente em processos que envolvam experiência do usuário ou relacionamento com o cliente.',
  ];

  if (isPure) {
    work.push(
      'Tem vocação natural para vendas, relações públicas, turismo, hospitalidade, educação infantil, artes cênicas e áreas de entretenimento.',
      'Sofre em funções extremamente técnicas, solitárias ou repetitivas, nas quais não vê rostos e histórias.',
      'Precisa de sistemas simples de organização (checklists, lembretes visuais, acompanhamento de pares) para manter constância.',
      'Pode mudar de emprego com frequência em busca de novidade ou de ambientes mais agradáveis, se não aprofunda o sentido do trabalho atual.',
    );
  }

  if (isWithCholeric) {
    work.push(
      'Tem perfil de liderança visível: direção comercial, gestão de equipes, política, evangelização pública, empreendimentos de alto contato.',
      'Consegue conduzir reuniões, inspirar equipes e ao mesmo tempo cobrar resultados concretos.',
      'Vai bem em gestão de crise: comunica, acalma o público, mas também toma decisões rápidas para corrigir a rota.',
      'Precisa cercar-se de perfis mais analíticos (melancólicos) e sistemáticos (fleumáticos) para garantir qualidade e continuidade dos projetos.',
    );
  }

  if (isWithPhlegmatic) {
    work.push(
      'Destaca-se em áreas de cuidado e serviço: educação básica, enfermagem, recursos humanos focado em bem-estar, atendimento pastoral e social.',
      'Mantém um clima relacional saudável no trabalho, servindo como ponte entre perfis mais duros ou conflituosos.',
      'Não busca tanto cargos altos, mas sim um ambiente onde possa servir com tranquilidade e sem excesso de pressão.',
      'Pode precisar de estímulo a assumir mais iniciativas e não se limitar ao “mínimo confortável” de desempenho.',
    );
  }

  if (isWithMelancholic) {
    work.push(
      'Tem vocação forte para áreas criativas e humanísticas: artes, música, literatura, psicologia, ensino, comunicação, design, ministério pastoral.',
      'Consegue produzir trabalhos de grande impacto emocional e intelectual quando está motivado.',
      'Pode sofrer com ambientes corporativos muito agressivos, preferindo contextos em que haja sentido, valores e algum grau de liberdade criativa.',
      'Precisa aprender a equilibrar ideal de perfeição com prazos reais, para não travar projetos por medo de não ficarem “à altura”.',
    );
  }

  // -------------------------------------------------------------------------
  // RELATIONSHIPS
  // -------------------------------------------------------------------------
  const relationships: string[] = [
    'Tende a ser caloroso, acessível e espontâneo nos vínculos; aproxima-se das pessoas com facilidade.',
    'Gosta de conversa, de contato frequente e de demonstrações concretas de carinho.',
    'Tem talento para descontrair situações tensas com humor e leveza, sem deixar de mostrar proximidade.',
    'Raramente guarda rancor por muito tempo; tende a perdoar, esquecer e recomeçar com relativa facilidade.',
    'Valoriza ser querido e apreciado, o que o torna atencioso e disposto a ajudar quem está perto.',
  ];

  if (isPure) {
    relationships.push(
      'Pode espalhar-se demais: muitos vínculos superficiais e poucos vínculos realmente profundos e estáveis.',
      'Corre o risco de dizer “sim” a todos, não conseguir sustentar tudo e acabar frustrando pessoas queridas.',
      'Precisa aprender a ficar um pouco com a dor do outro sem fugir imediatamente para a piada ou para a distração.',
      'Quando amadurecido, torna-se amigo fiel, capaz de usar sua popularidade para proteger e sustentar quem é mais frágil.',
    );
  }

  if (isWithCholeric) {
    relationships.push(
      'Une intensidade afetiva com assertividade: fala com paixão, defende quem ama, toma posição clara em conflitos.',
      'Pode ser percebido como dominante ou controlador se não aprende a escutar com atenção real.',
      'Tende a gostar de relações em que haja crescimento, desafio e projetos em comum, não apenas convivência passiva.',
      'Precisa vigiar para não usar o vínculo como palco para sua própria necessidade de liderança e reconhecimento.',
    );
  }

  if (isWithPhlegmatic) {
    relationships.push(
      'É um companheiro extremamente agradável, paciente e confiável no cotidiano.',
      'Prefere relações sem drama, com humor, acolhimento e poucos conflitos diretos.',
      'Pode evitar discutir questões importantes para não “estragar o clima”, acumulando incômodos quietamente.',
      'Quando amadurece, aprende a unir sua ternura e sua paz interior a conversas mais francas, sem perder a caridade.',
    );
  }

  if (isWithMelancholic) {
    relationships.push(
      'Busca vínculos profundos, intensos e significativos: não se contenta eternamente com superficialidade.',
      'Pode oscilar entre expressar demais (exposição intensa) e calar demais (fechamento melancólico) quando se sente ferido.',
      'Toma críticas e rejeições de forma muito pessoal, precisando de tempo e acolhimento para elaborar o que sente.',
      'Tem grande capacidade de consolar outros que vivem conflitos emocionais, pois conhece a própria complexidade interior.',
    );
  }

  // -------------------------------------------------------------------------
  // FAMILY
  // -------------------------------------------------------------------------
  const family: string[] = [
    'No ambiente familiar, tende a ser quem anima, brinca, conta histórias e puxa conversas à mesa.',
    'Cria uma atmosfera de acolhimento, espontaneidade e proximidade afetiva, especialmente com crianças e jovens.',
    'Gosta de celebrar, organizar encontros, festas e pequenos gestos de carinho que marcam a memória afetiva da casa.',
  ];

  if (isPure) {
    family.push(
      'Pode ter dificuldade com rotina doméstica, horários, finanças e tarefas repetitivas, precisando de acordos claros e lembretes concretos.',
      'Corre o risco de prometer programas e mudanças em família (viagens, hábitos, horários) e não sustentar no dia a dia.',
      'Quando educa filhos, tende a ser permissivo e amigável; precisa aprender a manter limites firmes sem perder a ternura.',
    );
  }

  if (isWithCholeric) {
    family.push(
      'Une clima de alegria com senso de direção: gosta de definir rumos, valores e objetivos familiares.',
      'Pode assumir naturalmente o papel de liderança explícita, decidindo sobre estudos, fé, finanças e rotina da casa.',
      'Precisa vigiar para não transformar o lar num “projeto” e a família numa “equipe”, esquecendo a necessidade de escuta e vulnerabilidade.',
    );
  }

  if (isWithPhlegmatic) {
    family.push(
      'Tende a criar um lar equilibrado, com espaço para conversa, descanso e convivência tranquila.',
      'É um estabilizador de tensões: ajuda a acalmar brigas, acolher quem está magoado e manter a união da família.',
      'Seu desafio é não ceder demais por medo de conflito, abrindo mão de pontos importantes na educação ou na organização do lar.',
    );
  }

  if (isWithMelancholic) {
    family.push(
      'Pode oferecer um ambiente familiar ao mesmo tempo alegre e profundo, com espaço para conversa séria e também para humor.',
      'Tem alta preocupação com a formação emocional e espiritual dos filhos, desejando que cresçam com valores sólidos e coração sensível.',
      'Precisa cuidar para que suas fases de tristeza ou cansaço não se tornem um “clima permanente” na casa, especialmente diante de crianças.',
    );
  }

  // -------------------------------------------------------------------------
  // SPIRITUAL
  // -------------------------------------------------------------------------
  const spiritual: string[] = [
    'É naturalmente tocado por experiências espirituais concretas: retiros, encontros, testemunhos, músicas, ambientes de fé vivos.',
    'Tem facilidade para se entusiasmar com ideais de santidade, missões apostólicas, causas e obras de caridade.',
    'Costuma reconhecer com facilidade os próprios erros logo após cometê-los, sem cair em justificativas rebuscadas.',
    'Confessa-se e pede ajuda com relativa simplicidade quando confia no confessor ou diretor espiritual.',
  ];

  if (isPure) {
    spiritual.push(
      'Seu grande inimigo espiritual é a superficialidade: rezar apenas com os lábios ou apenas enquanto sente consolo sensível.',
      'Precisa aprender a permanecer fiel na oração mesmo sem gosto, sustentado pela vontade e pela fé, não pela emoção do momento.',
      'A inconstância é outro desafio: propósitos magníficos tomados em retiros tendem a esfriar rapidamente sem regras de vida e acompanhamento.',
      'É muito ajudado por direção espiritual regular, na qual preste contas de propósitos concretos e receba orientações claras.',
    );
  }

  if (isWithCholeric) {
    spiritual.push(
      'Tem predisposição a grande zelo apostólico: evangelização, liderança de grupos, missões, defesa pública da fé.',
      'É tentado a confundir ardor com ira santa, justificando dureza e impaciência como se fossem sempre zelo pela verdade.',
      'Precisa cultivar mansidão, humildade e obediência, lembrando que a graça não se identifica automaticamente com seus impulsos fortes.',
      'Quando se deixa purificar, torna-se um apóstolo extraordinário: firme na doutrina, mas profundamente próximo das pessoas.',
    );
  }

  if (isWithPhlegmatic) {
    spiritual.push(
      'Possui terreno excelente para uma fidelidade serena: quando decide seguir a Deus, tende a permanecer estável por longos períodos.',
      'Corre o risco de confundir paz com acomodação, fazendo apenas o mínimo exigido e evitando qualquer chamado mais exigente.',
      'Beneficia-se de metas simples, porém objetivas: momentos fixos de oração, frequência estável aos sacramentos, pequenas mortificações constantes.',
      'Pode tornar-se um grande apoio discreto na paróquia ou comunidade, sustentando silenciosamente muitas obras com sua presença fiel.',
    );
  }

  if (isWithMelancholic) {
    spiritual.push(
      'Traz enorme capacidade de unir devoção afetiva (sanguínea) com profundidade contemplativa (melancólica).',
      'É vulnerável tanto à superficialidade (fogo de palha) quanto ao escrúpulo e à tristeza espiritual; precisa de direção que o ajude a discernir.',
      'A meditação metódica, a leitura espiritual séria e o exame diário da caridade são remédios centrais para equilibrar entusiasmo e desânimo.',
      'Pode tornar-se um “poeta da fé”: alguém que traduz em palavras, música ou gestos a beleza da vida com Deus, ajudando muitos a rezar.',
    );
  }

  spiritual.push(
    'Quando a graça educa sua afetividade e sua vontade, o sanguíneo transforma seu entusiasmo passageiro em fidelidade duradoura. ' +
      'A alegria deixa de ser apenas estado de ânimo para tornar-se virtude: uma esperança firme em Deus que ilumina os outros, ' +
      'não pela força do espetáculo, mas pela constância serena de quem aprendeu a amar de verdade.',
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
