import type { SummaryRule, TestConfigInput } from '~/types/tests';
import { withLikertGroups } from './helpers';

const genericSummaryRules: SummaryRule[] = [
  {
    min: 5.5,
    max: 7,
    title: 'Destaque principal',
    descriptionTemplate:
      '{{LAYER}} aparece como um ponto forte no seu perfil, influenciando escolhas e comportamentos.',
  },
  {
    min: 4,
    max: 5.49,
    title: 'Presenca forte',
    descriptionTemplate:
      '{{LAYER}} aparece com frequencia e tende a guiar seu modo de agir.',
  },
  {
    min: 2.5,
    max: 3.99,
    title: 'Presenca moderada',
    descriptionTemplate:
      '{{LAYER}} aparece de forma equilibrada, podendo variar conforme o contexto.',
  },
  {
    min: 1,
    max: 2.49,
    title: 'Baixa presenca',
    descriptionTemplate:
      '{{LAYER}} aparece menos ativa no momento e pode ser trabalhada.',
  },
];

const baseScoring = {
  strategy: 'average-per-group',
  summaryRules: genericSummaryRules,
} as const;

export const additionalTests: TestConfigInput[] = [
  // ---------------------------------------------------------------------------
  // RELATIONSHIPS
  // ---------------------------------------------------------------------------
  {
    id: 'love-languages',
    slug: 'love-languages',
    resultSlug: 'love-languages',
    title: 'Linguagens do Amor',
    subtitle: 'Como voce recebe e demonstra cuidado',
    description:
      'Identifique quais formas de afeto mais fazem voce se sentir valorizado.',
    category: 'other',
    tags: ['Relacionamentos', 'Afeto', 'Preferencias'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: [
      {
        id: 'words',
        name: 'Palavras de afirmacao',
        shortDescription: 'Aprecia elogios, reconhecimento e verbalizacao.',
        questions: [
          {
            id: 'rank-core',
            type: 'rank',
            text: 'Ordene as opcoes pelo que mais faz voce se sentir amado.',
            options: [
              { id: 'words', label: 'Palavras de afirmacao' },
              {
                id: 'quality-time',
                label: 'Tempo de qualidade',
              },
              { id: 'gifts', label: 'Presentes' },
              { id: 'acts', label: 'Atos de servico' },
              { id: 'touch', label: 'Toque fisico' },
            ],
            dimensionMap: {
              words: 'words',
              'quality-time': 'quality-time',
              gifts: 'gifts',
              acts: 'acts',
              touch: 'touch',
            },
          },
          {
            id: 'words-1',
            type: 'likert',
            text: 'Mensagens e elogios me tocam profundamente.',
            dimension: 'words',
            scaleKey: 'agreement',
          },
        ],
      },
      {
        id: 'quality-time',
        name: 'Tempo de qualidade',
        shortDescription: 'Conexao com presenca, atencao e escuta ativa.',
        questions: [
          {
            id: 'pair-support',
            type: 'pairwise',
            text: 'Em um dia dificil, o que faria mais diferenca?',
            pairs: [
              {
                left: {
                  id: 'quality-time',
                  label: 'Tempo de qualidade',
                  dimension: 'quality-time',
                },
                right: {
                  id: 'acts',
                  label: 'Atos de servico',
                  dimension: 'acts',
                },
              },
            ],
          },
          {
            id: 'time-1',
            type: 'likert',
            text: 'Prefiro conversas sem distracoes quando alguem quer se aproximar.',
            dimension: 'quality-time',
            scaleKey: 'agreement',
          },
        ],
      },
      {
        id: 'gifts',
        name: 'Presentes',
        shortDescription: 'Sinais de carinho por meio de lembrancas e detalhes.',
        questions: [
          {
            id: 'pair-care',
            type: 'pairwise',
            text: 'O que demonstra mais cuidado para voce?',
            pairs: [
              {
                left: {
                  id: 'gifts',
                  label: 'Presentes',
                  dimension: 'gifts',
                },
                right: {
                  id: 'words',
                  label: 'Palavras de afirmacao',
                  dimension: 'words',
                },
              },
            ],
          },
          {
            id: 'gifts-1',
            type: 'likert',
            text: 'Pequenos presentes mostram que a pessoa pensou em mim.',
            dimension: 'gifts',
            scaleKey: 'agreement',
          },
        ],
      },
      {
        id: 'acts',
        name: 'Atos de servico',
        shortDescription: 'Cuidado demonstrado por ajuda pratica.',
        questions: [
          {
            id: 'acts-1',
            type: 'likert',
            text: 'Ajuda pratica no dia a dia me faz sentir cuidado.',
            dimension: 'acts',
            scaleKey: 'agreement',
          },
        ],
      },
      {
        id: 'touch',
        name: 'Toque fisico',
        shortDescription: 'Afeto por contato, proximidade e carinho fisico.',
        questions: [
          {
            id: 'touch-1',
            type: 'likert',
            text: 'Abracos e contato fisico me deixam seguro.',
            dimension: 'touch',
            scaleKey: 'agreement',
          },
        ],
      },
    ],
  },
  {
    id: 'attachment-styles',
    slug: 'attachment-styles',
    resultSlug: 'attachment-styles',
    title: 'Estilos de Apego',
    subtitle: 'Seguro, ansioso, evitativo e desorganizado',
    description:
      'Mapa rapido do seu estilo de apego e como voce se vincula afetivamente.',
    category: 'other',
    tags: ['Relacionamentos', 'Apego', 'Vinculo'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'secure',
        name: 'Seguro',
        shortDescription: 'Confianca e equilibrio emocional.',
        questions: [
          {
            id: 'q1',
            text: 'Consigo confiar e me aproximar sem medo constante.',
          },
          {
            id: 'q2',
            text: 'Mesmo em conflito, acredito que a relacao pode se ajustar.',
          },
        ],
      },
      {
        id: 'anxious',
        name: 'Ansioso',
        shortDescription: 'Busca intensa por confirmacao.',
        questions: [
          {
            id: 'q1',
            text: 'Preciso de sinais frequentes de que a pessoa gosta de mim.',
          },
          {
            id: 'q2',
            text: 'Fico inquieto quando a resposta demora.',
          },
        ],
      },
      {
        id: 'avoidant',
        name: 'Evitativo',
        shortDescription: 'Protege autonomia e distancia emocional.',
        questions: [
          {
            id: 'q1',
            text: 'Prefiro manter minha independencia mesmo em relacionamentos.',
          },
          {
            id: 'q2',
            text: 'Me sinto sufocado quando esperam muita proximidade.',
          },
        ],
      },
      {
        id: 'disorganized',
        name: 'Desorganizado',
        shortDescription: 'Oscilacao entre proximidade e afastamento.',
        questions: [
          {
            id: 'q1',
            text: 'As vezes busco proximidade e ao mesmo tempo quero me afastar.',
          },
          {
            id: 'q2',
            text: 'Minhas reacoes afetivas podem mudar de forma inesperada.',
          },
        ],
      },
    ]),
  },
  {
    id: 'conflict-communication',
    slug: 'conflict-communication',
    resultSlug: 'conflict-communication',
    title: 'Estilos de Comunicacao em Conflitos',
    subtitle: 'Como voce reage quando ha tensao',
    description:
      'Identifica seu estilo predominante ao lidar com conversas dificeis.',
    category: 'other',
    tags: ['Relacionamentos', 'Conflitos', 'Comunicacao'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'collaborative',
        name: 'Colaborativo',
        shortDescription: 'Busca acordos ganha-ganha.',
        questions: [
          {
            id: 'q1',
            text: 'Procuro entender o ponto do outro antes de defender o meu.',
          },
          {
            id: 'q2',
            text: 'Busco solucoes que atendam os dois lados.',
          },
        ],
      },
      {
        id: 'avoidant',
        name: 'Evitativo',
        shortDescription: 'Evita discussao para reduzir tensao.',
        questions: [
          {
            id: 'q1',
            text: 'Evito conversas dificeis para nao gerar estresse.',
          },
          {
            id: 'q2',
            text: 'Adio conflitos ate que sumam.',
          },
        ],
      },
      {
        id: 'competitive',
        name: 'Competitivo',
        shortDescription: 'Foco em vencer o argumento.',
        questions: [
          {
            id: 'q1',
            text: 'Em discussao, quero provar que estou certo.',
          },
          {
            id: 'q2',
            text: 'Uso argumentos diretos para ganhar a conversa.',
          },
        ],
      },
      {
        id: 'accommodating',
        name: 'Conciliador',
        shortDescription: 'Cede para preservar o clima.',
        questions: [
          {
            id: 'q1',
            text: 'Prefiro ceder para manter a paz.',
          },
          {
            id: 'q2',
            text: 'Coloco as necessidades do outro em primeiro lugar no conflito.',
          },
        ],
      },
    ]),
  },
  {
    id: 'jealousy-boundaries',
    slug: 'jealousy-boundaries',
    resultSlug: 'jealousy-boundaries',
    title: 'Ciumes e Limites',
    subtitle: 'Confia, protege ou controla?',
    description:
      'Avalia como voce lida com ciumes, limites e confianca no vinculo.',
    category: 'other',
    tags: ['Relacionamentos', 'Ciumes', 'Limites'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'trust',
        name: 'Confianca',
        shortDescription: 'Seguranca emocional no vinculo.',
        questions: [
          {
            id: 'q1',
            text: 'Consigo dar liberdade sem suspeitas constantes.',
          },
          {
            id: 'q2',
            text: 'Acredito que confianca se mantem com pequenas atitudes.',
          },
        ],
      },
      {
        id: 'insecurity',
        name: 'Inseguranca',
        shortDescription: 'Medo de perder o vinculo.',
        questions: [
          {
            id: 'q1',
            text: 'Fico inseguro quando a pessoa demonstra interesse em outros.',
          },
          {
            id: 'q2',
            text: 'Comparo meu valor com outras pessoas.',
          },
        ],
      },
      {
        id: 'control',
        name: 'Controle',
        shortDescription: 'Busca de previsibilidade por monitoramento.',
        questions: [
          {
            id: 'q1',
            text: 'Sinto vontade de monitorar para me sentir seguro.',
          },
          {
            id: 'q2',
            text: 'Prefiro saber detalhes para evitar surpresas.',
          },
        ],
      },
      {
        id: 'communication',
        name: 'Comunicacao',
        shortDescription: 'Dialogo sobre limites e acordos.',
        questions: [
          {
            id: 'q1',
            text: 'Conversas claras sobre limites me deixam tranquilo.',
          },
          {
            id: 'q2',
            text: 'Consigo falar sobre ciumes sem atacar o outro.',
          },
        ],
      },
    ]),
  },
  {
    id: 'temperament-compatibility',
    slug: 'temperament-compatibility',
    resultSlug: 'temperament-compatibility',
    title: 'Compatibilidade de Temperamentos',
    subtitle: 'Como seu estilo combina com outros perfis',
    description: 'Questionario curto para avaliar afinidades de temperamento.',
    category: 'other',
    tags: ['Relacionamentos', 'Temperamentos', 'Compatibilidade'],
    groupsLabel: 'Temperamento',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'choleric',
        name: 'Colerico',
        shortDescription: 'Decisao, energia e iniciativa.',
        questions: [
          { id: 'q1', text: 'Prefiro parceiros com iniciativa e decisao.' },
          { id: 'q2', text: 'Admiro pessoas diretas e objetivas.' },
        ],
      },
      {
        id: 'melancholic',
        name: 'Melancolico',
        shortDescription: 'Sensibilidade, profundidade e cuidado.',
        questions: [
          { id: 'q1', text: 'Valorizo profundidade e sensibilidade emocional.' },
          { id: 'q2', text: 'Detalhes e cuidado importam muito para mim.' },
        ],
      },
      {
        id: 'sanguine',
        name: 'Sanguineo',
        shortDescription: 'Leveza, espontaneidade e sociabilidade.',
        questions: [
          { id: 'q1', text: 'Me conecto com pessoas expansivas e espontaneas.' },
          { id: 'q2', text: 'A leveza e a diversao sao essenciais no vinculo.' },
        ],
      },
      {
        id: 'phlegmatic',
        name: 'Fleumatico',
        shortDescription: 'Calma, estabilidade e paciencia.',
        questions: [
          { id: 'q1', text: 'A estabilidade e a calma fazem eu me sentir seguro.' },
          { id: 'q2', text: 'Gosto de relacionamentos sem drama.' },
        ],
      },
    ]),
  },
  // ---------------------------------------------------------------------------
  // PERSONALITY / BEHAVIOR
  // ---------------------------------------------------------------------------
  {
    id: 'big-five',
    slug: 'big-five',
    resultSlug: 'big-five',
    title: 'Big Five (OCEAN)',
    subtitle: 'Abertura, consciencia, extroversao, agradabilidade, neuroticismo',
    description:
      'Perfil rapido das cinco grandes dimensoes da personalidade.',
    category: 'other',
    tags: ['Personalidade', 'OCEAN', 'Tracos'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'openness',
        name: 'Abertura',
        shortDescription: 'Curiosidade, criatividade e flexibilidade.',
        questions: [
          { id: 'q1', text: 'Gosto de explorar ideias novas.' },
          {
            id: 'q2',
            text: 'Prefiro rotinas conhecidas a novidades.',
            reverse: true,
          },
        ],
      },
      {
        id: 'conscientiousness',
        name: 'Consciencia',
        shortDescription: 'Organizacao, disciplina e foco.',
        questions: [
          { id: 'q1', text: 'Planejo tarefas antes de agir.' },
          {
            id: 'q2',
            text: 'Costumo deixar tarefas importantes para depois.',
            reverse: true,
          },
        ],
      },
      {
        id: 'extraversion',
        name: 'Extroversao',
        shortDescription: 'Energia social e expressividade.',
        questions: [
          { id: 'q1', text: 'Sinto energia ao estar com pessoas.' },
          {
            id: 'q2',
            text: 'Ambientes sociais me cansam rapidamente.',
            reverse: true,
          },
        ],
      },
      {
        id: 'agreeableness',
        name: 'Agradabilidade',
        shortDescription: 'Cooperacao, empatia e gentileza.',
        questions: [
          { id: 'q1', text: 'Tento ser gentil mesmo quando discordo.' },
          {
            id: 'q2',
            text: 'Sou duro e critico em discussoes.',
            reverse: true,
          },
        ],
      },
      {
        id: 'neuroticism',
        name: 'Neuroticismo',
        shortDescription: 'Sensibilidade emocional e reatividade.',
        questions: [
          { id: 'q1', text: 'Fico ansioso com facilidade.' },
          {
            id: 'q2',
            text: 'Lido com estresse sem perder o controle.',
            reverse: true,
          },
        ],
      },
    ]),
  },
  {
    id: 'disc',
    slug: 'disc',
    resultSlug: 'disc',
    title: 'DISC',
    subtitle: 'Dominancia, Influencia, Estabilidade, Conformidade',
    description:
      'Leitura rapida do seu estilo predominante de comportamento.',
    category: 'other',
    tags: ['Personalidade', 'DISC', 'Comportamento'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'dominance',
        name: 'Dominancia',
        shortDescription: 'Foco em resultados e decisao.',
        questions: [
          { id: 'q1', text: 'Gosto de decidir rapidamente e liderar.' },
          { id: 'q2', text: 'Busco desafios competitivos.' },
        ],
      },
      {
        id: 'influence',
        name: 'Influencia',
        shortDescription: 'Energia social e persuasao.',
        questions: [
          { id: 'q1', text: 'Gosto de convencer e inspirar pessoas.' },
          { id: 'q2', text: 'Tenho facilidade para socializar.' },
        ],
      },
      {
        id: 'steadiness',
        name: 'Estabilidade',
        shortDescription: 'Ritmo constante e paciencia.',
        questions: [
          { id: 'q1', text: 'Prefiro estabilidade e ritmo constante.' },
          { id: 'q2', text: 'Sou paciente e previsivel.' },
        ],
      },
      {
        id: 'conscientiousness',
        name: 'Conformidade',
        shortDescription: 'Detalhes, qualidade e processos.',
        questions: [
          { id: 'q1', text: 'Sigo processos e foco em detalhes.' },
          { id: 'q2', text: 'Evito erros e reviso tudo.' },
        ],
      },
    ]),
  },
  {
    id: 'self-sabotage',
    slug: 'self-sabotage',
    resultSlug: 'self-sabotage',
    title: 'Autossabotagem',
    subtitle: 'Pontos cegos que travam seu progresso',
    description:
      'Identifique padroes internos que podem impedir suas metas.',
    category: 'other',
    tags: ['Comportamento', 'Bloqueios', 'Autoconhecimento'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'avoidance',
        name: 'Evitacao',
        shortDescription: 'Fuga de situacoes desafiadoras.',
        questions: [
          { id: 'q1', text: 'Evito comecar tarefas quando ha risco de falhar.' },
          { id: 'q2', text: 'Adio passos importantes por medo.' },
        ],
      },
      {
        id: 'perfectionism',
        name: 'Perfeccionismo',
        shortDescription: 'Exigencia excessiva e medo de erro.',
        questions: [
          {
            id: 'q1',
            text: 'So me sinto satisfeito quando tudo fica impecavel.',
          },
          { id: 'q2', text: 'Reviso demais antes de concluir.' },
        ],
      },
      {
        id: 'impulse',
        name: 'Impulso',
        shortDescription: 'Troca rapida de foco e direcao.',
        questions: [
          {
            id: 'q1',
            text: 'Troco de objetivo quando surge algo mais interessante.',
          },
          { id: 'q2', text: 'Sigo impulsos mesmo sem planejar.' },
        ],
      },
      {
        id: 'self-criticism',
        name: 'Autocritica',
        shortDescription: 'Autojulgamento intenso.',
        questions: [
          { id: 'q1', text: 'Me culpo quando algo nao sai perfeito.' },
          { id: 'q2', text: 'Tenho dificuldade em reconhecer conquistas.' },
        ],
      },
    ]),
  },
  {
    id: 'procrastination',
    slug: 'procrastination',
    resultSlug: 'procrastination',
    title: 'Procrastinacao',
    subtitle: 'Estilo de atraso e controle do tempo',
    description:
      'Entenda o que mais contribui para adiamentos e como voce reage.',
    category: 'other',
    tags: ['Comportamento', 'Tempo', 'Produtividade'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'delay',
        name: 'Atraso',
        shortDescription: 'Postergacao de tarefas.',
        questions: [
          { id: 'q1', text: 'Mesmo tarefas simples acabam ficando para depois.' },
          { id: 'q2', text: 'Deixo o prazo chegar perto para agir.' },
        ],
      },
      {
        id: 'distraction',
        name: 'Distracao',
        shortDescription: 'Interrupcoes e perda de foco.',
        questions: [
          { id: 'q1', text: 'Perco foco com notificacoes ou interrupcoes.' },
          { id: 'q2', text: 'Mudo de tarefa com facilidade.' },
        ],
      },
      {
        id: 'planning',
        name: 'Planejamento',
        shortDescription: 'Estrutura e organizacao das tarefas.',
        questions: [
          { id: 'q1', text: 'Organizo etapas antes de comecar.' },
          { id: 'q2', text: 'Defino metas claras para o dia.' },
        ],
      },
      {
        id: 'motivation',
        name: 'Motivacao',
        shortDescription: 'Energia para iniciar e concluir.',
        questions: [
          { id: 'q1', text: 'Tenho energia para iniciar tarefas.' },
          { id: 'q2', text: 'Me sinto motivado mesmo sem pressao externa.' },
        ],
      },
    ]),
  },
  {
    id: 'decision-making',
    slug: 'decision-making',
    resultSlug: 'decision-making',
    title: 'Tomada de Decisao',
    subtitle: 'Intuicao, analise e aversao a risco',
    description:
      'Avalia seu equilibrio entre intuicao, analise e tolerancia a risco.',
    category: 'other',
    tags: ['Comportamento', 'Decisoes', 'Risco'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'intuitive',
        name: 'Intuitivo',
        shortDescription: 'Decide pelo feeling e experiencia.',
        questions: [
          { id: 'q1', text: 'Confio no meu feeling para decidir.' },
          { id: 'q2', text: 'Tomo decisoes rapidamente com base em experiencia.' },
        ],
      },
      {
        id: 'analytical',
        name: 'Analitico',
        shortDescription: 'Busca dados antes de decidir.',
        questions: [
          { id: 'q1', text: 'Gosto de comparar dados antes de decidir.' },
          { id: 'q2', text: 'Prefiro analisar pros e contras.' },
        ],
      },
      {
        id: 'risk-aversion',
        name: 'Aversao a risco',
        shortDescription: 'Preferencia por escolhas seguras.',
        questions: [
          { id: 'q1', text: 'Evito riscos mesmo quando a recompensa e alta.' },
          { id: 'q2', text: 'Prefiro opcoes seguras.' },
        ],
      },
    ]),
  },
  // ---------------------------------------------------------------------------
  // LEARNING / STUDY
  // ---------------------------------------------------------------------------
  {
    id: 'learning-style-practice',
    slug: 'learning-style-practice',
    resultSlug: 'learning-style-practice',
    title: 'Estilo de Aprendizagem',
    subtitle: 'Pratica, leitura, projeto e sequencia',
    description: 'Identifica como voce prefere aprender novos conteudos.',
    category: 'other',
    tags: ['Aprendizado', 'Estudo', 'Preferencias'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'active-practice',
        name: 'Pratica ativa',
        shortDescription: 'Aprender fazendo.',
        questions: [
          { id: 'q1', text: 'Aprendo melhor fazendo exercicios praticos.' },
          { id: 'q2', text: 'Testar e errar me ajuda a fixar.' },
        ],
      },
      {
        id: 'reading-reflection',
        name: 'Leitura e reflexao',
        shortDescription: 'Entender antes de praticar.',
        questions: [
          { id: 'q1', text: 'Prefiro ler e refletir antes de praticar.' },
          { id: 'q2', text: 'Anotar e resumir me ajuda a aprender.' },
        ],
      },
      {
        id: 'project-based',
        name: 'Projetos',
        shortDescription: 'Aprender com desafios reais.',
        questions: [
          { id: 'q1', text: 'Aprendo mais quando trabalho em projetos reais.' },
          { id: 'q2', text: 'Gosto de construir algo concreto para aprender.' },
        ],
      },
      {
        id: 'sequential',
        name: 'Sequencial',
        shortDescription: 'Passo a passo e estrutura.',
        questions: [
          { id: 'q1', text: 'Prefiro seguir um passo a passo.' },
          { id: 'q2', text: 'Preciso de estrutura clara para estudar.' },
        ],
      },
    ]),
  },
  {
    id: 'study-focus-attention',
    slug: 'study-focus-attention',
    resultSlug: 'study-focus-attention',
    title: 'Foco e Atencao',
    subtitle: 'Como voce sustenta concentracao',
    description: 'Mapa rapido do seu perfil de foco e atencao.',
    category: 'other',
    tags: ['Estudo', 'Foco', 'Atencao'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'sustained',
        name: 'Foco sustentado',
        shortDescription: 'Concentracao por longos periodos.',
        questions: [
          { id: 'q1', text: 'Consigo manter foco por longos periodos.' },
          { id: 'q2', text: 'Trabalhar por blocos longos funciona para mim.' },
        ],
      },
      {
        id: 'distractible',
        name: 'Distracao',
        shortDescription: 'Sensibilidade a interrupcoes.',
        questions: [
          { id: 'q1', text: 'Pequenas interrupcoes quebram meu ritmo.' },
          { id: 'q2', text: 'Me distraio facilmente.' },
        ],
      },
      {
        id: 'hyperfocus',
        name: 'Hiperfoco',
        shortDescription: 'Imersao intensa em temas.',
        questions: [
          { id: 'q1', text: 'Quando algo me interessa, perco nocao do tempo.' },
          { id: 'q2', text: 'Fico totalmente imerso em um tema.' },
        ],
      },
      {
        id: 'context-switch',
        name: 'Alternancia',
        shortDescription: 'Troca de tarefas com estabilidade.',
        questions: [
          { id: 'q1', text: 'Troco de tarefa sem perder produtividade.' },
          { id: 'q2', text: 'Gosto de alternar materias para manter energia.' },
        ],
      },
    ]),
  },
  {
    id: 'study-habits',
    slug: 'study-habits',
    resultSlug: 'study-habits',
    title: 'Habitos de Estudo',
    subtitle: 'Rotina, organizacao e revisao',
    description: 'Avalia seus habitos de estudo e consistencia nas metas.',
    category: 'other',
    tags: ['Estudo', 'Habitos', 'Rotina'],
    groupsLabel: 'Dimensao',
    scale: 'frequency',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'planning',
        name: 'Planejamento',
        shortDescription: 'Organizacao do plano de estudo.',
        questions: [
          { id: 'q1', text: 'Defino metas claras de estudo.' },
          { id: 'q2', text: 'Divido o conteudo em etapas.' },
        ],
      },
      {
        id: 'consistency',
        name: 'Consistencia',
        shortDescription: 'Regularidade da rotina.',
        questions: [
          { id: 'q1', text: 'Mantenho horarios regulares.' },
          { id: 'q2', text: 'Estudo mesmo em dias ocupados.' },
        ],
      },
      {
        id: 'review',
        name: 'Revisao',
        shortDescription: 'Fixacao e acompanhamento.',
        questions: [
          { id: 'q1', text: 'Reviso para fixar o conteudo.' },
          { id: 'q2', text: 'Faco testes para checar aprendizado.' },
        ],
      },
      {
        id: 'environment',
        name: 'Ambiente',
        shortDescription: 'Condicoes externas de estudo.',
        questions: [
          { id: 'q1', text: 'Cuido do ambiente para evitar distracoes.' },
          { id: 'q2', text: 'Organizo materiais antes de iniciar.' },
        ],
      },
    ], 'frequency'),
  },
  {
    id: 'metacognition',
    slug: 'metacognition',
    resultSlug: 'metacognition',
    title: 'Metacognicao',
    subtitle: 'Autoconsciencia e ajuste de estrategia',
    description:
      'Descubra como voce monitora e ajusta seu proprio aprendizado.',
    category: 'other',
    tags: ['Estudo', 'Metacognicao', 'Estrategia'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'awareness',
        name: 'Consciencia',
        shortDescription: 'Reconhecimento de pontos fortes e fracos.',
        questions: [
          { id: 'q1', text: 'Sei quais assuntos domino e quais nao.' },
          { id: 'q2', text: 'Reconheco meus pontos fracos.' },
        ],
      },
      {
        id: 'monitoring',
        name: 'Monitoramento',
        shortDescription: 'Acompanhamento do progresso.',
        questions: [
          { id: 'q1', text: 'Acompanho meu progresso enquanto estudo.' },
          { id: 'q2', text: 'Percebo quando perco foco.' },
        ],
      },
      {
        id: 'strategy',
        name: 'Estrategia',
        shortDescription: 'Uso de metodos adequados.',
        questions: [
          { id: 'q1', text: 'Escolho metodos diferentes para cada materia.' },
          { id: 'q2', text: 'Uso tecnicas como flashcards ou mapas.' },
        ],
      },
      {
        id: 'adaptation',
        name: 'Adaptacao',
        shortDescription: 'Mudanca de rota quando necessario.',
        questions: [
          { id: 'q1', text: 'Mudo a estrategia quando nao funciona.' },
          { id: 'q2', text: 'Aprendo com erros e ajusto o plano.' },
        ],
      },
    ]),
  },
  // ---------------------------------------------------------------------------
  // WORK / PRODUCTIVITY
  // ---------------------------------------------------------------------------
  {
    id: 'work-values',
    slug: 'work-values',
    resultSlug: 'work-values',
    title: 'Valores de Trabalho',
    subtitle: 'O que voce mais valoriza na carreira',
    description: 'Prioridades que orientam suas escolhas profissionais.',
    category: 'other',
    tags: ['Carreira', 'Valores', 'Motivacao'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: [
      {
        id: 'autonomy',
        name: 'Autonomia',
        shortDescription: 'Liberdade e independencia.',
        questions: [
          {
            id: 'rank-values',
            type: 'rank',
            text: 'Ordene os valores que mais importam no trabalho.',
            options: [
              { id: 'autonomy', label: 'Autonomia' },
              { id: 'stability', label: 'Estabilidade' },
              { id: 'growth', label: 'Crescimento' },
              { id: 'impact', label: 'Impacto' },
              { id: 'recognition', label: 'Reconhecimento' },
            ],
            dimensionMap: {
              autonomy: 'autonomy',
              stability: 'stability',
              growth: 'growth',
              impact: 'impact',
              recognition: 'recognition',
            },
          },
          {
            id: 'autonomy-1',
            type: 'likert',
            text: 'Ter liberdade para decidir meu jeito de trabalhar e essencial.',
            dimension: 'autonomy',
            scaleKey: 'agreement',
          },
        ],
      },
      {
        id: 'stability',
        name: 'Estabilidade',
        shortDescription: 'Seguranca e previsibilidade.',
        questions: [
          {
            id: 'stability-1',
            type: 'likert',
            text: 'Seguranca e previsibilidade sao prioridades.',
            dimension: 'stability',
            scaleKey: 'agreement',
          },
        ],
      },
      {
        id: 'growth',
        name: 'Crescimento',
        shortDescription: 'Aprendizado e evolucao.',
        questions: [
          {
            id: 'growth-1',
            type: 'likert',
            text: 'Busco aprender e evoluir continuamente.',
            dimension: 'growth',
            scaleKey: 'agreement',
          },
        ],
      },
      {
        id: 'impact',
        name: 'Impacto',
        shortDescription: 'Relevancia e contribuicao.',
        questions: [
          {
            id: 'impact-1',
            type: 'likert',
            text: 'Quero que meu trabalho gere impacto real.',
            dimension: 'impact',
            scaleKey: 'agreement',
          },
        ],
      },
      {
        id: 'recognition',
        name: 'Reconhecimento',
        shortDescription: 'Visibilidade e retorno social.',
        questions: [
          {
            id: 'recognition-1',
            type: 'likert',
            text: 'Reconhecimento publico me motiva bastante.',
            dimension: 'recognition',
            scaleKey: 'agreement',
          },
        ],
      },
    ],
  },
  {
    id: 'motivators',
    slug: 'motivators',
    resultSlug: 'motivators',
    title: 'Motivadores',
    subtitle: 'O que impulsiona sua energia interna',
    description: 'Entenda seus motivadores intrinsecos e extrinsecos.',
    category: 'other',
    tags: ['Carreira', 'Motivacao', 'Energia'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: [
      {
        id: 'achievement',
        name: 'Realizacao',
        shortDescription: 'Vontade de vencer metas.',
        questions: [
          {
            id: 'rank-motivators',
            type: 'rank',
            text: 'Ordene o que mais te motiva no dia a dia.',
            options: [
              {
                id: 'achievement',
                label: 'Realizacao',
              },
              {
                id: 'affiliation',
                label: 'Conexao',
              },
              { id: 'mastery', label: 'Maestria' },
              { id: 'security', label: 'Seguranca' },
              { id: 'purpose', label: 'Proposito' },
            ],
            dimensionMap: {
              achievement: 'achievement',
              affiliation: 'affiliation',
              mastery: 'mastery',
              security: 'security',
              purpose: 'purpose',
            },
          },
          {
            id: 'achievement-1',
            type: 'likert',
            text: 'Bater metas me deixa realmente energizado.',
            dimension: 'achievement',
            scaleKey: 'agreement',
          },
        ],
      },
      {
        id: 'affiliation',
        name: 'Conexao',
        shortDescription: 'Pertencimento e relacoes.',
        questions: [
          {
            id: 'affiliation-1',
            type: 'likert',
            text: 'Sinto energia quando estou conectado com pessoas.',
            dimension: 'affiliation',
            scaleKey: 'agreement',
          },
        ],
      },
      {
        id: 'mastery',
        name: 'Maestria',
        shortDescription: 'Melhoria continua e dominio.',
        questions: [
          {
            id: 'mastery-1',
            type: 'likert',
            text: 'Aprender algo novo me deixa motivado.',
            dimension: 'mastery',
            scaleKey: 'agreement',
          },
        ],
      },
      {
        id: 'security',
        name: 'Seguranca',
        shortDescription: 'Estabilidade e previsibilidade.',
        questions: [
          {
            id: 'security-1',
            type: 'likert',
            text: 'Ter estabilidade financeira me traz motivacao.',
            dimension: 'security',
            scaleKey: 'agreement',
          },
        ],
      },
      {
        id: 'purpose',
        name: 'Proposito',
        shortDescription: 'Sentido e impacto maior.',
        questions: [
          {
            id: 'purpose-1',
            type: 'likert',
            text: 'Preciso sentir que meu trabalho tem proposito.',
            dimension: 'purpose',
            scaleKey: 'agreement',
          },
        ],
      },
    ],
  },
  {
    id: 'leadership-style',
    slug: 'leadership-style',
    resultSlug: 'leadership-style',
    title: 'Estilo de Lideranca',
    subtitle: 'Como voce conduz e influencia equipes',
    description: 'Leitura rapida do seu estilo predominante de lideranca.',
    category: 'other',
    tags: ['Carreira', 'Lideranca', 'Equipe'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'visionary',
        name: 'Visionario',
        shortDescription: 'Direcao e inspiracao.',
        questions: [
          { id: 'q1', text: 'Gosto de inspirar com visao de futuro.' },
          { id: 'q2', text: 'Defino direcao clara para o time.' },
        ],
      },
      {
        id: 'coaching',
        name: 'Coaching',
        shortDescription: 'Desenvolvimento de pessoas.',
        questions: [
          { id: 'q1', text: 'Invisto tempo em desenvolver pessoas.' },
          { id: 'q2', text: 'Dou feedbacks frequentes.' },
        ],
      },
      {
        id: 'democratic',
        name: 'Democratico',
        shortDescription: 'Participacao e consenso.',
        questions: [
          { id: 'q1', text: 'Prefiro decidir em conjunto.' },
          { id: 'q2', text: 'Ouco opinioes antes de agir.' },
        ],
      },
      {
        id: 'directive',
        name: 'Diretivo',
        shortDescription: 'Direcionamento rapido e claro.',
        questions: [
          { id: 'q1', text: 'Sou direto ao definir tarefas.' },
          { id: 'q2', text: 'Espero cumprimento rapido.' },
        ],
      },
      {
        id: 'pacesetting',
        name: 'Ritmo alto',
        shortDescription: 'Exemplo e exigencia.',
        questions: [
          { id: 'q1', text: 'Costumo liderar pelo exemplo de desempenho.' },
          { id: 'q2', text: 'Estabeleco ritmo alto.' },
        ],
      },
    ]),
  },
  {
    id: 'teamwork-collaboration',
    slug: 'teamwork-collaboration',
    resultSlug: 'teamwork-collaboration',
    title: 'Colaboracao em Equipe',
    subtitle: 'Papeis e estilos de colaboracao',
    description: 'Entenda como voce contribui e se posiciona em times.',
    category: 'other',
    tags: ['Carreira', 'Equipe', 'Colaboracao'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'coordinator',
        name: 'Coordenador',
        shortDescription: 'Organizacao e alinhamento.',
        questions: [
          { id: 'q1', text: 'Organizo o time e distribuo tarefas.' },
          { id: 'q2', text: 'Gosto de alinhar prioridades.' },
        ],
      },
      {
        id: 'implementer',
        name: 'Executor',
        shortDescription: 'Transforma planos em acao.',
        questions: [
          { id: 'q1', text: 'Transformo ideias em planos praticos.' },
          { id: 'q2', text: 'Executo com eficiencia.' },
        ],
      },
      {
        id: 'innovator',
        name: 'Inovador',
        shortDescription: 'Ideias novas e criatividade.',
        questions: [
          { id: 'q1', text: 'Trago ideias novas para o grupo.' },
          { id: 'q2', text: 'Questiono abordagens padrao.' },
        ],
      },
      {
        id: 'supporter',
        name: 'Apoiador',
        shortDescription: 'Cuidado com pessoas e clima.',
        questions: [
          { id: 'q1', text: 'Ajudo colegas e mantenho o clima.' },
          { id: 'q2', text: 'Sou bom em mediar conflitos.' },
        ],
      },
    ]),
  },
  // ---------------------------------------------------------------------------
  // WELLBEING / HABITS
  // ---------------------------------------------------------------------------
  {
    id: 'anxiety-triggers',
    slug: 'anxiety-triggers',
    resultSlug: 'anxiety-triggers',
    title: 'Gatilhos de Ansiedade',
    subtitle: 'Mapeie sinais e estrategias',
    description:
      'Identifique situacoes que ativam ansiedade e suas respostas.',
    disclaimer:
      'Este teste nao substitui avaliacao profissional. Se o sofrimento for intenso, procure ajuda especializada.',
    category: 'other',
    tags: ['Bem-estar', 'Ansiedade', 'Saude mental'],
    groupsLabel: 'Dimensao',
    scale: 'frequency',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'anticipatory',
        name: 'Antecipacao',
        shortDescription: 'Preocupacao com o futuro.',
        questions: [
          { id: 'q1', text: 'Fico ansioso antes mesmo de algo acontecer.' },
          { id: 'q2', text: 'Antecipar cenarios me deixa tenso.' },
        ],
      },
      {
        id: 'overload',
        name: 'Sobrecarga',
        shortDescription: 'Excesso de demandas.',
        questions: [
          { id: 'q1', text: 'Muitas tarefas me deixam em alerta.' },
          { id: 'q2', text: 'Sinto ansiedade quando tenho pouco controle.' },
        ],
      },
      {
        id: 'avoidance',
        name: 'Evitacao',
        shortDescription: 'Fuga de situacoes ansiogenas.',
        questions: [
          { id: 'q1', text: 'Evito situacoes para nao sentir ansiedade.' },
          { id: 'q2', text: 'Procrastino para fugir do desconforto.' },
        ],
      },
      {
        id: 'coping',
        name: 'Regulacao',
        shortDescription: 'Estrategias para lidar com ansiedade.',
        questions: [
          { id: 'q1', text: 'Uso pausas ou respiracao para lidar.' },
          { id: 'q2', text: 'Consigo pedir apoio quando preciso.' },
        ],
      },
    ], 'frequency'),
  },
  {
    id: 'burnout-stress',
    slug: 'burnout-stress',
    resultSlug: 'burnout-stress',
    title: 'Burnout e Estresse',
    subtitle: 'Sinais de exaustao e recuperacao',
    description:
      'Leitura rapida do seu nivel de desgaste e recursos de recuperacao.',
    disclaimer:
      'Este teste nao substitui avaliacao profissional. Se o sofrimento for intenso, procure ajuda especializada.',
    category: 'other',
    tags: ['Bem-estar', 'Estresse', 'Burnout'],
    groupsLabel: 'Dimensao',
    scale: 'frequency',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'exhaustion',
        name: 'Exaustao',
        shortDescription: 'Cansaco fisico e mental.',
        questions: [
          { id: 'q1', text: 'Sinto cansaco mesmo depois de descanso.' },
          { id: 'q2', text: 'Meu nivel de energia tem caido.' },
        ],
      },
      {
        id: 'cynicism',
        name: 'Cinismo',
        shortDescription: 'Desmotivacao e distancia emocional.',
        questions: [
          { id: 'q1', text: 'Me sinto desmotivado com o trabalho.' },
          { id: 'q2', text: 'Tenho pensado de forma negativa sobre minhas tarefas.' },
        ],
      },
      {
        id: 'overload',
        name: 'Sobrecarga',
        shortDescription: 'Pressao e excesso de demandas.',
        questions: [
          { id: 'q1', text: 'As demandas parecem maiores do que posso entregar.' },
          { id: 'q2', text: 'Falta tempo para tudo.' },
        ],
      },
      {
        id: 'recovery',
        name: 'Recuperacao',
        shortDescription: 'Capacidade de recarregar energia.',
        questions: [
          { id: 'q1', text: 'Consigo recuperar energia em poucos dias.' },
          { id: 'q2', text: 'Tenho limites claros para descansar.' },
        ],
      },
    ], 'frequency'),
  },
  {
    id: 'habits-consistency',
    slug: 'habits-consistency',
    resultSlug: 'habits-consistency',
    title: 'Rotina e Consistencia',
    subtitle: 'Como voce sustenta habitos no dia a dia',
    description: 'Entenda o que ajuda ou atrapalha sua consistencia.',
    category: 'other',
    tags: ['Habitos', 'Rotina', 'Consistencia'],
    groupsLabel: 'Dimensao',
    scale: 'frequency',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'routine',
        name: 'Rotina',
        shortDescription: 'Regularidade e ritmos diarios.',
        questions: [
          { id: 'q1', text: 'Tenho horarios previsiveis.' },
          { id: 'q2', text: 'Sigo rituais diarios.' },
        ],
      },
      {
        id: 'planning',
        name: 'Planejamento',
        shortDescription: 'Organizacao das tarefas.',
        questions: [
          { id: 'q1', text: 'Defino o que fazer antes de comecar.' },
          { id: 'q2', text: 'Uso listas ou agendas.' },
        ],
      },
      {
        id: 'flexibility',
        name: 'Flexibilidade',
        shortDescription: 'Ajustes sem perder consistencia.',
        questions: [
          { id: 'q1', text: 'Consigo ajustar a rotina sem perder consistencia.' },
          { id: 'q2', text: 'Reajo bem a imprevistos.' },
        ],
      },
      {
        id: 'accountability',
        name: 'Responsabilidade',
        shortDescription: 'Compromisso com metas.',
        questions: [
          { id: 'q1', text: 'Tenho alguem que me ajuda a manter metas.' },
          { id: 'q2', text: 'Cumpro o que prometo a mim mesmo.' },
        ],
      },
    ], 'frequency'),
  },
  {
    id: 'sleep-energy',
    slug: 'sleep-energy',
    resultSlug: 'sleep-energy',
    title: 'Sono e Energia',
    subtitle: 'Cronotipo simplificado e recuperacao',
    description: 'Descubra seu padrao de energia e pistas sobre o sono.',
    category: 'other',
    tags: ['Bem-estar', 'Sono', 'Energia'],
    groupsLabel: 'Dimensao',
    scale: 'frequency',
    scoring: baseScoring,
    groups: [
      {
        id: 'morning-type',
        name: 'Manha',
        shortDescription: 'Energia mais alta cedo.',
        questions: [
          {
            id: 'peak-time',
            type: 'choice',
            text: 'Quando voce se sente mais alerta?',
            multiple: false,
            options: [
              { id: 'morning', label: 'Manha (6-10h)' },
              {
                id: 'afternoon',
                label: 'Tarde (13-17h)',
              },
              {
                id: 'evening',
                label: 'Noite (19-23h)',
              },
            ],
            dimensionMap: {
              morning: 'morning-type',
              afternoon: 'balanced-type',
              evening: 'evening-type',
            },
          },
          {
            id: 'sleep-window',
            type: 'choice',
            text: 'Qual horario de dormir mais combina com voce?',
            multiple: false,
            options: [
              {
                id: 'early-bed',
                label: 'Antes das 23h',
              },
              {
                id: 'late-bed',
                label: 'Depois da 1h',
              },
              {
                id: 'varies',
                label: 'Meu horario varia muito',
              },
            ],
            dimensionMap: {
              'early-bed': 'morning-type',
              'late-bed': 'evening-type',
              varies: 'balanced-type',
            },
          },
        ],
      },
      {
        id: 'evening-type',
        name: 'Noite',
        shortDescription: 'Energia aumenta mais tarde.',
        questions: [],
      },
      {
        id: 'balanced-type',
        name: 'Equilibrado',
        shortDescription: 'Energia distribuida ao longo do dia.',
        questions: [],
      },
      {
        id: 'sleep-recovery',
        name: 'Recuperacao',
        shortDescription: 'Qualidade do sono e recarga.',
        questions: [
          {
            id: 'sleep-disruptors',
            type: 'choice',
            text: 'O que mais atrapalha seu sono?',
            multiple: true,
            minSelections: 1,
            maxSelections: 3,
            options: [
              {
                id: 'screens',
                label: 'Telas perto de dormir',
              },
              {
                id: 'caffeine',
                label: 'Cafe no fim do dia',
              },
              {
                id: 'rumination',
                label: 'Pensamentos acelerados',
              },
              {
                id: 'noise',
                label: 'Ambiente barulhento',
              },
            ],
            dimensionMap: {
              screens: 'sleep-recovery',
              caffeine: 'sleep-recovery',
              rumination: 'sleep-recovery',
              noise: 'sleep-recovery',
            },
          },
          {
            id: 'sleep-1',
            type: 'likert',
            text: 'Acordo descansado na maioria dos dias.',
            dimension: 'sleep-recovery',
            scaleKey: 'frequency',
          },
          {
            id: 'sleep-2',
            type: 'likert',
            text: 'Consigo manter energia estavel ao longo do dia.',
            dimension: 'sleep-recovery',
            scaleKey: 'frequency',
          },
        ],
      },
    ],
  },
  // ---------------------------------------------------------------------------
  // VIRAL CLASSICS
  // ---------------------------------------------------------------------------
  {
    id: 'archetypes',
    slug: 'archetypes',
    resultSlug: 'archetypes',
    title: 'Arquetipos',
    subtitle: 'Estilo Jung simplificado',
    description: 'Mapeia quais arquetipos aparecem com mais forca no seu perfil.',
    category: 'other',
    tags: ['Personalidade', 'Arquetipos', 'Jung'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'sage',
        name: 'Sabio',
        shortDescription: 'Busca por conhecimento e clareza.',
        questions: [
          { id: 'q1', text: 'Busco compreender antes de agir.' },
          { id: 'q2', text: 'Gosto de observar e aprender.' },
        ],
      },
      {
        id: 'explorer',
        name: 'Explorador',
        shortDescription: 'Liberdade e novidade.',
        questions: [
          { id: 'q1', text: 'Preciso de liberdade e novidade.' },
          { id: 'q2', text: 'Exploro caminhos diferentes.' },
        ],
      },
      {
        id: 'creator',
        name: 'Criador',
        shortDescription: 'Criatividade e expressao.',
        questions: [
          { id: 'q1', text: 'Tenho impulso para criar algo novo.' },
          { id: 'q2', text: 'Gosto de expressar ideias.' },
        ],
      },
      {
        id: 'caregiver',
        name: 'Cuidador',
        shortDescription: 'Cuidado e suporte.',
        questions: [
          { id: 'q1', text: 'Sinto vontade de cuidar dos outros.' },
          { id: 'q2', text: 'Me realizo ajudando.' },
        ],
      },
    ]),
  },
  {
    id: 'self-esteem',
    slug: 'self-esteem',
    resultSlug: 'self-esteem',
    title: 'Autoestima',
    subtitle: 'Percepcao de valor pessoal',
    description: 'Avalia como voce se percebe, se aceita e se valoriza.',
    category: 'other',
    tags: ['Personalidade', 'Autoestima', 'Bem-estar'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'self-worth',
        name: 'Valor pessoal',
        shortDescription: 'Reconhecimento interno de valor.',
        questions: [
          { id: 'q1', text: 'Sinto que tenho valor independente de resultados.' },
          { id: 'q2', text: 'Reconheco minhas qualidades.' },
        ],
      },
      {
        id: 'self-acceptance',
        name: 'Autoaceitacao',
        shortDescription: 'Aceita falhas com gentileza.',
        questions: [
          { id: 'q1', text: 'Aceito minhas falhas sem me destruir.' },
          { id: 'q2', text: 'Consigo ser gentil comigo.' },
        ],
      },
      {
        id: 'confidence',
        name: 'Confianca',
        shortDescription: 'Crenca em sua capacidade.',
        questions: [
          { id: 'q1', text: 'Confio em minha capacidade.' },
          { id: 'q2', text: 'Acredito que consigo superar desafios.' },
        ],
      },
      {
        id: 'self-criticism',
        name: 'Autocritica',
        shortDescription: 'Autojulgamento intenso.',
        questions: [
          { id: 'q1', text: 'Me critico de forma intensa.' },
          { id: 'q2', text: 'Me comparo negativamente.' },
        ],
      },
    ]),
  },
  {
    id: 'emotional-intelligence',
    slug: 'emotional-intelligence',
    resultSlug: 'emotional-intelligence',
    title: 'Inteligencia Emocional',
    subtitle: 'Autoconsciencia, regulacao e empatia',
    description: 'Perfil rapido das habilidades emocionais no dia a dia.',
    category: 'other',
    tags: ['Personalidade', 'Emocoes', 'Empatia'],
    groupsLabel: 'Dimensao',
    scale: 'agreement',
    scoring: baseScoring,
    groups: withLikertGroups([
      {
        id: 'self-awareness',
        name: 'Autoconsciencia',
        shortDescription: 'Reconhecimento das proprias emocoes.',
        questions: [
          { id: 'q1', text: 'Reconheco minhas emocoes rapidamente.' },
          { id: 'q2', text: 'Entendo o que me ativa.' },
        ],
      },
      {
        id: 'self-regulation',
        name: 'Autorregulacao',
        shortDescription: 'Controle e equilibrio emocional.',
        questions: [
          { id: 'q1', text: 'Consigo me acalmar quando fico irritado.' },
          { id: 'q2', text: 'Gerencio impulsos.' },
        ],
      },
      {
        id: 'empathy',
        name: 'Empatia',
        shortDescription: 'Percepcao do outro.',
        questions: [
          { id: 'q1', text: 'Percebo o que os outros estao sentindo.' },
          { id: 'q2', text: 'Escuto com atencao.' },
        ],
      },
      {
        id: 'social-skills',
        name: 'Habilidades sociais',
        shortDescription: 'Relacionamento e comunicacao.',
        questions: [
          { id: 'q1', text: 'Sei conduzir conversas dificeis.' },
          { id: 'q2', text: 'Facilito acordos entre pessoas.' },
        ],
      },
    ]),
  },
];

