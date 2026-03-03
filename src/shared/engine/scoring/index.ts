export {
  computeChoiceScores,
  computeLikertScores,
  computePairwiseScores,
  computeRankScores,
  type DimensionScores,
  type LikertScoreInput,
} from './computeScores';
export { buildAnswerKey, scoreTest, type GroupScore } from './scoreTest';
export {
  TEMPERAMENT_SOURCE_SCALE,
  clampToScale,
  normalizeAvgTo0to10,
  normalizeTo0to10,
  normalizeScaleValue,
  toBase10,
  type NormalizedScaleValue,
  type ScoreScale,
} from './normalizeScale';
