import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import coursesData from "data/Courses.json";
import Button from "components/base-components/Button";
import WeekSection from "components/course-components/WeekSection";
import { enrollCourseForCurrentUser } from "utils/course-handler";

const Lesson: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = coursesData.find((c) => c.course === courseId);

  const handleEnrollClick = () => {
      const message = enrollCourseForCurrentUser(course.course);
      alert(message);
    };

  if (!course) return <p className="p-6 text-red-500">Course not found</p>;

  return (
    <div className="flex flex-col h-screen overflow-none">
      <div className="sticky top-0 z-10 flex flex-col-reverse sm:flex-row justify-between gap-8 px-4 py-8 ">
        <h1 className="text-3xl font-bold">{course.course} - Lesson Plan</h1>
        <Button text="Start Learning" onClick={handleEnrollClick} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        {course.lessons.map((week) => (
          <WeekSection key={week.week} week={week.week} modules={week.modules} />
        ))}
      </div>
    </div>

  );
};

export default Lesson;
