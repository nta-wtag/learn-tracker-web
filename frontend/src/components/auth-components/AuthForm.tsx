import React from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-final-form";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import { ROUTES } from "routes/paths";

import { type RootState } from "store";
import { useAuthRedux } from "hooks/useAuthRedux";

import { validateAuth } from "utils/auth-validation";

import Button from "components/base-components/Button";
import AuthInputFields from "components/auth-components/AuthInputFields";

interface AuthFormValues {
  username?: string;
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const isLoginMode = useSelector((state: RootState) => state.authUi.isLoginMode);
  const { login, register } = useAuthRedux();

  const handleSubmit = ({ username, email, password }: AuthFormValues) => {
    if (isLoginMode) {
      const result = login(email, password);

      // Login failed
      if (!result.success || !result.user) { 
        toast.error(result.message || "Something went wrong");

        return;
      }

      // Login successful
      toast.success(result.message || "Login successful");
      navigate(ROUTES.DASHBOARD.path, {replace: true});

      return;
    }

    const result = register(username!, email, password);

    // Registration failed
    if (!result.success || !result.user) {
      toast.error(result.message || "Something went wrong");

      return;
    }

    // Registration successful
    toast.success(result.message || "Registration successful");
    
    navigate(ROUTES.DASHBOARD.path, {replace: true});
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
            <AuthInputFields />
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
