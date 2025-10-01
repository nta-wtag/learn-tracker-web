import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "components/protected-components/layout/Sidebar";
import TopNav from "components/protected-components/layout/TopNav";

const AppLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 p-2">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6 bg-white m-2 rounded-lg shadow-lg">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
