import React from "react";
import classNames from "classnames";
import { useCardContext } from "hooks/useCardContext";
import { useCourseCardValues } from "hooks/useCourseCardValues";


const CourseHeader: React.FC = () => {
  const context = useCardContext()
  const { courseName, deadline, isDeadlineOver } = useCourseCardValues();
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold mb-2">{courseName}</h2>

      {context === "courses" && deadline && (
        <p
          className={classNames(
            "px-2 sm:px-4 md:px-8 py-2 rounded-3xl text-white transition-colors",
            {
              "bg-red-500": isDeadlineOver,
              "bg-green-500": !isDeadlineOver,
            }
          )}
        >
          {isDeadlineOver ? "Deadline Passed" : "On Time"}
        </p>
      )}
    </div>
  );
};

export default CourseHeader;
