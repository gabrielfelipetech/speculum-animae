export type ScoreScale = {
  min: number;
  max: number;
};

export type NormalizedScaleValue = {
  source: number;
  base10: number;
};

export const TEMPERAMENT_SOURCE_SCALE: ScoreScale = {
  min: 1,
  max: 7,
};

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function clampToScale(value: number, scale: ScoreScale): number {
  return clamp(value, scale.min, scale.max);
}

export function toBase10(value: number, scale: ScoreScale): number {
  return normalizeTo0to10(value, scale.min, scale.max);
}

export function normalizeTo0to10(
  value: number,
  min: number,
  max: number,
  decimals = 2,
): number {
  if (max <= min) return 0;
  const clamped = clamp(value, min, max);
  const normalized = ((clamped - min) / (max - min)) * 10;
  return round(clamp(normalized, 0, 10), decimals);
}

export function normalizeAvgTo0to10(
  avgSource: number,
  sourceMin: number,
  sourceMax: number,
  decimals = 2,
): number {
  return normalizeTo0to10(avgSource, sourceMin, sourceMax, decimals);
}

export function normalizeScaleValue(
  value: number,
  scale: ScoreScale = TEMPERAMENT_SOURCE_SCALE,
  decimals = 2,
): NormalizedScaleValue {
  const source = round(clampToScale(value, scale), decimals);
  const base10 = normalizeTo0to10(source, scale.min, scale.max, decimals);
  return { source, base10 };
}
