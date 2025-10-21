import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import LessonHeader from "components/protected-components/lesson-components/LessonHeader";

const mockUseAppSelector = vi.fn();
vi.mock("redux-toolkit/store", () => ({
    useAppSelector: (selector: any) => mockUseAppSelector(selector),
}));

const mockUseCourseContext = vi.fn();
vi.mock("hooks/useCourseContext", () => ({
    useCourseContext: () => mockUseCourseContext(),
}));

const mockUseCourseProgress = vi.fn();
vi.mock("hooks/useCourseProgress", () => ({
    useCourseProgress: (course: any, enrollment: any) =>
        mockUseCourseProgress(course, enrollment),
}));

vi.mock("components/base-components/ProgressBar", () => ({
    default: ({ progressPercent, className, height }: any) => (
        <div
            data-testid="progress-bar"
            data-progress={progressPercent}
            className={className}
            style={{ height: `${height}px` }}
        >
            Progress: {progressPercent}%
        </div>
    ),
}));

const mockCourse = {
    course: "React Fundamentals",
    image: "/react.png",
    lessons: [
        {
            week: 1,
            modules: [
                {
                    title: "What is React?",
                    estDays: 1,
                    resources: [],
                },
            ],
        },
    ],
};

const mockEnrollment = {
    courseName: "React Fundamentals",
    enrolledAt: "2024-01-01T00:00:00.000Z",
    completedAt: null,
};

const mockEnrolledData = {
    completedModules: 0,
    progressPercent: 25,
    totalLessons: 10,
    totalDays: 30,
    deadline: "2024-01-31T00:00:00.000Z",
    daysLeft: 15,
    isDeadlineOver: false,
    enrolledAt: "2024-01-01T00:00:00.000Z",
};

