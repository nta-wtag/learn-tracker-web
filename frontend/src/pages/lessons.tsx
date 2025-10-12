import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { ROUTES } from "routes/paths";
import Button from "components/base-components/Button";
import WeekSection from "components/course-components/WeekSection";
import coursesData from "data/Courses.json";
import { Course } from "types/course-types";

const Lessons: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course || 
    (coursesData as Course[]).find((c) => c.course === courseId);

  if (!course) return <p className="p-6 text-red-500">Course not found</p>;

  const handleStartLearning = () => {
    toast.success(`Enrolled in  ${course.course}`)
    navigate(ROUTES.DASHBOARD.path);
  };

  return (
    <div className="flex flex-col h-screen overflow-none z-0">
      <div className="sticky top-0 z-10 flex flex-col-reverse sm:flex-row justify-between gap-8 px-4 py-8 ">
        <h1 className="text-3xl font-bold">{course.course} - Lesson Plan</h1>
        <Button text="Start Learning" onClick={handleStartLearning} />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        {course.lessons.map((week) => (
          <WeekSection key={week.week} week={week}  />
        ))}
      </div>
    </div>
  );
};

export default Lessons;
