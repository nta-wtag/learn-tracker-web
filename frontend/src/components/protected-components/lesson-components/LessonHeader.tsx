import React from 'react';
import Button from 'components/base-components/Button';
import { Course } from 'types/course-types';
import { useCourseEnrollment } from 'hooks/useCourseEnrollment';
import toast from 'react-hot-toast';
import ProgressBar from 'components/base-components/ProgressBar';
import { useUserEnrolledCourses } from 'hooks/useUserEnrolledCourses';
import { useCourseContext } from 'hooks/useCourseContext';
import { useCourseInfo } from 'hooks/useCourseInfo';

interface LessonHeaderProps {
    course: Course;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({ course }) => {
    const { enroll } = useCourseEnrollment(course.course);
    const { enrolledCourses } = useUserEnrolledCourses();
    const enrollment = enrolledCourses.find((c) => c.courseName === course.course);
    const variant = useCourseContext();
    const enrolledData = useCourseInfo(course, enrollment);

    const handleStartLearning = () => {
        const { success, message } = enroll();

        if (success) {
            toast.success(message);
            return;
        }
        toast.error(message);
    };

    return (
        <div className="sticky top-0 z-10 w-full flex flex-col justify-between items-start sm:items-center gap-4 px-4 py-8">
            <div className='flex w-full justify-between items-center'>
                <h1 className="text-3xl font-bold">{course.course} - Lesson Plan</h1>
                {variant === 'courses' ? (
                    enrolledData?.daysLeft && (
                        <span
                            className={`font-semibold ${enrolledData?.daysLeft < 7 ? 'text-red-500' : 'text-gray-800'
                                }`}
                        >
                            {enrolledData.daysLeft} Days Remaining
                        </span>
                    )
                ) : (
                    <Button text="Start Learning" onClick={handleStartLearning} />
                )}
            </div>

            {variant === 'courses' && enrollment && enrolledData && (
                <ProgressBar
                    progressPercent={enrolledData ? (enrolledData.progressPercent) : 0}
                    className="w-full"
                    height={8}
                />
            )}
        </div>
    );
}

export default LessonHeader;
