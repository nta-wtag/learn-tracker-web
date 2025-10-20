import { useEffect } from "react";
import type { RootState } from "store";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { loadEnrollmentsThunk } from "store/thunks/enrollmentThunk";

export const useEnrollmentData = () => {
  const dispatch = useAppDispatch();
  const { enrolledCourses } = useAppSelector((state: RootState) => state.enrollment);
  const completedLessons = useAppSelector((state: RootState) => state.lesson.completedLessons);
  const loading = useAppSelector((state: RootState) => state.enrollment.loading);

  useEffect(() => {
    dispatch(loadEnrollmentsThunk());
  }, [dispatch]);

  return { enrolledCourses, completedLessons, loading };
};
