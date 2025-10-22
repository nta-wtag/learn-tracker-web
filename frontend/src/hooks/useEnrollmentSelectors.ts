import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector, RootState } from "redux-toolkit/store";

const selectEnrollment = (state: RootState) => state.enrollment;
const selectLesson = (state: RootState) => state.lesson;

export const selectEnrollmentData = createSelector(
  [selectEnrollment],
  (enrollment) => ({
    enrolledCourses: enrollment?.enrolledCourses || [],
    loading: enrollment?.loading || false,
    loaded: enrollment?.loaded || false,
  })
);

export const selectLessonData = createSelector(
  [selectLesson],
  (lesson) => ({
    completedLessons: lesson?.completedLessons || [],
  })
);

export const useEnrollmentSelectors = () => {
  return useAppSelector(selectEnrollmentData);
};

export const useLessonSelectors = () => {
  return useAppSelector(selectLessonData);
};

