import React from "react";
import { useParams, useLocation } from "react-router-dom";
import coursesData from "data/Courses.json";
import LessonSection from "components/lesson-components/LessonSection";

const Lessons: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = coursesData.find((c) => c.course === courseId);
  
  if (!course) return <p className="p-6 text-red-500">Course not found</p>;
  return (
    <LessonSection course = {course}/>
  );
};

export default Lessons;
