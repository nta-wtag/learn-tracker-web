import PageHeader from "components/base-components/PageHeader";
import TextCard from "components/base-components/TextCard";

function CompletedCourses({ completedCourses }) {
  const badge = "src/assets/badge.png";

  return (
    <section>
      <PageHeader title="Completed Courses" />
      {completedCourses.length === 0 ? (
        <p className="text-gray-500">No completed courses yet.</p>
      ) : (
        <ul className="gap-4 my-8 flex flex-wrap">
          {completedCourses.map((c) => (
            <TextCard
              key={c.course}
              courseName={c.course}
              img={badge}
              enrolledAt={new Date(c.completedAt || "").toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default CompletedCourses;
