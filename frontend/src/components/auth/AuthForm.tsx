import React from "react";
import { Field, Form } from "react-final-form";
import { validateAuth } from "utils/authValidation"
import Input from "components/base-components/Input";
import { findUserByEmail, saveUser, setCurrentUser } from "utils/authStorage";
import Button from "components/base-components/Button";
import type { AuthData } from "utils/authStorage";

interface AuthFormProps {
  isLoggedin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLoggedin }) => (
  <Form
    onSubmit={async (values) => {
      const { username, email, password } = values;

      if (isLoggedin) {
        const user = findUserByEmail(email);
        if (!user) {
          alert("User not found. Please sign up first.");
          return;
        }
        if (user.password !== password) {
          alert("Incorrect password.");
          return;
        }
        setCurrentUser(user);
        alert("Login successful!");
      } else {
        if (findUserByEmail(email)) {
          alert("Email already registered.");
          return;
        }
        const newUser: AuthData = { username, email, password };
        saveUser(newUser);
        setCurrentUser(newUser);
        alert("Registration successful!");
      }
    }}
    validate={(values) => validateAuth(values, isLoggedin)}
    render={({ handleSubmit, submitting }) => (
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
        {!isLoggedin && (
          <Field name="username">
            {({ input, meta }) => <Input input={input} error={meta.error} touched={meta.touched} placeholder="Username" />}
          </Field>
        )}
        <Field name="email">
          {({ input, meta }) => <Input input={input} error={meta.error} touched={meta.touched} type="email" placeholder="Email" />}
        </Field>
        <Field name="password">
          {({ input, meta }) => <Input input={input} error={meta.error} touched={meta.touched} type="password" placeholder="Password" />}
        </Field>
        <Button
          type="submit"
          text={isLoggedin ? "Sign In" : "Sign Up"}
          disabled={submitting}
          variant="primary"
        />
      </form>
    )}
  />
);

export default AuthForm;
