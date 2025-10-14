import ModeButton from "components/base-components/ModeButton";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { type RootState } from "store";
import { toggleMode } from "store/slices/authUiSlice";

const AuthModeSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const isLoginMode = useSelector((state: RootState) => state.authUi.isLoginMode);

  return (
    <div className="flex items-baseline mt-16 w-full justify-evenly">
      <ModeButton
        label="Sign In" 
        active={isLoginMode} 
        onClick={() => dispatch(toggleMode())} 
      />
      <div className="border-l-2 border-gray-400 h-5" />
      <ModeButton
        label="Sign Up" 
        active={!isLoginMode} 
        onClick={() => dispatch(toggleMode())} 
      />
    </div>
  );
};

export default AuthModeSwitcher;
