// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import { getCurrentUser, AuthData } from "utils/authStorage";

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
