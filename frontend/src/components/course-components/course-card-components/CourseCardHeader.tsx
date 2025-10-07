import React from "react";
import classNames from "classnames";
import { useCardContext } from "hooks/useCardContext";
import { useCourseCardValues } from "hooks/useCourseCardValues";
import { CheckCircle, Clock, XCircle } from "lucide-react"; // icons

const CourseHeader: React.FC = () => {
  const context = useCardContext();
  const { courseName, deadline, isDeadlineOver, isCompleted } = useCourseCardValues();

  let status = {
    icon: <Clock className="w-5 h-5" />, 
    color: "bg-primaryColor",
    text: "On Time"
  };

  if (isCompleted) {
    status = { icon: <CheckCircle className="w-5 h-5" />, color: "bg-green-500", text: "Completed" };
  } else if (isDeadlineOver) {
    status = { icon: <XCircle className="w-5 h-5" />, color: "bg-red-500", text: "Deadline Passed" };
  }

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold mb-2">{courseName}</h2>

      {context === "courses" && deadline && (
        <div
          className={classNames(
            "px-3 py-2 rounded-3xl text-white transition-colors flex items-center justify-center relative group",
            status.color
          )}
        >
          {status.icon}

          {/* Tooltip text */}
          <span className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap transition-opacity">
            {status.text}
          </span>
        </div>
      )}
    </div>
  );
};

export default CourseHeader;
