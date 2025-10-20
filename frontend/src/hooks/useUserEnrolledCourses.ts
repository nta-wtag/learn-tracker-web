import { useEnrollmentData } from "hooks/useEnrollmentData";

export const useUserEnrolledCourses = () => {
  const { enrolledCourses, loading } = useEnrollmentData();
  return { enrolledCourses, loading };
};
