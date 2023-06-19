import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { $container, $questionsContainer } from "./App.style";
import QuestionCard from "./components/QuestionCard";
import { APP_BASE_URL } from "./constants";
import axiosApiInstance from "./interceptors/axios";
import { Choice } from "./types/Choice";
import { Question } from "./types/Question";

function UserHome() {
  const [choices, setChoices] = useState<Choice[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [firstQuestion, setFirstQuestion] = useState<Question>();

  useEffect(() => {
    async function getData() {
      const { data: questionsResponse } = await axiosApiInstance.get(
        `${APP_BASE_URL}/questions`
      );
      const { data: choicesResponse } = await axiosApiInstance.get(
        `${APP_BASE_URL}/choices`
      );
      const { data: firstQuestion } = await axiosApiInstance.get(
        `${APP_BASE_URL}/questions/first`
      );
      setQuestions(questionsResponse);
      setChoices(choicesResponse);
      setFirstQuestion(firstQuestion);
    }
    getData();
  }, []);
  const navigate = useNavigate()
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{backgroundColor: "#BA5050"}} color="primary" position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Agent process
            </Typography>
            <Button color="warning" variant="contained" onClick={() => navigate("/")}>
              Deconnexion
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    <div className="App"  style={{ ...$container,fontFamily: "Tajawal" }}>
      <div style={$questionsContainer}>
        {questions.length > 0 && choices.length > 0 && firstQuestion && (
          <QuestionCard
            choices={choices}
            questions={questions}
            firstQuestion={firstQuestion}
          />
        )}
      </div>
    </div>
    </>
  );
}

export default UserHome;
