import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import LessonWeeks from "components/protected-components/lesson-components/LessonWeeks";
import { Week } from "types/course-types";

vi.mock(
  "components/protected-components/lesson-components/WeekSection",
  () => ({
    default: ({ week }: { week: Week }) => (
      <div data-testid={`week-${week.week}`}>Week {week.week}</div>
    ),
  })
);

describe("LessonWeeks", () => {
  const weeks: Week[] = [
    { week: 1, modules: [] },
    { week: 2, modules: [] },
  ];

  it("renders correct number of WeekSection components", () => {
    render(<LessonWeeks weeks={weeks} />);

    expect(screen.getByTestId("week-1")).toBeInTheDocument();
    expect(screen.getByTestId("week-2")).toBeInTheDocument();
    expect(screen.getAllByText(/Week/)).toHaveLength(2);
  });
});
