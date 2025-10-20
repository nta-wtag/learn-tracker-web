import React from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-final-form";
import toast, { Toaster } from "react-hot-toast";

import { ROUTES } from "routes/paths";
import { useAppDispatch } from "store/hooks";
import { validateAuth } from "utils/auth-validation";
import { useAuth } from "hooks/useAuth";

import Button from "components/base-components/Button";
import AuthInputFields from "components/auth-components/AuthInputFields";
import { loginUser, registerUser } from "store/thunks/authThunk";

interface AuthFormValues {
  username?: string;
  email: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoginMode } = useAuth();


  const handleSubmit = async ({ username, email, password }: AuthFormValues) => {
    try {
      if (isLoginMode) {
        await dispatch(
          loginUser({
            email: email,
            password: password
          })
        ).unwrap();

        toast.success("Login successful"); 
      } else {
        await dispatch(
          registerUser({
            username: username!,
            email: email,
            password: password,
          })
        ).unwrap();

        toast.success("Registration successful");
      }

        navigate(ROUTES.DASHBOARD.path);  
    } catch (error) {
      toast.error(error as string);
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
