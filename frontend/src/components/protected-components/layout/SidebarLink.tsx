import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

interface SidebarLinkProps {
  to: string;
  label: string;
  icon: React.ElementType;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, label, icon: Icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(
          "flex items-center gap-3 px-2 py-2 rounded transition-colors",
          {
            "bg-[#6b3dcb]/10 text-[#6b3dcb]": isActive,
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
