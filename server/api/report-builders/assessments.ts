import type { StoredResult } from '../results.post';
import type {
  AssessmentReport,
  AssessmentReportKind,
  DimensionLevel,
  DimensionScore,
  ReportBlock,
  ReportSection,
} from '~/types/results';

type StoredResultGroup = StoredResult['results'][number];

type ReportContext = {
  sessionId: string;
  title?: string;
  subtitle?: string;
  disclaimer?: string;
};

type ReportBuilder = (
  scores: StoredResultGroup[],
  context: ReportContext,
) => AssessmentReport;

const DISCLAIMER_BY_KIND: Partial<Record<AssessmentReportKind, string>> = {
  anxietyTriggers:
    'Este teste nao substitui avaliacao profissional. Se o sofrimento for intenso, procure ajuda especializada.',
  burnoutStress:
    'Este teste nao substitui avaliacao profissional. Se o sofrimento for intenso, procure ajuda especializada.',
};

function clampScore(value: number): number {
  return Math.min(7, Math.max(1, value));
}

function normalizeScore(raw: number): number {
  const clamped = clampScore(raw);
  return Math.round(((clamped - 1) / 6) * 100);
}

function resolveLevel(raw: number): DimensionLevel {
  const clamped = clampScore(raw);
  if (clamped >= 5.5) return 'high';
  if (clamped >= 3.5) return 'medium';
  return 'low';
}

function toDimensionScore(item: StoredResultGroup): DimensionScore {
  return {
    key: item.groupId,
    label: item.name,
    raw: item.average,
    normalized: normalizeScore(item.average),
    level: resolveLevel(item.average),
  };
}

function buildSummary(
  top: DimensionScore | null,
  second: DimensionScore | null,
  bottom: DimensionScore | null,
): string[] {
  const summary: string[] = [];
  const usedLabels = new Set<string>();

  if (top && !usedLabels.has(top.label)) {
    summary.push(
      `Seu destaque principal foi ${top.label}, indicando um padrao mais forte nessa dimensao.`,
    );
    usedLabels.add(top.label);
  }

  if (second && !usedLabels.has(second.label)) {
    summary.push(
      `A segunda maior presenca apareceu em ${second.label}, sugerindo um apoio importante ao seu perfil.`,
    );
    usedLabels.add(second.label);
  }

  if (bottom && !usedLabels.has(bottom.label)) {
    summary.push(
      `A dimensao menos ativa foi ${bottom.label}, apontando um ponto para equilibrar.`,
    );
    usedLabels.add(bottom.label);
  }

  summary.push(
    'Use este retrato como ponto de partida para escolhas conscientes e ajustes no dia a dia.',
  );

  const fillers = [
    'Reveja seus pontos fortes e fracos para definir prioridades de desenvolvimento.',
    'Refaca o teste em outro momento para comparar mudancas no seu perfil.',
  ];

  for (const filler of fillers) {
    if (summary.length >= 3) break;
    summary.push(filler);
  }

  return summary.slice(0, 6);
}

function buildRecommendations(
  top: DimensionScore | null,
  bottom: DimensionScore | null,
): string[] {
  const recommendations: string[] = [];

  if (top) {
    recommendations.push(
      `Aproveite ${top.label} como alavanca em tarefas que exigem mais energia.`,
    );
  }

  if (bottom) {
    recommendations.push(
      `Escolha pequenas praticas para fortalecer ${bottom.label} de forma gradual.`,
    );
  }

  recommendations.push(
    'Defina um microplano semanal com metas simples e avaliacao ao final.',
  );
  recommendations.push(
    'Busque feedback de alguem proximo para validar seus ajustes.',
  );

  return recommendations;
}

function buildSections(
  top: DimensionScore | null,
  bottom: DimensionScore | null,
): ReportSection[] {
  const sections: ReportSection[] = [];

  const highlights: ReportBlock[] = [];
  if (top) {
    highlights.push({
      id: 'highlights-main',
      title: 'Seu ponto forte atual',
      access: 'free',
      body: `A dimensao ${top.label} aparece como sua base principal agora. Use-a para sustentar objetivos importantes.`,
    });
  }

  if (highlights.length) {
    sections.push({
      id: 'highlights',
      title: 'Destaques do perfil',
      blocks: highlights,
    });
  }

  const adjustments: ReportBlock[] = [];
  if (bottom) {
    adjustments.push({
      id: 'adjustments-main',
      title: 'Ajustes sugeridos',
      access: 'free',
      body: `A dimensao ${bottom.label} pode ser trabalhada com passos pequenos e consistentes.`,
    });
  }

  if (adjustments.length) {
    sections.push({
      id: 'adjustments',
      title: 'Ajustes recomendados',
      blocks: adjustments,
    });
  }

  return sections;
}

function buildGenericReport(
  kind: AssessmentReportKind,
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  const dimensionScores = scores
    .map(toDimensionScore)
    .sort((a, b) => b.raw - a.raw);
  const top = dimensionScores[0] ?? null;
  const second = dimensionScores[1] ?? null;
  const bottom = dimensionScores[dimensionScores.length - 1] ?? null;

  return {
    kind,
    sessionId: context.sessionId,
    title: context.title ?? 'Resultado do teste',
    subtitle: context.subtitle ?? 'Resumo do seu perfil',
    summary: buildSummary(top, second, bottom),
    scores: dimensionScores,
    recommendations: buildRecommendations(top, bottom),
    sections: buildSections(top, bottom),
    disclaimer: context.disclaimer ?? DISCLAIMER_BY_KIND[kind],
  };
}

