import React, { useState } from "react";
import loginImg from "../assets/Education-Isometric-Illustration.jpg";
import registerImg from "../assets/42B2E4EC-58E6-4E91-9CA5-B570A5634F8F_1_201_a.jpeg";
import Login from "../components/login/Login";
import Register from "../components/login/Register";

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    const [authData, setAuthData] = useState({
        email: "",
        password: "",
        username: "",
    });

    return (
        <div className="w-full h-screen relative flex px-64 text-[#2e214a] font-[poppins]">
            <div className="w-full h-full flex justify-center">
                <div className="w-1/2 h-full flex items-center">
                    <img
                        src={isLogin ? loginImg : registerImg}
                        className="w-full p-4 h-1/2 object-contain"
                        alt="auth"
                    />
                </div>
                <div className="w-1/2 h-full flex flex-col items-center justify-center z-10 bg-white">
                    <div className="w-full rounded-lg px-32 py-16 flex flex-col items-start justify-center space-y-4 bg-white text-black overflow-hidden">
                        <h1 className="text-5xl mb-4 font-black text-[#6b3dcb] items-center">
                            {isLogin ? "Welcome Back" : "Hello There"}
                        </h1>
                        <span className="mb-8 font-extralight text-lg">
                            {isLogin ? "Sign in to continue" : "Create a new account"}
                        </span>
                        <div className="flex flex-col space-y-4 w-full">
                            {isLogin ? (
                                <div>
                                    <Login authData={authData} setAuthData={setAuthData} />
                                </div>
                            ) : (
                                <div>
                                    <Register authData={authData} setAuthData={setAuthData} />
                                </div>
                            )}
                        </div>

                        <div className="flex items-baseline mt-8 w-full justify-evenly items-center relative">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`relative text-xl px-2 transition-colors text-lg  ${!isLogin
                                    ? "text-gray-400 font-light"
                                    : "text-[#6b3dcb] font-extrabold"
                                    }`}
                            >
                                Sign In
                            </button>
                            <div className="border-l border-gray-400 h-5"></div>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`relative text-xl px-2 transition-colors text-lg  ${isLogin
                                    ? "text-gray-400 font-light"
                                    : "text-[#6b3dcb] font-extrabold"
                                    }`}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
