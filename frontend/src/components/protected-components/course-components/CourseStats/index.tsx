import React from 'react';
import { Book, BookCheck, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Course } from 'types/course-types';
import StatItem from 'components/base-components/StatItem';
import { useCourse } from 'hooks/useCourseDetails';

interface CourseStatsProps {
  course: Course;
}

const CourseStats: React.FC<CourseStatsProps> = ({ course }) => {
  const { variant, courseInfo, enrollment } = useCourse(course);

  const getCourseStatus = () => {
    if (!courseInfo || !enrollment) {
      return null;
    }

    const { completedModules, totalLessons, isDeadlineOver } = courseInfo;

    if (completedModules === totalLessons && totalLessons > 0) {
      return { label: "Completed", color: "bg-green-100 text-green-700", icon: CheckCircle };
    }

    if (isDeadlineOver) {
      return { label: "Time Over", color: "bg-red-100 text-red-700", icon: AlertCircle };
    }

    return { label: "On Time", color: "bg-yellow-100 text-yellow-700", icon: Clock };
  };

  const status = getCourseStatus();

  return (
    <div className="flex flex-col gap-4">
      <img
        src={course.backdrop}
        alt={`${course.course} course thumbnail`}
        className="w-full h-48 object-cover rounded mb-2"
      />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{course.course}</h2>
        {variant==='courses' && status && (
          <span
            className={`flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full ${status.color}`}
          >
            <status.icon size={16} />
            {status.label}
          </span>
        )}
      </div>

      {variant === 'courses' ? (
        <div className="flex gap-8">
          <StatItem
            icon={BookCheck}
            label={`${courseInfo?.completedModules}/${courseInfo?.totalLessons} Lesson${
              courseInfo?.totalLessons === 1 ? "" : "s"
            }`}
          />
          <StatItem icon={Clock} label={`Due: ${courseInfo?.deadline}`} />
        </div>
      ) : (
        <div className="flex gap-8">
          <StatItem
            icon={Book}
            label={`${courseInfo?.totalLessons} Lesson${
              courseInfo?.totalLessons === 1 ? "" : "s"
            }`}
          />
          <StatItem
            icon={Clock}
            label={`Duration: ${courseInfo?.totalDays} day${
              courseInfo?.totalDays === 1 ? "" : "s"
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default CourseStats;
