import React from "react";
import { Field, Form } from "react-final-form";
import { validateAuth } from "@utils/authValidation"
import Input from "@components/Input";
import type { AuthData } from "@types/AuthData";
import { findUserByEmail, saveUser, setCurrentUser } from "@utils/authStorage";

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
