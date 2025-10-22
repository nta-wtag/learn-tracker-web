import React from "react";
import { useAuth } from "hooks/useAuth";

const AuthHeader: React.FC = ()=> {
  const { isLoginMode } = useAuth();
  return (
  <div className="mb-8 w-full">
    <h1 className="text-3xl lg:text-5xl font-black text-primaryColor">
      {isLoginMode ? "Welcome Back" : "Hello There"}
    </h1>
  </div>
);
}

export default AuthHeader;
