import React from "react";
import coursesData from "data/Courses.json";
import { Outlet } from "react-router-dom";
import CourseGrid from "components/protected-components/course-components/CourseGrid";
import EmptyState from "components/base-components/EmptyState";
import PageHeader from "components/base-components/PageHeader";
import { useUserFilteredCourses } from "hooks/useUserFilteredCourses";
import { useAppSelector } from "redux-toolkit/store";

const Courses: React.FC = () => {
    const enrolledCourses = useAppSelector(state => state.enrollment.enrolledCourses);
    const loading = useAppSelector(state => state.enrollment.loading);
    
    const filteredCourses = useUserFilteredCourses(coursesData, enrolledCourses);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (filteredCourses.length === 0) {
    return (
      <div className="p-6">
        <PageHeader title="My Courses" subtitle="0 courses enrolled" />
        <EmptyState
          title="No courses yet"
          description="You are not enrolled in any courses yet."
          actionText="Browse Courses"
          actionLink="/enroll"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 py-4">
      <PageHeader
        title="My Courses"
        subtitle={`${filteredCourses.length} course${filteredCourses.length === 1 ? "" : "s"} enrolled`}
      />
      <CourseGrid courses={filteredCourses} />
      <Outlet />
    </div>
  );
};

export default Courses;
