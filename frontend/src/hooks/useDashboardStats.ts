import { useMemo } from "react";
import { useCourseInfo } from "./useCourseInfo";
import type { Course } from "types/course-types";
import type { EnrolledCourse } from "types/auth-types";

export const useDashboardStats = (
  userCourses: Course[],
  enrolledCourses: EnrolledCourse[]
) => {
  const courseInfos = userCourses.map((course) => {
    const enrollment = enrolledCourses.find(
      (e) => e.courseName === course.course
    );

    const info = useCourseInfo(course, enrollment);

    let completedAt: string | undefined;
    if (info.progressPercent === 100 && enrollment?.enrolledAt) {
      const completedDate = new Date();
      completedAt = completedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    return { ...course, ...info, completedAt };
  });

  const stats = useMemo(() => {
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
      totalProgress,
      enrolledCount: totalCourses,
      completedCount: completedCourses.length,
      completedCourses,
      recentCourses,
    };
  }, [courseInfos]);

  return { courseInfos, stats };
};
