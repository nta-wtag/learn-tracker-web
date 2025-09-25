import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import coursesData from "data/Courses.json";
import Button from "components/base-components/Button";
import WeekSection from "components/course-components/WeekSection";

const LessonPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = coursesData.find((c) => c.course === courseId);

  if (!course) return <p className="p-6 text-red-500">Course not found</p>;

  const handleStartLearning = () => {
    const enrolledCourses = JSON.parse(
      localStorage.getItem("enrolledCourses") || "[]"
    );
    if (!enrolledCourses.includes(course.course)) {
      enrolledCourses.push(course.course);
      localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
    }
    navigate("/dashboard");
  };

  return (
    <div className="p-4 sm:p-16 flex flex-col gap-16">
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-8">
        <h1 className="text-3xl font-bold">{course.course} - Lesson Plan</h1>
        <Button text="Start Learning" onClick={handleStartLearning} />
      </div>
      {course.lessons.map((week) => (
        <WeekSection key={week.week} week={week.week} modules={week.modules} />
      ))}
    </div>
  );
};

export default LessonPage;
