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
    expect(text.weaknesses.length).toBeGreaterThan(80);
    expect(text.practices.length).toBeGreaterThan(80);
    expect(text.career.length).toBeGreaterThan(80);
    expect(text.relationships.length).toBeGreaterThan(80);
    expect(text.checklist.length).toBeGreaterThan(0);
    expect(text.checklist.length).toBeLessThanOrEqual(5);
  });

  it('memoizes entries per temperament after first load', () => {
    const first = getPremiumTemperamentText('choleric');
    const second = getPremiumTemperamentText('choleric');

    expect(second).toBe(first);
  });
});
