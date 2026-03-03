import { buildTwelveLayersReport } from './twelveLayers.mjs';
import { buildTemperamentsReport } from './temperaments.mjs';
import { buildTemperamentsCompatibilityReport } from './temperamentsCompatibility.mjs';
import '../../../_/normalizeScale.mjs';
import '../../../_/premiumTemperaments.mjs';
import 'node:fs';
import 'node:path';
import './assessments.mjs';

function buildReportFromStoredResult(entry) {
  switch (entry.slug) {
    case "twelve-layers":
      return buildTwelveLayersReport(entry);
    case "temperaments":
      return buildTemperamentsReport(entry);
    case "temperaments-compatibility":
    case "temperament-compatibility":
      return buildTemperamentsCompatibilityReport(entry);
    default:
      return null;
  }
}

export { buildReportFromStoredResult };
//# sourceMappingURL=dispatch.mjs.map
