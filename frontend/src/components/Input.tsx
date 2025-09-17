import React from "react";

interface InputProps {
  input: any;
  meta: any;
  type?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ input, meta, type = "text", placeholder }) => {
  return (
    <div className="flex flex-col w-full">
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className="w-full border rounded px-3 py-2"
      />
      {meta.touched && meta.error && (
        <span className="text-red-500 text-sm mt-1">{meta.error}</span>
      )}
    </div>
  );
};

export default Input;
