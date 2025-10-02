import React from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";

import Button from "components/base-components/Button";
import AuthFields from "components/auth-components/AuthFields";
import { validateAuth } from "utils/auth-validation";
import { handleLogin, handleRegister } from "utils/auth-handlers";

import { type RootState } from "store";
import { setUser } from "store/slices/authSlice";

interface AuthFormValues {
  username?: string;
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoginMode = useSelector((state: RootState) => state.authUi.isLoginMode);

  const onSubmit = ({ username, email, password }: AuthFormValues) => {
    if (isLoginMode) {
      const result = handleLogin(email, password);
      if (result.success && result.user) {
        dispatch(setUser(result.user));
        navigate("/");
      } else {
        alert(result.message);
      }
    } else {
      const result = handleRegister(username!, email, password);
      if (result.success && result.user) {
        dispatch(setUser(result.user));
        alert(result.message);
      } else {
        alert(result.message);
      }
    }
  };

  return (
      <Form<AuthFormValues>
      onSubmit={onSubmit}
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
  );
};

export default AuthForm;
