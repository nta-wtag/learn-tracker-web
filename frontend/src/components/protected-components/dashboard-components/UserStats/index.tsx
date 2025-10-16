import StatCard from 'components/base-components/StatCard';
import { Book, Check, CircleCheck } from 'lucide-react';
import React from 'react';

function UserStats({progress, enrolledCourses, completedCourses}) {
    return (
        <section className="flex gap-4 my-8 w-full">
            <StatCard
                icon={CircleCheck}
                text="Overall Progress"
                count={progress}
            />
            <StatCard
                icon={Book}
                text="Enrolled Courses"
                count={enrolledCourses}
            />
            <StatCard
                icon={Check}
                text="Completed Courses"
                count={completedCourses}
            />
        </section>
    );
}

export default UserStats;