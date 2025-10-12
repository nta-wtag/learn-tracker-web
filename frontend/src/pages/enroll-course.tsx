import React from "react";
import coursesData from "data/Courses.json";
import CourseGrid from "components/protected-components/course-components/CourseGrid";
import { Outlet } from "react-router-dom";
import PageHeader from "components/base-components/PageHeader";

const EnrollCourse: React.FC = () => {
    return (
        <div className="py-4 gap-8 flex flex-col">
            <PageHeader title="Enroll in a Course" subtitle="Browse and enroll in new courses" />
            <CourseGrid courses={coursesData} />
            <Outlet/>
        </div>
    );
};

export default EnrollCourse;
