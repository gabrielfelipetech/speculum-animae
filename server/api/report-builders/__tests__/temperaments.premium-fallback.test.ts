import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { StoredResult } from '../../results.post';

const PREMIUM_DIR_ENV_KEY = 'SA_PREMIUM_TEXTS_DIR';

function buildStoredResult(): StoredResult {
  return {
    id: 'session-premium-fallback',
    slug: 'temperaments',
    userId: null,
    email: null,
    clientId: 'client-premium-fallback',
    results: [
      { groupId: 'choleric', name: 'Colerico', average: 6.1 },
      { groupId: 'sanguine', name: 'Sanguineo', average: 5.9 },
      { groupId: 'phlegmatic', name: 'Fleumatico', average: 4.3 },
      { groupId: 'melancholic', name: 'Melancolico', average: 3.8 },
    ],
    timestamp: '2026-03-03T00:00:00.000Z',
  };
}

describe.sequential('temperaments premium fallback hardening', () => {
  let emptyDir: string | null = null;

  afterEach(() => {
    delete process.env[PREMIUM_DIR_ENV_KEY];
    vi.resetModules();

    if (emptyDir) {
      rmSync(emptyDir, { recursive: true, force: true });
      emptyDir = null;
    }
  });

  it('does not throw and keeps free blocks when premium texts are unavailable', async () => {
    emptyDir = mkdtempSync(join(tmpdir(), 'sa-premium-empty-'));
    process.env[PREMIUM_DIR_ENV_KEY] = emptyDir;
    vi.resetModules();

    const {
      PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
      buildTemperamentsReport,
    } = await import('../temperaments');

    const report = buildTemperamentsReport(buildStoredResult());
    const allBlocks = [
      ...report.overall.blocks,
      ...report.traits.blocks,
      ...report.career.blocks,
      ...report.growth.blocks,
      ...report.relationships.blocks,
    ];

    const freeBlocks = allBlocks.filter((block) => block.access === 'free');
    expect(freeBlocks.length).toBeGreaterThan(0);

    const premiumNarrativeBlocks = allBlocks.filter(
      (block) =>
        block.access === 'premium' && block.id !== 'temp-premium-checklist',
    );
    expect(premiumNarrativeBlocks.length).toBeGreaterThan(0);
    for (const block of premiumNarrativeBlocks) {
      expect(block.body).toContain(PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER);
    }

    const checklistBlock = report.relationships.blocks.find(
      (block) => block.id === 'temp-premium-checklist',
    );
    expect(checklistBlock).toBeDefined();
    expect(checklistBlock?.access).toBe('premium');
    expect(checklistBlock?.content?.kind).toBe('bullets');
    expect(checklistBlock?.content).toEqual({
      kind: 'bullets',
      bullets: [PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER],
    });
  });
});
