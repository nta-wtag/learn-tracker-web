import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import Sidebar from "components/protected-components/Sidebar";
import TopNav from "components/protected-components/TopNav";

interface Props {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<Props> = ({ allowedRoles }) => {
  const { isAuthenticated, isAuthChecked } = useAuth();

  if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-[#6b3dcb] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    alert("Please log in to access this page.");
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes("USER")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>

  );
};

export default ProtectedRoute;
