import React from "react";
import Button from "components/base-components/Button";
import { useNavigate } from "react-router-dom";

interface Props {
  courseName: string;
  context: "enroll" | "courses";
  isEnrolled: boolean;
  onEnrollClick: () => void;
}

const CourseActions: React.FC<Props> = ({
  courseName,
  context,
  isEnrolled,
  onEnrollClick,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <Button
        text="Lesson Plan"
        variant="primary"
        onClick={() => navigate(`/enroll/${courseName}`)}
      />

      {context === "enroll" && (
        <Button
          text={isEnrolled ? "Enrolled" : "Enroll Now"}
          onClick={onEnrollClick}
          disabled={isEnrolled}
        />
      )}
    </div>
  );
};

export default CourseActions;
