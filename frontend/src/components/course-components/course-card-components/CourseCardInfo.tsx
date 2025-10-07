import { useCardContext } from "hooks/useCardContext";
import { useCourseCardValues } from "hooks/useCourseCardValues";
import React from "react";

const CourseInfo: React.FC = () => {
  const context = useCardContext();
  const { totalDays, deadline, isDeadlineOver, daysLeft } = useCourseCardValues();;
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between ">
        {context === "enroll" ? (
        <p className="text-gray-600">Estimated Time: {totalDays} day(s)</p>
      ) : deadline ? (
        <p className={isDeadlineOver ? "text-red-600" : "text-gray-600"}>
          Deadline: {deadline}
        </p>
      ) : null}

      {daysLeft !== undefined && (
        <p className="text-gray-600">Days left: {daysLeft}</p>
      )}
      </div>
    </div>
  );
};

export default CourseInfo;
