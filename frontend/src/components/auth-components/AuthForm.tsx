import React from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-final-form";

import Button from "components/base-components/Button";
import AuthFields from "components/auth-components/AuthFields";
import { validateAuth } from "utils/auth-validation";
import { handleLogin, handleRegister } from "utils/auth-handlers";

interface AuthFormProps {
  isLoginMode: boolean;
}

interface AuthFormValues {
  username?: string;
  email: string;
  password: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLoginMode }) => {
  const navigate = useNavigate();

  return (
    <Form<AuthFormValues>
      onSubmit={({ username, email, password }) => {
        if (isLoginMode) {
          const success = handleLogin(email, password);
          if (success) navigate("/");
        } else {
          handleRegister(username!, email, password);
        }
      }}
      validate={(values) => validateAuth(values, isLoginMode)}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
          <AuthFields isLoginMode={isLoginMode} />
          <Button
            type="submit"
            text={isLoginMode ? "Sign In" : "Sign Up"}
            disabled={submitting}
          />
        </form>
      )}
    />
  );
};

export default AuthForm;
