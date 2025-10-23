import React from "react";
import { Book, LayoutDashboard, LibraryBig, UserCircle } from "lucide-react";
import { ROUTES } from "routes/paths";
import SidebarLink from "components/protected-components/layout/sidenav/SidebarLink";

const SidebarNav: React.FC = () => {
  const links = [
    { to: ROUTES.DASHBOARD.path, label: ROUTES.DASHBOARD.label, icon: LayoutDashboard },
    { to: ROUTES.COURSES.path, label: ROUTES.COURSES.label, icon: LibraryBig },
    { to: ROUTES.ENROLL.path, label: ROUTES.ENROLL.label, icon: Book },
    { to: ROUTES.PROFILE.path, label: ROUTES.PROFILE.label, icon: UserCircle },
  ];

  return (
    <nav className="flex-grow px-4 py-8 space-y-8 text-gray-400">
      {links.map(({ to, label, icon }) => (
        <SidebarLink
          key={to}
          to={to}
          label={label}
          icon={icon}
        />
      ))}
    </nav>
  );
};

export default SidebarNav;
