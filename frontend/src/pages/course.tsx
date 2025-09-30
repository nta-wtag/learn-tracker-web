import React from "react";
import coursesData from "data/Courses.json";
import type { Course } from "components/course-components/CourseCard";
import CourseGrid from "components/course-components/CourseGrid";
import { getEnrolledCourses } from "utils/course-storage";

const Course: React.FC = () => {
  const enrolledCourses = getEnrolledCourses();

  const enrolledCourseNames = enrolledCourses.map(c => c.courseName);

  const coursesToShow: Course[] = coursesData.filter(course =>
    enrolledCourseNames.includes(course.course)
  );

  if (coursesToShow.length === 0) {
    return <p className="p-6 text-gray-500">You are not enrolled in any courses yet.</p>;
  }

  return (
    <div className="p-6 gap-8 flex flex-col">
      <h1 className="text-2xl font-bold">My Courses</h1>
      <CourseGrid courses={coursesToShow} context="courses"/>
    </div>
  );
};

export default Course;
