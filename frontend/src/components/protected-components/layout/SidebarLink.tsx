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
          "flex items-center gap-4 p-4 rounded transition-colors font-medium ",
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
