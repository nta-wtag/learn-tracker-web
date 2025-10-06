import React from "react";
import { CircleDashed, ExternalLink, CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "store";
import { markLessonComplete, unmarkLesson } from "store/slices/lessonSlice";
import type { Module } from "utils/course-handler";
import { useCardContext } from "hooks/useCardContext";

interface Props extends Module {
  courseName: string;
}

const ModuleItem: React.FC<Props> = ({ title, estDays, resources, courseName }) => {
  const dispatch = useDispatch();
  const context = useCardContext();
  const completedLessons = useSelector(
    (state: RootState) => state.lesson.completedLessons
  );

  const isCompleted = completedLessons.some(
    (l) => l.courseName === courseName && l.moduleTitle === title
  );

  const toggleComplete = () => {
    if (context !== "courses") return;
    if (isCompleted) {
      dispatch(unmarkLesson({ courseName, moduleTitle: title }));
    } else {
      dispatch(markLessonComplete({ courseName, moduleTitle: title }));
    }
  };
  console.log("Card context:", context);


  return (
    <div className="flex flex-col w-full gap-2">
      <div
        className={`flex items-center gap-4 select-none ${context === "courses" ? "cursor-pointer" : "cursor-default"
          }`}
        onClick={toggleComplete}
      >
        {context === "enroll" ? (
          <CircleDashed className="text-gray-400" />
        ) : isCompleted ? (
          <CheckCircle className="text-green-600" />
        ) : (
          <CircleDashed className="text-gray-400" />
        )}


        <div className="flex justify-between items-center w-full">
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">
            {estDays} day{estDays === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {resources?.length > 0 && context === "courses" && (
        <ul className="ml-10 flex flex-col gap-1">
          {resources.map((res, idx) => (
            <li key={idx}>
              <a
                href={res}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-600 hover:underline"
              >
                <ExternalLink size={14} /> {res}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ModuleItem;
