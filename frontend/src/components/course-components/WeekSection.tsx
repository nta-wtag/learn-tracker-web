import React from "react";
import ModuleItem from "components/course-components/ModuleItem";
import type { Module } from "utils/course-storage";

interface Props {
  week: number;
  modules: Module[];
}

const WeekSection: React.FC<Props> = ({ week, modules }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Week {week}</h2>
      <div className="h-[1px] bg-gray-300 mb-8" />
      <ul className="space-y-2">
        {modules.map((module, idx) => (
          <ModuleItem key={idx} title={module.title} estDays={module.estDays} />
        ))}
      </ul>
    </div>
  );
};

export default WeekSection;
