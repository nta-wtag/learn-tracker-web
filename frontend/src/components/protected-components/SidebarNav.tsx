import React from 'react';
import { LayoutDashboard, LibraryBig } from 'lucide-react';

function SidebarNav(props) {
    return (
        <nav className="flex-grow px-4 py-8 space-y-6 text-gray-400">
          <a className="flex items-center gap-3 px-4 py-2 hover:text-gray-600">
            <LayoutDashboard/>
            <span>Dashboard</span>
          </a>

          <a className="flex items-center gap-3 px-4 py-2 hover:text-gray-600">
            <LibraryBig/>
            <span>Courses</span>
          </a>
        </nav>
    );
}

export default SidebarNav;