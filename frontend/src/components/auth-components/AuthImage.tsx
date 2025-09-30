import React from "react";

interface AuthImageProps {
  isLoginMode: boolean;
  loginImg: string;
  registerImg: string;
}

const AuthImage: React.FC<AuthImageProps> = ({ isLoginMode, loginImg, registerImg }) => (
  <div className="w-full lg:w-1/2 h-1/3 lg:h-1/2 flex justify-center self-center">
    <img
      src={isLoginMode ? loginImg : registerImg}
      className="w-full p-4 h-9/10 lg:h-4/5 object-contain flex items-center self-center"
      alt="Auth illustration"
    />
  </div>
);

export default AuthImage;
