import React from "react";
import coursesData from "data/Courses.json";
import CourseGrid from "components/course-components/CourseGrid";
import { getEnrolledCourses } from "utils/course-storage";
import { Outlet } from "react-router-dom";

const Courses: React.FC = () => {
    const enrolledCourses = getEnrolledCourses();

    const coursesToShow = coursesData.filter(course =>
        enrolledCourses.some(c => c.courseName === course.course)
    );

    if (coursesToShow.length === 0) {
        return <p className="py-4 text-gray-500">You are not enrolled in any courses yet.</p>;
    }

    return (
        <div className="py-4 gap-8 flex flex-col">
            <h1 className="text-2xl font-bold">My Courses</h1>
            <CourseGrid courses={coursesToShow} context="courses" />
            <Outlet/>
        </div>
    );
};

export default Courses;
