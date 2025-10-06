import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import coursesData from "data/Courses.json";
import Button from "components/base-components/Button";
import WeekSection from "components/course-components/WeekSection";
import { enrollCourseForCurrentUser, type Lesson } from "utils/course-handler";
import { useCardContext } from "hooks/useCardContext";
import type { RootState } from "store";
import { calculateCourseProgress } from "utils/course-handler";
import ProgressBar from "components/base-components/ProgressBar";

const Lessons: React.FC = () => {
  const context = useCardContext();
  const { courseId } = useParams<{ courseId: string }>();
  const course = coursesData.find((c) => c.course === courseId);

  const completedLessons = useSelector(
    (state: RootState) => state.lesson.completedLessons
  );

  if (!course) return <p className="p-6 text-red-500">Course not found</p>;

  const handleEnrollClick = () => {
    const message = enrollCourseForCurrentUser(course.course);
    alert(message);
  };

  const { progressPercent, completedModules, totalModules } = calculateCourseProgress(course, completedLessons);

  return (
    <div className="flex flex-col h-screen overflow-none bg-white shadow-lg rounded-lg p-4">
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-8 px-4 py-8 ">
        <h1 className="text-3xl font-bold">{course.course} - Lesson Plan</h1>
        {context === "enroll" && (
          <Button text="Start Learning" onClick={handleEnrollClick} />
        )}
      </div>

      {context === "courses" && (
          <div className="px-4 mb-8">
            <ProgressBar progressPercent={progressPercent} completedModules={completedModules} totalModules={totalModules} />
          </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-8">
        {course.lessons.map((lesson: Lesson) => (
          <WeekSection
            key={lesson.week}
            week={lesson.week}
            modules={lesson.modules}
            courseName={course.course}
          />
        ))}
      </div>
    </div>
  );
};

export default Lessons;
