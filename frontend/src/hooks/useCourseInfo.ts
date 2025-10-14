import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/index";
import { EnrolledCourse } from "types/auth-types";
import type { Course } from "types/course-types";
import { calculateCourseProgress, calculateDeadline, isDeadlineOver } from "utils/course-handler";

interface EnrolledCourseData {
  courseName: string;
  totalLessons: number;
  totalDays: number;
  deadline?: string;
  isDeadlineOver?: boolean;
  enrolledAt?: string;
  completedModules?: number;
  progressPercent?: number;
  daysLeft?: number;
}

export const useCourseInfo = (
  course: Course,
  enrollment: EnrolledCourse | undefined
): EnrolledCourseData => {
  // Get completed lessons from Redux
  const completedLessons = useSelector(
    (state: RootState) => state.lesson.completedLessons
  );

  return useMemo(() => {
    const { totalLessons, completedModules, progressPercent, totalDays,  } = calculateCourseProgress(course, completedLessons);
    

    if (enrollment) {
      const {deadline, daysLeft} = calculateDeadline(enrollment.enrolledAt, totalDays);

      return {
        courseName: course.course,
        daysLeft,
        totalLessons,
        totalDays,
        deadline,
        isDeadlineOver: isDeadlineOver(deadline),
        enrolledAt: enrollment.enrolledAt,
        completedModules: completedModules,
        progressPercent: progressPercent,
      };
    }

    return {
      courseName: course.course,
      totalLessons,
      totalDays,
      completedModules: completedModules,
      progressPercent: progressPercent,
    };
  }, [course, enrollment, completedLessons]); // Add completedLessons to deps!
};
