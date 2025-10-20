import React from "react";
import { CircleDashed, ExternalLink, CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "redux-toolkit/store";
import { markLessonComplete, unmarkLesson } from "redux-toolkit/slices/lessonSlice";
import { Module } from "types/course-types";
import { useCourseContext } from "hooks/useCourseContext";

interface ModuleItemProps {
  module: Module;
  courseName: string;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ module, courseName }) => {
  const dispatch = useDispatch();
  const variant = useCourseContext();
  const completedLessons = useSelector(
    (state: RootState) => state.lesson.completedLessons
  );

  const isCompleted = completedLessons.some(
    (l) => l.courseName === courseName && l.moduleTitle === module.title
  );

  const toggleComplete = () => {
    if (variant !== "courses") {
      return;
    }

    if (isCompleted) {
      dispatch(unmarkLesson({ courseName, moduleTitle: module.title }));

      return;
    }

    dispatch(markLessonComplete({ courseName, moduleTitle: module.title }));
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div
        className={`flex items-center gap-4 p-2 rounded transition-colors select-none ${
          variant === "courses"
            ? "cursor-pointer hover:bg-gray-50"
            : "cursor-default"
        }`}
        onClick={toggleComplete}
      >
        {variant === "enroll" ? (
          <CircleDashed className="text-gray-400" />
        ) : isCompleted ? (
          <CheckCircle className="text-green-600" />
        ) : (
          <CircleDashed className="text-gray-400" />
        )}
        <div className="flex justify-between items-center w-full">
          <p
            className={`font-medium ${
              isCompleted && variant === "courses"
                ? "text-green-700 line-through"
                : "text-gray-800"
            }`}
          >
            {module.title}
          </p>
          <p className="text-sm text-gray-500 whitespace-nowrap">
            {module.estDays} day{module.estDays === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      {module.resources?.length > 0 && variant === "courses" && (
        <ul className="ml-10 flex flex-col gap-1">
          {module.resources.map((res, idx) => (
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
