import React from "react";
import AuthToggleButton from "./AuthToggleButton";

interface AuthToggleProps {
  isLoggedin: boolean;
  setIsLoggedin: (val: boolean) => void;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ isLoggedin, setIsLoggedin }) => (
  <div className="flex items-baseline mt-16 w-full justify-evenly">
    <AuthToggleButton active={isLoggedin} label="Sign In" onClick={() => setIsLoggedin(true)} />
    <div className="border-l border-gray-400 h-5"></div>
    <AuthToggleButton active={!isLoggedin} label="Sign Up" onClick={() => setIsLoggedin(false)} />
  </div>
);

export default AuthToggle;
