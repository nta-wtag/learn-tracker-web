import React from "react";
import CourseCard from "components/course-components/course-card-components/CourseCard";
import type { Course } from "utils/course-handler";

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
