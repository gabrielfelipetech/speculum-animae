import type { AssessmentReport } from '~/types/results';
import type { StoredResult } from '../results.post';
import { buildTemperamentCompatibilityReport } from './assessments';

export function buildTemperamentsCompatibilityReport(
  entry: StoredResult,
): AssessmentReport {
  return buildTemperamentCompatibilityReport(entry.results, {
    sessionId: entry.id,
    title: entry.meta?.title,
    subtitle: entry.meta?.subtitle,
  });
}
