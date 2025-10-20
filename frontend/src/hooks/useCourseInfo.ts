import { useMemo } from "react";
import type { RootState } from "redux-toolkit/store";
import type { Course } from "types/course-types";
import type { EnrolledCourse } from "types/auth-types";
import { calculateCourseStats, calculateDeadline, isDeadlineOver } from "utils/course-handler";
import { useAppSelector } from "redux-toolkit/store";

export const useCourseInfo = (course: Course, enrollment?: EnrolledCourse) => {
  const completedLessons = useAppSelector(
    (state: RootState) => state.lesson.completedLessons
  );

  return useMemo(() => {
    const { totalLessons, totalDays } = calculateCourseStats(course.lessons);

    const completedModules = completedLessons.filter(
      (l) => l.courseName === course.course
    ).length;

    const progressPercent = totalLessons ? (completedModules / totalLessons) * 100 : 0;

    if (!enrollment) return { completedModules, progressPercent, totalLessons, totalDays };

    const { deadline, daysLeft } = calculateDeadline(enrollment.enrolledAt, totalDays);

    return {
      completedModules,
      progressPercent,
      totalLessons,
      totalDays,
      deadline,
      daysLeft,
      isDeadlineOver: isDeadlineOver(deadline),
      enrolledAt: enrollment.enrolledAt,
    };
  }, [course, enrollment, completedLessons]);
};
