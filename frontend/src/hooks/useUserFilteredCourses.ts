import { useMemo } from "react";
import { EnrolledCourse } from "types/auth-types";
import { Course } from "types/course-types";

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
