import type { LikertScaleId, LikertScaleLabels } from '~/types/tests';

export const LIKERT_SCALES: Record<LikertScaleId, LikertScaleLabels> = {
  agreement: {
    minLabel: 'Discordo totalmente',
    maxLabel: 'Concordo totalmente',
  },
  frequency: {
    minLabel: 'Nunca',
    maxLabel: 'Sempre',
  },
  intensity: {
    minLabel: 'Muito baixo',
    maxLabel: 'Muito alto',
  },
};

export function resolveScaleLabels(
  scale: LikertScaleId | undefined,
  minOverride?: string,
  maxOverride?: string,
): LikertScaleLabels {
  const fallback = LIKERT_SCALES.agreement;
  const base = scale ? LIKERT_SCALES[scale] ?? fallback : fallback;
  return {
    minLabel: minOverride ?? base.minLabel,
    maxLabel: maxOverride ?? base.maxLabel,
  };
}
