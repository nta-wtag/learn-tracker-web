import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

function Button({ text, onClick, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-50 bg-[#6b3dcb] p-2 text-white flex justify-center rounded-lg my-4"
    >
      {text}
    </button>
  );
}

export default Button;
