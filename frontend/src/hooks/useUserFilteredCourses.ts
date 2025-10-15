import { useMemo } from "react";
import type { Course } from "types/course-types";
import type { EnrolledCourse } from "types/auth-types";

export const useUserFilteredCourses = (
  allCourses: Course[],
  enrolledCourses: EnrolledCourse[]
) => {
  return useMemo(
    () =>
      allCourses.filter((course) =>
        enrolledCourses.some((c) => c.courseName === course.course)
      ),
    [allCourses, enrolledCourses]
  );
};
