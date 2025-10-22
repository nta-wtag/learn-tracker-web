import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => (
  <div>
    <h1 className="text-2xl font-semibold text-gray-600">{title}</h1>
    {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
  </div>
);

export default PageHeader;
