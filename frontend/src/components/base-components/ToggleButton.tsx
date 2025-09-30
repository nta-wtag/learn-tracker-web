import React from "react";
import classNames from "classnames";

interface ToggleButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "relative px-2 transition-colors lg:text-xl text-lg",
        {
          "text-primaryColor font-extrabold": active,
          "text-gray-400 font-light": !active,
        }
      )}
    >
      {label}
      {active && (
        <div className="absolute left-0 right-0 -bottom-1 h-[3px] bg-primaryColor rounded" />
      )}
    </button>
  );
};

export default ToggleButton;
