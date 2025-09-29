import React from "react";
import { Play } from 'lucide-react';


interface Props {
  title: string;
  estDays: number;
}

const ModuleItem: React.FC<Props> = ({ title, estDays }) => {
  return (
    <div className="flex items-center gap-4">
      <Play/>
      <li className="p-4 flex justify-between w-full gap-1">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-500">
        {estDays} day{estDays === 1 ? "" : "s"}
      </p>
    </li>
    </div>
  );
};

export default ModuleItem;
