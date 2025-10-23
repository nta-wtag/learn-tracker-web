import React from 'react';
import { Blocks, Hourglass } from 'lucide-react';
import { Course } from 'types/course-types';
import { useCourseInfo } from 'hooks/useCourseInfo';
import StatItem from 'components/base-components/StatItem';

interface CourseStatsProps {
    course: Course;
}

const CourseStats: React.FC<CourseStatsProps> = ({course}) => {
  const { totalLessons, totalDays } = useCourseInfo(course.lessons);

    return (
        <div className="flex flex-col gap-4">
        <img
          src={course.backdrop}
          alt={`${course.course} course thumbnail`}
          className="w-full h-48 object-cover rounded mb-2"
        />
        <h2 className="text-2xl font-bold">{course.course}</h2>
        <div className="flex flex-wrap gap-8">
            <StatItem icon={Blocks} label={`${totalLessons} Lesson${totalLessons === 1 ? "" : "s"}`} />
            <StatItem icon={Hourglass} label={`Duration: ${totalDays} day${totalDays === 1 ? "" : "s"}`} />
        </div>
      </div>
    );
}

export default CourseStats;
