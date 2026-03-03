import { i as isTemperamentId, T as TEMPERAMENT_LABELS_PT, g as getPremiumTemperamentText } from '../../../_/premiumTemperaments.mjs';
import { a as normalizeScaleValue, T as TEMPERAMENT_SOURCE_SCALE } from '../../../_/normalizeScale.mjs';
import 'node:fs';
import 'node:path';

const TEMPERAMENT_LABELS = {
  choleric: "Colerico",
  melancholic: "Melancolico",
  sanguine: "Sanguineo",
  phlegmatic: "Fleumatico"
};
function splitParagraphs(text) {
  return text.split(/\n\s*\n+/).map((paragraph) => paragraph.trim()).filter((paragraph) => paragraph.length >= 60);
}
function splitSentences(text) {
  return text.split(/(?<=[.!?])\s+/).map((sentence) => sentence.trim()).filter((sentence) => sentence.length > 0);
}
function sentenceLimit(text, maxSentences) {
  const sentences = splitSentences(text);
  if (sentences.length <= maxSentences) {
    return text.trim();
  }
  return sentences.slice(0, maxSentences).join(" ");
}
function firstSentence(text) {
  const sentence = splitSentences(text)[0];
  return sentence != null ? sentence : text.trim();
}
function compactSection(paragraphs, maxSentences) {
  const merged = paragraphs.join(" ").trim();
  if (!merged) return "";
  return sentenceLimit(merged, maxSentences);
}
function dedupeChecklist(items) {
  const unique = [];
  const seen = /* @__PURE__ */ new Set();
  for (const item of items) {
    const trimmed = item.trim();
    const normalized = trimmed.toLowerCase();
    if (!trimmed || seen.has(normalized)) continue;
    seen.add(normalized);
    unique.push(firstSentence(trimmed));
  }
  return unique;
}
const PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER = "Conteudo premium temporariamente indisponivel. Tente novamente mais tarde.";
function buildPremiumFallback(temperament) {
  return {
    temperament,
    overview: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    strengths: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    risks: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    practices: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    work: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    relationships: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    checklist: [PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER],
    weaknesses: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    career: PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER
  };
}
function safeGetPremiumTemperamentText(temperament) {
  try {
    return getPremiumTemperamentText(temperament);
  } catch (error) {
    console.error(
      `[temperamentsPdf] failed to load premium text for "${temperament}". Falling back to placeholder.`,
      error
    );
    return buildPremiumFallback(temperament);
  }
}
function ensureParagraphs(text) {
  const paragraphs = splitParagraphs(text);
  if (paragraphs.length > 0) {
    return paragraphs;
  }
  const fallback = firstSentence(text).trim();
  return fallback ? [fallback] : [PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER];
}
function buildProfile(temperament) {
  const premium = safeGetPremiumTemperamentText(temperament);
  return {
    label: TEMPERAMENT_LABELS[temperament],
    overview: premium.overview,
    strengths: ensureParagraphs(premium.strengths),
    risks: ensureParagraphs(premium.risks),
    work: ensureParagraphs(premium.work),
    relationships: ensureParagraphs(premium.relationships),
    family: ensureParagraphs(premium.relationships),
    spiritual: ensureParagraphs(premium.practices),
    examen: premium.checklist.length ? premium.checklist : [PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER]
  };
}
function buildIntegratedReadingParagraphs(mainProfile, secondaryProfile) {
  const mainOverview = compactSection([mainProfile.overview], 4);
  const mainStrengths = compactSection(mainProfile.strengths, 3);
  const mainRisks = compactSection(mainProfile.risks, 3);
  if (!secondaryProfile) {
    return [
      `O eixo predominante ${mainProfile.label} aparece com consistencia no seu modo de decidir e agir. ${mainOverview}`,
      `Na pratica, esse perfil tende a se fortalecer quando prioriza ${mainStrengths.toLowerCase()}, mantendo vigilancia sobre ${mainRisks.toLowerCase()}.`
    ];
  }
  const secondaryOverview = compactSection([secondaryProfile.overview], 3);
  const secondaryStrengths = compactSection(secondaryProfile.strengths, 2);
  const secondaryRisks = compactSection(secondaryProfile.risks, 2);
  return [
    `A combinacao ${mainProfile.label}-${secondaryProfile.label} aponta um eixo dominante no principal e modulacao consistente no secundario. ${mainOverview}`,
    `No cotidiano, o principal tende a aparecer por meio de ${mainStrengths.toLowerCase()}, enquanto o secundario adiciona ${secondaryStrengths.toLowerCase()}.`,
    `Em contextos de pressao, surgem riscos complementares: ${mainRisks.toLowerCase()} e ${secondaryRisks.toLowerCase()}.`,
    `A leitura integrada fica mais estavel quando as praticas do principal sao executadas junto das praticas do secundario, mantendo ritmo e coerencia de longo prazo. ${secondaryOverview}`
  ];
}
function buildSevenDayPlan(mainProfile, secondaryProfile) {
  const base = [
    `Dia 1: releia o panorama ${mainProfile.label} e escreva 3 forcas praticas para aplicar hoje.`,
    `Dia 2: selecione 1 risco recorrente de ${mainProfile.label} e defina um gatilho de interrupcao.`,
    "Dia 3: execute uma acao objetiva de melhoria no trabalho em menos de 30 minutos.",
    "Dia 4: aplique uma conversa intencional de escuta ativa em um relacionamento importante.",
    "Dia 5: revise limites de rotina (sono, foco, pausas) para proteger constancia emocional.",
    "Dia 6: escolha uma pratica espiritual simples e repita em horario fixo.",
    "Dia 7: consolide aprendizados da semana e ajuste 2 prioridades da semana seguinte."
  ];
  if (!secondaryProfile) {
    return base;
  }
  return [
    ...base.slice(0, 3),
    `Dia 4: aplique um ajuste de convivencia que una ${mainProfile.label} e ${secondaryProfile.label} sem excessos de nenhum lado.`,
    ...base.slice(4)
  ];
}
function buildThirtyDayPlan(mainProfile, secondaryProfile) {
  const focusLabel = secondaryProfile ? `${mainProfile.label}-${secondaryProfile.label}` : mainProfile.label;
  return [
    `Semana 1 (${focusLabel}): organizar ambiente, rotina e prioridades para reduzir ruido decisorio.`,
    "Semana 2: consolidar 2 habitos de constancia (agenda semanal + revisao diaria curta).",
    "Semana 3: praticar 3 conversas objetivas de alinhamento com foco em clareza e caridade.",
    "Semana 4: revisar indicadores pessoais (energia, foco, conflitos, progresso) e ajustar ciclo.",
    "Checklist final: manter 1 compromisso de trabalho, 1 de relacao e 1 de crescimento interior por semana."
  ];
}
function buildFinalChecklist(mainProfile, secondaryProfile) {
  var _a, _b;
  const base = dedupeChecklist([
    ...(_a = mainProfile.examen) != null ? _a : [],
    ...(_b = secondaryProfile == null ? void 0 : secondaryProfile.examen) != null ? _b : []
  ]);
  if (base.length >= 8) {
    return base.slice(0, 8);
  }
  const fallback = [
    firstSentence(compactSection(mainProfile.strengths, 1)),
    firstSentence(compactSection(mainProfile.risks, 1)),
    firstSentence(compactSection(mainProfile.work, 1)),
    firstSentence(compactSection(mainProfile.relationships, 1)),
    firstSentence(compactSection(mainProfile.spiritual, 1))
  ].filter((item) => item.length > 0);
  return dedupeChecklist([...base, ...fallback]).slice(0, 8);
}
function normalizeResultEntry(entry) {
  if (!isTemperamentId(entry.groupId)) {
    return null;
  }
  const normalized = normalizeScaleValue(entry.average, TEMPERAMENT_SOURCE_SCALE);
  return {
    id: entry.groupId,
    name: TEMPERAMENT_LABELS_PT[entry.groupId],
    sourceAverage: normalized.source,
    base10Average: normalized.base10
  };
}
function buildTemperamentsPdfContent(entry) {
  var _a;
  const sorted = entry.results.map(normalizeResultEntry).filter((result) => result !== null).sort((a, b) => b.base10Average - a.base10Average);
  if (sorted.length === 0) {
    throw new Error("No temperament scores available to build PDF content.");
  }
  const main = sorted[0];
  const secondary = (_a = sorted[1]) != null ? _a : null;
  const remaining = sorted.slice(2);
  const mainProfile = buildProfile(main.id);
  const secondaryProfile = secondary ? buildProfile(secondary.id) : null;
  const remainingProfiles = remaining.map(
    (entryScore) => buildProfile(entryScore.id)
  );
  return {
    main: {
      id: main.id,
      sourceAverage: main.sourceAverage,
      base10Average: main.base10Average
    },
    secondary: secondary ? {
      id: secondary.id,
      sourceAverage: secondary.sourceAverage,
      base10Average: secondary.base10Average
    } : null,
    remaining,
    resultsOrdered: sorted,
    mainProfile,
    secondaryProfile,
    remainingProfiles,
    integratedReadingParagraphs: buildIntegratedReadingParagraphs(
      mainProfile,
      secondaryProfile
    ),
    sevenDayPlan: buildSevenDayPlan(mainProfile, secondaryProfile),
    thirtyDayPlan: buildThirtyDayPlan(mainProfile, secondaryProfile),
    finalChecklist: buildFinalChecklist(mainProfile, secondaryProfile)
  };
}

export { PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER, TEMPERAMENT_LABELS, buildTemperamentsPdfContent };
//# sourceMappingURL=temperamentsPdf.mjs.map
