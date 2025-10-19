import StatCard from 'components/base-components/StatCard';
import { Book, Check, CircleCheck } from 'lucide-react';

function UserStats({progress, enrolledCoursesCount, completedCoursesCount}) {
    return (
        <section className="grid grid-cols-3 gap-4 my-8">
            <StatCard
                icon={CircleCheck}
                text="Overall Progress"
                count={progress}
            />
            <StatCard
                icon={Book}
                text="Enrolled Courses"
                count={enrolledCoursesCount}
            />
            <StatCard
                icon={Check}
                text="Completed Courses"
                count={completedCoursesCount}
            />
        </section>
    );
}

export default UserStats;