import React from "react";

interface AuthHeaderProps {
  isLoggedin: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ isLoggedin }) => (
  <div className="mb-8 w-full">
    <h1 className="text-3xl lg:text-5xl font-black text-[#6b3dcb]">
      {isLoggedin ? "Welcome Back" : "Hello There"}
    </h1>
  </div>
);

export default AuthHeader;
