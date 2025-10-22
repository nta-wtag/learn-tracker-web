import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadLessonsThunk, markLessonCompleteThunk, unmarkLessonThunk } from "redux-toolkit/thunks/lessonThunk";
import { CompletedLesson } from "types/course-types";
import { getCompletedLessons } from "utils/lesson-storage";

interface LessonsState {
  completedLessons: CompletedLesson[];
  loading: boolean;
  loaded: boolean;
}

const initialState: LessonsState = {
  completedLessons: getCompletedLessons(),
  loading: false,
  loaded: false
};

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLessonsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadLessonsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.completedLessons = action.payload || [];
      })
      .addCase(loadLessonsThunk.rejected, (state, action) => {
        state.loading = false;
        state.loaded = true;
      })

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
