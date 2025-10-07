import React from "react";
import classNames from "classnames";
import { useCardContext } from "hooks/useCardContext";
import { useCourseCardValues } from "hooks/useCourseCardValues";

const CourseHeader: React.FC = () => {
  const context = useCardContext();
  const { courseName, deadline, isDeadlineOver, isCompleted, image } = useCourseCardValues();

  // Determine status text and color
  let status = {
    text: "On Time",
    bgColor: "bg-sky-100",
    textColor: "text-sky-500",
  };

  if (isCompleted) {
    status = { text: "Completed", 
    bgColor: "bg-green-200",
    textColor: "text-green-800", };
  } else if (isDeadlineOver) {
    status = { text: "Delayed", 
    bgColor: "bg-red-200",
    textColor: "text-red-800", };
  }

  return (
    <div className="flex flex-col">
      <img
        src={image}
        alt={courseName}
        className="w-full h-30 object-fit mb-4"
      />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-2">{courseName}</h2>
        {context === "courses" && deadline && (
          <div
            className={classNames(
              "px-4 py-1.5 rounded-3xl text-sm font-medium transition-colors",
              status.bgColor, status.textColor
            )}
          >
            {status.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseHeader;
