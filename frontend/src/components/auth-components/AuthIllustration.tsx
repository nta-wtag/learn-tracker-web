import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "store";

import loginImg from "assets/login-illustration.jpg";
import registerImg from "assets/register-illustration.jpeg";

const AuthIllustration: React.FC = () => {
  const isLoginMode = useSelector((state: RootState) => state.authUi.isLoginMode);
  return (
    <div className="w-full lg:w-1/2 h-1/3 lg:h-1/2 flex justify-center self-center">
      <img
        src={isLoginMode ? loginImg : registerImg}
        className="w-full p-4 h-9/10 lg:h-4/5 object-contain flex items-center self-center"
        alt="Auth illustration"
      />
    </div>
  );
}

export default AuthIllustration;
