import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import WeekSection from "components/protected-components/lesson-components/WeekSection";
import { Week } from "types/course-types";

vi.mock("components/protected-components/lesson-components/ModuleItem", () => ({
  default: ({ module }: { module: any }) => <div data-testid={module.title}>{module.title}</div>,
}));

describe("WeekSection", () => {
  const week: Week = {
    week: 1,
    modules: [{ title: "Module 1", estDays: 1, resources: [] }],
  };

  it("renders week title and modules", () => {
    render(<WeekSection week={week} />);
    expect(screen.getByText("Week 1")).toBeInTheDocument();
    expect(screen.getByTestId("Module 1")).toBeInTheDocument();
  });
});
