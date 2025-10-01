import React from "react";
import coursesData from "data/Courses.json";
import CourseGrid from "components/course-components/CourseGrid";
import { Outlet } from "react-router-dom";

const EnrollCourse: React.FC = () => {
  return (
    <div className="pt-8 gap-8 flex flex-col">
      <h1 className="text-2xl font-bold">Available Courses</h1>
      <CourseGrid courses={coursesData} context="enroll" />
      <Outlet/>
    </div>
  );
};

export default EnrollCourse;
