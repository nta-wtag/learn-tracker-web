import React from "react";
import { Week } from "types/course-types";
import ModuleItem from "components/protected-components/lesson-components/ModuleItem";

interface WeekSectionProps {
  week: Week;
}

const WeekSection: React.FC<WeekSectionProps> = ({ week }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Week {week.week}</h2>
      <div className="h-[1px] bg-gray-300 mb-8" />
      <ul className="space-y-2">
        {week.modules.map((module, idx) => (
          <ModuleItem key={idx} module={module} />
        ))}
      </ul>
    </div>
  );
};

export default WeekSection;
