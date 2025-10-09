import React from "react";
import { Book, LayoutDashboard, LibraryBig, UserCircle } from "lucide-react";
import SidebarLink from "components/protected-components/layout/SidebarLink";
import { ROUTES } from "routes/paths";

const SidebarNav: React.FC = () => {
  const links = [
    { to: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
    { to: ROUTES.COURSES, label: "My Courses", icon: LibraryBig },
    { to: ROUTES.ENROLL, label: "Available Courses", icon: Book },
    { to: ROUTES.PROFILE, label: "Profile", icon: UserCircle },
  ];

  return (
    <nav className="flex-grow p-4 space-y-4 text-gray-400">
      {links.map((link) => (
        <SidebarLink
          key={link.to}
          to={link.to}
          label={link.label}
          icon={link.icon}
        />
      ))}
    </nav>
  );
};

export default SidebarNav;
