import React from "react";
import classNames from "classnames";

interface Props {
  title: string;
  deadline?: string | null;
  isDeadlineOver: boolean;
  context: "enroll" | "courses";
}

const CourseHeader: React.FC<Props> = ({ title, deadline, isDeadlineOver, context }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold mb-2">{title}</h2>

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
