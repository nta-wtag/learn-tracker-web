import React from "react";
import Button from "components/base-components/Button";
import { useNavigate } from "react-router-dom";
import { enrollCourseForCurrentUser } from "utils/course-handler";
import { isEnrolled } from "utils/course-handler";

export interface Module {
  title: string;
  estDays: number;
  resources: string[];
}

export interface Week {
  week: number;
  modules: Module[];
}

export interface Course {
  course: string;
  lessons: Week[];
}

interface Props {
  course: Course;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  const navigate = useNavigate();

  const totalLessons = course.lessons.reduce(
    (sum, week) => sum + week.modules.length,
    0
  );

  const totalDays = course.lessons.reduce(
    (sum, week) =>
      sum + week.modules.reduce((s, m) => s + m.estDays, 0),
    0
  );

  const handleEnrollClick = () => {
    const message = enrollCourseForCurrentUser(course.course);
    alert(message);
  };


  return (
    <div className="bg-white p-6 flex flex-col gap-8 shadow-lg rounded-lg">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold mb-2">{course.course}</h2>
        <p className="text-gray-600">Lessons: {totalLessons}</p>
        <p className="text-gray-600">Estimated Time: {totalDays} day(s)</p>
      </div>
      <div className="flex gap-4">
        <Button
          text="Lesson Plan"
          variant="primary"
          onClick={() => navigate(`/enroll/${course.course}`)}
        />
        <Button
          text={isEnrolled(course.course)?"Enrolled":"Enroll Now"}
          onClick={handleEnrollClick}
          disabled = {isEnrolled(course.course)}
        />

      </div>
    </div>
  );
};

export default CourseCard;
