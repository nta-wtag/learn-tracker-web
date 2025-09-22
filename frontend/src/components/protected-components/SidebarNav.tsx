import React from 'react';
import { LayoutDashboard, LibraryBig } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

function SidebarNav(props) {
  return (
    <nav className="flex-grow px-4 py-8 space-y-6 text-gray-400">
      <NavLink to="/dashboard" className={({ isActive }: { isActive: boolean }) =>
        classNames(
          'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
          {
            'bg-[#6b3dcb]/20 text-[#6b3dcb]': isActive,
            'text-gray-400 hover:text-gray-600': !isActive,
          }
        )}>
        <LayoutDashboard />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/courses" className={({ isActive }: { isActive: boolean }) =>
        classNames(
          'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
          {
            'bg-[#6b3dcb]/20 text-[#6b3dcb]': isActive,
            'text-gray-400 hover:text-gray-600': !isActive,
          }
        )}>
        <LibraryBig />
        <span>Courses</span>
      </NavLink>
    </nav>
  );
}

export default SidebarNav;