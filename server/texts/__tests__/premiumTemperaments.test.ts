import { describe, expect, it } from 'vitest';
import {
  getPremiumTemperamentText,
  type TemperamentId,
} from '../premiumTemperaments';

const TEMPERAMENT_IDS: TemperamentId[] = [
  'choleric',
  'sanguine',
  'phlegmatic',
  'melancholic',
];

describe('premium temperament texts loader', () => {
  it.each(TEMPERAMENT_IDS)('loads and normalizes %s text', (temperament) => {
    const text = getPremiumTemperamentText(temperament);

    expect(text.temperament).toBe(temperament);
    expect(text.overview.length).toBeGreaterThan(80);
    expect(text.strengths.length).toBeGreaterThan(80);
    expect(text.risks.length).toBeGreaterThan(80);
    expect(text.practices.length).toBeGreaterThan(80);
    expect(text.work.length).toBeGreaterThan(80);
    expect(text.relationships.length).toBeGreaterThan(80);
    expect(text.weaknesses).toBe(text.risks);
    expect(text.career).toBe(text.work);
    expect(text.checklist.length).toBeGreaterThan(0);
    expect(text.checklist.length).toBeLessThanOrEqual(5);
  });

  it.each(TEMPERAMENT_IDS)('keeps premium sections distinct for %s', (temperament) => {
    const text = getPremiumTemperamentText(temperament);
    const sections = [
      text.overview,
      text.strengths,
      text.risks,
      text.practices,
      text.work,
      text.relationships,
    ];

    const unique = new Set(sections.map((section) => section.trim()));
    expect(unique.size).toBe(sections.length);
  });

  it('memoizes entries per temperament after first load', () => {
    const first = getPremiumTemperamentText('choleric');
    const second = getPremiumTemperamentText('choleric');

    expect(second).toBe(first);
  });
});
