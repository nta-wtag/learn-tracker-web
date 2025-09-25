import { Form } from "react-final-form";
import Button from "components/base-components/Button";
import AuthFields from "components/auth-components/AuthFields";

import { validateAuth } from "utils/auth-validation";
import { handleLogin, handleRegister } from "utils/auth-handlers";

interface AuthFormProps {
  isLoginMode: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLoginMode }) => (
  <Form
    onSubmit={async ({ username, email, password }) => {
      if (isLoginMode) {
        handleLogin(email, password);
      } else {
        handleRegister(username, email, password);
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

export default AuthForm;
