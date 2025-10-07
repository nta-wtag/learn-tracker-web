import React from "react";
import { useCardContext } from "hooks/useCardContext";
import { useCourseCardValues } from "hooks/useCourseCardValues";
import { Book, Calendar, CalendarDays, Clock, Timer } from "lucide-react"; // icons

const CourseInfo: React.FC = () => {
  const context = useCardContext();
  const { totalDays, deadline, isDeadlineOver, daysLeft, totalLessons } = useCourseCardValues();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full text-gray-700">
      <div className="flex justify-start gap-8 items-center">
        {context === "enroll" ? (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-600" />
            <p className="text-gray-600">Estimated Time: {totalDays} day(s)</p>
          </div>
        ) : deadline ? (
          <div className="flex items-center gap-2">
            <Calendar
              className={`w-4 h-4 ${
                isDeadlineOver ? "text-red-600" : "text-sky-600"
              }`}
            />
            <p className={isDeadlineOver ? "text-red-600" : "text-gray-600"}>
              Due: {formatDate(deadline)}
            </p>
          </div>
        ) : null}
        <div className="flex items-center gap-2">
          <Book className="w-4 h-4 text-sky-600" />
          <p className="text-gray-600">{totalLessons} Lessons</p>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
