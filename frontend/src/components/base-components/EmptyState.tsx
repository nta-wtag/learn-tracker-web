import React from "react";
import { Link } from "react-router-dom";
import Button from "components/base-components/Button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionLink,
}) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
    <p className="text-gray-500 mb-6">{description}</p>
    {actionText && actionLink && (
      <Link to={actionLink}>
        <Button text={actionText} />
      </Link>
    )}
  </div>
);

export default EmptyState;
