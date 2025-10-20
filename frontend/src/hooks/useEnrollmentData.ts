import {  useAppSelector, RootState } from "redux-toolkit/store";

export const useEnrollmentData = () => {
  const { enrolledCourses } = useAppSelector((state: RootState) => state.enrollment);
  const completedLessons = useAppSelector((state: RootState) => state.lesson.completedLessons);
  const loading = useAppSelector((state: RootState) => state.enrollment.loading);

  return { enrolledCourses, completedLessons, loading };
};
