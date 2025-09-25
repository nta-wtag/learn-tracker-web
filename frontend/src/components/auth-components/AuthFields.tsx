import React from "react";
import { Field } from "react-final-form";
import Input from "components/fields/Input";

interface AuthFieldsProps {
  isLoginMode: boolean;
}

const AuthFields: React.FC<AuthFieldsProps> = ({ isLoginMode }) => (
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

export default AuthFields;
