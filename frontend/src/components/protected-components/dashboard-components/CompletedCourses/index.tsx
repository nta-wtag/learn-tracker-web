import EmptyState from "components/base-components/EmptyState";
import PageHeader from "components/base-components/PageHeader";
import TextCard from "components/base-components/TextCard";

interface CompletedCoursesProps {
  completedCourses: {
    course: string;
    completedAt?: string | null;
  }[];
}

const CompletedCourses: React.FC<CompletedCoursesProps> = ({ completedCourses }) => {
  const badge = "https://www.iconpacks.net/icons/1/free-certificate-icon-1356-thumb.png";

  return (
    <section>
      <PageHeader title="Completed Courses" />
      {completedCourses.length === 0 ? (
        <EmptyState title="You have not completed any course yet" description="Complete courses to show here"/>
      ) : (
        <ul className="gap-4 my-8 grid grid-cols-6">
          {completedCourses.map((c) => (
            <TextCard
              key={c.course}
              courseName={c.course}
              img={badge}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default CompletedCourses;
