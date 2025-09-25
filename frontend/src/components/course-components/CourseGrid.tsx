import React from "react";
import CourseCard, { Course } from "components/course-components/CourseCard";

interface Props {
  courses: Course[];
}

const CourseGrid: React.FC<Props> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.course} course={course} />
      ))}
    </div>
  );
};

export default CourseGrid;
