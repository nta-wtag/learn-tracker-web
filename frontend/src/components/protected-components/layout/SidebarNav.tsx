import React from "react";
import { Book, LayoutDashboard, LibraryBig, UserCircle } from "lucide-react";
import SidebarLink from "components/protected-components/layout/SidebarLink";

const SidebarNav: React.FC = () => {
  const links = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/courses", label: "My Courses", icon: LibraryBig },
    { to: "/enroll", label: "Available Courses", icon: Book },
    { to: "/profile", label: "Profile", icon: UserCircle },
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
