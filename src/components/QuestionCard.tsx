import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { FC, useState } from "react";
import { Questions } from "../App";
export interface Question {
  id: number; // Note that the `null assertion` `!` is required in strict mode.
  questionText: string;
  questionTitle: string;
}
export interface Choice {
  choiceId: number; // Note that the `null assertion` `!` is required in strict mode.
  nextQuestion: number | null;
  previousQuestion: number | null;
  questionId: number;
  value: string;
  response: string | null;
}
interface Props {
  question: Question;
  choices: Choice[];
  updateCurrentQuestion: any;
}
const QuestionCard: FC<Props> = ({
  question,
  choices,
  updateCurrentQuestion,
}) => {
  const [valueChoice, setValueChoice] = useState(
    choices.filter((t) => t.questionId === question.id)[0].value
  );
  const handleChange = (event: any, value: string) => {
    const choice = choices.filter((c) => c.value === value)[0];
    setValueChoice(choice.value);
  };
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
          {question.questionTitle}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {question.questionText}
        </Typography>
      </CardContent>
      <FormControl style={{ marginLeft: 10 }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={valueChoice}
          onChange={handleChange}
        >
          {choices.map((choice: Choice) => (
            <FormControlLabel
              value={choice.value}
              control={<Radio />}
              label={choice.value}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "space-between",
        }}
      >
        <Button size="small" onClick={() => {
            updateCurrentQuestion(
              Questions.filter(
                (q) =>
                  q.id ===
                  choices.filter((c) => c.value === valueChoice)[0].previousQuestion
              )[0]
            );
          }}>Back</Button>
        <Button
          size="small"
          onClick={() => {
            updateCurrentQuestion(
              Questions.filter(
                (q) =>
                  q.id ===
                  choices.filter((c) => c.value === valueChoice)[0].nextQuestion
              )[0]
            );
          }}
        >
          Suivant
        </Button>
        <Button size="small">Effacer formulaire</Button>
      </CardActions>
    </Card>
  );
};
export default QuestionCard;
