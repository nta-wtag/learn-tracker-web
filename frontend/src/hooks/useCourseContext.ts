import { useLocation } from "react-router-dom";
import type { CourseCardVariant } from "types/course-types";

export const useCourseContext = (): CourseCardVariant => {
  const location = useLocation();

  return location.pathname.includes("/courses") ? "courses" : "enroll";
};
