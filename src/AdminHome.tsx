import { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  useGridApiRef,
} from "@mui/x-data-grid";

import { Button, FormControl, MenuItem, Select, Stack } from "@mui/material";
import {
  getChoices,
  getQuestions,
  selectChoices,
  selectQuestions,
  addQuestion,
  editQuestion,
  editChoice,
  addChoice,
} from "./features/questionSlices";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store";
import { Question } from "./types/Question";

//nested data is ok, see accessorKeys in ColumnDef below

export default function AdminHome() {
  const questions = useSelector(selectQuestions);
  const choices = useSelector(selectChoices);
  const dispatch = useDispatch<AppDispatch>();
  const ref = useGridApiRef();
  const questionColumns: GridColDef[] = [
    {
      field: "questionText",
      headerName: "Question",
      width: 150,
      editable: true,
    },
    {
      field: "questionTitle",
      headerName: "Titre de la question",
      width: 150,
      editable: true,
    },
  ];
  const choiceColumns: GridColDef[] = [
    { field: "value", headerName: "Choix", width: 150, editable: true },
    {
      field: "questionId",
      headerName: "Question courante",
      width: 250,
      editable: true,
      valueGetter: (params) => {
        if (params.value && questions && questions.length > 0)
          return questions.filter((q: any) => q.id == params.value)[0]
            .questionText;
      },
      renderCell: (params) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [currentQuestion, setCurrentQuestion] = useState("");
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          if (currentQuestion || currentQuestion === "")
            setCurrentQuestion(params.value);
        }, []);
        return (
          <FormControl fullWidth>
            <Select
              labelId="questionIdLabel"
              id="questionId"
              value={currentQuestion || params.value}
              label="Question courante"
              style={{ fontFamily: "Tajawal" }}
              onChange={async (event) => {
                await dispatch(
                  editChoice({
                    ...ref.current.getRow(params.id),
                    questionId: questions.filter(
                      (q: Question) => q.questionText === event.target.value
                    )[0].id,
                  })
                );
                await dispatch(getQuestions());
                setCurrentQuestion(event.target.value);
              }}
            >
              {questions &&
                questions.length > 0 &&
                questions.map((q: any) => (
                <MenuItem value={q.questionText}>{q.questionText}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "nextQuestion",
      headerName: "Question suivante",
      width: 250,
      editable: true,
      valueGetter: (params) => {
        if (params.value && questions && questions.length > 0)
          return questions.filter((q: any) => q.id == params.value)[0]
            .questionText;
      },
      renderCell: (params) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [nextQuestion, setNextQuestion] = useState("");
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          if (nextQuestion || nextQuestion === "")
            setNextQuestion(params.value);
        }, []);

        return (
          <FormControl fullWidth>
            <Select
              labelId="nextQuestionLabel"
              id="nextQuestion"
              value={nextQuestion || params.value}
              label="Question suivante"
              style={{ fontFamily: "Tajawal" }}
              onChange={async (event) => {
                await dispatch(
                  editChoice({
                    ...ref.current.getRow(params.id),
                    nextQuestion: questions.filter(
                      (q: Question) => q.questionText === event.target.value
                    )[0].id,
                  })
                );
                await dispatch(getQuestions());
                setNextQuestion(event.target.value);
              }}
            >
              {questions &&
                questions.length > 0 &&
                questions.map((q: any) => (
                <MenuItem value={q.questionText}>{q.questionText}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "previousQuestion",
      headerName: "Question précedente",
      width: 250,
      editable: true,
      valueGetter: (params) => {
        if (params.value && questions && questions.length > 0)
          return questions.filter((q: any) => q.id == params.value)[0]
            .questionText;
      },
      renderCell: (params) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [previousQuestion, setPreviousQuestion] = useState("");
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          if (previousQuestion || previousQuestion === "")
            setPreviousQuestion(params.value);
        }, []);
        return (
          <FormControl fullWidth>
            <Select
              id="previousQuestion"
              value={previousQuestion || params.value}
              label="Question précedente"
              style={{ fontFamily: "Tajawal" }}
              onChange={async (event) => {
                await dispatch(
                  editChoice({
                    ...ref.current.getRow(params.id),
                    previousQuestion: questions.filter(
                      (q: Question) => q.questionText === event.target.value
                    )[0].id,
                  })
                );
                await dispatch(getQuestions());
                setPreviousQuestion(event.target.value);
              }}
            >
              {questions &&
                questions.length > 0 &&
                questions.map((q: any) => (
                  <MenuItem value={q.questionText}>{q.questionText}</MenuItem>
                ))}
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "response",
      headerName: "Réponse final",
      width: 150,
      editable: true,
    },
  ];

  useEffect(() => {
    async function getData() {
      dispatch(getQuestions());
      dispatch(getChoices());
    }
    getData();
  }, []);

  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };
  const handleAddChoice = () => {
    dispatch(addChoice());
  };
  const handleEditQuestion = () => {};
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <div style={{ height: 600, width: "70%", marginBottom: 30 }}>
        <Stack direction="row" spacing={1}>
          <Button
            style={{ marginBottom: 10 }}
            variant="contained"
            color="success"
            size="small"
            onClick={handleAddQuestion}
          >
            Ajouter une question
          </Button>
        </Stack>
        {questions && questions.length > 0 && (
          <DataGrid
            rows={questions}
            style={{ fontFamily: "Tajawal" }}
            columns={questionColumns}
            getRowId={(row) => row.id}
            processRowUpdate={async (newRow, oldRow) => {
              await dispatch(editQuestion(newRow));
              await dispatch(getQuestions());
            }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        )}
      </div>
      <div style={{ height: 600, width: "70%", marginTop: 50 }}>
        <Stack direction="row" spacing={1}>
          <Button
            style={{ marginBottom: 10 }}
            variant="contained"
            color="success"
            size="small"
            onClick={handleAddChoice}
          >
            Ajouter les choix
          </Button>
        </Stack>
        {choices && choices.length > 0 && (
          <DataGrid
            apiRef={ref}
            rows={choices}
            columns={choiceColumns}
            style={{ fontFamily: "Tajawal" }}
            getRowId={(row) => row.id}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
                color: "red",
              },
            }}
            processRowUpdate={async (newRow, oldRow) => {
              console.log(newRow);
              await dispatch(editChoice(newRow));
              await dispatch(getChoices());
            }}
          />
        )}
      </div>
    </div>
  );
}
