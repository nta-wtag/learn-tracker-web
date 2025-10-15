import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "store";
import { enrollCourse, loadEnrollments } from "store/slices/enrollmentSlice";
import { getCoursePath, getEnrollCoursePath } from "routes/paths";
import type { Course } from "types/course-types";
import { useCourseContext } from "hooks/useCourseContext";

export const useCourseEnrollment = (course: Course) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const variant = useCourseContext();

  const enrolledCourses = useSelector(
    (state: RootState) => state.enrollment.enrolledCourses
  );
  const enrollment = enrolledCourses.find((c) => c.courseName === course.course);
  const isEnrolled = !!enrollment;

  useEffect(() => {
    dispatch(loadEnrollments());
  }, [dispatch]);

  const enroll = useCallback(() => {
    if (isEnrolled) {
      return {
        success: false,
        message: `Already enrolled in ${course.course}`,
      };
    }
    dispatch(enrollCourse(course.course));
    return {
      success: true,
      message: `Successfully enrolled in ${course.course}!`,
    };
  }, [dispatch, course, isEnrolled]);

  const goToLessons = useCallback(() => {
    const path =
      variant === "courses"
        ? getCoursePath(course.course)
        : getEnrollCoursePath(course.course);
    navigate(path, { state: { course } });
  }, [navigate, course, variant]);

  return { variant, enroll, enrollment, isEnrolled, enrolledCourses, goToLessons };
};
