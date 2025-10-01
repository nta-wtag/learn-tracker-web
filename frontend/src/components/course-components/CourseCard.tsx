import React from "react";
import Button from "components/base-components/Button";
import { useNavigate } from "react-router-dom";

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

  const handleStartLearning = () => {
    if (!course) return;

    alert(`You are now enrolled in ${course.course}!`);
    navigate("/");
  };

  return (
    <div className="bg-white p-6 flex flex-col gap-8 shadow-lg rounded-lg">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold mb-2">{course.course}</h2>
        <p className="text-gray-600">Lessons: 6</p>
        <p className="text-gray-600">Estimated Time: 12 days</p>
      </div>
      <div className="flex gap-4">
        <Button
          text="Lesson Plan"
          variant="secondary"
          onClick={() => navigate(`/enroll/${course.course}`)}
        />
        <Button
          text="Enroll"
          onClick={handleStartLearning}
        />
      </div>
    </div>
  );
};

export default CourseCard;