export function buildLoveLanguagesReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('loveLanguages', scores, context);
}

export function buildAttachmentReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('attachment', scores, context);
}

export function buildConflictCommunicationReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('conflictCommunication', scores, context);
}

export function buildJealousyBoundariesReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('jealousyBoundaries', scores, context);
}

export function buildTemperamentCompatibilityReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('temperamentCompatibility', scores, context);
}

export function buildBigFiveReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('bigFive', scores, context);
}

export function buildDiscReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('disc', scores, context);
}

export function buildSelfSabotageReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('selfSabotage', scores, context);
}

export function buildProcrastinationReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('procrastination', scores, context);
}

export function buildDecisionMakingReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('decisionMaking', scores, context);
}

export function buildLearningStyleReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('learningStyle', scores, context);
}

export function buildStudyFocusReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('studyFocus', scores, context);
}

export function buildStudyHabitsReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('studyHabits', scores, context);
}

export function buildMetacognitionReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('metacognition', scores, context);
}

export function buildWorkValuesReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('workValues', scores, context);
}

export function buildMotivatorsReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('motivators', scores, context);
}

export function buildLeadershipStyleReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('leadershipStyle', scores, context);
}

export function buildTeamworkReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('teamwork', scores, context);
}

export function buildAnxietyTriggersReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('anxietyTriggers', scores, context);
}

export function buildBurnoutStressReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('burnoutStress', scores, context);
}

export function buildHabitsConsistencyReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('habitsConsistency', scores, context);
}

export function buildSleepEnergyReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('sleepEnergy', scores, context);
}

export function buildArchetypesReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('archetypes', scores, context);
}

export function buildSelfEsteemReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('selfEsteem', scores, context);
}

export function buildEmotionalIntelligenceReport(
  scores: StoredResultGroup[],
  context: ReportContext,
): AssessmentReport {
  return buildGenericReport('emotionalIntelligence', scores, context);
}

const REPORT_DEFINITIONS: Record<
  Exclude<StoredResult['slug'], 'twelve-layers' | 'temperaments'>,
  { kind: AssessmentReportKind; build: ReportBuilder }
> = {
  'love-languages': { kind: 'loveLanguages', build: buildLoveLanguagesReport },
  'attachment-styles': { kind: 'attachment', build: buildAttachmentReport },
  'conflict-communication': {
    kind: 'conflictCommunication',
    build: buildConflictCommunicationReport,
  },
  'jealousy-boundaries': {
    kind: 'jealousyBoundaries',
    build: buildJealousyBoundariesReport,
  },
  'temperament-compatibility': {
    kind: 'temperamentCompatibility',
    build: buildTemperamentCompatibilityReport,
  },
  'big-five': { kind: 'bigFive', build: buildBigFiveReport },
  disc: { kind: 'disc', build: buildDiscReport },
  'self-sabotage': { kind: 'selfSabotage', build: buildSelfSabotageReport },
  procrastination: { kind: 'procrastination', build: buildProcrastinationReport },
  'decision-making': { kind: 'decisionMaking', build: buildDecisionMakingReport },
  'learning-style-practice': { kind: 'learningStyle', build: buildLearningStyleReport },
  'study-focus-attention': { kind: 'studyFocus', build: buildStudyFocusReport },
  'study-habits': { kind: 'studyHabits', build: buildStudyHabitsReport },
  metacognition: { kind: 'metacognition', build: buildMetacognitionReport },
  'work-values': { kind: 'workValues', build: buildWorkValuesReport },
  motivators: { kind: 'motivators', build: buildMotivatorsReport },
  'leadership-style': { kind: 'leadershipStyle', build: buildLeadershipStyleReport },
  'teamwork-collaboration': { kind: 'teamwork', build: buildTeamworkReport },
  'anxiety-triggers': { kind: 'anxietyTriggers', build: buildAnxietyTriggersReport },
  'burnout-stress': { kind: 'burnoutStress', build: buildBurnoutStressReport },
  'habits-consistency': { kind: 'habitsConsistency', build: buildHabitsConsistencyReport },
  'sleep-energy': { kind: 'sleepEnergy', build: buildSleepEnergyReport },
  archetypes: { kind: 'archetypes', build: buildArchetypesReport },
  'self-esteem': { kind: 'selfEsteem', build: buildSelfEsteemReport },
  'emotional-intelligence': {
    kind: 'emotionalIntelligence',
    build: buildEmotionalIntelligenceReport,
  },
};

function buildReportContext(
  entry: StoredResult,
  kind: AssessmentReportKind,
): ReportContext {
  return {
    sessionId: entry.id,
    title: entry.meta?.title,
    subtitle: entry.meta?.subtitle,
    disclaimer: DISCLAIMER_BY_KIND[kind],
  };
}

export function buildAssessmentReport(entry: StoredResult): AssessmentReport {
  const definition = REPORT_DEFINITIONS[
    entry.slug as keyof typeof REPORT_DEFINITIONS
  ];
  if (!definition) {
    throw new Error('Unknown assessment kind');
  }

  const context = buildReportContext(entry, definition.kind);
  return definition.build(entry.results, context);
}
