import React from "react";
import { Course } from "types/course-types";
import ProgressBar from "components/base-components/ProgressBar";
import { useCourseContext } from "hooks/useCourseContext";
import { useCourseProgress } from "hooks/useCourseProgress";
import { EnrolledCourse } from "types/auth-types";
import { useAppSelector } from "redux-toolkit/store";

interface LessonHeaderProps {
  course: Course;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({ course }) => {
  const enrolledCourses = useAppSelector(state => state.enrollment.enrolledCourses);
  const enrollment = enrolledCourses.find(
    (c: EnrolledCourse) => c.courseName === course.course
  );
  const variant = useCourseContext();
  const enrolledData = useCourseProgress(course, enrollment);

  return (
    <div className="sticky top-0 z-10 w-full flex flex-col justify-between items-start sm:items-center gap-4 px-4 py-8">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-3xl font-bold">{course.course} - Lesson Plan</h1>
        {variant === "courses" && enrolledData?.daysLeft !== undefined && (
          <span
            className={`font-semibold ${
              enrolledData?.daysLeft < 7 ? "text-red-500" : "text-gray-800"
            }`}
          >
            {enrolledData.daysLeft} Days Remaining
          </span>
        )}
      </div>

      {variant === "courses" && enrollment && enrolledData && (
        <ProgressBar
          progressPercent={enrolledData ? enrolledData.progressPercent : 0}
          className="w-full"
          height={8}
        />
      )}
    </div>
  );
};

export default LessonHeader;
