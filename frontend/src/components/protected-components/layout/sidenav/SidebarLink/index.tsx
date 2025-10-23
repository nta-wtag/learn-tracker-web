import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { LucideIcon } from "lucide-react";

interface SidebarLinkProps {
  to: string;
  label: string;
  icon: LucideIcon;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, label, icon: Icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(
          "flex items-center gap-4 px-4 py-2 rounded transition-colors font-medium hover:bg-lightPrimaryColor hover: rounded-3xl ",
          {
            "text-primaryColor": isActive,
            "text-gray-400 hover:text-gray-600": !isActive,
          }
        )
      }
    >
      <Icon />
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarLink;
