import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CompletedLesson } from "types/course-types";

interface LessonsState {
  completedLessons: CompletedLesson[];
}

const initialState: LessonsState = {
  completedLessons: JSON.parse(localStorage.getItem("completedLessons") || "[]"),
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
        const newEntry: CompletedLesson = {
          ...action.payload,
          completedAt: new Date().toISOString(),
        };
        state.completedLessons.push(newEntry);
        localStorage.setItem("completedLessons", JSON.stringify(state.completedLessons));
      }
    },
    unmarkLesson: (state, action: PayloadAction<CompletedLesson>) => {
      state.completedLessons = state.completedLessons.filter(
        (l) =>
          l.courseName !== action.payload.courseName ||
          l.moduleTitle !== action.payload.moduleTitle
      );
      localStorage.setItem(
        "completedLessons",
        JSON.stringify(state.completedLessons)
      );
    },
  },
});

export const { markLessonComplete, unmarkLesson } = lessonsSlice.actions;
export default lessonsSlice.reducer;
