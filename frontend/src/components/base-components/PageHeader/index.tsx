import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => (
  <div>
    <h1 className="text-2xl font-bold" data-testid="header-title">{title}</h1>
    {subtitle && <p className="text-gray-600 mt-2" data-testid="header-subtitle">{subtitle}</p>}
  </div>
);

export default PageHeader;
