import React from "react";
import { LucideIcon } from "lucide-react";

interface StatItemProps {
  icon: LucideIcon;
  label: string;
  className?: string;
}

const StatItem: React.FC<StatItemProps> = ({
    icon: Icon,
    label,
    className = "text-gray-600"
}) => (
    <div className={`flex items-center gap-2 ${className}`}>
        <Icon className="w-4 h-4 text-primaryColor" />
        <span className="text-sm font-medium py-2">{label}</span>
    </div>
);

export default StatItem;
