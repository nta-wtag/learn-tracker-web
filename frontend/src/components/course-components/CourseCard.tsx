import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book, Clock } from "lucide-react";
import toast from "react-hot-toast";
import type { Course } from "types/course-types";
import { getEnrollCoursePath } from "routes/paths";
import { enrollCourseForCurrentUser, isEnrolled, calculateCourseStats } from "utils/course-handler";
import Button from "components/base-components/Button";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(isEnrolled(course.course));
  const { totalLessons, totalDays } = calculateCourseStats(course.lessons);

  const handleEnroll = () => {
    const message = enrollCourseForCurrentUser(course.course);

    if (message.includes("Successfully")) {
      toast.success(message);
      setEnrolled(true);
    } else {
      toast.error(message);
    }
  };

  const handleViewLessons = () => {
    navigate(getEnrollCoursePath(course.course), { state: { course } });
  };

  return (
    <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col gap-4">
        <img
          src={course.image}
          alt={`${course.course} course thumbnail`}
          className="w-full h-24 object-contain rounded mb-4"
        />
        <h2 className="text-2xl font-bold">{course.course}</h2>

        <div className="flex flex-wrap gap-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Book className="w-4 h-4 text-primaryColor" />
            <span>
              {totalLessons} Lesson{totalLessons === 1 ? "" : "s"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 text-primaryColor" />
            <span>
              Duration: {totalDays} day{totalDays === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          text="Lesson Plan"
          variant="secondary"
          onClick={handleViewLessons}
        />
        <Button
          text={enrolled ? "Enrolled" : "Enroll Now"}
          onClick={handleEnroll}
          disabled={enrolled}
        />
      </div>
    </div>
  );
};

export default CourseCard;
