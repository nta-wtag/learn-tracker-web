import React from "react";

interface AuthHeaderProps {
  isLoginMode: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isLoginMode }) => (
  <div className="mb-8 w-full">
    <h1 className="text-3xl lg:text-5xl font-black text-primaryColor">
      {isLoginMode ? "Welcome Back" : "Hello There"}
    </h1>
  </div>
);

export default AuthHeader;
