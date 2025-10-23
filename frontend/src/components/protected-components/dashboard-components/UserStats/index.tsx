import PageHeader from 'components/base-components/PageHeader';
import StatCard from 'components/base-components/StatCard';
import { Book, Check, CircleCheck } from 'lucide-react';

interface UserStatsProps {
  progress: string;
  enrolledCoursesCount: number;
  completedCoursesCount: number;
}

const UserStats: React.FC<UserStatsProps> = ({progress, enrolledCoursesCount, completedCoursesCount}) => {
    return (
        <div>
            <PageHeader title="Your Statistics" />
            <section className="grid grid-cols-3 gap-4 my-4">
            <StatCard
                icon={CircleCheck}
                text="Overall Progress"
                count={progress.toString()}
            />
            <StatCard
                icon={Book}
                text="Enrolled Courses"
                count={enrolledCoursesCount.toString()}
            />
            <StatCard
                icon={Check}
                text="Completed Courses"
                count={completedCoursesCount.toString()}
            />
        </section>
        </div>
    );
}

export default UserStats;
