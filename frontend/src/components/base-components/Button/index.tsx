import React, { type ReactNode } from "react";
import classNames from "classnames";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  icon?: ReactNode; 
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  text,
  onClick,
  disabled = false,
  variant = "primary",
  icon,
  fullWidth = false,
}) => {
  const buttonClass = classNames(
    "px-4 py-2 rounded-lg flex items-center gap-2 justify-center transition-colors font-medium",
    { 
      "w-full": fullWidth,
      // Primary button
      "bg-primaryColor text-white hover:bg-darkPrimaryColor cursor-pointer": variant === "primary" && !disabled,
      // Secondary button: light purple
      "bg-lightPrimaryColor text-primaryColor hover:bg-lightPrimaryColorHover cursor-pointer": variant === "secondary" && !disabled,
      // Danger button
      "bg-danger text-white hover:bg-red-600 cursor-pointer": variant === "danger" && !disabled,
      // Disabled state (gray, no hover)
      "bg-gray-300 text-gray-500 cursor-not-allowed": disabled,
    }
  );

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={buttonClass} data-testid="test-button" >
      {icon && <span className="flex items-center">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
