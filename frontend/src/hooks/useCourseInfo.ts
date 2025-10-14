import { useMemo } from "react";
import { EnrolledCourse } from "types/auth-types";
import type { Course } from "types/course-types";
import { calculateCourseStats, calculateDeadline, isDeadlineOver } from "utils/course-handler";

interface EnrolledCourseData {
  totalLessons: number;
  totalDays: number;
  deadline?: string;
  isDeadlineOver?: boolean;
  enrolledAt?: string;
}

export const useCourseInfo = (
  course: Course,
  enrollment: EnrolledCourse | undefined
): EnrolledCourseData | null => {
  return useMemo(() => {
    const { totalLessons, totalDays } = calculateCourseStats(course.lessons);

    if (enrollment) {
      const deadline = calculateDeadline(enrollment.enrolledAt, totalDays);

      return {
        totalLessons,
        totalDays,
        deadline,
        isDeadlineOver: isDeadlineOver(deadline),
        enrolledAt: enrollment.enrolledAt,
      };
    }

    return { 
      totalLessons, totalDays 
    }
  }, [course.lessons, enrollment]);
};
