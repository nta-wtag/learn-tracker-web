import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "store";
import { loadEnrollments } from "store/slices/enrollmentSlice";

export const useEnrollmentData = () => {
  const dispatch = useDispatch();

  const enrolledCourses = useSelector(
    (state: RootState) => state.enrollment.enrolledCourses
  );
  const completedLessons = useSelector(
    (state: RootState) => state.lesson.completedLessons
  );
  const loading = useSelector(
    (state: RootState) => state.enrollment.loading
  );

  useEffect(() => {
    dispatch(loadEnrollments());
  }, [dispatch]);

  return { enrolledCourses, completedLessons, loading };
};
