import React from "react";
import { Play } from 'lucide-react';
import { Module } from "types/course-types";

interface ModuleItemProps {
  module: Module;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ module }) => {
  return (
    <li className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded transition-colors">
      <Play className="w-5 h-5 text-primaryColor flex-shrink-0" />
      <div className="flex justify-between items-center flex-1 gap-4">
        <p className="font-medium">{module.title}</p>
        <p className="text-sm text-gray-500 whitespace-nowrap">
          {module.estDays} day{module.estDays === 1 ? "" : "s"}
        </p>
      </div>
    </li>
  );
};

export default ModuleItem;
