import { useState, useEffect } from "react";
import { EnrolledCourse } from "types/auth-types";
import { getEnrolledCourses } from "utils/course-handler";

export const useEnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const courses = getEnrolledCourses();
    setEnrolledCourses(courses);
    setLoading(false);
  }, []);

  const refresh = () => {
    const courses = getEnrolledCourses();
    setEnrolledCourses(courses);
  };

  return { enrolledCourses, loading, refresh };
};
