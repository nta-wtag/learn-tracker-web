import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "redux-toolkit/store";

const AuthHeader: React.FC = ()=> {
  const isLoginMode = useSelector((state: RootState) => state.auth.isLoginMode);
  return (
  <div className="mb-8 w-full">
    <h1 className="text-3xl lg:text-5xl font-black text-primaryColor">
      {isLoginMode ? "Welcome Back" : "Hello There"}
    </h1>
  </div>
);
}

export default AuthHeader;
