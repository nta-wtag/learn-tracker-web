import  React, { useState } from "react";
import AuthForm from "components/auth-components/AuthForm";
import AuthHeader from "components/auth-components/AuthHeader";
import AuthIllustration from "components/auth-components/AuthIllustration";
import AuthToggleButton from "components/auth-components/AuthModeSwitcher";
import { useCurrentUserAuth } from "hooks/useCurrentUserAuth";
import { Navigate } from "react-router-dom";
import { ROUTES } from "routes/paths";

const Auth:React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isAuthenticated } = useCurrentUserAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD.path} replace />;
  }

  return (
    <div className="w-full h-screen relative flex lg:px-16 xl:px-32 3xl:px-64 font-[poppins]">
      <div className="w-full h-full flex flex-col lg:flex-row">
        <AuthIllustration isLoginMode={isLoginMode} />
        <div className="w-full lg:w-1/2 h-2/3 lg:h-full flex flex-col items-center lg:justify-center">
          <div className="w-full sm:w-2/3 lg:w-full rounded-lg px-8 lg:px-16 2xl:px-32 py-8 lg:py-16 flex flex-col items-start justify-center lg:space-y-4">
            <AuthHeader isLoginMode={isLoginMode} />
            <AuthForm isLoginMode={isLoginMode} />
            <AuthToggleButton isLoginMode={isLoginMode} setIsLoginMode={setIsLoginMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
