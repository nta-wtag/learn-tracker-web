import React from "react";
import coursesData from "data/Courses.json";
import CourseGrid from "components/course-components/CourseGrid";

const EnrollCourse: React.FC = () => {
  return (
    <div className="p-6 gap-8 flex flex-col">
      <h1 className="text-2xl font-bold">Available Courses</h1>
      <CourseGrid courses={coursesData} />
    </div>
  );
};

export default EnrollCourse;
