import React from "react";
import logo from "/image-removebg-preview.png";
import SidebarNav from "./SidebarNav";

const Sidebar: React.FC = () => (
  <aside className="fixed top-0 left-0 h-screen w-64 flex flex-col shadow-lg rounded-lg bg-white z-500">
    <div className="flex items-center justify-center h-20 space-x-4">
      <img src={logo} alt="LearnTracker Logo" className="h-8 w-8" />
      <h1 className="text-2xl font-bold text-primaryColor">LearnTracker</h1>
    </div>
    <SidebarNav />
  </aside>
);

export default Sidebar;
