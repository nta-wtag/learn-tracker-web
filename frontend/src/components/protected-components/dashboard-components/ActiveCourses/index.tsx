import CardWithProgress from "components/base-components/CardWithProgress";
import EmptyState from "components/base-components/EmptyState";
import PageHeader from "components/base-components/PageHeader";

interface ActiveCoursesProps {
  courseInfos: {
    course: string;
    progressPercent: number;
    deadline?: string;
    daysLeft?: number;
    isDeadlineOver?: boolean;
    image: string;
  }[];
}

const ActiveCourses: React.FC<ActiveCoursesProps> = ({ courseInfos }) => {
  return (
    <section>
      <PageHeader title="Active Courses" />
      {courseInfos.length === 0 ? (
        <EmptyState
          title="You are not enrolled into any courses"
          description="Enroll in courses to show here"
        />
      ) : (
        <div className="grid grid-cols-4 gap-4 my-4">
          {courseInfos.map((c) => (
            <div className="flex flex-col items-center">
              <CardWithProgress
                course={c.course}
                progressPercent={c.progressPercent}
                deadline={c.deadline}
                daysLeft={c.daysLeft}
                image={c.image}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ActiveCourses;
