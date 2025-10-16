import React, { useMemo } from "react";
import { useUserEnrolledCourses } from "hooks/useUserEnrolledCourses";
import { useUserFilteredCourses } from "hooks/useUserFilteredCourses";
import { useCourseInfo } from "hooks/useCourseInfo";
import coursesData from "data/Courses.json";
import type { Course } from "types/course-types";
import ActiveCourses from "components/protected-components/dashboard-components/ActiveCourses";
import RecentlyEnrolled from "components/protected-components/dashboard-components/RecentlyEnrolled";
import CompletedCourses from "components/protected-components/dashboard-components/CompletedCourses";
import UserStats from "components/protected-components/dashboard-components/UserStats";

const Dashboard: React.FC = () => {
  const { enrolledCourses, loading } = useUserEnrolledCourses();

  const userCourses = useUserFilteredCourses(
    coursesData as Course[],
    enrolledCourses
  );

  const courseInfos = userCourses.map((course) => {
    const enrollment = enrolledCourses.find(
        (e) => e.courseName === course.course
    );
    const info = useCourseInfo(course, enrollment);

    // calculate completedAt if progress is 100%
    let completedAt: string | undefined;
    if (info.progressPercent === 100 && enrollment?.enrolledAt) {
        const totalDays = course.lessons.reduce(
            (sum, lesson) => sum + lesson.modules.reduce((s, m) => s + m.estDays, 0),
            0
        );

        const enrolledDate = new Date(enrollment.enrolledAt);
        if (!isNaN(enrolledDate.getTime())) {
            const completionDate = new Date(enrolledDate);
            completionDate.setDate(completionDate.getDate() + totalDays);
            completedAt = completionDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        }
    }

    return { ...course, ...info, enrolledAt: enrollment?.enrolledAt, completedAt };
});


  const { totalProgress, completedCourses, recentCourses } = useMemo(() => {
    const completed = courseInfos.filter((c) => c.progressPercent === 100);
    const averageProgress =
      courseInfos.length > 0
        ? courseInfos.reduce((sum, c) => sum + c.progressPercent, 0) /
          courseInfos.length
        : 0;
    const recent = [...courseInfos].sort(
      (a, b) =>
        new Date(b.enrolledAt || "").getTime() -
        new Date(a.enrolledAt || "").getTime()
    );
    return {
      totalProgress: averageProgress,
      completedCourses: completed,
      recentCourses: recent,
    };
  }, [courseInfos]);

  if (loading) return <div>Loading your dashboard...</div>;

  return (
    <div className="space-y-8">
      <UserStats
        progress={`${totalProgress.toFixed(0)}%`}
        enrolledCourses={userCourses.length}
        completedCourses={completedCourses.length}
      />
      <ActiveCourses courseInfos={courseInfos} />
      <RecentlyEnrolled recentCourses={recentCourses} />
      <CompletedCourses completedCourses={completedCourses} />
    </div>
  );
};

export default Dashboard;
