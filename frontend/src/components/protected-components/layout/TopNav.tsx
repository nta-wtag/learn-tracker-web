import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/base-components/Button";
import { getCurrentUser, logout } from "utils/auth-storage";
import { LogOut, UserPlus } from "lucide-react";
import { ROUTES } from "routes/paths";

const TopNav: React.FC = ()=> {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="py-4 px-8 flex justify-between items-center sticky top-0 z-10 shadow bg-white m-2 rounded-lg">
      <p className="text-gray-400">Hey there, {user?.username.toUpperCase()}</p>
      <div className="flex gap-4">
        <Button
          text="Enroll"
          icon = {<UserPlus/>}
          onClick={() => navigate(ROUTES.ENROLL)}
        />
        <Button 
          text="Log out" 
          icon = {<LogOut/>}
          onClick={handleLogout} 
          variant="danger" 
        />
      </div>
    </div>
  );
}

export default TopNav;
