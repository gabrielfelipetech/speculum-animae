import { describe, expect, it } from 'vitest';
import {
  TEMPERAMENT_SOURCE_SCALE,
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
