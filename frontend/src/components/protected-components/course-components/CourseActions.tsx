import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from 'components/base-components/Button';
import { Course } from 'types/course-types';
import { getEnrollCoursePath } from 'routes/paths';

interface CourseActionsProps {
    course: Course;
}

const CourseActions: React.FC<CourseActionsProps> = ({ course }) => {
    const navigate = useNavigate();

    const handleStartLearning = () => {
        toast.success(`You are now enrolled in ${course.course}!`);
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
                text="Enroll"
                onClick={handleStartLearning}
            />
        </div>
    );
}

export default CourseActions;
