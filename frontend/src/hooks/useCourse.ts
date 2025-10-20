import { useCourseEnrollment } from "./useCourseEnrollment";
import { useCourseInfo } from "hooks/useCourseInfo";
import type { Course } from "types/course-types";

export const useCourse = (course: Course) => {
  const courseEnrollment = useCourseEnrollment(course);
  const courseInfo = useCourseInfo(course, courseEnrollment.enrollment);

  return { ...courseEnrollment, courseInfo };
};
