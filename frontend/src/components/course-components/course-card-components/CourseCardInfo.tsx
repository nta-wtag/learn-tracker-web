import { useCardContext } from "hooks/useCardContext";
import { useCourseCardValues } from "hooks/useCourseCardValues";
import React from "react";

const CourseInfo: React.FC = () => {
  const context = useCardContext();
  const { totalLessons, totalDays, deadline, isDeadlineOver } = useCourseCardValues();;
  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-600">Lessons: {totalLessons}</p>

      {context === "enroll" ? (
        <p className="text-gray-600">Estimated Time: {totalDays} day(s)</p>
      ) : deadline ? (
        <p className={isDeadlineOver ? "text-red-600" : "text-gray-600"}>
          Deadline: {deadline}
        </p>
      ) : null}
    </div>
  );
};

export default CourseInfo;
