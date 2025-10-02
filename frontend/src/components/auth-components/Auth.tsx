import React from "react";

import AuthForm from "components/auth-components/AuthForm";
import AuthHeader from "components/auth-components/AuthHeader";
import AuthImage from "components/auth-components/AuthImage";
import AuthToggleButton from "components/auth-components/AuthToggleButton";

const Auth = () => {
  return (
    <div className="w-full h-screen relative flex lg:px-16 xl:px-32 3xl:px-64 font-[poppins]">
      <div className="w-full h-full flex flex-col lg:flex-row">
        <AuthImage />
        <div className="w-full lg:w-1/2 h-2/3 lg:h-full flex flex-col items-center lg:justify-center">
          <div className="w-full sm:w-2/3 lg:w-full rounded-lg px-8 lg:px-16 2xl:px-32 py-8 lg:py-16 flex flex-col items-start justify-center lg:space-y-4">
            <AuthHeader />
            <AuthForm />
            <AuthToggleButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
