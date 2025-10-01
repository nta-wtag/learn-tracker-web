import React from "react";
import CourseCardHeader from "components/course-components/course-card-components/CourseCardHeader";
import CourseCardInfo from "components/course-components/course-card-components/CourseCardInfo";
import CourseCardAction from "components/course-components/course-card-components/CourseCardAction";
import { calculateDeadline, calculateDaysLessons } from "utils/course-handler";
import { enrollCourseForCurrentUser, getEnrolledCourses, isEnrolled, type Course } from "utils/course-storage";

interface Props {
  course: Course;
  context: "enroll" | "courses";
}

const CourseCard: React.FC<Props> = ({ course, context }) => {
  const {totalLessons, totalDays} = calculateDaysLessons(course.lessons);

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

  return (
    <div className="bg-white p-6 flex flex-col gap-8 shadow-lg rounded-lg">
      <CourseCardHeader
        title={course.course}
        deadline={deadline}
        isDeadlineOver={isDeadlineOver}
        context={context}
      />

      <CourseCardInfo
        lessonsCount={totalLessons}
        totalDays={totalDays}
        context={context}
        deadline={deadline}
        isDeadlineOver={isDeadlineOver}
      />

      <CourseCardAction
        courseName={course.course}
        context={context}
        isEnrolled={isEnrolled(course.course)}
        onEnrollClick={handleEnrollClick}
      />
    </div>
  );
};

export default CourseCard;
