import React from "react";
import CourseGrid from "components/protected-components/course-components/CourseGrid";
import coursesData from "data/Courses.json";

const EnrollCourse: React.FC = () => {
    return (
        <div className="p-6 gap-8 flex flex-col">
            <h1 className="text-2xl font-bold">Available Courses</h1>
            <CourseGrid courses={coursesData} />
        </div>
    );
};

export default EnrollCourse;
