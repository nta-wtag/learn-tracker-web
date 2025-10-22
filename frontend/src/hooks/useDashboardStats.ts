import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "redux-toolkit/store";
import type { BaseCourseInfo, Course, DashboardStats, EnrichedCourse, EnrolledCourseInfo } from "types/course-types";
import type { EnrolledCourse } from "types/auth-types";
import {
  calculateCourseStats,
  calculateDeadline,
  isDeadlineOver,
} from "utils/course-handler";


interface UseDashboardStatsReturn {
  courseInfos: EnrichedCourse[];
  stats: DashboardStats;
}

export const useDashboardStats = (
  userCourses: Course[],
  enrolledCourses: EnrolledCourse[]
): UseDashboardStatsReturn => {
  const completedLessons = useSelector(
    (state: RootState) => state.lesson.completedLessons
  );

  return useMemo(() => {
    const courseInfos: EnrichedCourse[] = userCourses.map((course) => {
      const enrollment = enrolledCourses.find(
        (e) => e.courseName === course.course
      );

      const { totalLessons, totalDays } = calculateCourseStats(course.lessons);

      const completedModules = completedLessons.filter(
        (l) => l.courseName === course.course
      ).length;

      const progressPercent = totalLessons
        ? (completedModules / totalLessons) * 100
        : 0;

      const baseInfo: BaseCourseInfo = {
        completedModules,
        progressPercent,
        totalLessons,
        totalDays,
      };

      if (enrollment) {
        const { deadline, daysLeft } = calculateDeadline(
          enrollment.enrolledAt,
          totalDays
        );

        const enrolledInfo: EnrolledCourseInfo = {
          ...baseInfo,
          deadline,
          daysLeft,
          isDeadlineOver: isDeadlineOver(deadline),
          enrolledAt: enrollment.enrolledAt,
          completedAt: enrollment.completedAt,
        };

        return { ...course, ...enrolledInfo };
      }

      return { ...course, ...baseInfo };
    });

    const totalCourses = courseInfos.length;
    const totalProgress =
      totalCourses > 0
        ? `${(
          courseInfos.reduce((sum, c) => sum + c.progressPercent, 0) /
          totalCourses
        ).toFixed(0)}%`
        : "0%";

    const completedCourses = courseInfos.filter(
      (c) => c.progressPercent === 100
    );

    const recentCourses = [...courseInfos].sort(
      (a, b) =>
        new Date(b.enrolledAt || "").getTime() -
        new Date(a.enrolledAt || "").getTime()
    );

    return {
      courseInfos,
      stats: {
        totalProgress,
        enrolledCount: totalCourses,
        completedCount: completedCourses.length,
        completedCourses,
        recentCourses,
      },
    };
  }, [userCourses, enrolledCourses, completedLessons]);
};
