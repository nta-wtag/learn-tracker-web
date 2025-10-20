import { createSlice } from "@reduxjs/toolkit";
import { enrollCourseThunk, unenrollCourseThunk, loadEnrollmentsThunk, completeCourseThunk } from "store/thunks/enrollmentThunk";
import type { EnrolledCourse } from "types/auth-types";

interface EnrollmentState {
  enrolledCourses: EnrolledCourse[];
  loading: boolean;
  error: string | null;
}

const initialState: EnrollmentState = {
  enrolledCourses: [],
  loading: false,
  error: null,
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Load Enrollments
      .addCase(loadEnrollmentsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadEnrollmentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.enrolledCourses = action.payload || [];
      })
      .addCase(loadEnrollmentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load enrollments";
      })

      // ✅ Enroll Course
      .addCase(enrollCourseThunk.fulfilled, (state, action) => {
        state.enrolledCourses.push(action.payload);
      })

      // ✅ Unenroll Course
      .addCase(unenrollCourseThunk.fulfilled, (state, action) => {
        state.enrolledCourses = state.enrolledCourses.filter(
          (c) => c.courseName !== action.payload
        );
      })

      // ✅ Complete Course
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
