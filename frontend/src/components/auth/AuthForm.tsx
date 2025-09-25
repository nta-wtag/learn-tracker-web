// src/components/auth/AuthForm.tsx
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import Input from "components/base-components/Input";
import { validateAuth } from "utils/authValidation";
import {
  findUserByEmail,
  saveUser,
  setCurrentUser,
  } from "utils/authStorage";
import Button from "components/base-components/Button";
import type { AuthData } from "utils/authStorage";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  isLoggedin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLoggedin }) => {
  const navigate = useNavigate();
  const handleSubmit = async (values: AuthData) => {
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
      navigate("/dashboard");
    } else {
      if (findUserByEmail(email)) {
        alert("Email already registered.");
        return;
      }
      const newUser: AuthData = {
        username: username!,
        email,
        password,
        role: "USER",
      };
      saveUser(newUser);
      setCurrentUser(newUser);
      alert("Registration successful!");
      navigate("/dashboard");
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validate={(values) => validateAuth(values, isLoggedin)}
      render={({ handleSubmit, submitting }) => (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 w-full"
        >
          {!isLoggedin && (
            <Field name="username">
              {({ input, meta }) => (
                <Input
                  input={input}
                  error={meta.touched && meta.error ? meta.error : undefined}
                  placeholder="Username"
                />
              )}
            </Field>
          )}
          <Field name="email">
            {({ input, meta }) => (
              <Input
                input={input}
                error={meta.touched && meta.error ? meta.error : undefined}
                type="email"
                placeholder="Email"
              />
            )}
          </Field>
          <Field name="password">
            {({ input, meta }) => (
              <Input
                input={input}
                error={meta.touched && meta.error ? meta.error : undefined}
                type="password"
                placeholder="Password"
              />
            )}
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
};

export default AuthForm;
