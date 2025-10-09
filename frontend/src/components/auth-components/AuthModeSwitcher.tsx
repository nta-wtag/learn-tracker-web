import React from "react";
import ModeButton from "components/base-components/ModeButton";

interface AuthModeSwitcherProps {
  isLoginMode: boolean;
  setIsLoginMode: (val: boolean) => void;
}

const AuthModeSwitcher: React.FC<AuthModeSwitcherProps> = ({ isLoginMode, setIsLoginMode }) => (
  <div className="flex items-baseline mt-16 w-full justify-evenly">
    <ModeButton 
      label="Sign In" 
      active={isLoginMode} 
      onClick={() => setIsLoginMode(true)} 
    />
    <div className="border-l-2 border-gray-400 h-5" />
    <ModeButton 
      label="Sign Up" 
      active={!isLoginMode} 
      onClick={() => setIsLoginMode(false)} 
    />
  </div>
);

export default AuthModeSwitcher;
