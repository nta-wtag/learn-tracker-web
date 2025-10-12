import { useLocation } from "react-router-dom";
import type { CourseCardVariant } from "types/course-types";

export const useCourseCardVariant = (): CourseCardVariant => {
  const location = useLocation();
  
  if (location.pathname.includes("/courses")) {
    return "courses";
  }
  
  return "enroll";
};
