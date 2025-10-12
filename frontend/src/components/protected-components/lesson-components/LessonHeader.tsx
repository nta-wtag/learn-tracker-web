import React from 'react';
import Button from 'components/base-components/Button';
import { Course } from 'types/course-types';
import { useEnrollment } from 'hooks/useEnrollment';
import toast from 'react-hot-toast';

interface LessonHeaderProps {
  course: Course;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({ course }) => {
    const {enroll} = useEnrollment(course.course);

    const handleStartLearning = () => {
        const {success, message} = enroll();

        if (success) {
            toast.success(message);
            return;
        }
        toast.error(message);
    };

    return (
        <div className="sticky top-0 z-10 flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4 px-4 py-6">
            <h1 className="text-3xl font-bold">{course.course} - Lesson Plan</h1>
            <Button text="Start Learning" onClick={handleStartLearning} />
        </div>
    );
}

export default LessonHeader;
