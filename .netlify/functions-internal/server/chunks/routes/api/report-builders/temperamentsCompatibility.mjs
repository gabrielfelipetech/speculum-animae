import { buildTemperamentCompatibilityReport } from './assessments.mjs';
import '../../../_/normalizeScale.mjs';

function buildTemperamentsCompatibilityReport(entry) {
  var _a, _b;
  return buildTemperamentCompatibilityReport(entry.results, {
    sessionId: entry.id,
    title: (_a = entry.meta) == null ? void 0 : _a.title,
    subtitle: (_b = entry.meta) == null ? void 0 : _b.subtitle
  });
}

export { buildTemperamentsCompatibilityReport };
//# sourceMappingURL=temperamentsCompatibility.mjs.map
