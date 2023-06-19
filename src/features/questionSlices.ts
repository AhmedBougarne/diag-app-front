import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Question } from "../types/Question";
import axiosApiInstance from "../interceptors/axios";
import { APP_BASE_URL } from "../constants";
import { Choice } from "../types/Choice";

export interface QuestionState {
  questions: Question[];
  choices: Choice[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: QuestionState = {
  questions: [],
  isLoading: false,
  hasError: false,
  choices: [],
};

export const getQuestions = createAsyncThunk(
  "question/getQuestions",
  async () => {
    try {
      const { data: questionsResponse } = await axiosApiInstance.get(
        `${APP_BASE_URL}/questions`
      );
      return questionsResponse;
    } catch (error) {
      console.error(error);
    }
  }
);
export const getChoices = createAsyncThunk("question/getChoices", async () => {
  try {
    const { data: choicesResponse } = await axiosApiInstance.get(
      `${APP_BASE_URL}/choices`
    );
    return choicesResponse;
  } catch (error) {
    console.error(error);
  }
});
export const editQuestion = createAsyncThunk(
  "question/editQuestion",
  async (payload: any) => {
    try {
      const { data: question } = await axiosApiInstance.post(
        `${APP_BASE_URL}/questions/edit/${payload.id}`,
        {
          questionText: payload.questionText,
          questionTitle: payload.questionTitle,
        }
      );
      return question;
    } catch (error) {
      console.error(error);
    }
  }
);
export const editChoice = createAsyncThunk(
  "question/editChoice",
  async (payload: any) => {
    try {
      const { data: choice } = await axiosApiInstance.post(
        `${APP_BASE_URL}/choices/edit/${payload.id}`,
        {
          ...payload,
        }
      );
      return choice;
    } catch (error) {
      console.error(error);
    }
  }
);
export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion: (state) => {
      state.questions.push({
        id: state.questions.length + 1,
        questionText: "",
        questionTitle: "",
      });
    },
    addChoice: (state) => {
      state.choices.push({
        id: state.choices.length + 1,
        nextQuestion: 1,
        previousQuestion: 1,
        questionId: 1,
        value: "",
        response: "",
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(getChoices.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getChoices.fulfilled, (state, action) => {
        state.choices = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getChoices.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(editQuestion.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(editQuestion.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.hasError = false;
        }
      })
      .addCase(editQuestion.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      })
      .addCase(editChoice.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(editChoice.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoading = false;
          state.hasError = false;
        }
      })
      .addCase(editChoice.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const selectQuestions = (state: any) => state.question.questions;
export const selectChoices = (state: any) => state.question.choices;
export const selectErrors = (state: any) => state.question.errors;

export const { addQuestion, addChoice } = questionSlice.actions;
export default questionSlice.reducer;
