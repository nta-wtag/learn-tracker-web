import React from "react";
import CourseCard, { type Course } from "components/course-components/CourseCard";

const CourseGrid: React.FC<Course> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course: Course) => (
        <CourseCard key={course.course} course={course} />
      ))}
    </div>
  );
};

export default CourseGrid;
