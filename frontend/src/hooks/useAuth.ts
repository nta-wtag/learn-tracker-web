import { useEffect, useState } from "react";
import { getCurrentUser, type AuthData } from "utils/auth-storage";

export const useAuth = () => {
  const [user, setUser] = useState<AuthData | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsAuthChecked(true);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isAuthChecked,
  };
};
