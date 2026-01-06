// src/config/tests/likert.ts
import type { SummaryRule, TestConfigInput } from '~/types/tests';
import { withLikertGroups } from './helpers';

export const defaultSummaryRules: SummaryRule[] = [
  {
    min: 5.5,
    max: 7,
    title: 'Camada dominante',
    descriptionTemplate:
      '{{LAYER}} aparece como uma camada muito forte na sua personalidade, influenciando decisões, hábitos e reações de forma consistente.',
  },
  {
    min: 4,
    max: 5.49,
    title: 'Camada forte',
    descriptionTemplate:
      '{{LAYER}} está bem presente e tende a se manifestar com frequência, ainda que possa oscilar em alguns contextos.',
  },
  {
    min: 2.5,
    max: 3.99,
    title: 'Camada intermediária',
    descriptionTemplate:
      '{{LAYER}} aparece de maneira moderada, podendo ganhar ou perder força dependendo das circunstâncias e do esforço consciente.',
  },
  {
    min: 1,
    max: 2.49,
    title: 'Camada frágil',
    descriptionTemplate:
      '{{LAYER}} tende a ser mais fraca ou pouco integrada, podendo exigir atenção, formação ou correção para se desenvolver de modo saudável.',
  },
];


export const likertTests: TestConfigInput[] = [
  {
    id: 'twelve-layers',
    slug: '12-camadas',
    resultSlug: 'twelve-layers',
    title: '12 Camadas da Personalidade',
    subtitle: 'Modelo inspirado em Olavo de Carvalho',
    description:
      'Avalia doze níveis estruturais da alma para mapear em quais camadas sua personalidade se manifesta com mais força.',
    category: 'core',
    emphasis: 'highlighted',
    tags: ['Olavo de Carvalho', 'Estrutura da alma'],
    groupsLabel: 'Camada',
    scale: 'agreement',
    hasPremiumReport: true,
    scoring: {
      strategy: 'average-per-group',
      summaryRules: defaultSummaryRules,
    },
    groups: withLikertGroups([
      {
        id: 'layer-1',
        name: 'Camada 1 – Corpo e existência',
        shortDescription:
          'Base física da personalidade: corpo, saúde e bem-estar corporal.',
        questions: [
          {
            id: 'q1',
            text: 'Eu me preocupo bastante com meu bem-estar físico e conforto corporal no dia a dia.',
          },
          {
            id: 'q2',
            text: 'Costumo estar atento(a) às sensações do meu corpo, como fome, sede, cansaço ou dor.',
          },
          {
            id: 'q3',
            text: 'Sinto que é importante ter algum controle sobre meu próprio corpo e seus impulsos (sono, apetite, etc.).',
          },
          {
            id: 'q4',
            text: 'Tenho necessidade de atender minhas necessidades corporais básicas (comer, dormir, descansar) antes de qualquer outra coisa.',
          },
          {
            id: 'q5',
            text: 'Quando estou fisicamente desconfortável, acho difícil me concentrar em tarefas ou problemas abstratos.',
          },
          
        ],
      },
      {
        id: 'layer-2',
        name: 'Camada 2 – Instintos e temperamento',
        shortDescription:
          'Hereditariedade, impulsos e traços temperamentais inatos.',
        questions: [
          {
            id: 'q1',
            text: 'Percebo traços da minha personalidade que parecem herdados da minha família ou antepassados.',
          },
          {
            id: 'q2',
            text: 'Minhas preferências e aversões pessoais me acompanham desde cedo e raramente mudam de forma drástica.',
          },
          {
            id: 'q3',
            text: 'Sinto que certos impulsos ou tendências em mim são automáticos, como se fizessem parte da minha natureza.',
          },
          {
            id: 'q4',
            text: 'Identifico hábitos ou padrões de comportamento meus que lembram muito os dos meus pais ou avós.',
          },
          {
            id: 'q5',
            text: 'Acredito que uma parte das minhas escolhas de vida é influenciada por predisposições com as quais já nasci.',
          },
        ],
      },
      {
        id: 'layer-3',
        name: 'Camada 3 – Aprendizado e descoberta',
        shortDescription:
          'Curiosidade, cognição e prazer em compreender o mundo.',
        questions: [
          {
            id: 'q1',
            text: 'Sinto uma curiosidade natural em aprender e entender coisas novas, mesmo quando não há uma recompensa prática imediata.',
          },
          {
            id: 'q2',
            text: 'Tenho interesse em observar e explorar o mundo ao meu redor para compreender como as coisas funcionam.',
          },
          {
            id: 'q3',
            text: 'Costumo fazer muitas perguntas sobre tudo, buscando descobrir as causas e explicações dos fenômenos.',
          },
          {
            id: 'q4',
            text: 'Aprender algo pelo simples prazer de saber é algo que ainda valorizo na minha vida.',
          },
          {
            id: 'q5',
            text: 'Fico entusiasmado(a) quando preciso resolver um problema ou descobrir informações por conta própria.',
          },
        ],
      },
      {
        id: 'layer-4',
        name: 'Camada 4 – Vida emocional e felicidade',
        shortDescription:
          'História afetiva, busca de felicidade e necessidade de ser amado.',
        questions: [
          {
            id: 'q1',
            text: 'Busco ativamente experiências que me façam sentir alegria, emoção ou satisfação emocional intensa no meu dia a dia.',
          },
          {
            id: 'q2',
            text: 'Minha felicidade depende muito das minhas relações afetivas e da atenção que recebo das pessoas importantes para mim.',
          },
          {
            id: 'q3',
            text: 'Evito situações que possam me deixar triste, magoado(a) ou frustrado(a), pois essas emoções me abalam profundamente.',
          },
          {
            id: 'q4',
            text: 'Dou grande importância a me sentir amado(a) e aceito(a) pelos outros ao meu redor.',
          },
          {
            id: 'q5',
            text: 'Costumo sonhar acordado(a) com um futuro melhor ou com conquistas que me trariam muita felicidade.',
          },
        ],
      },
      {
        id: 'layer-5',
        name: 'Camada 5 – Autoafirmação do ego',
        shortDescription:
          'Individuação, orgulho saudável e prova de valor pessoal.',
        questions: [
          {
            id: 'q1',
            text: 'Desafio a mim mesmo(a) constantemente para provar minhas capacidades e superar meus limites pessoais.',
          },
          {
            id: 'q2',
            text: 'Sentir orgulho de mim mesmo(a) após alcançar algo difícil é uma das minhas maiores recompensas internas.',
          },
          {
            id: 'q3',
            text: 'Tenho uma forte necessidade de afirmar minha independência e mostrar que posso seguir meu próprio caminho.',
          },
          {
            id: 'q4',
            text: 'Prefiro conquistar algo por mérito próprio do que receber ajuda fácil, pois valorizo a sensação de vitória pessoal.',
          },
          {
            id: 'q5',
            text: 'Quando fracasso em alguma meta importante, isso abala profundamente minha confiança em mim mesmo(a).',
          },
        ],
      },
      {
        id: 'layer-6',
        name: 'Camada 6 – Competência e vida prática',
        shortDescription:
          'Trabalho, resultados concretos e eficiência na realidade.',
        questions: [
          {
            id: 'q1',
            text: 'Costumo priorizar cumprir minhas tarefas e responsabilidades de forma eficaz, mesmo quando não são muito agradáveis.',
          },
          {
            id: 'q2',
            text: 'O que mais importa para mim é ver resultados concretos no que faço, mais do que reconhecimento ou satisfação pessoal.',
          },
          {
            id: 'q3',
            text: 'Sou muito atento(a) a prazos, metas e produtividade, organizando meu tempo para dar conta de tudo que assumi.',
          },
          {
            id: 'q4',
            text: 'Não tenho problema em ajustar minhas preferências pessoais para atender às exigências do meu trabalho ou rotina.',
          },
          {
            id: 'q5',
            text: 'Creio que é fundamental ser prático(a) e fazer o que precisa ser feito para garantir estabilidade e sucesso na vida.',
          },
        ],
      },
      {
        id: 'layer-7',
        name: 'Camada 7 – Papel social e dever',
        shortDescription:
          'Pertencimento, direitos e deveres dentro da comunidade.',
        questions: [
          {
            id: 'q1',
            text: 'Sinto-me motivado(a) a cumprir meu dever dentro da comunidade, atendendo às expectativas que as pessoas têm sobre mim.',
          },
          {
            id: 'q2',
            text: 'Ser reconhecido(a) como um membro respeitável e confiável do meu grupo social é muito importante para mim.',
          },
          {
            id: 'q3',
            text: 'Faço um esforço consciente para me adaptar às normas e valores do ambiente em que vivo, a fim de ser aceito(a).',
          },
          {
            id: 'q4',
            text: 'Acredito que todos têm direitos e deveres e procuro equilibrar o que espero dos outros com o que devo entregar em retorno.',
          },
          {
            id: 'q5',
            text: 'Prezo muito a lealdade entre colegas, amigos ou familiares e ajo de maneira leal ao meu grupo.',
          },
        ],
      },
      {
        id: 'layer-8',
        name: 'Camada 8 – Síntese pessoal e sentido de vida',
        shortDescription:
          'Autorreflexão, biografia e busca de unidade interior.',
        questions: [
          {
            id: 'q1',
            text: 'Frequentemente reflito sobre a trajetória da minha vida, avaliando minhas conquistas e meus fracassos.',
          },
          {
            id: 'q2',
            text: 'Pergunto a mim mesmo(a) se estou vivendo de acordo com os valores e objetivos que considero mais importantes.',
          },
          {
            id: 'q3',
            text: 'Procuro dar sentido às experiências que tive, conectando eventos passados para compreender quem me tornei.',
          },
          {
            id: 'q4',
            text: 'Não tenho receio de admitir meus erros do passado e tento aprender com eles para me tornar uma pessoa melhor.',
          },
          {
            id: 'q5',
            text: 'Avalio criticamente as escolhas que fiz na vida para entender se elas me aproximaram do que considero uma vida bem-sucedida ou significativa.',
          },
        ],
      },
      {
        id: 'layer-9',
        name: 'Camada 9 – Personalidade intelectual',
        shortDescription:
          'Busca da verdade, cultura e criação intelectual ou artística.',
        questions: [
          {
            id: 'q1',
            text: 'Interesso-me por questões universais da humanidade e busco conhecimento que vá além dos meus problemas pessoais imediatos.',
          },
          {
            id: 'q2',
            text: 'Minhas dificuldades e dúvidas pessoais frequentemente me levam a refletir sobre problemas maiores que muitas outras pessoas também enfrentam.',
          },
          {
            id: 'q3',
            text: 'Gosto de estudar e aprender sobre história, arte, ciência ou filosofia para entender melhor a condição humana como um todo.',
          },
          {
            id: 'q4',
            text: 'Sinto que participar de debates intelectuais ou discussões profundas sobre a vida enriquece o sentido da minha própria existência.',
          },
          {
            id: 'q5',
            text: 'Quando algo significativo me acontece, penso no significado disso num contexto mais amplo, e não apenas de forma individual.',
          },
        ],
      },
      {
        id: 'layer-10',
        name: 'Camada 10 – Consciência moral universal',
        shortDescription:
          'Eu transcendental, dever moral e princípios universais.',
        questions: [
          {
            id: 'q1',
            text: 'Guio minhas ações por princípios morais que acredito serem válidos para qualquer pessoa em situação semelhante.',
          },
          {
            id: 'q2',
            text: 'Mesmo quando ninguém está observando, sinto obrigação de fazer a coisa certa conforme minha consciência.',
          },
          {
            id: 'q3',
            text: 'Acredito verdadeiramente no meu livre-arbítrio e me esforço para escolher o bem em vez do mal.',
          },
          {
            id: 'q4',
            text: 'Reflito sobre deveres éticos universais e tento alinhar minhas decisões diárias a esses deveres que considero absolutos.',
          },
          {
            id: 'q5',
            text: 'Sinto-me pessoalmente responsável pelo impacto moral que minhas ações possam ter no mundo ou na vida de outras pessoas.',
          },
        ],
      },
      {
        id: 'layer-11',
        name: 'Camada 11 – Vocação histórica',
        shortDescription: 'Atuação consciente na história e desejo de legado.',
        questions: [
          {
            id: 'q1',
            text: 'Tenho um sentimento de missão pessoal, de que meu papel na vida pode influenciar outras pessoas ou a sociedade de forma significativa.',
          },
          {
            id: 'q2',
            text: 'Quero deixar uma contribuição importante ou um legado que seja lembrado no futuro pelas próximas gerações.',
          },
          {
            id: 'q3',
            text: 'Encaro posições de liderança ou responsabilidade como oportunidades de moldar positivamente a comunidade ou a realidade ao meu redor.',
          },
          {
            id: 'q4',
            text: 'Penso na relevância histórica ou social das minhas ações, e não apenas em seus efeitos imediatos ou pessoais.',
          },
          {
            id: 'q5',
            text: 'Sinto que faço parte da continuidade da história humana e tento atuar de forma consciente desse fato nos projetos que empreendo.',
          },
        ],
      },
      {
        id: 'layer-12',
        name: 'Camada 12 – Destino final / núcleo espiritual',
        shortDescription:
          'Sentido último, vocação espiritual e relação com Deus.',
        questions: [
          {
            id: 'q1',
            text: 'Sinto que minha vida está orientada por um propósito espiritual ou transcendente maior do que eu mesmo(a).',
          },
          {
            id: 'q2',
            text: 'Em praticamente todas as minhas decisões importantes, considero se elas estão em harmonia com meus princípios espirituais ou com o que acredito ser a vontade de Deus.',
          },
          {
            id: 'q3',
            text: 'Vejo as provações e conquistas da minha vida como parte de um plano maior ou de um caminho de crescimento espiritual que devo percorrer.',
          },
          {
            id: 'q4',
            text: 'Estou disposto(a) a abrir mão de ganhos materiais ou imediatos se eles entrarem em conflito com meu propósito de vida mais elevado ou com minha fé.',
          },
          {
            id: 'q5',
            text: 'Frequentemente reflito sobre o sentido último da vida e busco alinhar minhas ações cotidianas a esse sentido que considero verdadeiro.',
          },
        ],
      },
    ]),
  },
];

export function getLikertTestBySlug(slug: string): TestConfigInput | undefined {
  return likertTests.find((test) => test.slug === slug);
}
