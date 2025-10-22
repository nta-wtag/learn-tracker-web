import { LucideIcon } from "lucide-react";
import React from "react";

interface StatCardProps {
  icon: LucideIcon;
  text: string;
  count: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, text, count }) => {
  return (
    <div className="flex bg-white p-8 rounded-xl gap-4 items-center shadow-lg">
      <Icon
        className="bg-lightPrimaryColor text-primaryColor p-4 rounded-2xl"
        size={64}
      />
      <div className="flex flex-col text-gray-600">
        <span className="text-lg font-poppins">{text}</span>
        <span className="font-semibold text-3xl font-poppins">{count}</span>
      </div>
    </div>
  );
};

export default StatCard;
