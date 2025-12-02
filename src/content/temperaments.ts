// src/content/temperaments.ts
import type { ResultBlock } from '~/types/results';

export type TemperamentKey =
  | 'choleric'
  | 'sanguine'
  | 'phlegmatic'
  | 'melancholic'
  | 'choleric+sanguine'
  | 'choleric+melancholic'
  | 'sanguine+phlegmatic';
// etc...

export interface TemperamentResult {
  primary: TemperamentKey;
  secondary?: TemperamentKey;
  blocks: ResultBlock[];
}

const temperamentBlocks: Record<TemperamentKey, ResultBlock[]> = {
  choleric: [
    {
      id: 'choleric-intro',
      access: 'free',
      title: 'Força de vontade e foco em resultados',
      body:
        'Como colérico, você tende a agir com rapidez e objetividade, preferindo decisões claras e metas concretas...',
    },
    {
      id: 'choleric-premium-career',
      access: 'premium',
      title: 'Como usar seu colérico na carreira (conteúdo premium)',
      body:
        'No relatório completo, mostramos como canalizar sua energia colérica para cargos de liderança, negociação e tomada de decisão...',
    },
  ],
  'choleric+sanguine': [
    {
      id: 'choleric-sanguine-intro',
      access: 'free',
      title: 'Combinação colérico-sanguínea',
      body:
        'Essa combinação une iniciativa e energia social. Você tende a iniciar projetos com entusiasmo e envolver outras pessoas com facilidade...',
    },
    {
      id: 'choleric-sanguine-premium',
      access: 'premium',
      title: 'Riscos e oportunidades da combinação (premium)',
      body:
        'No relatório completo, detalhamos como evitar impulsividade, dispersão e conflitos ao equilibrar seu lado colérico e sanguíneo...',
    },
  ],
  // ...
};

export function buildTemperamentResult(
  primary: TemperamentResult['primary'],
  secondary?: TemperamentResult['secondary'],
): TemperamentResult {
  const comboKey: TemperamentKey = secondary
    ? ([primary, secondary].sort().join('+') as TemperamentKey)
    : primary;

  const blocks: ResultBlock[] = [
    ...(temperamentBlocks[primary] ?? []),
    ...(secondary ? temperamentBlocks[secondary] ?? [] : []),
    ...(temperamentBlocks[comboKey] ?? []),
  ];

  return { primary, secondary, blocks };
}
