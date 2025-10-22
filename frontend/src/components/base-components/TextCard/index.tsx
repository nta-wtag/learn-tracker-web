import React from "react";
import Button from "components/base-components/Button";
import { useNavigate } from "react-router-dom";
import { getCoursePath } from "routes/paths";

interface TextCardProps {
  courseName: string;
  enrolledAt?: string;
  showButton?: boolean;
  img: string;
}
const TextCard: React.FC<TextCardProps> = ({
  courseName,
  enrolledAt,
  showButton = false,
  img,
}) => {
  const navigate = useNavigate();

  const navigateToCourse = () => {
    navigate(getCoursePath(courseName));
  }

  return (
    <div
      key={courseName}
      className="text-gray-600 bg-white shadow-lg gap-4 p-8 rounded-lg flex flex-col items-center"
    >
      <img src={img} alt={courseName} className="w-16 h-16" />
      <span className="text-2xl font-bold font-montserrat">{courseName}</span>
      {enrolledAt && (
        <span className="text-sm text-gray-500">
          Enrolled on <span className="font-bold font-poppins">{enrolledAt}</span>
        </span>
      )}
      {showButton && <Button text="View Course" onClick={navigateToCourse} />}
    </div>
  );
};

export default TextCard;
