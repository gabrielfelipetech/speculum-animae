// src/config/tests/temperamentIndicator.ts

export type TemperamentId = 'choleric' | 'sanguine' | 'melancholic' | 'phlegmatic';

export interface ChecklistQuestion {
  id: number;        // 1..232
  text: string;      // texto da afirmação
}

export interface TemperamentIndicatorConfig {
  id: 'temperament-indicator';
  slug: 'temperament-indicator';
  type: 'checklist';
  title: 'Indicador de temperamento';
  category: 'temperaments';
  description: string;
  questions: ChecklistQuestion[];
  scoring: Record<TemperamentId, number[]>; // números das questões de cada temperamento
}

export const temperamentIndicatorConfig: TemperamentIndicatorConfig = {
  id: 'temperament-indicator',
  slug: 'temperament-indicator',
  type: 'checklist',
  category: 'temperaments',
  title: 'Indicador de temperamento (Bennett)',
  description:
    'Questionário em estilo checklist inspirado em "O Temperamento que Deus lhe deu". ' +
    'Marque as frases que descrevem seus padrões habituais de reação.',

  questions: [
    { id: 1, text: 'Reajo rapidamente quando me apresentam uma ideia, uma pessoa ou situação.' },
    { id: 2, text: 'Reajo lentamente quando me apresentam uma ideia, pessoa ou situação.' },
    { id: 3, text: 'Reajo fortemente quando apresentado a uma ideia, pessoa ou situação.' },
    { id: 4, text: 'Não reajo intensamente quando me deparo com uma ideia, pessoa ou situação.' },
    { id: 5, text: 'Quero tomar uma atitude imediata em relação a uma ideia, situação ou pessoa.' },
    // (...)
    // Continue transcrevendo até o 232 exatamente como no livro:
    // { id: 6, text: 'Quando lhe são apresentadas uma ideia...' },
    // ...
    // { id: 232, text: 'Caseiro.' },
  ],

  // IMPORTANTE: preencha esses arrays com os números da página de "PONTUAÇÃO"
  // (aquelas listas de 1, 3, 5, 8, 11, 14, 15, ...).
  scoring: {
    choleric: [
      // Exemplo – coloque aqui TODOS os números da linha "Colérico" do livro
      1, 3, 5, 8, 11, 14, 15,
      // ...
    ],
    sanguine: [
      // todos os números da linha "Sanguíneo"
      1, 3, 5, 9,
      // ...
    ],
    melancholic: [
      // todos da linha "Melancólico"
    ],
    phlegmatic: [
      // todos da linha "Fleumático"
    ],
  },
};
