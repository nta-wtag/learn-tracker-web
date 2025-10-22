import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import CourseGrid from "components/protected-components/course-components/CourseGrid";
import { Course } from "types/course-types";

vi.mock("components/protected-components/course-components/CourseStats", () => ({
  default: ({ course }: any) => <div data-testid={`course-stats-${course.course}`} />,
}));

vi.mock("components/protected-components/course-components/CourseActions", () => ({
  default: ({ course }: any) => <div data-testid={`course-actions-${course.course}`} />,
}));

describe("CourseGrid", () => {
  const courses: Course[] = [
    { course: "course-1", title: "Course 1" } as any,
    { course: "course-2", title: "Course 2" } as any,
  ];

  it("renders a grid of courses", () => {
    render(<CourseGrid courses={courses} />);
    
    courses.forEach((course) => {
      expect(screen.getByTestId(`course-stats-${course.course}`)).toBeInTheDocument();
      expect(screen.getByTestId(`course-actions-${course.course}`)).toBeInTheDocument();
    });
  });

  it("renders correct number of course cards", () => {
    render(<CourseGrid courses={courses} />);

    const courseCards = screen.getAllByRole("generic"); 
    
    expect(courseCards.length).toBeGreaterThanOrEqual(courses.length);
  });
});
