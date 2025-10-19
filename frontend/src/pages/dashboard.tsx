import React from "react";
import coursesData from "data/courses.json";
import type { Course } from "types/course-types";
import { useUserEnrolledCourses } from "hooks/useUserEnrolledCourses";
import { useUserFilteredCourses } from "hooks/useUserFilteredCourses";
import { useDashboardStats } from "hooks/useDashboardStats";
import UserStats from "components/protected-components/dashboard-components/UserStats";
import ActiveCourses from "components/protected-components/dashboard-components/ActiveCourses";
import RecentlyEnrolled from "components/protected-components/dashboard-components/RecentlyEnrolled";
import CompletedCourses from "components/protected-components/dashboard-components/CompletedCourses";
import Spinner from "components/base-components/Spinner";

const Dashboard: React.FC = () => {
  const { enrolledCourses, loading } = useUserEnrolledCourses();

  const userCourses = useUserFilteredCourses(
    coursesData as Course[],
    enrolledCourses
  );

  const { courseInfos, stats } = useDashboardStats(
    userCourses,
    enrolledCourses
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-8">
      <UserStats
        progress={stats.totalProgress}
        enrolledCoursesCount={stats.enrolledCount}
        completedCoursesCount={stats.completedCount}
      />
      <ActiveCourses courseInfos={courseInfos} />
      <RecentlyEnrolled recentCourses={stats.recentCourses} />
      <CompletedCourses completedCourses={stats.completedCourses} />
    </div>
  );
};

export default Dashboard;
