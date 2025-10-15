import React from "react";

interface InputProps {
  input: any;
  error: any;
  type?: string;
  placeholder?: string;
  touched: any;
}

const Input: React.FC<InputProps> = ({ input, error, type = "text", placeholder, touched }) => {
  return (
    <div className="flex flex-col w-full">
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className="w-full border rounded px-3 py-2"
      />
      {touched && error && (
        <span className="text-red-500 text-sm mt-1">{error}</span>
      )}
    </div>
  );
};

export default Input;
