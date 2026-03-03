import { describe, expect, it } from 'vitest';
import { buildTemperamentsPdfContent } from '../temperamentsPdf';
import type { StoredResult } from '../../results.post';

const BASE_RESULT: StoredResult = {
  id: 'session-phlegmatic',
  slug: 'temperaments',
  userId: null,
  clientId: 'client-test',
  email: null,
  results: [
    { groupId: 'phlegmatic', name: 'Fleumatico', average: 9.9 },
    { groupId: 'melancholic', name: 'Melancolico', average: 5.1 },
    { groupId: 'sanguine', name: 'Sanguineo', average: 4.0 },
    { groupId: 'choleric', name: 'Colerico', average: -3 },
  ],
  timestamp: '2026-03-02T00:00:00.000Z',
};

describe('temperaments pdf builder', () => {
  it('includes phlegmatic profile and keeps score limits within source/base10 ranges', () => {
    const content = buildTemperamentsPdfContent(BASE_RESULT);

    expect(content.main.id).toBe('phlegmatic');
    expect(content.mainProfile.label.toLowerCase()).toContain('fleu');
    expect(content.main.sourceAverage).toBe(7);
    expect(content.main.base10Average).toBe(10);
    expect(content.resultsOrdered[content.resultsOrdered.length - 1]?.sourceAverage).toBe(1);
    expect(content.resultsOrdered[content.resultsOrdered.length - 1]?.base10Average).toBe(0);
  });
});
