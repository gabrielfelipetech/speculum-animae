// server/api/report-builders/temperamentsPdf.ts
import type { StoredResult } from '../results.post';

type TemperamentId = 'choleric' | 'melancholic' | 'sanguine' | 'phlegmatic';

interface TemperamentProfile {
  label: string;
  overview: string;
  strengths: string[];
  risks: string[];
  work: string[];
  relationships: string[];
  family: string[];
  spiritual: string[];
}

const TEMPERAMENT_PROFILES: Record<TemperamentId, TemperamentProfile> = {
  choleric: {
    label: 'Colérico',
    overview:
      'O colérico é orientado para a ação, focado em resultados e pouco tolerante a perda de tempo. Costuma assumir liderança espontaneamente e gosta de ter controle sobre o que acontece ao redor.',
    strengths: [
      'Alta capacidade de liderança e tomada de decisão em contextos de pressão.',
      'Pensamento estratégico, com facilidade para enxergar o caminho até o objetivo.',
      'Coragem para enfrentar conflitos, problemas difíceis e conversas delicadas.',
      'Energia elevada e boa resistência ao cansaço quando está motivado.',
    ],
    risks: [
      'Tendência à impaciência e à intolerância com pessoas mais lentas ou inseguras.',
      'Pode parecer agressivo, frio ou excessivamente duro na forma de falar.',
      'Risco de passar por cima dos sentimentos alheios em nome de “fazer o certo”.',
      'Dificuldade em admitir erros e em recuar de uma decisão já tomada.',
    ],
    work: [
      'Funciona melhor em ambientes com metas claras, desafios concretos e autonomia.',
      'Gosta de ser medido por resultados, não por quantidade de esforço.',
      'Tende a se frustrar com burocracia, lentidão e reuniões pouco objetivas.',
      'Pode ser excelente gestor se aprender a ouvir mais e delegar com respeito.',
    ],
    relationships: [
      'Comunicação direta: prefere falar claramente, sem rodeios.',
      'Pode magoar sem perceber; precisa aprender a dosar o tom e a forma.',
      'Valoriza lealdade e competência; admira quem se posiciona com firmeza.',
      'Em conflitos, tende a “vencer a discussão”; precisa aprender a “salvar a relação”.',
    ],
    family: [
      'Costuma assumir naturalmente o papel de quem decide o rumo da casa.',
      'Pode ser exigente demais com cônjuge e filhos, cobrando desempenho e disciplina.',
      'Quando amadurecido, protege com firmeza e assume responsabilidades concretas.',
      'Precisa cultivar paciência, escuta e delicadeza para não sufocar os mais sensíveis.',
    ],
    spiritual: [
      'É atraído por ideais fortes, clareza doutrinária e metas espirituais concretas.',
      'Pode cair em ativismo espiritual, fazendo muito mas rezando pouco.',
      'Precisa aprender a humildade, docilidade e obediência interior.',
      'Quando bem ordenado, torna-se grande defensor da fé e da justiça.',
    ],
  },
  melancholic: {
    label: 'Melancólico',
    overview:
      'O melancólico é introspectivo, profundo e orientado para valores. Percebe nuances, lembra detalhes e tende a buscar sentido em tudo o que faz.',
    strengths: [
      'Profundidade de reflexão, senso de propósito e busca sincera pela verdade.',
      'Sensibilidade para o sofrimento alheio e empatia em situações delicadas.',
      'Capacidade de planejamento de longo prazo e de compromisso com causas.',
      'Facilidade para trabalhos que exigem concentração, análise e precisão.',
    ],
    risks: [
      'Tendência ao perfeccionismo e à autocrítica excessiva.',
      'Pode demorar a tomar decisões por medo de errar ou de se expor.',
      'Inclinação a guardar mágoas e ruminar injustiças do passado.',
      'Risco de isolamento, desânimo e pessimismo em ambientes muito superficiais.',
    ],
    work: [
      'Prefere profundidade a quantidade: gosta de fazer poucas coisas, mas muito bem.',
      'Funciona melhor em ambientes com estrutura, clareza e tempo para pensar.',
      'Pode sofrer em culturas de alta pressão por resultados imediatos.',
      'É excelente em funções que exigem seriedade, análise e confiabilidade.',
    ],
    relationships: [
      'Valoriza vínculos profundos, leais e duradouros.',
      'Demora a confiar, mas quando confia entrega-se de modo intenso.',
      'Pode interpretar pequenos gestos como rejeição e se ferir com facilidade.',
      'Precisa de pessoas que o encorajem, tragam esperança e o tirem do isolamento.',
    ],
    family: [
      'Tende a ser estável, fiel e cuidadoso com quem ama.',
      'Pode ser muito exigente consigo mesmo como pai/mãe ou cônjuge.',
      'Cria ambiente de interioridade, profundidade e valores claros dentro de casa.',
      'Precisa aprender a expressar mais o que sente e não esperar que “adivinhem”.',
    ],
    spiritual: [
      'Tem facilidade para oração silenciosa, contemplação e exame de consciência.',
      'Pode cair em escrúpulos ou em exagero na percepção dos próprios erros.',
      'Busca autenticidade: não suporta uma vida espiritual só de fachada.',
      'Quando amadurecido, torna-se referência de coerência e profundidade de fé.',
    ],
  },
  sanguine: {
    label: 'Sanguíneo',
    overview:
      'O sanguíneo é expansivo, comunicativo e voltado para pessoas. Traz leveza, entusiasmo e rapidez de adaptação às mudanças.',
    strengths: [
      'Facilidade de relacionamento, criar vínculos e quebrar o gelo em qualquer ambiente.',
      'Otimismo natural, boa disposição e capacidade de animar grupos.',
      'Flexibilidade para lidar com imprevistos e mudanças de plano.',
      'Creatividade e espontaneidade em comunicação, vendas e apresentações.',
    ],
    risks: [
      'Tendência à dispersão, atraso e dificuldade em manter rotina.',
      'Pode prometer mais do que consegue cumprir, empolgado no momento.',
      'Busca intensa por aprovação pode levá-lo a evitar conversas difíceis.',
      'Risco de superficialidade afetiva ou de se aproximar demais sem profundizar vínculos.',
    ],
    work: [
      'Brilha em funções com contato humano: atendimento, vendas, comunicação, ensino.',
      'Precisa de variedade e movimento; sofre com tarefas repetitivas e solitárias.',
      'Beneficia-se de ferramentas de organização simples e visíveis (listas, agenda).',
      'Trabalha melhor quando há feedback positivo e reconhecimento concreto.',
    ],
    relationships: [
      'Gosta de proximidade física, conversa e demonstrações de carinho.',
      'Tende a evitar conflitos; pode sair pela tangente em vez de enfrentar problemas.',
      'Precisa aprender a ouvir com profundidade, não apenas responder.',
      'Traz alegria e leveza para os vínculos, se souber respeitar limites dos outros.',
    ],
    family: [
      'Costuma ser o “animador” da casa, trazendo humor e afeto.',
      'Pode ter dificuldade com rotina doméstica, horários e combinações.',
      'Cria ambiente acolhedor, afetuoso e cheio de vida.',
      'Precisa de acordos claros para responsabilidades e compromissos familiares.',
    ],
    spiritual: [
      'É tocado por experiências concretas, testemunhos, músicas e encontros comunitários.',
      'Pode oscilar entre períodos de grande fervor e fases de esquecimento.',
      'Precisa de constância: poucos propósitos, mas bem sustentados.',
      'Quando amadurecido, torna-se grande evangelizador pelo entusiasmo e proximidade.',
    ],
  },
  phlegmatic: {
    label: 'Fleumático',
    overview:
      'O fleumático é tranquilo, estável e conciliador. Prefere harmonia a conflito e tem facilidade em escutar e manter a paz.',
    strengths: [
      'Calma em situações tensas, ajudando a estabilizar o ambiente.',
      'Capacidade de ouvir com paciência e perceber vários lados de uma questão.',
      'Constância: tende a manter compromissos por longo prazo, sem grandes oscilações.',
      'Flexibilidade para adaptar-se a estilos diferentes de pessoas e liderança.',
    ],
    risks: [
      'Tendência à procrastinação e à inércia quando algo exige esforço extra.',
      'Pode evitar conflitos importantes, deixando decisões em aberto por muito tempo.',
      'Risco de se acomodar em situações medianas por medo de perder estabilidade.',
      'Dificuldade de expressar o que realmente pensa, cedendo demais para evitar atrito.',
    ],
    work: [
      'Funciona bem em ambientes previsíveis, estáveis e com clima respeitoso.',
      'É excelente em funções de suporte, coordenação tranquila e acompanhamento.',
      'Pode precisar de ajuda para definir prioridades e assumir desafios maiores.',
      'Quando devidamente motivado, entrega trabalho de forma serena e confiável.',
    ],
    relationships: [
      'Transmite segurança emocional e é visto como alguém “fácil de conviver”.',
      'Pode esconder incômodos para não gerar conflito, acumulando ressentimento.',
      'Valoriza relações sem drama, com diálogo simples e respeito mútuo.',
      'Precisa aprender a se posicionar com mais clareza e firmeza quando necessário.',
    ],
    family: [
      'Ajuda a manter um clima de paz e previsibilidade dentro de casa.',
      'Pode deixar decisões importantes nas mãos dos outros para evitar desgaste.',
      'É estável, presente e pouco dado a explosões emocionais.',
      'Precisa ser provocado a participar ativamente das decisões e da educação dos filhos.',
    ],
    spiritual: [
      'Tem facilidade para uma vida espiritual de rotina e fidelidade discreta.',
      'Pode cair em acomodação, praticando o mínimo sem buscar crescimento.',
      'Beneficia-se de metas espirituais simples mas claras (ex.: frequência de sacramentos).',
      'Quando amadurecido, torna-se um fiel silencioso, firme e perseverante.',
    ],
  },
};

export interface TemperamentsPdfContent {
  main: { id: TemperamentId; average: number };
  secondary: { id: TemperamentId; average: number } | null;
  resultsOrdered: { id: TemperamentId; name: string; average: number }[];
  mainProfile: TemperamentProfile;
  secondaryProfile: TemperamentProfile | null;
}

export function buildTemperamentsPdfContent(
  entry: StoredResult,
): TemperamentsPdfContent {
  const sorted = [...entry.results]
    .slice()
    .sort((a, b) => b.average - a.average) as {
    groupId: TemperamentId;
    name: string;
    average: number;
  }[];

  const main = sorted[0];
  const secondary = sorted[1] ?? null;

  const mainProfile = TEMPERAMENT_PROFILES[main.groupId];
  const secondaryProfile = secondary
    ? TEMPERAMENT_PROFILES[secondary.groupId]
    : null;

  return {
    main: { id: main.groupId, average: main.average },
    secondary: secondary
      ? { id: secondary.groupId, average: secondary.average }
      : null,
    resultsOrdered: sorted.map((r) => ({
      id: r.groupId,
      name: TEMPERAMENT_PROFILES[r.groupId].label,
      average: r.average,
    })),
    mainProfile,
    secondaryProfile,
  };
}
