import StatCard from 'components/base-components/StatCard';
import { i } from 'framer-motion/dist/types.d-BJcRxCew';
import { Book, Check, CircleCheck } from 'lucide-react';

interface UserStatsProps {
  progress: string;
  enrolledCoursesCount: number;
  completedCoursesCount: number;
}

const UserStats: React.FC<UserStatsProps> = ({progress, enrolledCoursesCount, completedCoursesCount}) => {
    return (
        <section className="grid grid-cols-3 gap-4 my-8">
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
    );
}

export default UserStats;