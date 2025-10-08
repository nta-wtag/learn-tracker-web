import React from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-final-form";
import toast, { Toaster } from "react-hot-toast";

import Button from "components/base-components/Button";
import AuthInputFields from "components/auth-components/AuthInputFields";

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

  const handleSubmit = ({ username, email, password }: AuthFormValues) => {
    if (isLoginMode) {
      const result = handleLogin(email, password);

      // Login failed
      if (!result.success || !result.user) { 
        toast.error(result.message || "Something went wrong");
        return;
      }

      // Login successful
      toast.success(result.message || "Login successful");
      navigate("/", {replace: true});
      return;
    }

    const result = handleRegister(username!, email, password);

    // Registration failed
    if (!result.success || !result.user) {
      toast.error(result.message || "Something went wrong");
      return;
    }

    // Registration successful
    toast.success(result.message || "Registration successful");
    navigate("/", {replace: true});
  };

  return (
    <div className="w-full">
      <Form<AuthFormValues>
        onSubmit={handleSubmit}
        validate={(values) => validateAuth(values, isLoginMode)}
        render={({ handleSubmit, submitting }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 w-full"
          >
            <AuthInputFields isLoginMode={isLoginMode} />
            <Button
              type="submit"
              text={isLoginMode ? "Sign In" : "Sign Up"}
              disabled={submitting}
            />
          </form>
        )}
      />
      <Toaster />
    </div>
  );
};

export default AuthForm;