describe("LessonHeader", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("Basic Rendering", () => {
        it("should render course title", () => {
            mockUseAppSelector.mockReturnValue([]);
            mockUseCourseContext.mockReturnValue("enroll");
            mockUseCourseProgress.mockReturnValue(null);

            render(<LessonHeader course={mockCourse} />);

            expect(
                screen.getByText("React Fundamentals - Lesson Plan")
            ).toBeInTheDocument();
        });

        it("should render with proper heading level", () => {
            mockUseAppSelector.mockReturnValue([]);
            mockUseCourseContext.mockReturnValue("enroll");
            mockUseCourseProgress.mockReturnValue(null);

            render(<LessonHeader course={mockCourse} />);

            const heading = screen.getByRole("heading", { level: 1 });
            expect(heading).toHaveTextContent("React Fundamentals - Lesson Plan");
        });
    });

    describe("Enrollment Status", () => {
        it("should find enrollment from Redux state", () => {
            const enrolledCourses = [mockEnrollment];
            mockUseAppSelector.mockImplementation((selector) =>
                selector({ enrollment: { enrolledCourses } })
            );
            mockUseCourseContext.mockReturnValue("courses");
            mockUseCourseProgress.mockReturnValue(mockEnrolledData);

            render(<LessonHeader course={mockCourse} />);

            expect(mockUseCourseProgress).toHaveBeenCalledWith(
                mockCourse,
                mockEnrollment
            );
        });

        it("should handle no enrollment found", () => {
            mockUseAppSelector.mockReturnValue([]);
            mockUseCourseContext.mockReturnValue("enroll");
            mockUseCourseProgress.mockReturnValue(null);

            render(<LessonHeader course={mockCourse} />);

            expect(screen.queryByTestId("progress-bar")).not.toBeInTheDocument();
        });

        it("should handle multiple enrollments and find correct one", () => {
            const enrolledCourses = [
                { courseName: "Vue Basics", enrolledAt: "2024-01-01" },
                mockEnrollment,
                { courseName: "Angular Pro", enrolledAt: "2024-01-02" },
            ];

            mockUseAppSelector.mockImplementation((selector) =>
                selector({ enrollment: { enrolledCourses } })
            );
            mockUseCourseContext.mockReturnValue("courses");
            mockUseCourseProgress.mockReturnValue(mockEnrolledData);

            render(<LessonHeader course={mockCourse} />);

            expect(mockUseCourseProgress).toHaveBeenCalledWith(
                mockCourse,
                mockEnrollment
            );
        });
    });

    describe("Days Remaining Display", () => {
        it("should show days remaining in courses variant", () => {
            mockUseAppSelector.mockReturnValue([mockEnrollment]);
            mockUseCourseContext.mockReturnValue("courses");
            mockUseCourseProgress.mockReturnValue(mockEnrolledData);

            render(<LessonHeader course={mockCourse} />);

            expect(screen.getByText("15 Days Remaining")).toBeInTheDocument();
        });

        it("should NOT show days remaining in enroll variant", () => {
            mockUseAppSelector.mockReturnValue([]);
            mockUseCourseContext.mockReturnValue("enroll");
            mockUseCourseProgress.mockReturnValue(null);

            render(<LessonHeader course={mockCourse} />);

            expect(screen.queryByText(/Days Remaining/i)).not.toBeInTheDocument();
        });

        it("should NOT show days remaining when daysLeft is undefined", () => {
            const dataWithoutDays = { ...mockEnrolledData, daysLeft: undefined };
            mockUseAppSelector.mockReturnValue([mockEnrollment]);
            mockUseCourseContext.mockReturnValue("courses");
            mockUseCourseProgress.mockReturnValue(dataWithoutDays);

            render(<LessonHeader course={mockCourse} />);

            expect(screen.queryByText(/Days Remaining/i)).not.toBeInTheDocument();
        });
    });

    describe("ProgressBar Display", () => {
        it("should show progress bar in courses variant with enrollment", () => {
            mockUseAppSelector.mockReturnValue([mockEnrollment]);
            mockUseCourseContext.mockReturnValue("courses");
            mockUseCourseProgress.mockReturnValue(mockEnrolledData);

            render(<LessonHeader course={mockCourse} />);

            const progressBar = screen.getByTestId("progress-bar");
            expect(progressBar).toBeInTheDocument();
            expect(progressBar).toHaveAttribute("data-progress", "25");
        });

        it("should NOT show progress bar in enroll variant", () => {
            mockUseAppSelector.mockReturnValue([]);
            mockUseCourseContext.mockReturnValue("enroll");
            mockUseCourseProgress.mockReturnValue(null);

            render(<LessonHeader course={mockCourse} />);

            expect(screen.queryByTestId("progress-bar")).not.toBeInTheDocument();
        });

        it("should NOT show progress bar without enrollment", () => {
            mockUseAppSelector.mockReturnValue([]);
            mockUseCourseContext.mockReturnValue("courses");
            mockUseCourseProgress.mockReturnValue(null);

            render(<LessonHeader course={mockCourse} />);

            expect(screen.queryByTestId("progress-bar")).not.toBeInTheDocument();
        });

        it("should NOT show progress bar without enrolled data", () => {
            mockUseAppSelector.mockReturnValue([mockEnrollment]);
            mockUseCourseContext.mockReturnValue("courses");
            mockUseCourseProgress.mockReturnValue(null);

            render(<LessonHeader course={mockCourse} />);

            expect(screen.queryByTestId("progress-bar")).not.toBeInTheDocument();
        });

        it("should pass correct props to ProgressBar", () => {
            const customData = { ...mockEnrolledData, progressPercent: 75 };
            mockUseAppSelector.mockReturnValue([mockEnrollment]);
            mockUseCourseContext.mockReturnValue("courses");
            mockUseCourseProgress.mockReturnValue(customData);

            render(<LessonHeader course={mockCourse} />);

            const progressBar = screen.getByTestId("progress-bar");
            expect(progressBar).toHaveAttribute("data-progress", "75");
        });

        it("should handle 0% progress", () => {
            const zeroProgress = { ...mockEnrolledData, progressPercent: 0 };
            mockUseAppSelector.mockReturnValue([mockEnrollment]);
            mockUseCourseContext.mockReturnValue("courses");
            mockUseCourseProgress.mockReturnValue(zeroProgress);

            render(<LessonHeader course={mockCourse} />);

            const progressBar = screen.getByTestId("progress-bar");
            expect(progressBar).toHaveAttribute("data-progress", "0");
        });

        it("should handle 100% progress", () => {
            const fullProgress = { ...mockEnrolledData, progressPercent: 100 };
            mockUseAppSelector.mockReturnValue([mockEnrollment]);
            mockUseCourseContext.mockReturnValue("courses");
            mockUseCourseProgress.mockReturnValue(fullProgress);

            render(<LessonHeader course={mockCourse} />);

            const progressBar = screen.getByTestId("progress-bar");
            expect(progressBar).toHaveAttribute("data-progress", "100");
        });
    });

    describe("Layout and Styling", () => {
        it("should have sticky positioning", () => {
            mockUseAppSelector.mockReturnValue([]);
            mockUseCourseContext.mockReturnValue("enroll");
            mockUseCourseProgress.mockReturnValue(null);

            const { container } = render(<LessonHeader course={mockCourse} />);

            const header = container.firstChild as HTMLElement;
            expect(header).toHaveClass("sticky", "top-0", "z-10");
        });

        describe("Edge Cases", () => {
            it("should handle course with special characters in name", () => {
                const specialCourse = {
                    ...mockCourse,
                    course: "React & Redux: Advanced Patterns",
                };

                mockUseAppSelector.mockReturnValue([]);
                mockUseCourseContext.mockReturnValue("enroll");
                mockUseCourseProgress.mockReturnValue(null);

                render(<LessonHeader course={specialCourse} />);

                expect(
                    screen.getByText("React & Redux: Advanced Patterns - Lesson Plan")
                ).toBeInTheDocument();
            });

            it("should handle negative days remaining", () => {
                const overdueData = { ...mockEnrolledData, daysLeft: -5 };
                mockUseAppSelector.mockReturnValue([mockEnrollment]);
                mockUseCourseContext.mockReturnValue("courses");
                mockUseCourseProgress.mockReturnValue(overdueData);

                render(<LessonHeader course={mockCourse} />);

                const daysText = screen.getByText("-5 Days Remaining");
                expect(daysText).toHaveClass("text-red-500");
            });

            it("should handle enrollment without course progress data", () => {
                mockUseAppSelector.mockReturnValue([mockEnrollment]);
                mockUseCourseContext.mockReturnValue("courses");
                mockUseCourseProgress.mockReturnValue(undefined);

                const { container } = render(<LessonHeader course={mockCourse} />);

                expect(screen.queryByTestId("progress-bar")).not.toBeInTheDocument();
                expect(screen.queryByText(/Days Remaining/i)).not.toBeInTheDocument();
                expect(container).toBeInTheDocument();
            });
        });

        describe("Integration Tests", () => {
            it("should display all elements together in courses mode", () => {
                mockUseAppSelector.mockReturnValue([mockEnrollment]);
                mockUseCourseContext.mockReturnValue("courses");
                mockUseCourseProgress.mockReturnValue(mockEnrolledData);

                render(<LessonHeader course={mockCourse} />);

                // Title
                expect(screen.getByText("React Fundamentals - Lesson Plan")).toBeInTheDocument();
                // Days remaining
                expect(screen.getByText("15 Days Remaining")).toBeInTheDocument();
                // Progress bar
                expect(screen.getByTestId("progress-bar")).toBeInTheDocument();
            });

            it("should display only title in enroll mode", () => {
                mockUseAppSelector.mockReturnValue([]);
                mockUseCourseContext.mockReturnValue("enroll");
                mockUseCourseProgress.mockReturnValue(null);

                render(<LessonHeader course={mockCourse} />);

                // Title only
                expect(screen.getByText("React Fundamentals - Lesson Plan")).toBeInTheDocument();
                // No other elements
                expect(screen.queryByText(/Days Remaining/i)).not.toBeInTheDocument();
                expect(screen.queryByTestId("progress-bar")).not.toBeInTheDocument();
            });

            it("should update when course changes", () => {
                mockUseAppSelector.mockReturnValue([mockEnrollment]);
                mockUseCourseContext.mockReturnValue("courses");
                mockUseCourseProgress.mockReturnValue(mockEnrolledData);

                const { rerender } = render(<LessonHeader course={mockCourse} />);

                expect(screen.getByText("React Fundamentals - Lesson Plan")).toBeInTheDocument();

                const newCourse = { ...mockCourse, course: "Vue Essentials" };
                rerender(<LessonHeader course={newCourse} />);

                expect(screen.getByText("Vue Essentials - Lesson Plan")).toBeInTheDocument();
            });
        });
    });
});
