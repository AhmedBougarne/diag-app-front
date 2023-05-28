export interface Choice {
  choiceId: number; // Note that the `null assertion` `!` is required in strict mode.
  nextQuestion: number | null;
  previousQuestion: number | null;
  questionId: number;
  value: string;
  response: string | null;
}
