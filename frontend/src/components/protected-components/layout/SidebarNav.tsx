import React from "react";
import { Book, LayoutDashboard, LibraryBig, UserCircle } from "lucide-react";
import { ROUTES } from "routes/paths";
import SidebarLink from "components/protected-components/layout/SidebarLink";

const SidebarNav: React.FC = () => {
  const links = [
    { to: ROUTES.DASHBOARD.path, label: ROUTES.DASHBOARD.label, icon: LayoutDashboard },
    { to: ROUTES.COURSES.path, label: ROUTES.COURSES.label, icon: LibraryBig },
    { to: ROUTES.ENROLL.path, label: ROUTES.ENROLL.label, icon: Book },
    { to: ROUTES.PROFILE.path, label: ROUTES.PROFILE.label, icon: UserCircle },
  ];

  return (
    <nav className="flex-grow p-4 space-y-4 text-gray-400">
      {links.map(({ to, label, icon: Icon}) => (
        <SidebarLink
          key={to}
          to={to}
          label={label}
          icon={Icon}
        />
      ))}
    </nav>
  );
};

export default SidebarNav;
