import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Course } from 'utils/course-storage';

interface CoursesState {
  enrolledCourses: Course[];
  availableCourses: Course[];
}

const initialState: CoursesState = {
  enrolledCourses: [],
  availableCourses: [],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setEnrolledCourses: (state, action: PayloadAction<Course[]>) => {
      state.enrolledCourses = action.payload;
    },
    setAvailableCourses: (state, action: PayloadAction<Course[]>) => {
      state.availableCourses = action.payload;
    },
  },
});

export const { setEnrolledCourses, setAvailableCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
