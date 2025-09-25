import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import LoadingScreen from "components/base-components/LoadingScreen";
import AppLayout from "components/layout/AppLayout";

interface Props {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<Props> = ({ allowedRoles }) => {
  const { isAuthenticated, isAuthChecked } = useAuth();

  if (!isAuthChecked) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    alert("Please log in to access this page.");
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && !allowedRoles.includes("USER")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <AppLayout />;
};

export default ProtectedRoute;