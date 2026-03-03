import { describe, expect, it } from 'vitest';
import { PDFParse } from 'pdf-parse';
import type { StoredResult } from '../../results.post';
import { generateTwelveLayersPdfBinary } from '../twelveLayersPdfRender';

const FIXTURE_RESULT: StoredResult = {
  id: 'session-pdf-twelve-layers',
  slug: 'twelve-layers',
  userId: null,
  clientId: 'client-layout',
  email: null,
  results: Array.from({ length: 12 }).map((_, index) => ({
    groupId: `layer-${index + 1}`,
    name: `Camada ${index + 1}`,
    average: 6.8 - index * 0.35,
  })),
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

describe('twelve-layers pdf layout', () => {
  it('generates a 0-10 report with at least six pages', async () => {
    const { fileName, buffer } = await generateTwelveLayersPdfBinary(FIXTURE_RESULT);
    const pageCount = extractPageCount(buffer);
    const parser = new PDFParse({ data: buffer });
    const parsed = await parser.getText();
    await parser.destroy();
    const extractedText = parsed.text.toLowerCase();

    expect(fileName).toBe('relatorio-12-camadas.pdf');
    expect(buffer.subarray(0, 5).toString('utf8')).toBe('%PDF-');
    expect(buffer.length).toBeGreaterThan(45_000);
    expect(pageCount).toBeGreaterThanOrEqual(6);
    expect(extractedText).not.toContain('escala 1-7');
    expect(extractedText).not.toContain('/ 7');
  });
});
