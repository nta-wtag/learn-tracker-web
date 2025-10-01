import React from "react";
import CourseCardHeader from "components/course-components/course-card-components/CourseCardHeader";
import CourseCardInfo from "components/course-components/course-card-components/CourseCardInfo";
import CourseCardAction from "components/course-components/course-card-components/CourseCardAction";
import { calculateDeadline, calculateDaysLessons } from "utils/course-handler";
import { enrollCourseForCurrentUser, getEnrolledCourses, isEnrolled, type Course } from "utils/course-storage";
import { CourseCardProvider } from "hooks/useCourseCardValues";

interface Props {
  course: Course;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  const { totalLessons, totalDays } = calculateDaysLessons(course.lessons);

  const enrolledCourses = getEnrolledCourses();
  const enrolledCourse = enrolledCourses.find(
    (c) => c.courseName === course.course
  );

  const deadline = enrolledCourse
    ? calculateDeadline(enrolledCourse.enrolledAt, totalDays)
    : null;

  const handleEnrollClick = () => {
    const message = enrollCourseForCurrentUser(course.course);
    alert(message);
  };

  const isDeadlineOver = deadline ? new Date() > new Date(deadline) : false;

  const cardValues = {
    totalLessons,
    totalDays,
    deadline,
    isDeadlineOver,
    courseName: course.course,
  };

  return (
    <CourseCardProvider values={cardValues}>
    <div className="bg-white p-6 flex flex-col gap-8 shadow-lg rounded-lg">
      <CourseCardHeader />
      <CourseCardInfo />
      <CourseCardAction onEnrollClick={handleEnrollClick} />
    </div>
  </CourseCardProvider>
  );
};

export default CourseCard;
