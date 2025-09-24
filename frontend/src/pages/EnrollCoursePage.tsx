import React from "react";
import coursesData from "data/courses.json";
import Button from "components/base-components/Button";

interface Module {
    title: string;
    estDays: number;
    resources: string[];
}

interface Week {
    week: number;
    modules: Module[];
}

interface Course {
    course: string;
    lessons: Week[];
}

const EnrollCoursesPage: React.FC = () => {
    return (
        <div className="p-6 gap-8 flex flex-col">
            <h1 className="text-2xl font-bold">Available Course</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {coursesData.map((course: Course) => {
                    const totalLessons = course.lessons.reduce(
                        (sum, week) => sum + week.modules.length,
                        0
                    );

                    const totalDays = course.lessons.reduce(
                        (sum, week) =>
                            sum + week.modules.reduce((s, m) => s + m.estDays, 0),
                        0
                    );

                    return (
                        <div
                            key={course.course}
                            className="bg-white shadow rounded-lg p-6 flex flex-col gap-8"
                        >
                            <div className="flex flex-col gap-2">
                                <h2 className="text-xl font-bold mb-2">{course.course}</h2>
                                <p className="text-gray-600">Lessons: {totalLessons}</p>
                                <p className="text-gray-600">Estimated Time: {totalDays} day(s)</p>
                            </div>
                            <div className="flex gap-4">
                                <Button
                                    text="Lesson Plan"
                                    variant="secondary"
                                    onClick={() => alert(`Enrolled in ${course.course}`)}
                                />
                                <Button
                                    text="Enroll"
                                    onClick={() => alert(`Enrolled in ${course.course}`)}
                                />
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EnrollCoursesPage;
