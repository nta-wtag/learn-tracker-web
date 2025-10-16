import PageHeader from 'components/base-components/PageHeader';
import TextCard from 'components/base-components/TextCard';
import React from 'react';

function RecentlyEnrolled({recentCourses}) {
    return (
            <section>
                <PageHeader title="Recently Enrolled" />
                <ul className="flex flex-wrap gap-4 my-8">
                    {recentCourses.slice(0, 5).map((c) => (
                        <TextCard
                            key={c.course}
                            courseName={c.course}
                            enrolledAt={new Date(c.enrolledAt || "").toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                            img={c.image}
                            showButton
                        />
                    ))}
                </ul>
            </section>
    );
}

export default RecentlyEnrolled;