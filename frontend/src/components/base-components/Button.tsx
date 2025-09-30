import React from "react";
import classNames from "classnames";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  text,
  onClick,
  disabled = false,
  variant = "primary",
}) => {
  const buttonClass = classNames(
    "px-4 py-2 rounded-lg transition-colors",
    {
      "bg-primaryColor text-white hover:bg-darkPrimaryColor": variant === "primary",
      "bg-gray-200 text-gray-700 hover:bg-gray-300": variant === "secondary",
      "bg-red-500 text-white hover:bg-red-600": variant === "danger",
      "opacity-50 cursor-not-allowed": disabled,
    }
  );

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={buttonClass}>
      {text}
    </button>
  );
};

export default Button;
