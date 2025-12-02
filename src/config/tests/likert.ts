// src/config/tests/likert.ts
import type { LikertTestConfig, SummaryRule } from '~/types/tests';

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


export const likertTests: LikertTestConfig[] = [
  {
    id: 'twelve-layers',
    slug: '12-camadas',
    title: '12 Camadas da Personalidade',
    subtitle: 'Modelo inspirado em Olavo de Carvalho',
    description:
      'Avalia doze níveis estruturais da alma para mapear em quais camadas sua personalidade se manifesta com mais força.',
    category: 'core',
    emphasis: 'highlighted',
    tags: ['Olavo de Carvalho', 'Estrutura da alma'],
    groupsLabel: 'Camada',
    scaleMinLabel: 'Discordo totalmente',
    scaleMaxLabel: 'Concordo totalmente',
    hasPremiumReport: true,
    scoring: {
      strategy: 'average-per-group',
      summaryRules: defaultSummaryRules,
    },
    groups: [
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
          {
            id: 'q6',
            text: 'A forma como cuido do meu corpo (alimentação, sono, saúde) afeta significativamente meu humor e disposição.',
          },
          {
            id: 'q7',
            text: 'Sinto realização pessoal quando consigo disciplinar meu corpo – por exemplo, exercitando-me ou cumprindo uma dieta saudável.',
          },
          {
            id: 'q8',
            text: 'Percebo que meu estado físico (energias, dores, vitalidade) influencia minhas decisões e atitudes diárias.',
          },
          {
            id: 'q9',
            text: 'Busco regularmente maneiras de melhorar meu conforto físico ou minha saúde, pois isso me dá segurança.',
          },
          {
            id: 'q10',
            text: 'Eu diria que o meu corpo é a base da minha identidade – quando estou bem fisicamente, sinto-me mais eu mesmo(a).',
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
          {
            id: 'q6',
            text: 'Tenho um temperamento bem definido (por exemplo, sou naturalmente mais calmo(a) ou mais agitado(a)), e poucas coisas mudam isso.',
          },
          {
            id: 'q7',
            text: 'Reconheço que algumas reações minhas ocorrem sem reflexão consciente, quase de forma instintiva.',
          },
          {
            id: 'q8',
            text: 'Creio que características inatas minhas orientam, em grande medida, minhas motivações básicas e o que busco evitar.',
          },
          {
            id: 'q9',
            text: 'Às vezes me pego repetindo histórias ou padrões de comportamento que já vi na minha família.',
          },
          {
            id: 'q10',
            text: 'Ao tomar decisões espontâneas, percebo que elas seguem um jeito muito meu, que provavelmente sempre fez parte de quem eu sou.',
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
          {
            id: 'q6',
            text: 'Entender regras, padrões ou sistemas (jogos, línguas, ferramentas) me traz satisfação pessoal.',
          },
          {
            id: 'q7',
            text: 'A capacidade de compreender novas ideias ou desenvolver novas habilidades me motiva mais do que benefícios materiais.',
          },
          {
            id: 'q8',
            text: 'Meus olhos se iluminam diante de um quebra-cabeça ou desafio intelectual, mesmo que seja algo simples.',
          },
          {
            id: 'q9',
            text: 'Ao enfrentar uma situação desconhecida, sinto mais excitação em aprender do que medo de cometer erros.',
          },
          {
            id: 'q10',
            text: 'Percebo que continuo a crescer como pessoa quando amplio meus conhecimentos e compreendo novas perspectivas sobre a realidade.',
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
          {
            id: 'q6',
            text: 'Quando relembro o meu passado, são as memórias felizes ou dolorosas que mais definem como me sinto no presente.',
          },
          {
            id: 'q7',
            text: 'Tenho medo de ficar sozinho(a) ou de não ter ninguém que realmente se importe comigo.',
          },
          {
            id: 'q8',
            text: 'Minhas decisões muitas vezes são guiadas pelo desejo de evitar sofrimento emocional ou de reviver sentimentos bons.',
          },
          {
            id: 'q9',
            text: 'Procuro ativamente situações estimulantes (diversão, aventura, novidades) para sentir-me vivo(a) e feliz.',
          },
          {
            id: 'q10',
            text: 'Sinto que minha vida tem sentido quando estou feliz e de bem com a vida; quando estou triste ou insatisfeito(a), tudo parece perder o brilho.',
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
          {
            id: 'q6',
            text: 'Procuro controlar minhas emoções se acho que elas podem atrapalhar meu desempenho ou meus objetivos.',
          },
          {
            id: 'q7',
            text: 'Estou sempre tentando melhorar minhas habilidades e conhecimentos para me tornar mais competente e autossuficiente.',
          },
          {
            id: 'q8',
            text: 'A opinião que tenho de mim mesmo(a) depende principalmente de atingir os padrões que eu mesmo(a) estabeleço para mim.',
          },
          {
            id: 'q9',
            text: 'Encaro obstáculos como testes da minha força pessoal e fico motivado(a) a vencê-los.',
          },
          {
            id: 'q10',
            text: 'Preciso sentir que estou no comando da minha própria vida e destino para me sentir realmente realizado(a).',
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
          {
            id: 'q6',
            text: 'Estou disposto(a) a sacrificar um pouco do meu conforto ou interesses pessoais em prol de cumprir um objetivo maior ou uma obrigação.',
          },
          {
            id: 'q7',
            text: 'Eu meço meu sucesso pelo quanto consigo realizar de fato, e não apenas pelas intenções ou planos que tenho.',
          },
          {
            id: 'q8',
            text: 'Valorizo a disciplina e a eficiência na execução das minhas atividades diárias.',
          },
          {
            id: 'q9',
            text: 'Encaro meu dia a dia quase como uma lista de tarefas a completar, focando em concluir cada item com eficiência.',
          },
          {
            id: 'q10',
            text: 'Quando assumo um compromisso, faço de tudo para entregar o que foi prometido, mesmo que isso exija esforço extra ou enfrentar dificuldades pessoais.',
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
          {
            id: 'q6',
            text: 'Tenho satisfação em colaborar com outras pessoas em projetos ou causas coletivas, mais do que trabalhar sozinho(a) visando ganho próprio.',
          },
          {
            id: 'q7',
            text: 'Cumprir regras e acordos sociais me dá uma sensação de pertencimento e segurança no meio em que vivo.',
          },
          {
            id: 'q8',
            text: 'Evito atitudes que possam fazer com que eu perca a confiança ou o respeito das pessoas ao meu redor.',
          },
          {
            id: 'q9',
            text: 'Quando desempenho um papel social (no trabalho, na família, na comunidade), esforço-me para corresponder ao que esperam de mim.',
          },
          {
            id: 'q10',
            text: 'Sinto culpa se deixo de cumprir alguma responsabilidade importante que outras pessoas estavam contando que eu cumprisse.',
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
          {
            id: 'q6',
            text: 'Tenho consciência do tipo de legado ou marca pessoal que estou construindo com minhas ações ao longo dos anos.',
          },
          {
            id: 'q7',
            text: 'É importante para mim saber se estou realizando meu potencial ou se estou desperdiçando oportunidades importantes.',
          },
          {
            id: 'q8',
            text: 'Às vezes penso em como seria minha vida se eu tivesse tomado decisões diferentes e o que isso revela sobre meus valores atuais.',
          },
          {
            id: 'q9',
            text: 'Vejo a mim mesmo(a) como responsável pelo rumo da minha vida, e isso me leva a julgar minhas próprias atitudes com honestidade.',
          },
          {
            id: 'q10',
            text: 'Mais do que as opiniões alheias, é minha própria consciência que uso para medir se estou vivendo a vida que eu deveria viver.',
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
          {
            id: 'q6',
            text: 'Prefiro buscar a verdade ou compreender profundamente um assunto do que simplesmente aceitar explicações fáceis ou convenientes.',
          },
          {
            id: 'q7',
            text: 'Sinto-me realizado(a) ao criar algo intelectual ou artístico que expressa ideias importantes para a sociedade ou para a compreensão humana.',
          },
          {
            id: 'q8',
            text: 'Dedico tempo regularmente à leitura, reflexão ou produção de conhecimento, pois isso atende a uma necessidade interior minha.',
          },
          {
            id: 'q9',
            text: 'Acredito que compartilhar ideias e descobertas é tão importante quanto buscar benefícios pessoais ou imediatos.',
          },
          {
            id: 'q10',
            text: 'Valorizo quando consigo enxergar meus sentimentos ou experiências como parte de um panorama humano muito maior, conectando-me a toda a humanidade.',
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
          {
            id: 'q6',
            text: 'Antes de agir, considero se eu gostaria que qualquer pessoa agisse da mesma forma nas mesmas circunstâncias.',
          },
          {
            id: 'q7',
            text: 'Procuro me colocar no lugar do ser humano em geral ao julgar minhas atitudes, pensando no que seria correto fazer independentemente de quem eu seja.',
          },
          {
            id: 'q8',
            text: 'Acredito que existem verdades ou leis morais objetivas que devo respeitar acima das conveniências do momento ou dos costumes do meu meio.',
          },
          {
            id: 'q9',
            text: 'Cumprir um dever por princípio me traz mais paz de espírito do que obter um ganho que vá contra meus valores.',
          },
          {
            id: 'q10',
            text: 'Prefiro enfrentar consequências negativas a trair meus valores ou fazer algo que considero moralmente errado.',
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
          {
            id: 'q6',
            text: 'Estou disposto(a) a assumir grandes responsabilidades se acreditar que podem levar a mudanças benéficas para muitas pessoas.',
          },
          {
            id: 'q7',
            text: 'Vejo meu trabalho e minhas escolhas como parte de algo maior, que vai além da minha vida pessoal e do meu tempo de vida.',
          },
          {
            id: 'q8',
            text: 'Busco entender em que contexto maior (social, histórico) minha vida se insere e ajo de acordo com essa compreensão mais ampla.',
          },
          {
            id: 'q9',
            text: 'Sentir que estou contribuindo para o progresso ou para o bem comum da sociedade é uma das maiores satisfações que posso ter.',
          },
          {
            id: 'q10',
            text: 'Tenho clareza dos meus objetivos de longo prazo e de como eles podem impactar positivamente outras pessoas ou o futuro da comunidade.',
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
          {
            id: 'q6',
            text: 'A pergunta “Isto agrada a Deus (ou ao bem maior)?” passa pela minha mente ao avaliar o que faço ou planejo fazer.',
          },
          {
            id: 'q7',
            text: 'Sinto-me conectado(a) a algo sagrado ou eterno que dá direção e significado às minhas escolhas diárias.',
          },
          {
            id: 'q8',
            text: 'Meu objetivo principal é viver de acordo com valores espirituais profundos, mesmo que isso às vezes seja incompreendido pelas outras pessoas.',
          },
          {
            id: 'q9',
            text: 'Encaro cada situação difícil como uma oportunidade de cumprir o que acredito ser minha missão dada por Deus ou pelo destino.',
          },
          {
            id: 'q10',
            text: 'Para mim, o verdadeiro sucesso é cumprir um chamado espiritual ou ético, e não apenas atingir metas terrenas de riqueza, poder ou fama.',
          },
        ],
      },
    ],
  },
];

export function getLikertTestBySlug(slug: string): LikertTestConfig | undefined {
  return likertTests.find((test) => test.slug === slug);
}
