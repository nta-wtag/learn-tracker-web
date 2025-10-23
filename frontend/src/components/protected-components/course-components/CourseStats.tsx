import React from 'react';
import { Book, Clock } from 'lucide-react';
import { Course } from 'types/course-types';
import StatItem from 'components/base-components/StatItem';

interface CourseStatsProps {
    course: Course;
}

const CourseStats: React.FC<CourseStatsProps> = ({course}) => {
    return (
        <div className="flex flex-col gap-4">
        <img
          src={course.image}
          alt={`${course.course} course thumbnail`}
          className="w-full h-24 object-contain rounded mb-4"
        />
        <h2 className="text-2xl font-bold">{course.course}</h2>
        <div className="flex flex-wrap gap-8">
            <StatItem icon={Book} label={"6 Lessons"} />
            <StatItem icon={Clock} label={"7 days"} />
        </div>
      </div>
    );
}

export default CourseStats;
