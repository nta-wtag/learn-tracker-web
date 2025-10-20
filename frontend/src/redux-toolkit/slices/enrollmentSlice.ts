import { createSlice } from "@reduxjs/toolkit";
import { enrollCourseThunk, unenrollCourseThunk, loadEnrollmentsThunk, completeCourseThunk } from "redux-toolkit/thunks/enrollmentThunk";
import type { EnrolledCourse } from "types/auth-types";

interface EnrollmentState {
  enrolledCourses: EnrolledCourse[];
  loading: boolean;
  loaded: boolean; 
  error: string | null;
}

const initialState: EnrollmentState = {
  enrolledCourses: [],
  loading: false,
  loaded: false,
  error: null,
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    resetEnrollments: (state) => {
      state.loaded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadEnrollmentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadEnrollmentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.enrolledCourses = action.payload || [];
      })
      .addCase(loadEnrollmentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.error = action.error.message || "Failed to load enrollments";
      })

      .addCase(enrollCourseThunk.fulfilled, (state, action) => {
        state.enrolledCourses.push(action.payload);
      })

      .addCase(unenrollCourseThunk.fulfilled, (state, action) => {
        state.enrolledCourses = state.enrolledCourses.filter(
          (c) => c.courseName !== action.payload
        );
      })

      .addCase(completeCourseThunk.fulfilled, (state, action) => {
        const updatedCourse = action.payload;
        const existing = state.enrolledCourses.find(
          (c) => c.courseName === updatedCourse.courseName
        );
        if (existing) existing.completedAt = updatedCourse.completedAt;
      });
  },
});

export default enrollmentSlice.reducer;
