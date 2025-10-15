import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadEnrollments } from "store/slices/enrollmentSlice";
import { useEnrollmentData } from "./useEnrollmentData";

export const useUserEnrolledCourses = () => {
  const dispatch = useDispatch();
  const { enrolledCourses, loading } = useEnrollmentData();

  useEffect(() => {
    dispatch(loadEnrollments());
  }, [dispatch]);

  return { enrolledCourses, loading };
};
