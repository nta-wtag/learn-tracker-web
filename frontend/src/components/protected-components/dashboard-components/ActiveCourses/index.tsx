import CircularProgressBar from 'components/base-components/CircularProgressBar';
import PageHeader from 'components/base-components/PageHeader';
import React from 'react';

function ActiveCourses({ courseInfos }) {
    return (
        <section>
            <PageHeader title="Active Courses" />
            {courseInfos.length === 0 ? (
                <p className="text-gray-500">
                    You haven’t enrolled in any courses yet.
                </p>
            ) : (
                <div className="grid grid-cols-3 gap-4 my-4">
                    {courseInfos.map((c) => (
                        <div className="flex flex-col items-center">
                            <CircularProgressBar
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