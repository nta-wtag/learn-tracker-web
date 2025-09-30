import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 p-2">
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto p-6 bg-white m-2 rounded-lg shadow-lg">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
