import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import type { Course, Week } from "types/course-types";
import { ROUTES } from "routes/paths";
import { enrollCourseForCurrentUser } from "utils/course-handler";
import Button from "components/base-components/Button";
import WeekSection from "components/course-components/WeekSection";
import coursesData from "data/Courses.json";

const Lessons: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const course =
    location.state?.course ||
    (coursesData as Course[]).find((c) => c.course === courseId);

  if (!course) {
    return <p className="p-6 text-red-500">Course not found</p>;
  }

  const handleEnroll = () => {
    const message = enrollCourseForCurrentUser(course.course);

    if (message.includes("Successfully")) {
      toast.success(message);
      navigate(ROUTES.DASHBOARD.path);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white rounded-lg shadow">
      <div className="sticky top-0 z-10 flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4 px-4 py-6">
        <h1 className="text-3xl font-bold">{course.course} - Lesson Plan</h1>
        <Button text="Start Learning" onClick={handleEnroll} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        {course.lessons.map((week: Week) => (
          <WeekSection key={week.week} week={week} />
        ))}
      </div>
    </div>
  );
};

export default Lessons;
