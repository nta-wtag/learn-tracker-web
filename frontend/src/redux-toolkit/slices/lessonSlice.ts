import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CompletedLesson {
  courseName: string;
  moduleTitle: string;
}

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
    },
    unmarkLesson: (state, action: PayloadAction<CompletedLesson>) => {
    },
  },
});

export const { markLessonComplete, unmarkLesson } = lessonsSlice.actions;
export default lessonsSlice.reducer;
