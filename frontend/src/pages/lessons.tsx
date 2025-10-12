import React from "react";
import { useLocation, useParams } from "react-router-dom";
import type { Course } from "types/course-types";
import coursesData from "data/Courses.json";
import LessonHeader from "components/protected-components/lesson-components/LessonHeader";
import LessonWeek from "components/protected-components/lesson-components/LessonWeeks";

const Lessons: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();

  const course =
    location.state?.course ||
    (coursesData as Course[]).find((c) => c.course === courseId);

  if (!course) {
    return <p className="p-6 text-red-500">Course not found</p>;
  }

  return (
    <div className="flex flex-col h-screen bg-white rounded-lg shadow">
      <LessonHeader course={course} />
      <LessonWeek weeks={course.lessons} />
    </div>
  );
};

export default Lessons;
