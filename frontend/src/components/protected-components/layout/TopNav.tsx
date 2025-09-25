import React from "react";
import Button from "components/base-components/Button";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "utils/authStorage";

function TopNav() {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

  return (
    <div className="w-full py-4 px-8 flex justify-between items-center sticky top-0 z-10 shadow bg-white">
      <p className="text-gray-400">Hey there, {user?.username.toUpperCase()}</p>
      <Button text="Enroll on a course" onClick={() => navigate("/courses")} />
    </div>
  );
}

export default TopNav;
