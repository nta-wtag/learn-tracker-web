import React from "react";

interface Props {
  title: string;
  estDays: number;
}

const ModuleItem: React.FC<Props> = ({ title, estDays }) => {
  return (
    <li className="p-4 rounded-lg shadow-sm flex flex-col gap-1 bg-white">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-500">
        {estDays} day{estDays === 1 ? "" : "s"}
      </p>
    </li>
  );
};

export default ModuleItem;
