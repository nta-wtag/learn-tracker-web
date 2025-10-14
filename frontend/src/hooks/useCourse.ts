
import { useCourseEnrollment } from "./useCourseEnrollment";
import type { Course } from "types/course-types";
import { useCourseData } from "hooks/useCourseData";

export const useCourse = (course: Course) => {
  const {
    variant,
    enroll,
    enrollment,
    isEnrolled,
    enrolledCourses,
    goToLessons,
  } = useCourseEnrollment(course);

  const courseInfo = useCourseData(course, enrollment);

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
