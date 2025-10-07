import React from "react";
import Button from "components/base-components/Button";
import { useNavigate } from "react-router-dom";
import { useCardContext } from "hooks/useCardContext";
import { useCourseCardValues } from "hooks/useCourseCardValues";
import { isEnrolled } from "utils/course-handler";
import { BookOpen, UserCheck, UserPlus } from "lucide-react";

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
    <div className="flex gap-4 mt-4 w-full">
      <Button
        text="Lesson Plan"
        icon={<BookOpen/>}
        variant="primary"
        onClick={() => navigate(`/${context}/${courseName}`)}
        fullWidth
      />

      {context === "enroll" && (
        <Button
          text={isEnrolled(courseName) ? "Enrolled" : "Enroll Now"}
          icon={isEnrolled(courseName) ? <UserCheck/> : <UserPlus/>}
          onClick={onEnrollClick}
          variant={!isEnrolled(courseName) ? "secondary" : "primary"}
          disabled={isEnrolled(courseName)}
          fullWidth
        />
      )}
    </div>
  );
};

export default CourseActions;
