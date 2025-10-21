import React from "react";
import { useParams } from "react-router-dom";
import coursesData from "data/Courses.json";
import LessonHeader from "components/protected-components/lesson-components/LessonHeader";
import LessonWeeks from "components/protected-components/lesson-components/LessonWeeks";

const Lessons: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = coursesData.find((c) => c.course === courseId);
  
  if (!course) {
    return <p className="p-6 text-red-500">Course not found</p>;
  }

  return (
    <div className="flex flex-col h-screen overflow-none z-0">
      <LessonHeader course={course} />
      <LessonWeeks course={course} weeks={course.lessons}/>
    </div>
  );
};

export default Lessons;
