import { useEffect, useState } from "react";
import { getCurrentUser, type AuthData } from "utils/auth-storage";

export const useCurrentUserAuth = () => {
  const [currentUser, setCurrentUser] = useState<AuthData | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const storedUser = getCurrentUser();

    if (storedUser) {
      setCurrentUser(storedUser);
    }
    
    setIsAuthChecked(true);
  }, []);

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    isAuthChecked,
  };
};
