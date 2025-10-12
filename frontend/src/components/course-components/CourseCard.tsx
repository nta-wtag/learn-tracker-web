import React from "react";
import { useNavigate } from "react-router-dom";
import { Book, Clock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import Button from "components/base-components/Button";
import { getEnrollCoursePath } from "routes/paths";
import { Course } from "types/course-types";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    toast.success(`You are now enrolled in ${course.course}!`);
  };

  return (
    <div className="bg-white p-6 flex flex-col gap-8 shadow-lg rounded-lg">
      <div className="flex flex-col gap-2 w-full">
        <img
          src={course.image}
          alt={course.course}
          className="w-full h-40 object-fit mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{course.course}</h2>
        <div className="flex items-center gap-2">
          <Book className="w-4 h-4 text-primaryColor" />
          <p className="text-gray-600">6 Lessons</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primaryColor" />
          <p className="text-gray-600">Duration: 12 days</p>
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          text="Lesson Plan"
          variant="secondary"
          onClick={() => navigate(getEnrollCoursePath(course.course), {
    state: { course }
  })}
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
