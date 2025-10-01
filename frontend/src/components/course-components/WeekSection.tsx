import React from "react";
import ModuleItem from "components/course-components/ModuleItem";
import type { Lesson , Module } from "utils/course-handler";


const WeekSection: React.FC<Lesson> = ({ week, modules }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Week {week}</h2>
      <div className="h-[1px] bg-gray-300 mb-8" />
      <ul className="space-y-2">
        {modules.map((module: Module, idx: number) => (
          <ModuleItem key={idx} title={module.title} estDays={module.estDays} />
        ))}
      </ul>
    </div>
  );
};

export default WeekSection;
