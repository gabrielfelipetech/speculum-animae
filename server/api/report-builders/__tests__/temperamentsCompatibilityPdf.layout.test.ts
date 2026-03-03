import { describe, expect, it } from 'vitest';
import { PDFParse } from 'pdf-parse';
import type { StoredResult } from '../../results.post';
import { generateTemperamentsCompatibilityPdfBinary } from '../temperamentsCompatibilityPdfRender';

const FIXTURE_RESULT: StoredResult = {
  id: 'session-pdf-compat',
  slug: 'temperaments-compatibility',
  userId: null,
  clientId: 'client-compat',
  email: null,
  results: [
    { groupId: 'choleric', name: 'Colerico', average: 6.6 },
    { groupId: 'sanguine', name: 'Sanguineo', average: 6.1 },
    { groupId: 'phlegmatic', name: 'Fleumatico', average: 4.5 },
    { groupId: 'melancholic', name: 'Melancolico', average: 3.8 },
  ],
  timestamp: '2026-03-03T00:00:00.000Z',
};

function extractPageCount(buffer: Buffer): number {
  const text = buffer.toString('latin1');
  const matches = [...text.matchAll(/\/Count\s+(\d+)/g)].map((match) =>
    Number(match[1]),
  );
  if (matches.length === 0) return 0;
  return Math.max(...matches);
}

describe('temperaments-compatibility pdf layout', () => {
  it('generates a 0-10 report with minimum content and page count', async () => {
    const { fileName, buffer } = await generateTemperamentsCompatibilityPdfBinary(
      FIXTURE_RESULT,
    );
    const pageCount = extractPageCount(buffer);
    const parser = new PDFParse({ data: buffer });
    const parsed = await parser.getText();
    await parser.destroy();
    const extractedText = parsed.text.toLowerCase();

    expect(fileName).toBe(
      'relatorio-compatibilidade-temperamentos-colerico-sanguineo.pdf',
    );
    expect(buffer.subarray(0, 5).toString('utf8')).toBe('%PDF-');
    expect(buffer.length).toBeGreaterThan(40_000);
    expect(pageCount).toBeGreaterThanOrEqual(6);
    expect(extractedText).not.toContain('escala 1-7');
    expect(extractedText).not.toContain('/ 7');
  });
});
