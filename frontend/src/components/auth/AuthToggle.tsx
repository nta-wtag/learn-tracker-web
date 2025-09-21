import React from "react";
import classNames from 'classnames'

interface AuthToggleProps {
  isLoggedin: boolean;
  setIsLoggedin: (val: boolean) => void;
}

const AuthToggle: React.FC<AuthToggleProps> = ({
  isLoggedin,
  setIsLoggedin,
}) => (
  <div className="flex items-baseline mt-16 w-full justify-evenly">
    <button
      onClick={() => setIsLoggedin(true)}
      className={classNames(
        "relative",
        "px-2",
        "transition-colors",
        "lg:text-xl",
        "text-lg",
        {
          "text-[#6b3dcb] font-extrabold": isLoggedin,
          "text-gray-400 font-light": !isLoggedin,
        }
      )}
    >
      Sign In
      {isLoggedin && (
        <div className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[#6b3dcb] rounded" />
      )}
    </button>
    <div className="border-l border-gray-400 h-5"></div>
    <button
      onClick={() => setIsLoggedin(false)}
      className={classNames(
        "relative",
        "px-2",
        "transition-colors",
        "text-md",
        "lg:text-xl",
        "text-lg", 
        {
          "text-[#6b3dcb] font-extrabold": !isLoggedin,
          "text-gray-400 font-light": isLoggedin,
        }
      )}
    >
      Sign Up
      {!isLoggedin && (
        <div className="absolute left-0 right-0 -bottom-1 h-[3px] bg-[#6b3dcb] rounded" />
      )}
    </button>
  </div>
);

export default AuthToggle;
