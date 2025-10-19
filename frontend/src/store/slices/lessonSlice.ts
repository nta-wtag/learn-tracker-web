import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CompletedLesson } from "types/course-types";
import { getCompletedLessons, saveCompletedLessons } from "utils/lesson-storage";

interface LessonsState {
  completedLessons: CompletedLesson[];
}

const initialState: LessonsState = {
  completedLessons: getCompletedLessons(),
};

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    markLessonComplete: (state, action: PayloadAction<CompletedLesson>) => {
      const exists = state.completedLessons.find(
        (l) =>
          l.courseName === action.payload.courseName &&
          l.moduleTitle === action.payload.moduleTitle
      );
      if (!exists) {
        state.completedLessons.push(action.payload);
        saveCompletedLessons(state.completedLessons);
      }
    },
    unmarkLesson: (state, action: PayloadAction<CompletedLesson>) => {
      state.completedLessons = state.completedLessons.filter(
        (l) =>
          l.courseName !== action.payload.courseName ||
          l.moduleTitle !== action.payload.moduleTitle
      );
      saveCompletedLessons(state.completedLessons);
    },
  },
});

export const { markLessonComplete, unmarkLesson } = lessonsSlice.actions;
export default lessonsSlice.reducer;
