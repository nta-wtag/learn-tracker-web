import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

function InputField({ type, placeholder, value, onChange, error }: InputProps) {
  return (
    <div className="flex flex-col space-y-1">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border rounded px-4 py-2 ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}

export default InputField;
