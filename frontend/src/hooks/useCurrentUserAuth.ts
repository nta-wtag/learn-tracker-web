import { useEffect, useState } from "react";
import { AuthData } from "types/auth-types";
import { getCurrentUser } from "utils/auth-storage";

export const useCurrentUserAuth = () => {
  const [currentUser, setCurrentUser] = useState<AuthData | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const storedUser = getCurrentUser();
    
    setCurrentUser(storedUser);    
    setIsAuthChecked(true);
  }, []);

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    isAuthChecked,
  };
};
