import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import ModuleItem from "components/protected-components/lesson-components/ModuleItem";
import { Module } from "types/course-types";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

let mockUseCourseContext = vi.fn();

vi.mock("hooks/useCourseContext", () => ({
  useCourseContext: () => mockUseCourseContext(),
}));

const createMockStore = () =>
  configureStore({
    reducer: {
      lesson: (state = { completedLessons: [] }) => state,
      enrollment: (state = { enrolledCourses: [] }) => state,
    },
  });

describe("ModuleItem", () => {
  let store: ReturnType<typeof createMockStore>;


  beforeEach(() => {
    store = createMockStore();
  });

  const module: Module = {
    title: "Introduction",
    estDays: 2,
    resources: ["https://example.com/resource1", "https://example.com/resource2"],
  } as any;

  const courseName = "courseName"

  it("renders module title and estimated days", () => {
    mockUseCourseContext = vi.fn(() => "courses"); // set return value
    render(<Provider store={store}><ModuleItem module={module} courseName={courseName} /></Provider>);
    expect(screen.getByText("Introduction")).toBeInTheDocument();
    expect(screen.getByText("2 days")).toBeInTheDocument();
  });

  it('renders resources when variant is "courses"', () => {
    mockUseCourseContext = vi.fn(() => "courses");
    render(<Provider store={store}><ModuleItem module={module} courseName={courseName} /></Provider>);
    module.resources.forEach((res) => {
      expect(screen.getByText(res)).toBeInTheDocument();
      expect(screen.getByText(res).closest("a")).toHaveAttribute("href", res);
    });
  });

  it('does not render resources when variant is "enroll"', () => {
    mockUseCourseContext = vi.fn(() => "enroll");
    render(<Provider store={store}><ModuleItem module={module} courseName={courseName} /></Provider>);
    module.resources.forEach((res) => {
      expect(screen.queryByText(res)).not.toBeInTheDocument();
    });
  });
});
