import { useEffect, useState } from "react";
import { getCurrentUser } from "utils/authStorage";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setIsAuthenticated(!!user);
    setIsAuthChecked(true);
  }, []);

  return { isAuthenticated, isAuthChecked };
};