import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { useCurrentUserAuth } from "hooks/useCurrentUserAuth";
import { ROUTES } from "routes/paths";
import Spinner from "components/base-components/Spinner";
import AppLayout from "components/protected-components/layout/AppLayout";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const AUTH_MESSAGES = {
  LOGIN_REQUIRED: "Please log in to access this page.",
  UNAUTHORIZED: "You don't have permission to access this page.",
} as const;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, isAuthChecked, currentUser } = useCurrentUserAuth();

  const isAuthorized = 
    !allowedRoles || 
    (currentUser && allowedRoles.includes(currentUser.role));

  useEffect(() => {
    if (!isAuthChecked) {
      return;
    }

    if (!isAuthenticated) {
      toast.error(AUTH_MESSAGES.LOGIN_REQUIRED);
    } else if (!isAuthorized) {
      toast.error(AUTH_MESSAGES.UNAUTHORIZED);
    }
  }, [isAuthChecked, isAuthenticated, isAuthorized]);

  if (!isAuthChecked) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.path} replace />;
  }

  if (!isAuthorized) {
    return <Navigate to={ROUTES.UNAUTHORIZED.path} replace />;
  }

  return (
    <>
      <AppLayout />
      <Toaster />
    </>
  );
};

export default ProtectedRoute;
