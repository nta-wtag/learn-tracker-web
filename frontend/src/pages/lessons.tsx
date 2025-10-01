import React from "react";
import { useParams } from "react-router-dom";
import coursesData from "data/Courses.json";
import Button from "components/base-components/Button";
import WeekSection from "components/course-components/WeekSection";
import { enrollCourseForCurrentUser, type Lesson } from "utils/course-handler";

const Lessons: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = coursesData.find((c) => c.course === courseId);

  const handleEnrollClick = () => {
    const message = enrollCourseForCurrentUser(course.course);
    alert(message);
  };

  if (!course) return <p className="p-6 text-red-500">Course not found</p>;

  return (
    <div className="flex flex-col h-screen overflow-none bg-white shadow-lg rounded-lg p-4">
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-8 px-4 py-8 ">
        <h1 className="text-3xl font-bold">{course.course} - Lesson Plan</h1>
        <Button text="Start Learning" onClick={handleEnrollClick} />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        {course.lessons.map((lesson: Lesson) => (
          <WeekSection
            key={lesson.week}
            week={lesson.week}
            modules={lesson.modules}
          />
        ))}
      </div>
    </div>
  );
};

export default Lessons;
