import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "store";
import { setLoginMode } from "store/slices/authUiSlice";

import ToggleButton from "components/base-components/ToggleButton";

const AuthToggleButton: React.FC = () => {
  const dispatch = useDispatch();
  const isLoginMode = useSelector((state: RootState) => state.authUi.isLoginMode);

  return (
    <div className="flex items-baseline mt-16 w-full justify-evenly">
      <ToggleButton 
        label="Sign In" 
        active={isLoginMode} 
        onClick={() => dispatch(setLoginMode(true))} 
      />
      <div className="border-l-2 border-gray-400 h-5" />
      <ToggleButton 
        label="Sign Up" 
        active={!isLoginMode} 
        onClick={() => dispatch(setLoginMode(false))} 
      />
    </div>
  );
};

export default AuthToggleButton;
