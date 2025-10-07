import React from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  calculateDaysLeft,
  calculateDaysLessons,
  calculateDeadline,
  enrollCourseForCurrentUser,
  type Course,
} from "utils/course-handler";
import { getEnrolledCourses } from "utils/course-storage";
import { type RootState } from "store";
import CourseCardHeader from "./CourseCardHeader";
import CourseCardInfo from "./CourseCardInfo";
import CourseCardAction from "./CourseCardAction";
import { CourseCardProvider } from "hooks/useCourseCardValues";
import ProgressBar from "components/base-components/ProgressBar";
import { calculateCourseProgress } from "utils/course-handler";

interface Props {
  course: Course;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  const enrolledCourses = getEnrolledCourses();
  const completedLessons = useSelector(
    (state: RootState) => state.lesson.completedLessons
  );

  const enrolledCourse = enrolledCourses.find(
    (c) => c.courseName === course.course
  );

  const { totalLessons, totalDays } = calculateDaysLessons(course.lessons);

  const deadline = enrolledCourse
    ? calculateDeadline(enrolledCourse.enrolledAt, totalDays)
    : null;

  const handleEnrollClick = () => {
    const result = enrollCourseForCurrentUser(course.course);
    if (result.success) {
      toast.success(result.message || "Something went wrong");
    } else {
      toast.error(result.message || "Something went wrong");
    }
  };

  const isDeadlineOver = deadline ? new Date() > new Date(deadline) : false;
  const daysLeft = enrolledCourse
    ? calculateDaysLeft(enrolledCourse.enrolledAt, totalDays)
    : undefined;

  const cardValues = {
    totalLessons,
    totalDays,
    deadline,
    isDeadlineOver,
    daysLeft,
    courseName: course.course,
  };

  const { totalModules, completedModules, progressPercent } =
    calculateCourseProgress(course, completedLessons);

  return (
    <div>
      <CourseCardProvider values={cardValues}>
      <div className="bg-white p-6 flex flex-col gap-2 shadow-lg rounded-lg text-sm w-full ">
        <CourseCardHeader />
        <CourseCardInfo />
        {enrolledCourse && (
          <ProgressBar
            progressPercent={progressPercent}
            completedModules={completedModules}
            totalModules={totalModules}
          />
        )}
        <CourseCardAction onEnrollClick={handleEnrollClick} />
      </div>
    </CourseCardProvider>
    <Toaster />
    </div>
  );
};

export default CourseCard;
