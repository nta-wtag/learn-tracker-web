
import { useCourseEnrollment } from "./useCourseEnrollment";
import type { Course } from "types/course-types";
import { useCourseInfo } from "hooks/useCourseInfo";

export const useCourse = (course: Course) => {
  const {
    variant,
    enroll,
    enrollment,
    isEnrolled,
    enrolledCourses,
    goToLessons,
  } = useCourseEnrollment(course);

  const courseInfo = useCourseInfo(course, enrollment);

  return {
    variant,
    enroll,
    enrollment,
    isEnrolled,
    enrolledCourses,
    goToLessons,
    courseInfo,
  };
};
