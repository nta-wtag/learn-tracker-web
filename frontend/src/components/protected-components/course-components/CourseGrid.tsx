import React from "react";
import { Course } from "types/course-types";
import CourseStats from "components/protected-components/course-components/CourseStats";
import CourseActions from "components/protected-components/course-components/CourseActions";

interface CourseGridProps {
  courses: Course[];
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course) => (
        <div className="bg-white p-6 flex flex-col gap-8 shadow-lg rounded-lg" key={course.course}>
          <CourseStats course={course} />
          <CourseActions course={course} />
        </div>
      ))}
    </div>
  );
};

export default CourseGrid;
