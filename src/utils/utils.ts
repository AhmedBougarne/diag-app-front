import { Choice } from "../types/Choice";
import { Question } from "../types/Question";

export const getQuestionUsingChoiceId = (
  questions: Question[],
  choices: Choice[],
  choiceId: number
) => {
  return questions.filter(
    (q) => q.id === choices.filter((c) => c.id === choiceId)[0].questionId
  )[0];
};

export const getChoicesUsingQuestionId = (
  choices: Choice[],
  questionId: number
) => {
  return choices.filter((c) => c.questionId === questionId);
};
