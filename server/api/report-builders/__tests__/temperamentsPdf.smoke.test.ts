import { describe, expect, it } from 'vitest';
import type { StoredResult } from '../../results.post';
import { generateTemperamentsPdfBinary } from '../temperamentsPdfRender';

const BASE_RESULT: StoredResult = {
  id: 'session-pdf-smoke',
  slug: 'temperaments',
  userId: null,
  clientId: 'client-smoke',
  email: null,
  results: [
    { groupId: 'sanguine', name: 'Sanguineo', average: 6.7 },
    { groupId: 'choleric', name: 'Colerico', average: 6.1 },
    { groupId: 'melancholic', name: 'Melancolico', average: 4.3 },
    { groupId: 'phlegmatic', name: 'Fleumatico', average: 3.8 },
  ],
  timestamp: '2026-03-02T00:00:00.000Z',
};

describe('temperaments pdf binary smoke', () => {
  it('generates a non-empty PDF buffer with deterministic filename', async () => {
    const { fileName, buffer } = await generateTemperamentsPdfBinary(BASE_RESULT);

    expect(fileName).toBe('relatorio-temperamentos-sanguineo-colerico.pdf');
    expect(buffer.length).toBeGreaterThan(80_000);
    expect(buffer.subarray(0, 5).toString('utf8')).toBe('%PDF-');
  });
});
