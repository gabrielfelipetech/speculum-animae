import { describe, expect, it } from 'vitest';
import type { StoredResult } from '../../results.post';
import { buildReportFromStoredResult } from '../dispatch';

function buildStoredResult(slug: StoredResult['slug']): StoredResult {
  return {
    id: 'session-1',
    slug,
    userId: null,
    email: null,
    clientId: 'client-1',
    results: [
      { groupId: 'choleric', name: 'Colerico', average: 5.2 },
      { groupId: 'melancholic', name: 'Melancolico', average: 4.7 },
      { groupId: 'sanguine', name: 'Sanguineo', average: 4.2 },
      { groupId: 'phlegmatic', name: 'Fleumatico', average: 3.8 },
    ],
    meta: {
      title: 'Compatibilidade de Temperamentos',
      subtitle: 'Relatorio',
      groupsLabel: 'Temperamento',
    },
    timestamp: new Date().toISOString(),
  };
}

describe('results dispatcher', () => {
  it('routes canonical temperaments-compatibility slug', () => {
    const report = buildReportFromStoredResult(
      buildStoredResult('temperaments-compatibility'),
    );

    expect(report).not.toBeNull();
    expect(report?.kind).toBe('temperamentCompatibility');
  });

  it('routes legacy temperament-compatibility slug alias', () => {
    const report = buildReportFromStoredResult(
      buildStoredResult('temperament-compatibility'),
    );

    expect(report).not.toBeNull();
    expect(report?.kind).toBe('temperamentCompatibility');
  });

  it('returns null for disabled result slugs', () => {
    const report = buildReportFromStoredResult(buildStoredResult('big-five'));
    expect(report).toBeNull();
  });
});
