import { useCourseEnrollment } from "hooks/useCourseEnrollment";
import type { Course } from "types/course-types";
import { useCourseProgress } from "hooks/useCourseProgress";

export const useCourse = (course: Course) => {
  const courseEnrollment = useCourseEnrollment(course);
  const courseInfo = useCourseProgress(course, courseEnrollment.enrollment);

  return { ...courseEnrollment, courseInfo };
};
