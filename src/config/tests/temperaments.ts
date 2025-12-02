// src/config/tests/temperaments.ts
import type { LikertTestConfig, SummaryRule } from '~/types/tests';

export const defaultSummaryRules: SummaryRule[] = [
  {
    min: 4.25,
    max: 5,
    title: 'Traço dominante',
    descriptionTemplate:
      '{{LAYER}} aparece como um traço muito forte na sua personalidade, influenciando decisões, hábitos e reações de forma consistente.',
  },
  {
    min: 3.25,
    max: 4.24,
    title: 'Traço forte',
    descriptionTemplate:
      '{{LAYER}} está bem presente e tende a se manifestar com frequência, ainda que possa oscilar em alguns contextos.',
  },
  {
    min: 2.25,
    max: 3.24,
    title: 'Traço intermediário',
    descriptionTemplate:
      '{{LAYER}} aparece de maneira moderada, podendo ganhar ou perder força dependendo das circunstâncias e do esforço consciente.',
  },
  {
    min: 1,
    max: 2.24,
    title: 'Traço frágil',
    descriptionTemplate:
      '{{LAYER}} tende a ser mais fraco ou pouco integrado, podendo exigir atenção, formação ou correção para se desenvolver de modo saudável.',
  },
];

// -----------------------------------------------------------------------------
// TESTE DE TEMPERAMENTOS – 32 PERGUNTAS (8 POR TEMPERAMENTO)
// -----------------------------------------------------------------------------

