import React from "react";
import ModuleItem from "components/protected-components/lesson-components/ModuleItem";
import { Week } from "types/course-types";

interface WeekSectionProps {
  week: Week;
}

const WeekSection: React.FC<WeekSectionProps> = ({ week }) => (
  <section className="space-y-4">
    <h2 className="text-xl font-semibold">Week {week.week}</h2>
    <hr className="border-gray-300" />
    <ul className="space-y-2">
      {week.modules.map((module, idx) => (
        <ModuleItem key={idx} module={module} />
      ))}
    </ul>
  </section>
);

export default WeekSection;
