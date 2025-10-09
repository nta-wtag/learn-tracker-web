import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 p-2">
      <main className="flex-1 overflow-y-auto bg-white m-2 p-6 rounded-lg shadow-lg">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
