import React from "react";
import { Field } from "react-final-form";
import { useSelector } from "react-redux";

import { type RootState } from "redux-toolkit/store";
import Input from "components/fields/Input";

const AuthInputFields: React.FC = () => {
  const isLoginMode = useSelector((state: RootState) => state.auth.isLoginMode);

  return (
    <>
      {!isLoginMode && (
        <Field name="username">
          {({ input, meta }) => (
            <Input
              input={input}
              error={meta.error}
              touched={meta.touched}
              placeholder="Username"
            />
          )}
        </Field>
      )}

      <Field name="email">
        {({ input, meta }) => (
          <Input
            input={input}
            error={meta.error}
            touched={meta.touched}
            type="email"
            placeholder="Email"
          />
        )}
      </Field>

      <Field name="password">
        {({ input, meta }) => (
          <Input
            input={input}
            error={meta.error}
            touched={meta.touched}
            type="password"
            placeholder="Password"
          />
        )}
      </Field>
    </>
  );
};

export default AuthInputFields;
