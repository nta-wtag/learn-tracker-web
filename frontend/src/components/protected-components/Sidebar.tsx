import React from "react";
import logo from '/image-removebg-preview.png'
import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";


const Sidebar: React.FC = () => {
  return (
    <div className="flex min-h-screen font-display">
      <aside className="w-64 flex flex-col flex-shrink-0 shadow-xl transition-all duration-300">
        
        <div className="flex items-center justify-center h-20 space-x-4">
        <img src={logo} className="h-8 w-8"/>
          <h1 className="text-2xl font-bold text-[#6b3dcb]">LearnTracker</h1>
        </div>

        <SidebarNav/>
        <SidebarFooter/>

      </aside>
    </div>
  );
};

export default Sidebar;