import React from "react";
import { Course, Week } from "types/course-types";
import WeekSection from "components/protected-components/lesson-components/WeekSection";

interface LessonWeeksProps {
  weeks: Week[];
  course: Course
}

const LessonWeeks: React.FC<LessonWeeksProps> = ({ weeks, course }) => (
  <div className="flex-1 overflow-y-auto p-6 space-y-8">
    {weeks.map((week) => (
      <WeekSection key={week.week} week={week} course={course}/>
    ))}
  </div>
);

export default LessonWeeks;
