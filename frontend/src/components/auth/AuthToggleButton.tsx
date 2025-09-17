import React from "react";

interface AuthToggleButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

const AuthToggleButton: React.FC<AuthToggleButtonProps> = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    className={`relative text-md lg:text-xl px-2 transition-colors text-lg ${
      active ? "text-[#6b3dcb] font-extrabold" : "text-gray-400 font-light"
    }`}
  >
    {label}
    {active && <div className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[#6b3dcb] rounded" />}
  </button>
);

export default AuthToggleButton;
