import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import type { Course } from "types/course-types";
import { getEnrollCoursePath } from "routes/paths";

export const useCourseNavigation = (course: Course) => {
  const navigate = useNavigate();

  const goToLessons = useCallback(() => {
    navigate(getEnrollCoursePath(course.course), { state: { course } });
  }, [navigate, course]);

  return { goToLessons };
};
