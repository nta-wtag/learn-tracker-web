import React from "react";
import Button from "components/base-components/Button";

interface TextCardProps {
  courseName: string;
  enrolledAt: string;
  showButton?: boolean;
  img: string;
}
const TextCard: React.FC<TextCardProps> = ({
  courseName,
  enrolledAt,
  showButton = false,
  img,
}) => {
  return (
    <div
      key={courseName}
      className="text-gray-600 bg-white shadow-lg gap-4 p-8 rounded-lg flex flex-col items-center"
    >
      <img src={img} alt={courseName} className="w-16 h-16" />
      <p className="text-2xl font-bold">{courseName}</p>
      <p className="text-sm text-gray-500">
        Enrolled on <span className="font-bold">{enrolledAt}</span>
      </p>
      {showButton && <Button text="View Course" />}
    </div>
  );
};

export default TextCard;
