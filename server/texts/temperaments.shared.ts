// server/texts/temperaments.shared.ts
import type { ResultBlock } from '~/types/results';

export interface TemperamentScore {
  groupId: string;
  name: string;
  average: number;
}

export function intensityLabel(score: number): string {
  if (score >= 6) return 'muito alta';
  if (score >= 5) return 'alta';
  if (score >= 4) return 'moderada';
  if (score >= 3) return 'equilibrada';
  if (score >= 2) return 'baixa';
  return 'muito baixa';
}

export const TEMPERAMENT_LABELS: Record<string, string> = {
  choleric: 'colérico',
  sanguine: 'sanguíneo',
  melancholic: 'melancólico',
  phlegmatic: 'fleumático',
};

export function lowerLabel(score?: TemperamentScore | null): string {
  if (!score) return '';
  return TEMPERAMENT_LABELS[score.groupId] ?? score.name.toLowerCase();
}

export type { ResultBlock };
