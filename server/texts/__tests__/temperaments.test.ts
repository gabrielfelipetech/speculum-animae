import { describe, expect, it } from 'vitest';
import { TEMPERAMENT_TEXTS, type TemperamentScore } from '../temperaments';

const NAMES: Record<string, string> = {
  choleric: 'Colerico',
  sanguine: 'Sanguineo',
  phlegmatic: 'Fleumatico',
  melancholic: 'Melancolico',
};

function buildScores(primaryId: string): TemperamentScore[] {
  const ids = ['choleric', 'sanguine', 'phlegmatic', 'melancholic'];
  return ids.map((id, index) => ({
    groupId: id,
    name: NAMES[id],
    average: id === primaryId ? 6 - index * 0.1 : 3 - index * 0.1,
  }));
}

describe('temperament texts router', () => {
  it.each(['choleric', 'sanguine', 'phlegmatic', 'melancholic'])(
    'returns content for %s',
    (primaryId) => {
      const scores = buildScores(primaryId);
      const { primary, secondary } = TEMPERAMENT_TEXTS.detectTemperament(scores);

      expect(primary.groupId).toBe(primaryId);
      expect(TEMPERAMENT_TEXTS.buildIntro(primary, secondary).length).toBeGreaterThan(0);
      expect(TEMPERAMENT_TEXTS.buildTraits(primary, secondary).length).toBeGreaterThan(0);
      expect(TEMPERAMENT_TEXTS.buildCareer(primary, secondary).length).toBeGreaterThan(0);
      expect(TEMPERAMENT_TEXTS.buildGrowth(primary, secondary).length).toBeGreaterThan(0);
      expect(TEMPERAMENT_TEXTS.buildRelationships(primary, secondary).length).toBeGreaterThan(0);
    },
  );
});
