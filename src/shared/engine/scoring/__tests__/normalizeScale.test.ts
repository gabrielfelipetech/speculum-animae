import { describe, expect, it } from 'vitest';
import {
  TEMPERAMENT_SOURCE_SCALE,
  normalizeAvgTo0to10,
  normalizeTo0to10,
  normalizeScaleValue,
} from '../normalizeScale';

describe('normalizeScaleValue', () => {
  it('maps source minimum to base10 zero', () => {
    const result = normalizeScaleValue(
      TEMPERAMENT_SOURCE_SCALE.min,
      TEMPERAMENT_SOURCE_SCALE,
    );

    expect(result.source).toBe(1);
    expect(result.base10).toBe(0);
  });

  it('maps source maximum to base10 ten', () => {
    const result = normalizeScaleValue(
      TEMPERAMENT_SOURCE_SCALE.max,
      TEMPERAMENT_SOURCE_SCALE,
    );

    expect(result.source).toBe(7);
    expect(result.base10).toBe(10);
  });

  it('clamps out-of-range values before converting', () => {
    const below = normalizeScaleValue(-5, TEMPERAMENT_SOURCE_SCALE);
    const above = normalizeScaleValue(99, TEMPERAMENT_SOURCE_SCALE);

    expect(below.source).toBe(1);
    expect(below.base10).toBe(0);
    expect(above.source).toBe(7);
    expect(above.base10).toBe(10);
  });

  it('keeps rounding consistent to two decimals', () => {
    const result = normalizeScaleValue(4.333333, TEMPERAMENT_SOURCE_SCALE);

    expect(result.source).toBe(4.33);
    expect(result.base10).toBe(5.55);
  });
});

describe('normalizeTo0to10', () => {
  it('maps source minimum to zero', () => {
    expect(normalizeTo0to10(1, 1, 7)).toBe(0);
  });

  it('maps source maximum to ten', () => {
    expect(normalizeTo0to10(7, 1, 7)).toBe(10);
  });

  it('clamps values outside source range before normalizing', () => {
    expect(normalizeTo0to10(-5, 1, 7)).toBe(0);
    expect(normalizeTo0to10(99, 1, 7)).toBe(10);
  });

  it('keeps consistent rounding', () => {
    expect(normalizeTo0to10(4.333333, 1, 7)).toBe(5.56);
  });
});

describe('normalizeAvgTo0to10', () => {
  it('normalizes average values with clamp and rounding', () => {
    expect(
      normalizeAvgTo0to10(
        4.333333,
        TEMPERAMENT_SOURCE_SCALE.min,
        TEMPERAMENT_SOURCE_SCALE.max,
      ),
    ).toBe(5.56);
  });
});
