export interface Question {
  id?: number; // Note that the `null assertion` `!` is required in strict mode.
  questionText?: string;
  questionTitle?: string;
}
