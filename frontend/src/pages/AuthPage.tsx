import React, { useState } from "react";
import { Form } from "react-final-form";
import { validateAuth } from "../utils/authValidation";
import InputField from "../components/InputField";

import loginImg from "../assets/Education-Isometric-Illustration.jpg";
import registerImg from "../assets/42B2E4EC-58E6-4E91-9CA5-B570A5634F8F_1_201_a.jpeg";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const onSubmit = async (values: any) => {
    try {
      if (isLogin) {
        alert(`Login success\nEmail: ${values.email}`);
      } else {
        alert(`Registration success\nUsername: ${values.username}`);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen relative flex lg:px-16 xl:px-32 3xl:px-64 text-[#2e214a] font-[poppins]">
      <div className="w-full h-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-1/3 lg:h-1/2 flex justify-center self-center">
          <img
            src={isLogin ? loginImg : registerImg}
            className="w-full p-4 h-9/10 lg:h-4/5 object-contain flex items-center self-center"
            alt="Auth illustration"
          />
        </div>

        <div className="w-full lg:w-1/2 h-2/3 lg:h-full flex flex-col items-center lg:justify-center bg-white">
          <div className="w-full sm:w-2/3 lg:w-full rounded-lg px-8 lg:px-16 2xl:px-32 py-8 lg:py-16 flex flex-col items-start justify-center lg:space-y-4 bg-white text-black">
            <h1 className="text-3xl lg:text-5xl mb-2 lg:mb-4 font-black text-[#6b3dcb]">
              {isLogin ? "Welcome Back" : "Hello There"}
            </h1>
            <span className="mb-8 font-extralight text-sm lg:text-lg">
              {isLogin ? "Sign in to continue" : "Create a new account to continue"}
            </span>

            <Form
              onSubmit={onSubmit}
              validate={(values) => validateAuth(values, isLogin)}
              render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
                  {!isLogin && (
                    <InputField name="username" placeholder="Username" />
                  )}

                  <InputField name="email" type="email" placeholder="Email" />

                  <InputField name="password" type="password" placeholder="Password" />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-50 bg-[#6b3dcb] p-2 text-white flex justify-center rounded-lg my-4"
                  >
                    {isLogin ? "Sign In" : "Sign Up"}
                  </button>
                </form>
              )}
            />

            <div className="flex items-baseline mt-16 w-full justify-evenly">
              <button
                onClick={() => setIsLogin(true)}
                className={`relative text-md lg:text-xl px-2 transition-colors text-lg ${
                  !isLogin ? "text-gray-400 font-light" : "text-[#6b3dcb] font-extrabold"
                }`}
              >
                Sign In
                {isLogin && (
                  <div className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[#6b3dcb] rounded" />
                )}
              </button>

              <div className="border-l border-gray-400 h-5"></div>

              <button
                onClick={() => setIsLogin(false)}
                className={`relative text-md lg:text-xl px-2 transition-colors text-lg ${
                  isLogin ? "text-gray-400 font-light" : "text-[#6b3dcb] font-extrabold"
                }`}
              >
                Sign Up
                {!isLogin && (
                  <div className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[#6b3dcb] rounded" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
