import React from "react";
import ToggleButton from "components/base-components/ToggleButton";

interface AuthToggleButtonProps {
  isLoggedin: boolean;
  setIsLoggedin: (val: boolean) => void;
}

const AuthToggleButton: React.FC<AuthToggleButtonProps> = ({ isLoggedin, setIsLoggedin }) => (
  <div className="flex items-baseline mt-16 w-full justify-evenly">
    <ToggleButton 
      label="Sign In" 
      active={isLoggedin} 
      onClick={() => setIsLoggedin(true)} 
    />
    <div className="border-l border-gray-400 h-5" />
    <ToggleButton 
      label="Sign Up" 
      active={!isLoggedin} 
      onClick={() => setIsLoggedin(false)} 
    />
  </div>
);

export default AuthToggleButton;
