import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseActions from "components/protected-components/course-components/CourseActions";

const mockEnroll = vi.fn();
const mockNavigateToLessons = vi.fn();
const mockUseCourse = vi.fn();

vi.mock("components/base-components/Button", () => ({
  default: ({ text, variant, onClick, disabled }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-variant={variant}
      data-testid={`button-${text.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {text}
    </button>
  ),
}));

vi.mock("hooks/useCourseDetails", () => ({
  useCourse: (course: any) => mockUseCourse(course),
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

describe("CourseActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockEnroll.mockResolvedValue({ success: true, message: "Enrolled successfully" });
  });

  describe("Basic Rendering", () => {
    it("should render Lesson Plan button", () => {
      mockUseCourse.mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      expect(screen.getByTestId("button-lesson-plan")).toBeInTheDocument();
      expect(screen.getByText("Lesson Plan")).toBeInTheDocument();
    });

    it("should render Lesson Plan button with secondary variant", () => {
      mockUseCourse.mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      const lessonButton = screen.getByTestId("button-lesson-plan");
      expect(lessonButton).toHaveAttribute("data-variant", "secondary");
    });

    it("should call useCourse with correct course", () => {
      mockUseCourse.mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      expect(mockUseCourse).toHaveBeenCalledWith(mockCourse);
    });
  });

  describe("Lesson Plan Button", () => {
    it("should call navigateToLessons when clicked", async () => {
      const user = userEvent.setup();
      mockUseCourse.mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      const lessonButton = screen.getByTestId("button-lesson-plan");
      await user.click(lessonButton);

      expect(mockNavigateToLessons).toHaveBeenCalledTimes(1);
    });

    it("should call navigateToLessons multiple times if clicked multiple times", async () => {
      const user = userEvent.setup();
      mockUseCourse.mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      const lessonButton = screen.getByTestId("button-lesson-plan");
      await user.click(lessonButton);
      await user.click(lessonButton);
      await user.click(lessonButton);

      expect(mockNavigateToLessons).toHaveBeenCalledTimes(3);
    });

    it("should always be enabled", () => {
      mockUseCourse.mockReturnValue({
        isEnrolled: true,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      const lessonButton = screen.getByTestId("button-lesson-plan");
      expect(lessonButton).not.toBeDisabled();
    });
  });

  describe("Enroll Variant", () => {
    it("should show Enroll button when variant is 'enroll' and not enrolled", () => {
      mockUseCourse.mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      expect(screen.getByTestId("button-enroll-now")).toBeInTheDocument();
      expect(screen.getByText("Enroll Now")).toBeInTheDocument();
    });

    it("should show 'Enroll Now' text when not enrolled", () => {
      mockUseCourse.mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      expect(screen.getByText("Enroll Now")).toBeInTheDocument();
    });

    it("should show 'Enrolled' text when already enrolled", () => {
      mockUseCourse.mockReturnValue({
        isEnrolled: true,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      expect(screen.getByText("Enrolled")).toBeInTheDocument();
    });

    it("should enable button when not enrolled", () => {
      mockUseCourse.mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      const enrollButton = screen.getByTestId("button-enroll-now");
      expect(enrollButton).not.toBeDisabled();
    });

    it("should disable button when already enrolled", () => {
      mockUseCourse.mockReturnValue({
        isEnrolled: true,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      const enrollButton = screen.getByText("Enrolled");
      expect(enrollButton).toBeDisabled();
    });

    it("should have default button variant (not secondary)", () => {
      mockUseCourse.mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      const enrollButton = screen.getByTestId("button-enroll-now");
      expect(enrollButton).not.toHaveAttribute("data-variant", "secondary");
    });
  });

  describe("Courses Variant", () => {
    it("should NOT show Enroll button when variant is 'courses'", () => {
      mockUseCourse.mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "courses",
      });

      render(<CourseActions course={mockCourse} />);

      expect(screen.queryByTestId("button-enroll-now")).not.toBeInTheDocument();
      expect(screen.queryByText("Enroll Now")).not.toBeInTheDocument();
    });

    it("should only show Lesson Plan button in courses variant", () => {
      mockUseCourse.mockReturnValue({
        isEnrolled: true,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "courses",
      });

      render(<CourseActions course={mockCourse} />);

      expect(screen.getByTestId("button-lesson-plan")).toBeInTheDocument();
      expect(screen.queryByText("Enrolled")).not.toBeInTheDocument();
    });
  });

  describe("Enrollment Flow - Success", () => {
    it("should call enroll function when Enroll button clicked", async () => {
      const user = userEvent.setup();
      mockUseCourse.mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      const enrollButton = screen.getByTestId("button-enroll-now");
      await user.click(enrollButton);

      expect(mockEnroll).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge Cases", () => {
    it("should not call enroll when button is disabled", async () => {
      const user = userEvent.setup();
      mockUseCourse.mockReturnValue({
        isEnrolled: true,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      const enrollButton = screen.getByText("Enrolled");
      
      await user.click(enrollButton);

      expect(mockEnroll).not.toHaveBeenCalled();
    });

    it("should handle multiple rapid clicks gracefully", async () => {
      const user = userEvent.setup();
      mockEnroll.mockResolvedValue({
        success: true,
        message: "Enrolled",
      });

      mockUseCourse.mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      const enrollButton = screen.getByTestId("button-enroll-now");
      
      await user.click(enrollButton);
      await user.click(enrollButton);
      await user.click(enrollButton);

      expect(mockEnroll).toHaveBeenCalledTimes(3);
    });

    it("should handle undefined enroll response gracefully", async () => {
      const user = userEvent.setup();
      mockEnroll.mockResolvedValue(undefined);

      mockUseCourse.mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      await user.click(screen.getByTestId("button-enroll-now"));

      await waitFor(() => {
        expect(mockEnroll).toHaveBeenCalled();
      });
    });

    it("should handle course with special characters in name", () => {
      const specialCourse = {
        ...mockCourse,
        course: "React & Redux: Advanced Patterns",
      };

      mockUseCourse.mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={specialCourse} />);

      expect(screen.getByTestId("button-lesson-plan")).toBeInTheDocument();
    });
  });

  describe("Button Rendering Count", () => {
    it("should render 2 buttons in enroll variant when not enrolled", () => {
      mockUseCourse.mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2);
    });

    it("should render 2 buttons in enroll variant when enrolled", () => {
      mockUseCourse.mockReturnValue({
        isEnrolled: true,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "enroll",
      });

      render(<CourseActions course={mockCourse} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2);
    });

    it("should render 1 button in courses variant", () => {
      mockUseCourse.mockReturnValue({
        isEnrolled: true,
        enroll: mockEnroll,
        navigateToLessons: mockNavigateToLessons,
        variant: "courses",
      });

      render(<CourseActions course={mockCourse} />);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(1);
    });
  });
});
