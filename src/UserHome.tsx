import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { $container, $questionsContainer } from "./App.style";
import QuestionCard from "./components/QuestionCard";
import { APP_BASE_URL } from "./constants";
import { Choice } from "./types/Choice";
import { Question } from "./types/Question";

function UserHome() {
  const [choices, setChoices] = useState<Choice[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [firstQuestion, setFirstQuestion] = useState<Question>()

  useEffect(() => {
    async function getData() {
      const { data: questionsResponse } = await axios.get(
        `${APP_BASE_URL}/questions`
      );
      const { data: choicesResponse } = await axios.get(
        `${APP_BASE_URL}/choices`
      );
      const {data: firstQuestion}= await axios.get(
        `${APP_BASE_URL}/questions/first`
      )
      setQuestions(questionsResponse);
      setChoices(choicesResponse);
      setFirstQuestion(firstQuestion)
    }
    getData();
  }, []);

  return (
    <div className="App" style={$container}>
      <div style={$questionsContainer}>
        {questions.length > 0 && choices.length > 0 && firstQuestion && (
          <QuestionCard
            choices={choices}
            questions={questions}
            firstQuestion = {firstQuestion}
          />
        )}
      </div>
    </div>
  );
}

export default UserHome;
