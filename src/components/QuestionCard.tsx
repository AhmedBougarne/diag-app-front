import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { FC, useEffect, useState } from "react";
import { Question } from "../types/Question";
import { Choice } from "../types/Choice";
import {
  getChoicesUsingQuestionId,
  getQuestionUsingChoiceId,
} from "../utils/utils";

interface Props {
  choices: Choice[];
  questions: Question[];
  firstQuestion: Question;
}
const QuestionCard: FC<Props> = ({ choices, questions, firstQuestion }) => {
  const [currentChoice, setCurrentChoice] = useState<Choice>();
  const [currentQuestion, setCurrentQuestion] =
    useState<Question>(firstQuestion);
  const [response, setResponse] = useState<string>("");
  const [choicesState, setChoices] = useState(choices);
  const handleChange = (event: any, value: string) => {
    setCurrentChoice(choices.filter((c) => c.value === value)[0]);
  };
  const handleNext = () => {
    if (currentChoice && currentChoice.nextQuestion)
      setCurrentQuestion(
        questions.filter((q) => q.id === currentChoice?.nextQuestion)[0]
      );
    else {
      if (currentChoice && currentChoice.response) {
        setResponse(currentChoice.response);
      }
    }
  };
  const handleBack = () => {
    if (currentChoice && currentChoice?.previousQuestion) {
      setCurrentQuestion(
        questions.filter((q) => q.id === currentChoice?.previousQuestion)[0]
      );
    }
  };

  const resetForm = () => {
    setCurrentQuestion(firstQuestion);
    setResponse("");
  };

  useEffect(() => {
    if (currentQuestion && currentQuestion.id) {
      setCurrentChoice(
        getChoicesUsingQuestionId(choices, currentQuestion.id)[0]
      );
      setChoices(choices.filter((c) => c.questionId === currentQuestion.id));
    }
  }, [currentQuestion]);
  useEffect(() => {}, [handleNext, handleBack]);
  if (response.length <= 0)
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            {currentQuestion.questionTitle}
          </Typography>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {currentQuestion.questionText}
          </Typography>
        </CardContent>
        <FormControl style={{ marginLeft: 10 }}>
          {currentChoice && (
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={currentChoice.value}
              onChange={handleChange}
            >
              {choicesState.map((choice: Choice) => (
                <FormControlLabel
                  key={choice.choiceId}
                  value={choice.value}
                  control={<Radio />}
                  label={choice.value}
                />
              ))}
            </RadioGroup>
          )}
        </FormControl>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "space-between",
          }}
        >
          <Button size="small" onClick={() => handleBack()}>
            Back
          </Button>
          <Button size="small" onClick={() => handleNext()}>
            Suivant
          </Button>
          <Button size="small">Effacer formulaire</Button>
        </CardActions>
      </Card>
    );
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography>{currentChoice?.response}</Typography>
      </CardContent>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "space-between",
        }}
      >
        <Button size="small" onClick={() => handleBack()}>
          Envoyer
        </Button>
        <Button size="small" onClick={() => resetForm()}>
          Commencer dès le début
        </Button>
      </CardActions>
    </Card>
  );
};
export default QuestionCard;
