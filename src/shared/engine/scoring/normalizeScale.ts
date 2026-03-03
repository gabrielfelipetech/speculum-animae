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
  if (scale.max <= scale.min) return 0;
  const clamped = clampToScale(value, scale);
  const normalized = ((clamped - scale.min) / (scale.max - scale.min)) * 10;
  return clamp(normalized, 0, 10);
}

export function normalizeScaleValue(
  value: number,
  scale: ScoreScale = TEMPERAMENT_SOURCE_SCALE,
  decimals = 2,
): NormalizedScaleValue {
  const source = round(clampToScale(value, scale), decimals);
  const base10 = round(toBase10(source, scale), decimals);
  return { source, base10 };
}
