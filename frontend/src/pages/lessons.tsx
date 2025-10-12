import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import coursesData from "data/Courses.json";
import Button from "components/base-components/Button";
import WeekSection from "components/course-components/WeekSection";
import { enrollCourseForCurrentUser, type Lesson } from "utils/course-handler";
import { Course } from "types/course-types";
import { ROUTES } from "routes/paths";

const Lessons: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const course = location.state?.course || 
    (coursesData as Course[]).find((c) => c.course === courseId);

  const handleEnrollClick = () => {
    const message = enrollCourseForCurrentUser(course.course);
    toast.success(`Enrolled in  ${course.course}`);
  }

  if (!course) return <p className="p-6 text-red-500">Course not found</p>;

  const handleStartLearning = () => {
    navigate(ROUTES.DASHBOARD.path);
  };

  if (!course) return <p className="p-6 text-red-500">Course not found</p>;

  return (
    <div className="flex flex-col h-screen overflow-none z-0">
      <div className="sticky top-0 z-10 flex flex-col-reverse sm:flex-row justify-between gap-8 px-4 py-8 ">
        <h1 className="text-3xl font-bold">{course.course} - Lesson Plan</h1>
        <Button text="Start Learning" onClick={handleEnrollClick} />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        {course.lessons.map((week: Week) => (
          <WeekSection key={week.week} week={week}  />
        ))}
      </div>
    </div>
  );
};

export default Lessons;
