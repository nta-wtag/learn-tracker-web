import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "components/protected-components/layout/sidenav/Sidebar";
import TopNav from "components/protected-components/layout/TopNav";
import { Toaster } from "react-hot-toast";

const AppLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 p-2">
      <Sidebar />
      <div className="flex flex-col flex-1 ml-64">
        <TopNav />
        <main className="flex-1 overflow-y-auto m-2">
          <Outlet />
        </main>
      </div>
      <Toaster/>
    </div>
  );
};

export default AppLayout;
