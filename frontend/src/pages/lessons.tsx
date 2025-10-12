import React from "react";
import { useParams, useLocation } from "react-router-dom";
import coursesData from "data/Courses.json";
import { Course } from "types/course-types";
import LessonWeeks from "components/protected-components/lesson-components/LessonWeeks";
import LessonHeader from "components/protected-components/lesson-components/LessonHeader";

const Lessons: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();
  const course = location.state?.course || 
    (coursesData as Course[]).find((c) => c.course === courseId);

  if (!course) return <p className="p-6 text-red-500">Course not found</p>;

  return (
    <div className="flex flex-col h-screen overflow-none z-0">
      <LessonHeader course={course} />
      <LessonWeeks weeks={course.lessons} />
    </div>
  );
};

export default Lessons;
