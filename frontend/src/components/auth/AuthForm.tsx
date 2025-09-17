import React from "react";
import { Field, Form } from "react-final-form";
import { validateAuth } from "@utils/authValidation"
import Input from "../Input";

interface AuthFormProps {
  isLoggedin: boolean;
  onSubmit: (values: any) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLoggedin, onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    validate={(values) => validateAuth(values, isLoggedin)}
    render={({ handleSubmit, submitting }) => (
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
        {!isLoggedin && (
          <Field name="username">
            {({ input, meta }) => <Input input={input} meta={meta} placeholder="Username" />}
          </Field>
        )}
        <Field name="email">
          {({ input, meta }) => <Input input={input} meta={meta} type="email" placeholder="Email" />}
        </Field>
        <Field name="password">
          {({ input, meta }) => <Input input={input} meta={meta} type="password" placeholder="Password" />}
        </Field>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#6b3dcb] p-2 text-white rounded-lg"
        >
          {isLoggedin ? "Sign In" : "Sign Up"}
        </button>
      </form>
    )}
  />
);

export default AuthForm;
