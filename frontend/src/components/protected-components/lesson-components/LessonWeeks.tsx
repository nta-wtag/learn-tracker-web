import React from "react";
import { Week } from "types/course-types";
import WeekSection from "components/protected-components/lesson-components/WeekSection";

interface LessonWeeksProps {
  weeks: Week[];
  courseName: string;
}

const LessonWeeks: React.FC<LessonWeeksProps> = ({ weeks, courseName }) => (
  <div className="flex-1 overflow-y-auto p-6 space-y-8">
    {weeks.map((week) => (
      <WeekSection key={week.week} week={week} courseName={courseName}/>
    ))}
  </div>
);

export default LessonWeeks;
