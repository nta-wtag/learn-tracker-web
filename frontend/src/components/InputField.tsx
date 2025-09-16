import React from "react";
import { Field } from "react-final-form";

interface InputFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, type = "text", placeholder }) => {
  return (
    <Field name={name}>
      {({ input, meta }) => (
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
      )}
    </Field>
  );
};

export default InputField;
