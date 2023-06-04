import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import {
  getChoices,
  getQuestions,
  selectChoices,
  selectQuestions,
  addQuestion,
  editQuestion,
} from "./features/questionSlices";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store";

//nested data is ok, see accessorKeys in ColumnDef below

export default function AdminHome() {
  const questions = useSelector(selectQuestions);
  const choices = useSelector(selectChoices);
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = ()=>{

  }
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
      width: 150,
      editable: true,
      valueGetter: (params) => {
        return questions.filter((q: any) => q.id == params.value)[0]
          .questionText;
      },
      renderCell: (params) => {
        return (
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={params.value}
              label="Age"
            >
              {questions.map((q: any) => (
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
      width: 150,
      editable: true,
      valueGetter: (params) => {
        if (params.value)
          return questions.filter((q: any) => q.id == params.value)[0]
            .questionText;
      },
      renderCell: (params) => {
        return (
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={params.value}
              label="Age"
              onChange={handleChange}
            >
              {questions.map((q: any) => (
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
      width: 150,
      editable: true,
      valueGetter: (params) => {
        if (params.value)
          return questions.filter((q: any) => q.id == params.value)[0]
            .questionText;
      },
      renderCell: (params) => {
        return (
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={params.value}
              label="Age"
            >
              {questions.map((q: any) => (
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
      <div style={{ height: 300, width: "70%", marginBottom: 30 }}>
        <Stack direction="row" spacing={1}>
          <Button size="small" onClick={handleAddQuestion}>
            Ajouter une question
          </Button>
        </Stack>
        {questions && questions.length > 0 && (
          <DataGrid
            rows={questions}
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
      <div style={{ height: 400, width: "70%", marginTop: 50 }}>
        <Stack direction="row" spacing={1}>
          <Button size="small" onClick={() => {}}>
            Ajouter les choix
          </Button>
        </Stack>
        {choices && choices.length > 0 && (
          <DataGrid
            rows={choices}
            columns={choiceColumns}
            getRowId={(row) => row.id}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            processRowUpdate={async (newRow, oldRow) => {
             console.log(newRow)
            }}
          />
        )}
      </div>
    </div>
  );
}
