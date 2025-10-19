import CardWithProgress from "components/base-components/CardWithProgress";
import EmptyState from "components/base-components/EmptyState";
import PageHeader from "components/base-components/PageHeader";

function ActiveCourses({ courseInfos }) {
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
                isDeadlineOver={c.isDeadlineOver}
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
