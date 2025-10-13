import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from 'components/base-components/Button';
import { Course } from 'types/course-types';
import { getEnrollCoursePath } from 'routes/paths';
import { useCourseEnrollment } from 'hooks/useCourseEnrollment';

interface CourseActionsProps {
    course: Course;
}

const CourseActions: React.FC<CourseActionsProps> = ({ course }) => {
    const navigate = useNavigate();
    const { isEnrolled, enroll } = useCourseEnrollment(course.course);

    const handleEnrollment = () => {
        const { success, message } = enroll();

        if (success) {
            toast.success(message);
        }
        else {
            toast.error(message);
        }
    };

    return (
        <div className="flex gap-4">
            <Button
                text="Lesson Plan"
                variant="secondary"
                onClick={() => navigate(getEnrollCoursePath(course.course), {
                    state: { course }
                })}
            />
            <Button
                text={isEnrolled ? "Enrolled" : "Enroll Now"}
                onClick={handleEnrollment}
                disabled={isEnrolled}
            />
        </div>
    );
}

export default CourseActions;
