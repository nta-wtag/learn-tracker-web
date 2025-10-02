import React from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-final-form";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import Button from "components/base-components/Button";
import AuthFields from "components/auth-components/AuthFields";

import { validateAuth } from "utils/auth-validation";
import { handleLogin, handleRegister } from "utils/auth-handlers";
import { useAuthRedux } from "hooks/useAuthRedux";

import { type RootState } from "store";

interface AuthFormValues {
  username?: string;
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuthRedux();
  const isLoginMode = useSelector((state: RootState) => state.authUi.isLoginMode);

  const handleSubmit = ({ username, email, password }: AuthFormValues) => {
    if (isLoginMode) {
      const result = handleLogin(email, password);
      if (result.success && result.user) {
        login(result.user)
        toast.success(result.message || "Something went wrong");
        navigate("/");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } else {
      const result = handleRegister(username!, email, password);
      if (result.success && result.user) {
        register(result.user)
        toast.success(result.message || "Something went wrong");
      } else {
        toast.error(result.message || "Something went wrong");
      }
    }
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
          <AuthFields />
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
