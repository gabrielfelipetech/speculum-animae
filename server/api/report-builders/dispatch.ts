import type { AnyReport } from '~/types/results';
import type { StoredResult } from '../results.post';
import { buildTwelveLayersReport } from './twelveLayers';
import { buildTemperamentsReport } from './temperaments';
import { buildTemperamentsCompatibilityReport } from './temperamentsCompatibility';

export function buildReportFromStoredResult(entry: StoredResult): AnyReport | null {
  switch (entry.slug) {
    case 'twelve-layers':
      return buildTwelveLayersReport(entry);
    case 'temperaments':
      return buildTemperamentsReport(entry);
    case 'temperaments-compatibility':
    case 'temperament-compatibility':
      return buildTemperamentsCompatibilityReport(entry);
    default:
      return null;
  }
}
