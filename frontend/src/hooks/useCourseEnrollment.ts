import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import type { RootState } from "store";
import type { Course } from "types/course-types";
import { enrollCourseThunk, loadEnrollmentsThunk } from "store/thunks/enrollmentThunk";
import { getCoursePath, getEnrollCoursePath } from "routes/paths";
import { useCourseContext } from "hooks/useCourseContext";
import { useAppDispatch, useAppSelector } from "store/hooks";

export const useCourseEnrollment = (course: Course) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const variant = useCourseContext();

  const enrolledCourses = useAppSelector(
    (state: RootState) => state.enrollment.enrolledCourses
  );

  const enrollment = useMemo(
    () => enrolledCourses.find((c) => c.courseName === course.course),
    [enrolledCourses, course.course]
  );

  const isEnrolled = !!enrollment;

  useEffect(() => {
    dispatch(loadEnrollmentsThunk());
  }, [dispatch]);

  const enroll = useCallback(async () => {
    if (isEnrolled) return { success: false, message: `Already enrolled in ${course.course}` };

    try {
      const result = await dispatch(enrollCourseThunk(course.course)).unwrap();
      
      return { success: true, message: `Successfully enrolled in ${course.course}`, enrollment: result };
    } catch (err: any) {
      return { success: false, message: err.message || "Enrollment failed" };
    }
  }, [dispatch, course.course, isEnrolled]);

  const goToLessons = useCallback(() => {
    const path =
      variant === "courses"
        ? getCoursePath(course.course)
        : getEnrollCoursePath(course.course);
    navigate(path, { state: { course } });
  }, [navigate, course, variant]);

  return { variant, enroll, enrollment, isEnrolled, enrolledCourses, goToLessons };
};
