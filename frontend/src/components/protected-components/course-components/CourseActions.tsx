import React, { useState } from 'react';
import Button from 'components/base-components/Button';
import { Course } from 'types/course-types';
import { useEnrollment } from 'hooks/useEnrollment';
import { useCourseNavigation } from 'hooks/useCourseNavigation';

interface CourseActionsProps {
  course: Course;
}

const CourseActions: React.FC<CourseActionsProps> = ({ course }) => {
    const { isEnrolled, enroll } = useEnrollment(course.course);
    const { goToLessons } = useCourseNavigation(course);

    return (
        <div className="flex gap-4">
            <Button text="Lesson Plan" variant="secondary" onClick={goToLessons} />
            <Button
                text={isEnrolled ? "Enrolled" : "Enroll Now"}
                onClick={enroll}
                disabled={isEnrolled}
            />
        </div>
    );
}

export default CourseActions;
