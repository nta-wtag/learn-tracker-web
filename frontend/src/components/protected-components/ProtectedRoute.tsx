import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { useCurrentUserAuth } from "hooks/useCurrentUserAuth";
import Spinner from "components/base-components/Spinner";
import AppLayout from "components/protected-components/layout/AppLayout";

interface Props {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<Props> = ({ allowedRoles }) => {
  const { isAuthenticated, isAuthChecked, currentUser } = useCurrentUserAuth();

  useEffect(() => {
    if (isAuthChecked && !isAuthenticated) {
      toast.error("Please log in to access this page.");
    }

    if (
      isAuthChecked &&
      isAuthenticated &&
      allowedRoles &&
      currentUser &&
      !allowedRoles.includes(currentUser.role)
    ) {
      toast.error("Login to access this page.");
    }
  }, [isAuthChecked, isAuthenticated, currentUser, allowedRoles]);

  if (!isAuthChecked) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && currentUser && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <>
      <AppLayout />
      <Toaster />
    </>
  );
};

export default ProtectedRoute;
