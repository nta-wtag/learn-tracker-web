import React from "react";
import ModuleItem from "components/course-components/ModuleItem";
import type { Lesson, Module } from "utils/course-handler";

interface Props extends Lesson {
  courseName: string;
}

const WeekSection: React.FC<Props> = ({ week, modules, courseName }) => {
  return (
    <div className="space-y-4 flex flex-col w-full">
      <h2 className="text-xl font-semibold">Week {week}</h2>
      <ul className="space-y-2">
        {modules.map((module: Module, idx: number) => (
          <ModuleItem
            key={idx}
            title={module.title}
            estDays={module.estDays}
            resources={module.resources}
            courseName={courseName}
          />
        ))}
      </ul>
    </div>
  );
};

export default WeekSection;
