import React from "react";
import ModeButton from "components/base-components/ModeButton";
import { toggleLoginMode } from "redux-toolkit/slices/authSlice";
import { useAuth } from "hooks/useAuth";
import { useAppDispatch } from "redux-toolkit/store";

const AuthModeSwitcher: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoginMode } = useAuth();

  return (
    <div className="flex items-baseline mt-16 w-full justify-evenly">
      <ModeButton
        label="Sign In" 
        active={isLoginMode} 
        onClick={() => dispatch(toggleLoginMode())} 
      />
      <div className="border-l-2 border-gray-400 h-5" />
      <ModeButton
        label="Sign Up" 
        active={!isLoginMode} 
        onClick={() => dispatch(toggleLoginMode())} 
      />
    </div>
  );
};

export default AuthModeSwitcher;
