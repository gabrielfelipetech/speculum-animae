import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { StoredResult } from '../../results.post';

const PREMIUM_DIR_ENV_KEY = 'SA_PREMIUM_TEXTS_DIR';

function buildStoredResult(): StoredResult {
  return {
    id: 'session-pdf-premium-fallback',
    slug: 'temperaments',
    userId: null,
    email: null,
    clientId: 'client-pdf-premium-fallback',
    results: [
      { groupId: 'sanguine', name: 'Sanguineo', average: 6.7 },
      { groupId: 'choleric', name: 'Colerico', average: 6.2 },
      { groupId: 'melancholic', name: 'Melancolico', average: 4.5 },
      { groupId: 'phlegmatic', name: 'Fleumatico', average: 3.9 },
    ],
    timestamp: '2026-03-03T00:00:00.000Z',
  };
}

describe.sequential('temperaments pdf premium fallback hardening', () => {
  let emptyDir: string | null = null;

  afterEach(() => {
    delete process.env[PREMIUM_DIR_ENV_KEY];
    vi.resetModules();

    if (emptyDir) {
      rmSync(emptyDir, { recursive: true, force: true });
      emptyDir = null;
    }
  });

  it('keeps PDF content generation alive when premium texts are unavailable', async () => {
    emptyDir = mkdtempSync(join(tmpdir(), 'sa-premium-empty-pdf-'));
    process.env[PREMIUM_DIR_ENV_KEY] = emptyDir;
    vi.resetModules();

    const {
      PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
      buildTemperamentsPdfContent,
    } = await import('../temperamentsPdf');

    const content = buildTemperamentsPdfContent(buildStoredResult());

    expect(content.mainProfile.overview).toContain(
      PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    );
    expect(content.mainProfile.strengths).toContain(
      PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    );
    expect(content.mainProfile.risks).toContain(
      PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    );
    expect(content.mainProfile.examen).toEqual([
      PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    ]);
    expect(content.secondaryProfile?.overview).toContain(
      PREMIUM_CONTENT_UNAVAILABLE_PLACEHOLDER,
    );
    expect(content.finalChecklist.length).toBeGreaterThan(0);
  });
});
