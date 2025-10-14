import React from 'react';
import { Book, Clock } from 'lucide-react';
import { Course } from 'types/course-types';
import StatItem from 'components/base-components/StatItem';
import { useUserEnrolledCourses } from 'hooks/useUserEnrolledCourses';
import { useCourseInfo } from 'hooks/useCourseInfo';
import { useCourseContext } from 'hooks/useCourseContext';

interface CourseStatsProps {
    course: Course;
}

const CourseStats: React.FC<CourseStatsProps> = ({ course }) => {
    const { enrolledCourses } = useUserEnrolledCourses();
    const enrollment = enrolledCourses.find((c) => c.courseName === course.course);
    const variant = useCourseContext();

    // Calculate deadline data only for enrolled courses
    const enrolledData = useCourseInfo(course, enrollment);

    return (
        <div className="flex flex-col gap-4">
            <img
                src={course.image}
                alt={`${course.course} course thumbnail`}
                className="w-full h-24 object-contain rounded mb-4"
            />
            <h2 className="text-2xl font-bold">{course.course}</h2>
            <div className="flex gap-8">
                <StatItem icon={Book} label={`${enrolledData?.totalLessons} Lesson${enrolledData?.totalLessons === 1 ? "" : "s"}`} />
                {variant === 'enroll' ?
                    (
                        <StatItem icon={Clock} label={`Duration: ${enrolledData?.totalDays} day${enrolledData?.totalDays === 1 ? "" : "s"}`} />
                    ) : (
                        <StatItem icon={Clock} label={`Due: ${enrolledData?.deadline} `} />
                    )
                }
            </div>
        </div>
    );
}

export default CourseStats;
