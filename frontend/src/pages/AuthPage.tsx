import React, { useState } from "react";
import loginImg from "../assets/Education-Isometric-Illustration.jpg";
import registerImg from "../assets/42B2E4EC-58E6-4E91-9CA5-B570A5634F8F_1_201_a.jpeg";
import Login from "../components/login/Login";
import Register from "../components/login/Register";
import { useAuthForm } from "../hooks/useAuthForm";
import { AnimatePresence, motion } from "framer-motion";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const { authData, setAuthData, errors, handleSubmit } = useAuthForm();

    return (
        <div className="w-full h-screen relative flex lg:px-16 xl:px-32 3xl:px-64 text-[#2e214a] font-[poppins]">
            <div className="w-full h-full flex flex-col lg:flex-row h-full">
                <div className="w-full lg:w-1/2 h-1/3 lg:h-1/2 flex justify-center self-center">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={isLogin ? "login-img" : "register-img"}
                            src={isLogin ? loginImg : registerImg}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full p-4 h-9/10 lg:h-4/5 object-contain flex items-center self-center"
                        />
                    </AnimatePresence>
                </div>
                <div className="w-full lg:w-1/2 h-2/3 lg:h-full flex flex-col items-center lg:justify-center bg-white">
                    <div className="w-full sm:w-2/3 lg:w-full rounded-lg px-8 lg:px-16 2xl:px-32 py-8 lg:py-16 flex flex-col items-start justify-center lg:space-y-4 bg-white text-black overflow-none">
                        <h1 className="text-3xl lg:text-5xl mb-2 lg:mb-4 font-black text-[#6b3dcb] items-center">
                            {isLogin ? "Welcome Back" : "Hello There"}
                        </h1>
                        <span className="mb-8 font-extralight text-sm lg:text-lg">
                            {isLogin ? "Sign in to continue" : "Create a new account"}
                        </span>

                        <div className="flex flex-col space-y-4 w-full">
                            <AnimatePresence mode="wait">
                                {isLogin ? (
                                    <motion.div key="login" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                                        <Login authData={authData} setAuthData={setAuthData} errors={errors} onSubmit={(e) => handleSubmit(e, true)} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="register" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.3 }}>
                                        <Register authData={authData} setAuthData={setAuthData} errors={errors} onSubmit={(e) => handleSubmit(e, false)} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex items-baseline mt-16 w-full justify-evenly items-center relative">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`relative text-md lg:text-xl px-2 transition-colors text-lg ${!isLogin ? "text-gray-400 font-light" : "text-[#6b3dcb] font-extrabold"
                                    }`}
                            >
                                Sign In
                                {isLogin && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[#6b3dcb] rounded"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                            <div className="border-l border-gray-400 h-5"></div>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`relative text-md lg:text-xl px-2 transition-colors text-lg ${isLogin ? "text-gray-400 font-light" : "text-[#6b3dcb] font-extrabold"
                                    }`}
                            >
                                Sign Up
                                {!isLogin && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[#6b3dcb] rounded"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
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
