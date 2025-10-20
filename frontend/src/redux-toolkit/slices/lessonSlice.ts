import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { markLessonCompleteThunk, unmarkLessonThunk } from "redux-toolkit/thunks/lessonThunk";
import { CompletedLesson } from "types/course-types";
import { getCompletedLessons } from "utils/lesson-storage";

interface LessonsState {
  completedLessons: CompletedLesson[];
}

const initialState: LessonsState = {
  completedLessons: getCompletedLessons(),
};

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(markLessonCompleteThunk.fulfilled, (state, action: PayloadAction<CompletedLesson>) => {
        const exists = state.completedLessons.find(
          (l) =>
            l.courseName === action.payload.courseName &&
            l.moduleTitle === action.payload.moduleTitle
        );
        if (!exists) {
          state.completedLessons.push(action.payload);
        }
      })
      .addCase(unmarkLessonThunk.fulfilled, (state, action: PayloadAction<CompletedLesson>) => {
        state.completedLessons = state.completedLessons.filter(
          (l) =>
            l.courseName !== action.payload.courseName ||
            l.moduleTitle !== action.payload.moduleTitle
        );
      });
  },
});

export default lessonsSlice.reducer;
