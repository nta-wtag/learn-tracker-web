import React from "react";
import { Field } from "react-final-form";
import Input from "components/base-components/Input";

const ProfileFormFields: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 space-y-6">
        <Field name="username" >
          {({ input, meta }) => (
            <Input
              input={input}
              error={meta.error}
              touched={meta.touched}
              placeholder="Enter your username"
              type="text"
              label="Username"
            />
          )}
        </Field>

        <Field name="email" >
          {({ input, meta }) => (
            <Input
              input={input}
              error={meta.error}
              touched={meta.touched}
              placeholder="Enter your email"
              type="email"
              label="Email"
            />
          )}
        </Field>
      </div>

      <div className="flex flex-col gap-2">
        <Field name="password">
          {({ input, meta }) => (
            <Input
              input={input}
              error={meta.error}
              touched={meta.touched}
              placeholder="••••••••"
              type="password"
              label="Password"
            />
          )}
        </Field>
        <p className="text-xs text-gray-500 mt-1">
          Leave blank to keep your current password.
        </p>
      </div>
    </>
  );
};

export default ProfileFormFields;
