import { useMemo } from "react";
import type { Course } from "types/course-types";
import type { EnrolledCourse } from "types/auth-types";
import { useSelector } from "react-redux";
import { RootState } from "redux-toolkit/store";
import { calculateCourseStats, calculateDeadline, isDeadlineOver } from "utils/course-handler";

export const useDashboardStats = (
  userCourses: Course[],
  enrolledCourses: EnrolledCourse[]
) => {
  const completedLessons = useSelector(
    (state: RootState) => state.lesson.completedLessons
  );

  return useMemo(() => {
    const courseInfos = userCourses.map((course) => {
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

      let info = {
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

        info = {
          ...info,
          deadline,
          daysLeft,
          isDeadlineOver: isDeadlineOver(deadline),
          enrolledAt: enrollment.enrolledAt,
          completedAt: enrollment.completedAt,
        };
      }

      return { ...course, ...info };
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
