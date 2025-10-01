import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/base-components/Button";
import {
  enrollCourseForCurrentUser,
  isEnrolled,
  type Course,
  calculateDaysLessons,
} from "utils/course-handler";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  const { totalLessons, totalDays } = calculateDaysLessons(course.lessons);

  const handleEnrollClick = () => {
    const message = enrollCourseForCurrentUser(course.course);
    alert(message);
  };

  return (
    <div className="bg-white p-6 flex flex-col gap-8 shadow-lg rounded-lg">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold mb-2">{course.course}</h2>
        <p className="text-gray-600">Lessons: {totalLessons}</p>
        <p className="text-gray-600">Estimated Time: {totalDays} day{totalDays === 1 ? "" : "s"}</p>
      </div>
      <div className="flex gap-4">
        <Button
          text="Lesson Plan"
          onClick={() => navigate(`/enroll/${course.course}`)}
        />
        <Button
          text={isEnrolled(course.course) ? "Enrolled" : "Enroll Now"}
          onClick={handleEnrollClick}
          disabled={isEnrolled(course.course)}
        />
      </div>
    </div>
  );
};

export default CourseCard;