export const temperamentsClassicTest: LikertTestConfig = {
  id: 'temperaments-classic',
  slug: 'temperamentos-classicos',
  title: 'Temperamentos Clássicos',
  subtitle: 'Colérico, Melancólico, Sanguíneo e Fleumático',
  description:
    'Este questionário mapeia a predominância dos quatro temperamentos clássicos a partir de situações do cotidiano, sem rotular durante o teste. Ao final, você verá quais padrões aparecem com mais força na sua personalidade.',
  category: 'temperaments',
  emphasis: 'highlighted',
  tags: ['Temperamentos', 'Autoconhecimento', 'Clássico'],
  groupsLabel: 'Bloco',
  scaleMinLabel: 'Discordo totalmente',
  scaleMaxLabel: 'Concordo totalmente',
  hasPremiumReport: true,
  scoring: {
    strategy: 'average-per-group',
    summaryRules: defaultSummaryRules,
  },
  groups: [
    // -------------------------------------------------------------------------
    // COLÉRICO
    // -------------------------------------------------------------------------
    {
      id: 'choleric',
      name: 'Colérico',
      shortDescription:
        'Traços ligados à iniciativa, foco em resultados, assertividade e firmeza nas decisões.',
      questions: [
        {
          id: 'q1',
          text: 'Quando alguém atrasa ou atrapalha meus planos, eu fico facilmente irritado.',
        },
        {
          id: 'q2',
          text: 'Em grupos, costumo assumir a liderança sem que ninguém precise pedir.',
        },
        {
          id: 'q3',
          text: 'Quando estabeleço uma meta, faço de tudo para cumpri-la, mesmo que seja difícil.',
        },
        {
          id: 'q4',
          text: 'Falo de forma direta, mesmo que às vezes soe duro ou crítico.',
        },
        {
          id: 'q5',
          text: 'Fico impaciente quando preciso explicar a mesma coisa várias vezes.',
        },
        {
          id: 'q6',
          text: 'Prefiro tomar decisões rápidas a ficar analisando por muito tempo.',
        },
        {
          id: 'q7',
          text: 'Gosto de desafios que colocam à prova minha capacidade de vencer obstáculos.',
        },
        {
          id: 'q8',
          text: 'Tenho dificuldade em aceitar quando outra pessoa assume o controle da situação.',
        },
      ],
    },

    // -------------------------------------------------------------------------
    // MELANCÓLICO
    // -------------------------------------------------------------------------
    {
      id: 'melancholic',
      name: 'Melancólico',
      shortDescription:
        'Traços ligados a sensibilidade emocional, perfeccionismo, profundidade e autocrítica.',
      questions: [
        {
          id: 'q1',
          text: 'Antes de agir, costumo planejar e analisar todos os detalhes.',
        },
        {
          id: 'q2',
          text: 'Depois de um encontro social, fico pensando se disse algo inadequado.',
        },
        {
          id: 'q3',
          text: 'Críticas, mesmo leves, mexem bastante comigo.',
        },
        {
          id: 'q4',
          text: 'Percebo facilmente erros e imperfeições em mim, nos outros ou nos projetos.',
        },
        {
          id: 'q5',
          text: 'Prefiro poucos amigos próximos a muitos conhecidos.',
        },
        {
          id: 'q6',
          text: 'Sinto minhas emoções de forma intensa, tanto as alegres quanto as tristes.',
        },
        {
          id: 'q7',
          text: 'Costumo me cobrar mais do que cobro os outros.',
        },
        {
          id: 'q8',
          text: 'Quando algo não sai como planejei, é difícil não me culpar.',
        },
      ],
    },

    // -------------------------------------------------------------------------
    // SANGUÍNEO
    // -------------------------------------------------------------------------
    {
      id: 'sanguine',
      name: 'Sanguíneo',
      shortDescription:
        'Traços ligados a sociabilidade, entusiasmo, impulso e busca de novidades.',
      questions: [
        {
          id: 'q1',
          text: 'Gosto de estar cercado de pessoas e conversar até com desconhecidos.',
        },
        {
          id: 'q2',
          text: 'Costumo tomar decisões por impulso, seguindo o que sinto na hora.',
        },
        {
          id: 'q3',
          text: 'É difícil para mim ficar muito tempo em atividades repetitivas ou monótonas.',
        },
        {
          id: 'q4',
          text: 'Normalmente sou eu quem anima o ambiente quando chego.',
        },
        {
          id: 'q5',
          text: 'Perdoo e esqueço ofensas com facilidade.',
        },
        {
          id: 'q6',
          text: 'Frequentemente começo projetos com entusiasmo, mas perco o interesse no meio do caminho.',
        },
        {
          id: 'q7',
          text: 'Gosto de experimentar coisas novas, mesmo que não tenha pensado muito nas consequências.',
        },
        {
          id: 'q8',
          text: 'Fico entediado quando preciso seguir rotinas muito rígidas.',
        },
      ],
    },

    // -------------------------------------------------------------------------
    // FLEUMÁTICO
    // -------------------------------------------------------------------------
    {
      id: 'phlegmatic',
      name: 'Fleumático',
      shortDescription:
        'Traços ligados a calma, estabilidade, aversão a conflitos e preferência pela rotina.',
      questions: [
        {
          id: 'q1',
          text: 'Quando surge um conflito, eu prefiro recuar ou tentar acalmar os ânimos.',
        },
        {
          id: 'q2',
          text: 'Raramente perco a paciência ou explodo de raiva.',
        },
        {
          id: 'q3',
          text: 'Costumo deixar decisões difíceis para depois, esperando que as coisas se esclareçam com o tempo.',
        },
        {
          id: 'q4',
          text: 'Não gosto de mudanças bruscas; prefiro que tudo permaneça estável.',
        },
        {
          id: 'q5',
          text: 'Para evitar discussões, às vezes concordo com o grupo mesmo não concordando por dentro.',
        },
        {
          id: 'q6',
          text: 'As pessoas me procuram porque sabem que sou calmo e confiável.',
        },
        {
          id: 'q7',
          text: 'Antes de me envolver em algo novo, observo bastante como tudo funciona.',
        },
        {
          id: 'q8',
          text: 'Sou capaz de trabalhar por muito tempo na mesma tarefa, desde que o ambiente seja tranquilo.',
        },
      ],
    },
  ],
};

// array que o index.ts espalha com "..."
export const temperamentLikertTests: LikertTestConfig[] = [
  temperamentsClassicTest,
];
