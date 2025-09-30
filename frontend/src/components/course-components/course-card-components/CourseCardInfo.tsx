import React from "react";

interface Props {
  lessonsCount: number;
  totalDays: number;
  context: "enroll" | "courses";
  deadline?: string | null;
  isDeadlineOver: boolean;
}

const CourseInfo: React.FC<Props> = ({
  lessonsCount,
  totalDays,
  context,
  deadline,
  isDeadlineOver,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-600">Lessons: {lessonsCount}</p>

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
