import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, UserPlus } from "lucide-react";

import Button from "components/base-components/Button";
import { getCurrentUser, removeUser } from "utils/auth-storage";
import { ROUTES } from "routes/paths";

const TopNav: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleEnroll = () => {
    navigate(ROUTES.ENROLL.path);
  };

  const handleLogout = () => {
    removeUser();
    navigate(ROUTES.AUTH.path, { replace: true });
  };

  return (
    <div className="py-4 px-8 flex justify-between items-center sticky top-0 z-100 shadow bg-white m-2 rounded-lg">
      <p className="text-gray-400">
        Hey there, <span className="font-semibold">{user?.username}</span>
      </p>
      <div className="flex gap-4">
        <Button
          text="Enroll"
          icon={<UserPlus />}
          onClick={handleEnroll}
        />
        <Button
          text="Log out"
          icon={<LogOut />}
          onClick={handleLogout}
          variant="danger"
        />
      </div>
    </div>
  );
}

export default TopNav;
