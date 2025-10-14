import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import coursesData from 'data/Courses.json';
import { EnrolledCourse } from 'types/auth-types';
import { Course } from 'types/course-types';

interface CoursesState {
  availableCourses: Course[];
  enrolledCourses: EnrolledCourse[];
}

const initialState: CoursesState = {
  availableCourses: coursesData,
  enrolledCourses: [],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setAvailableCourses(state, action: PayloadAction<Course[]>) {
      state.availableCourses = action.payload;
    },
    enrollCourse(state, action: PayloadAction<string>) {
      const courseName = action.payload;
      const alreadyEnrolled = state.enrolledCourses.find(
        (c) => c.courseName === courseName
      );
      if (!alreadyEnrolled) {
        const enrollment: EnrolledCourse = {
          courseName,
          enrolledAt: new Date().toISOString(),
        };
        state.enrolledCourses.push(enrollment);
        localStorage.setItem('enrolledCourses', JSON.stringify(state.enrolledCourses));
      }
    },
    loadEnrolledCourses(state) {
      const stored = localStorage.getItem('enrolledCourses');
      if (stored) state.enrolledCourses = JSON.parse(stored);
    },
  },
});

export const { setAvailableCourses, enrollCourse, loadEnrolledCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
