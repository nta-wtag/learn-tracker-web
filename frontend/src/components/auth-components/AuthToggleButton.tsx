import React from "react";
import ToggleButton from "components/base-components/ToggleButton";

interface AuthToggleButtonProps {
  isLoginMode: boolean;
  setIsLoginMode: (val: boolean) => void;
}

const AuthToggleButton: React.FC<AuthToggleButtonProps> = ({ isLoginMode, setIsLoginMode }) => (
  <div className="flex items-baseline mt-16 w-full justify-evenly">
    <ToggleButton 
      label="Sign In" 
      active={isLoginMode} 
      onClick={() => setIsLoginMode(true)} 
    />
    <div className="border-l border-gray-400 h-5" />
    <ToggleButton 
      label="Sign Up" 
      active={!isLoginMode} 
      onClick={() => setIsLoginMode(false)} 
    />
  </div>
);

export default AuthToggleButton;
