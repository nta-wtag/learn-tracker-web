import React from "react";
import Button from "components/base-components/Button";
import { Course } from "types/course-types";
import toast from "react-hot-toast";
import { useCourse } from "hooks/useCourseDetails";

interface CourseActionsProps {
  course: Course;
}

const CourseActions: React.FC<CourseActionsProps> = ({ course }) => {
  const { isEnrolled, enroll, navigateToLessons, variant } = useCourse(course);

  const handleEnroll = async () => {
    const result = await enroll();

    const success = result?.success ?? false;
    const message = result?.message ?? "Enrollment failed";

    if (success) {
      toast.success(message);
      return;
    }

    toast.error(message);
  };

  return (
    <div className="flex gap-4">
      <Button
        text="Lesson Plan"
        variant="secondary"
        onClick={navigateToLessons}
      />
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
