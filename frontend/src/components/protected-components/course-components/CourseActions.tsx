import React from "react";
import Button from "components/base-components/Button";
import { Course } from "types/course-types";
import toast from "react-hot-toast";
import { useCourse } from "hooks/useCourse";

interface CourseActionsProps {
  course: Course;
}

const CourseActions: React.FC<CourseActionsProps> = ({ course }) => {
  const { isEnrolled, enroll, goToLessons, variant } = useCourse(course);

  const handleEnroll = () => {
    const { success, message } = enroll();

        if (success) {
            toast.success(message);

            return;
        }
        
        toast.error(message);
    };

  return (
    <div className="flex gap-4">
      <Button text="Lesson Plan" variant="secondary" onClick={goToLessons} />
      {variant === "enroll" && (
        <Button
          text={isEnrolled ? "Enrolled" : "Enroll Now"}
          onClick={handleEnroll}
          disabled={isEnrolled}
        />
      )}
    </div>
  );
};

export default CourseActions;
