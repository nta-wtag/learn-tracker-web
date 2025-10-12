import React from 'react';
import Button from 'components/base-components/Button';
import { Course } from 'types/course-types';
import { useCourseCardVariant } from 'hooks/useCourseCardVariant';
import { useEnrollment } from 'hooks/useEnrollment';
import { useCourseNavigation } from 'hooks/useCourseNavigation';
import toast from 'react-hot-toast';

interface CourseActionsProps {
    course: Course;
}

const CourseActions: React.FC<CourseActionsProps> = ({ course }) => {
    const { isEnrolled, enroll } = useEnrollment(course.course);
    const { goToLessons } = useCourseNavigation(course);
    const variant = useCourseCardVariant();

    const handleEnroll = () => {
        const { success, message } = enroll();

        if (success) {
            toast.success(message);
        }
        else {
            toast.error(message);
        }
    }

    return (
        <div className="flex gap-4">
            <Button text="Lesson Plan" variant="secondary" onClick={goToLessons} />
            {variant === 'enroll' && <Button
                text={isEnrolled ? "Enrolled" : "Enroll Now"}
                onClick={handleEnroll}
                disabled={isEnrolled}
            />
            }
        </div>
    );
}

export default CourseActions;
