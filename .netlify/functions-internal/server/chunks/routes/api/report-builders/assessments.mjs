import { n as normalizeAvgTo0to10 } from '../../../_/normalizeScale.mjs';

const DISCLAIMER_BY_KIND = {
  anxietyTriggers: "Este teste nao substitui avaliacao profissional. Se o sofrimento for intenso, procure ajuda especializada.",
  burnoutStress: "Este teste nao substitui avaliacao profissional. Se o sofrimento for intenso, procure ajuda especializada."
};
function normalizeScorePercent(rawBase10) {
  const clamped = Math.min(10, Math.max(0, rawBase10));
  return Math.round(clamped / 10 * 100);
}
function resolveLevel(rawBase10) {
  const clamped = Math.min(10, Math.max(0, rawBase10));
  if (clamped >= 7) return "high";
  if (clamped >= 4) return "medium";
  return "low";
}
function toDimensionScore(item) {
  const rawBase10 = normalizeAvgTo0to10(item.average, 1, 7);
  return {
    key: item.groupId,
    label: item.name,
    raw: rawBase10,
    normalized: normalizeScorePercent(rawBase10),
    level: resolveLevel(rawBase10)
  };
}
function buildSummary(top, second, bottom) {
  const summary = [];
  const usedLabels = /* @__PURE__ */ new Set();
  if (top && !usedLabels.has(top.label)) {
    summary.push(
      `Seu destaque principal foi ${top.label}, indicando um padrao mais forte nessa dimensao.`
    );
    usedLabels.add(top.label);
  }
  if (second && !usedLabels.has(second.label)) {
    summary.push(
      `A segunda maior presenca apareceu em ${second.label}, sugerindo um apoio importante ao seu perfil.`
    );
    usedLabels.add(second.label);
  }
  if (bottom && !usedLabels.has(bottom.label)) {
    summary.push(
      `A dimensao menos ativa foi ${bottom.label}, apontando um ponto para equilibrar.`
    );
    usedLabels.add(bottom.label);
  }
  summary.push(
    "Use este retrato como ponto de partida para escolhas conscientes e ajustes no dia a dia."
  );
  const fillers = [
    "Reveja seus pontos fortes e fracos para definir prioridades de desenvolvimento.",
    "Refaca o teste em outro momento para comparar mudancas no seu perfil."
  ];
  for (const filler of fillers) {
    if (summary.length >= 3) break;
    summary.push(filler);
  }
  return summary.slice(0, 6);
}
function buildRecommendations(top, bottom) {
  const recommendations = [];
  if (top) {
    recommendations.push(
      `Aproveite ${top.label} como alavanca em tarefas que exigem mais energia.`
    );
  }
  if (bottom) {
    recommendations.push(
      `Escolha pequenas praticas para fortalecer ${bottom.label} de forma gradual.`
    );
  }
  recommendations.push(
    "Defina um microplano semanal com metas simples e avaliacao ao final."
  );
  recommendations.push(
    "Busque feedback de alguem proximo para validar seus ajustes."
  );
  return recommendations;
}
function buildSections(top, bottom) {
  const sections = [];
  const highlights = [];
  if (top) {
    highlights.push({
      id: "highlights-main",
      title: "Seu ponto forte atual",
      access: "free",
      body: `A dimensao ${top.label} aparece como sua base principal agora. Use-a para sustentar objetivos importantes.`
    });
  }
  if (highlights.length) {
    sections.push({
      id: "highlights",
      title: "Destaques do perfil",
      blocks: highlights
    });
  }
  const adjustments = [];
  if (bottom) {
    adjustments.push({
      id: "adjustments-main",
      title: "Ajustes sugeridos",
      access: "free",
      body: `A dimensao ${bottom.label} pode ser trabalhada com passos pequenos e consistentes.`
    });
  }
  if (adjustments.length) {
    sections.push({
      id: "adjustments",
      title: "Ajustes recomendados",
      blocks: adjustments
    });
  }
  return sections;
}
function buildGenericReport(kind, scores, context) {
  var _a, _b, _c, _d, _e, _f;
  const dimensionScores = scores.map(toDimensionScore).sort((a, b) => b.raw - a.raw);
  const top = (_a = dimensionScores[0]) != null ? _a : null;
  const second = (_b = dimensionScores[1]) != null ? _b : null;
  const bottom = (_c = dimensionScores[dimensionScores.length - 1]) != null ? _c : null;
  return {
    kind,
    sessionId: context.sessionId,
    title: (_d = context.title) != null ? _d : "Resultado do teste",
    subtitle: (_e = context.subtitle) != null ? _e : "Resumo do seu perfil",
    summary: buildSummary(top, second, bottom),
    scores: dimensionScores,
    recommendations: buildRecommendations(top, bottom),
    sections: buildSections(top, bottom),
    disclaimer: (_f = context.disclaimer) != null ? _f : DISCLAIMER_BY_KIND[kind]
  };
}
function buildLoveLanguagesReport(scores, context) {
  return buildGenericReport("loveLanguages", scores, context);
}
function buildAttachmentReport(scores, context) {
  return buildGenericReport("attachment", scores, context);
}
function buildConflictCommunicationReport(scores, context) {
  return buildGenericReport("conflictCommunication", scores, context);
}
function buildJealousyBoundariesReport(scores, context) {
  return buildGenericReport("jealousyBoundaries", scores, context);
}
function buildTemperamentCompatibilityReport(scores, context) {
  return buildGenericReport("temperamentCompatibility", scores, context);
}
function buildBigFiveReport(scores, context) {
  return buildGenericReport("bigFive", scores, context);
}
function buildDiscReport(scores, context) {
  return buildGenericReport("disc", scores, context);
}
function buildSelfSabotageReport(scores, context) {
  return buildGenericReport("selfSabotage", scores, context);
}
function buildProcrastinationReport(scores, context) {
  return buildGenericReport("procrastination", scores, context);
}
function buildDecisionMakingReport(scores, context) {
  return buildGenericReport("decisionMaking", scores, context);
}
function buildLearningStyleReport(scores, context) {
  return buildGenericReport("learningStyle", scores, context);
}
function buildStudyFocusReport(scores, context) {
  return buildGenericReport("studyFocus", scores, context);
}
function buildStudyHabitsReport(scores, context) {
  return buildGenericReport("studyHabits", scores, context);
}
function buildMetacognitionReport(scores, context) {
  return buildGenericReport("metacognition", scores, context);
}
function buildWorkValuesReport(scores, context) {
  return buildGenericReport("workValues", scores, context);
}
function buildMotivatorsReport(scores, context) {
  return buildGenericReport("motivators", scores, context);
}
function buildLeadershipStyleReport(scores, context) {
  return buildGenericReport("leadershipStyle", scores, context);
}
function buildTeamworkReport(scores, context) {
  return buildGenericReport("teamwork", scores, context);
}
function buildAnxietyTriggersReport(scores, context) {
  return buildGenericReport("anxietyTriggers", scores, context);
}
function buildBurnoutStressReport(scores, context) {
  return buildGenericReport("burnoutStress", scores, context);
}
function buildHabitsConsistencyReport(scores, context) {
  return buildGenericReport("habitsConsistency", scores, context);
}
function buildSleepEnergyReport(scores, context) {
  return buildGenericReport("sleepEnergy", scores, context);
}
function buildArchetypesReport(scores, context) {
  return buildGenericReport("archetypes", scores, context);
}
function buildSelfEsteemReport(scores, context) {
  return buildGenericReport("selfEsteem", scores, context);
}
function buildEmotionalIntelligenceReport(scores, context) {
  return buildGenericReport("emotionalIntelligence", scores, context);
}
const REPORT_DEFINITIONS = {
  "love-languages": { kind: "loveLanguages", build: buildLoveLanguagesReport },
  "attachment-styles": { kind: "attachment", build: buildAttachmentReport },
  "conflict-communication": {
    kind: "conflictCommunication",
    build: buildConflictCommunicationReport
  },
  "jealousy-boundaries": {
    kind: "jealousyBoundaries",
    build: buildJealousyBoundariesReport
  },
  "temperament-compatibility": {
    kind: "temperamentCompatibility",
    build: buildTemperamentCompatibilityReport
  },
  "temperaments-compatibility": {
    kind: "temperamentCompatibility",
    build: buildTemperamentCompatibilityReport
  },
  "big-five": { kind: "bigFive", build: buildBigFiveReport },
  disc: { kind: "disc", build: buildDiscReport },
  "self-sabotage": { kind: "selfSabotage", build: buildSelfSabotageReport },
  procrastination: { kind: "procrastination", build: buildProcrastinationReport },
  "decision-making": { kind: "decisionMaking", build: buildDecisionMakingReport },
  "learning-style-practice": { kind: "learningStyle", build: buildLearningStyleReport },
  "study-focus-attention": { kind: "studyFocus", build: buildStudyFocusReport },
  "study-habits": { kind: "studyHabits", build: buildStudyHabitsReport },
  metacognition: { kind: "metacognition", build: buildMetacognitionReport },
  "work-values": { kind: "workValues", build: buildWorkValuesReport },
  motivators: { kind: "motivators", build: buildMotivatorsReport },
  "leadership-style": { kind: "leadershipStyle", build: buildLeadershipStyleReport },
  "teamwork-collaboration": { kind: "teamwork", build: buildTeamworkReport },
  "anxiety-triggers": { kind: "anxietyTriggers", build: buildAnxietyTriggersReport },
  "burnout-stress": { kind: "burnoutStress", build: buildBurnoutStressReport },
  "habits-consistency": { kind: "habitsConsistency", build: buildHabitsConsistencyReport },
  "sleep-energy": { kind: "sleepEnergy", build: buildSleepEnergyReport },
  archetypes: { kind: "archetypes", build: buildArchetypesReport },
  "self-esteem": { kind: "selfEsteem", build: buildSelfEsteemReport },
  "emotional-intelligence": {
    kind: "emotionalIntelligence",
    build: buildEmotionalIntelligenceReport
  }
};
function buildReportContext(entry, kind) {
  var _a, _b;
  return {
    sessionId: entry.id,
    title: (_a = entry.meta) == null ? void 0 : _a.title,
    subtitle: (_b = entry.meta) == null ? void 0 : _b.subtitle,
    disclaimer: DISCLAIMER_BY_KIND[kind]
  };
}
function buildAssessmentReport(entry) {
  const definition = REPORT_DEFINITIONS[entry.slug];
  if (!definition) {
    throw new Error("Unknown assessment kind");
  }
  const context = buildReportContext(entry, definition.kind);
  return definition.build(entry.results, context);
}

export { buildAnxietyTriggersReport, buildArchetypesReport, buildAssessmentReport, buildAttachmentReport, buildBigFiveReport, buildBurnoutStressReport, buildConflictCommunicationReport, buildDecisionMakingReport, buildDiscReport, buildEmotionalIntelligenceReport, buildHabitsConsistencyReport, buildJealousyBoundariesReport, buildLeadershipStyleReport, buildLearningStyleReport, buildLoveLanguagesReport, buildMetacognitionReport, buildMotivatorsReport, buildProcrastinationReport, buildSelfEsteemReport, buildSelfSabotageReport, buildSleepEnergyReport, buildStudyFocusReport, buildStudyHabitsReport, buildTeamworkReport, buildTemperamentCompatibilityReport, buildWorkValuesReport };
//# sourceMappingURL=assessments.mjs.map
