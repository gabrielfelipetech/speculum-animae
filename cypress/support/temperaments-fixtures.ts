export const TEMPERAMENTS = [
  'choleric',
  'sanguine',
  'phlegmatic',
  'melancholic',
] as const;

export type TemperamentId = (typeof TEMPERAMENTS)[number];

type ResultItem = {
  groupId: TemperamentId;
  name: string;
  average: number;
};

export type TemperamentsResultPayload = {
  slug: 'temperaments';
  results: ResultItem[];
  topSummaries: [];
  meta: {
    title: string;
    subtitle: string;
    groupsLabel: string;
  };
};

const TEMPERAMENT_NAMES: Record<TemperamentId, string> = {
  choleric: 'Colerico',
  sanguine: 'Sanguineo',
  phlegmatic: 'Fleumatico',
  melancholic: 'Melancolico',
};

export function buildTemperamentsResultPayload(
  primary: TemperamentId,
  secondary: TemperamentId,
): TemperamentsResultPayload {
  if (primary === secondary) {
    throw new Error('Primary and secondary temperaments must be different.');
  }

  const baseById: Record<TemperamentId, number> = {
    choleric: 3.9,
    sanguine: 3.9,
    phlegmatic: 3.9,
    melancholic: 3.9,
  };
  baseById[primary] = 6.8;
  baseById[secondary] = 6.2;

  const rest = TEMPERAMENTS.filter(
    (temperament) => temperament !== primary && temperament !== secondary,
  );
  baseById[rest[0]] = 4.6;
  baseById[rest[1]] = 4.1;

  return {
    slug: 'temperaments',
    results: TEMPERAMENTS.map((temperament) => ({
      groupId: temperament,
      name: TEMPERAMENT_NAMES[temperament],
      average: baseById[temperament],
    })),
    topSummaries: [],
    meta: {
      title: 'Temperamentos',
      subtitle: `Combinacao ${TEMPERAMENT_NAMES[primary]} + ${TEMPERAMENT_NAMES[secondary]}`,
      groupsLabel: 'Bloco',
    },
  };
}
