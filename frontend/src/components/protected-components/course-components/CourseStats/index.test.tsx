import { render, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import CourseStats from "components/protected-components/course-components/CourseStats";
import { Course } from "types/course-types";

const mockUseUserEnrolledCourses = vi.fn();
const mockUseCourseInfo = vi.fn();
const mockUseCourseContext = vi.fn();

vi.mock("hooks/useUserEnrolledCourses", () => ({
    useUserEnrolledCourses: () => mockUseUserEnrolledCourses(),
}));

vi.mock("hooks/useCourseInfo", () => ({
    useCourseInfo: (course: Course, enrollment: any) => mockUseCourseInfo(course, enrollment),
}));

vi.mock("hooks/useCourseContext", () => ({
    useCourseContext: () => mockUseCourseContext(),
}));

describe("CourseStats", () => {
    const course = {
        course: "React Basics",
        image: "/react.png",
        lessons: [
            
        ]
    };

    beforeEach(() => {
        mockUseUserEnrolledCourses.mockReturnValue({ enrolledCourses: [] });
        mockUseCourseInfo.mockReturnValue({ totalLessons: 5, totalDays: 10, deadline: "2025-10-20" });
        mockUseCourseContext.mockReturnValue("enroll");
    });

    it("renders course thumbnail and title", () => {
        render(<CourseStats course={course} />);

        const img = screen.getByAltText(`${course.course} course thumbnail`);
        
        expect(img).toBeInTheDocument();
        expect(screen.getByText(course.course)).toBeInTheDocument();
    });

    it("renders lessons and duration for enroll variant", () => {
        render(<CourseStats course={course} />);

        expect(screen.getByText("5 Lessons")).toBeInTheDocument();
        expect(screen.getByText("Duration: 10 days")).toBeInTheDocument();
    });

    it("renders deadline for non-enroll variant", () => {
        mockUseCourseContext.mockReturnValue("dashboard"); // simulate non-enroll variant
        render(<CourseStats course={course} />);

        expect(screen.getByText("5 Lessons")).toBeInTheDocument();

        const dueStat = screen.getByText((content) => content.includes("Due: 2025-10-20"));
        expect(dueStat).toBeInTheDocument();
    });
});
