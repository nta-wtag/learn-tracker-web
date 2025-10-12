import React from "react";
import CourseCard from "components/course-components/CourseCard";
import { Course } from "types/course-types";

interface CourseGridProps {
  courses: Course[];
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.course} course={course} />
      ))}
    </div>
  );
};

export default CourseGrid;
