import React from "react";
import Button from "components/base-components/Button";
import { useNavigate } from "react-router-dom";
import { useCardContext } from "hooks/useCardContext";
import { useCourseCardValues } from "hooks/useCourseCardValues";
import { isEnrolled } from "utils/course-handler";

interface Props {
  onEnrollClick: () => void;
}

const CourseActions: React.FC<Props> = ({
  onEnrollClick,
}) => {
  const navigate = useNavigate();
  const context = useCardContext()
  const { courseName} = useCourseCardValues();
  
  return (
    <div className="flex gap-4 mt-4">
      <Button
        text="Lesson Plan"
        variant="primary"
        onClick={() => navigate(`/${context}/${courseName}`)}
      />

      {context === "enroll" && (
        <Button
          text={isEnrolled(courseName) ? "Enrolled" : "Enroll Now"}
          onClick={onEnrollClick}
          disabled={isEnrolled(courseName)}
        />
      )}
    </div>
  );
};

export default CourseActions;
