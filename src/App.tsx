import { useState } from "react";
import "./App.css";
import QuestionCard from "./components/QuestionCard";

export const Questions = [
  {
    id: 1,
    questionText: "Question 1",
    questionTitle: "Title 1",
    isFirst: true,
  },
  {
    id: 2,
    questionText: "Question 2",
    questionTitle: "Title 2",
  },
  {
    id: 3,
    questionText: "Question 3",
    questionTitle: "Title 3",
  },
  {
    id: 4,
    questionText: "Question 4",
    questionTitle: "Title 4",
  },
];
const choices = [
  {
    choiceId: 1, // Note that the `null assertion` `!` is required in strict mode.
    nextQuestion: 2,
    previousQuestion: null,
    value: "choice 1",
    questionId: 1,
    response: null,
  },
  {
    choiceId: 2, // Note that the `null assertion` `!` is required in strict mode.
    nextQuestion: 3,
    previousQuestion: null,
    value: "choice 2",
    questionId: 1,
    response: null,
  },
  {
    choiceId: 3, // Note that the `null assertion` `!` is required in strict mode.
    nextQuestion: 2,
    previousQuestion: null,
    value: "choice 3",
    questionId: 1,
    response: null,
  },
  {
    choiceId: 4, // Note that the `null assertion` `!` is required in strict mode.
    nextQuestion: null,
    previousQuestion: 1,
    value: "choice 1",
    questionId: 2,
    response: "hello",
  },
  {
    choiceId: 2, // Note that the `null assertion` `!` is required in strict mode.
    nextQuestion: 3,
    previousQuestion: null,
    value: "choice 2",
    questionId: 3,
    response: null,
  },
];
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(Questions[0])
  return (
    <div
      className="App"
      style={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      <div
        style={{
          width: "50%",
          marginTop: 50,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <QuestionCard
          question={currentQuestion}
          choices={choices.filter((c) => c.questionId === currentQuestion.id)}
          updateCurrentQuestion= {setCurrentQuestion}
        />
      </div>
    </div>
  );
}

export default App;
