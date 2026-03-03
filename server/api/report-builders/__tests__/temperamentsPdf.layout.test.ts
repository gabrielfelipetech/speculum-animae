import { describe, expect, it } from 'vitest';
import type { StoredResult } from '../../results.post';
import { generateTemperamentsPdfBinary } from '../temperamentsPdfRender';

const FIXTURE_RESULT: StoredResult = {
  id: 'session-pdf-layout',
  slug: 'temperaments',
  userId: null,
  clientId: 'client-layout',
  email: null,
  results: [
    { groupId: 'melancholic', name: 'Melancolico', average: 6.6 },
    { groupId: 'phlegmatic', name: 'Fleumatico', average: 6.1 },
    { groupId: 'sanguine', name: 'Sanguineo', average: 4.2 },
    { groupId: 'choleric', name: 'Colerico', average: 3.9 },
  ],
  timestamp: '2026-03-02T00:00:00.000Z',
};

function extractPageCount(buffer: Buffer): number {
  const text = buffer.toString('latin1');
  const matches = [...text.matchAll(/\/Count\s+(\d+)/g)].map((match) =>
    Number(match[1]),
  );

  if (matches.length === 0) return 0;
  return Math.max(...matches);
}

describe('temperaments pdf layout', () => {
  it('generates a dense multi-page PDF buffer', async () => {
    const { buffer } = await generateTemperamentsPdfBinary(FIXTURE_RESULT);
    const pageCount = extractPageCount(buffer);
    console.info(`[temperamentsPdf.layout] bytes=${buffer.length} pages=${pageCount}`);

    expect(buffer.subarray(0, 5).toString('utf8')).toBe('%PDF-');
    expect(buffer.length).toBeGreaterThan(50_000);
    expect(pageCount).toBeGreaterThanOrEqual(3);
  });
});
