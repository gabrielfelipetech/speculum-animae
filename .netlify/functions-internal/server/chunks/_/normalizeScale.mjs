const TEMPERAMENT_SOURCE_SCALE = {
  min: 1,
  max: 7
};
function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}
function round(value, decimals) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
function clampToScale(value, scale) {
  return clamp(value, scale.min, scale.max);
}
function normalizeTo0to10(value, min, max, decimals = 2) {
  if (max <= min) return 0;
  const clamped = clamp(value, min, max);
  const normalized = (clamped - min) / (max - min) * 10;
  return round(clamp(normalized, 0, 10), decimals);
}
function normalizeAvgTo0to10(avgSource, sourceMin, sourceMax, decimals = 2) {
  return normalizeTo0to10(avgSource, sourceMin, sourceMax, decimals);
}
function normalizeScaleValue(value, scale = TEMPERAMENT_SOURCE_SCALE, decimals = 2) {
  const source = round(clampToScale(value, scale), decimals);
  const base10 = normalizeTo0to10(source, scale.min, scale.max, decimals);
  return { source, base10 };
}

export { TEMPERAMENT_SOURCE_SCALE as T, normalizeScaleValue as a, normalizeAvgTo0to10 as n };
//# sourceMappingURL=normalizeScale.mjs.map
