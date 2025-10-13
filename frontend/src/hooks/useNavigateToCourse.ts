import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import type { Course } from "types/course-types";
import { getCoursePath, getEnrollCoursePath } from "routes/paths";
import { useCourseContext } from "hooks/useCourseContext";

export const useNavigateToCourse = (course: Course) => {
  const navigate = useNavigate();
  const variant = useCourseContext();

  const goToLessons = useCallback(() => {
    const path = variant === 'courses' 
      ? getCoursePath(course.course) 
      : getEnrollCoursePath(course.course);
    
    navigate(path, { state: { course } });
  }, [navigate, course, variant]);

  return { goToLessons };
};
