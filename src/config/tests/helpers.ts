import type {
  LikertQuestion,
  LikertScaleId,
  TestGroup,
} from '~/types/tests';

type LikertQuestionInput = Omit<LikertQuestion, 'type' | 'dimension' | 'scaleKey'> & {
  dimension?: string;
  scaleKey?: LikertScaleId;
};

export function withLikertQuestions(
  questions: LikertQuestionInput[],
  dimension: string,
  scaleKey: LikertScaleId,
): LikertQuestion[] {
  return questions.map((question) => ({
    ...question,
    type: 'likert',
    dimension: question.dimension ?? dimension,
    scaleKey: question.scaleKey ?? scaleKey,
  }));
}

type LikertGroupInput = Omit<TestGroup, 'questions'> & {
  questions: LikertQuestionInput[];
};

export function withLikertGroups(
  groups: LikertGroupInput[],
  scaleKey: LikertScaleId = 'agreement',
): TestGroup[] {
  return groups.map((group) => ({
    ...group,
    questions: withLikertQuestions(group.questions, group.id, scaleKey),
  }));
}
