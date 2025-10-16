import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CourseActions from "components/protected-components/course-components/CourseActions";
import type { Course } from "types/course-types";

// Mock toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import toast from "react-hot-toast";

// Mock Button component
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

// Mock useCourse hook
const mockEnroll = vi.fn();
const mockGoToLessons = vi.fn();

vi.mock("hooks/useCourse", () => ({
  useCourse: vi.fn(),
}));

import { useCourse } from "hooks/useCourse";

describe("CourseActions", () => {
  const mockCourse: Course = {
    course: "React Fundamentals",
    lessons: [
      {
        week: 1,
        modules: [
          {
            title: "Introduction to React",
            estDays: 3,
            resources: [],
          },
        ],
      },
    ],
    image: "test.jpg",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("always renders Lesson Plan button", () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      expect(screen.getByTestId("button-lesson-plan")).toBeInTheDocument();
    });

    it("renders Enroll button in enroll variant", () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      expect(screen.getByTestId("button-enroll-now")).toBeInTheDocument();
    });

    it("does not render Enroll button in courses variant", () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: true,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "courses",
        enrollment: { courseName: "React Fundamentals", enrolledAt: "2025-01-01" },
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      expect(screen.queryByTestId("button-enroll-now")).not.toBeInTheDocument();
      expect(screen.queryByTestId("button-enrolled")).not.toBeInTheDocument();
    });

    it("renders both buttons when in enroll variant", () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      expect(screen.getAllByRole("button")).toHaveLength(2);
    });

    it("renders only one button in courses variant", () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: true,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "courses",
        enrollment: { courseName: "React Fundamentals", enrolledAt: "2025-01-01" },
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      expect(screen.getAllByRole("button")).toHaveLength(1);
    });
  });

  describe("Button Text", () => {
    it("shows 'Enroll Now' when not enrolled", () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      expect(screen.getByText("Enroll Now")).toBeInTheDocument();
    });

    it("shows 'Enrolled' when already enrolled", () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: true,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: { courseName: "React Fundamentals", enrolledAt: "2025-01-01" },
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      expect(screen.getByText("Enrolled")).toBeInTheDocument();
    });

    it("always shows 'Lesson Plan' text", () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      expect(screen.getByText("Lesson Plan")).toBeInTheDocument();
    });
  });

  describe("Button States", () => {
    it("Lesson Plan button has secondary variant", () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      const lessonButton = screen.getByTestId("button-lesson-plan");
      expect(lessonButton).toHaveAttribute("data-variant", "secondary");
    });

    it("disables Enroll button when already enrolled", () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: true,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: { courseName: "React Fundamentals", enrolledAt: "2025-01-01" },
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      const enrollButton = screen.getByTestId("button-enrolled");
      expect(enrollButton).toBeDisabled();
    });

    it("enables Enroll button when not enrolled", () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      const enrollButton = screen.getByTestId("button-enroll-now");
      expect(enrollButton).not.toBeDisabled();
    });

    it("Lesson Plan button is never disabled", () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      const lessonButton = screen.getByTestId("button-lesson-plan");
      expect(lessonButton).not.toBeDisabled();
    });
  });

  describe("Interactions", () => {
    it("calls goToLessons when Lesson Plan clicked", async () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      const lessonButton = screen.getByTestId("button-lesson-plan");

      await userEvent.click(lessonButton);
      expect(mockGoToLessons).toHaveBeenCalledTimes(1);
    });

    it("calls enroll function when Enroll Now clicked", async () => {
      mockEnroll.mockReturnValue({ success: true, message: "Enrolled successfully" });

      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      const enrollButton = screen.getByTestId("button-enroll-now");

      await userEvent.click(enrollButton);
      expect(mockEnroll).toHaveBeenCalledTimes(1);
    });

    it("does not call enroll when already enrolled button is clicked", async () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: true,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: { courseName: "React Fundamentals", enrolledAt: "2025-01-01" },
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      const enrollButton = screen.getByTestId("button-enrolled");

      await userEvent.click(enrollButton);
      expect(mockEnroll).not.toHaveBeenCalled();
    });

    it("allows multiple clicks on Lesson Plan button", async () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      const lessonButton = screen.getByTestId("button-lesson-plan");

      await userEvent.click(lessonButton);
      await userEvent.click(lessonButton);
      await userEvent.click(lessonButton);

      expect(mockGoToLessons).toHaveBeenCalledTimes(3);
    });
  });

  describe("Toast Notifications", () => {
    it("shows success toast on successful enrollment", async () => {
      mockEnroll.mockReturnValue({
        success: true,
        message: "Successfully enrolled in React Fundamentals!",
      });

      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      const enrollButton = screen.getByTestId("button-enroll-now");

      await userEvent.click(enrollButton);

      expect(toast.success).toHaveBeenCalledWith("Successfully enrolled in React Fundamentals!");
      expect(toast.error).not.toHaveBeenCalled();
    });

    it("shows error toast on failed enrollment", async () => {
      mockEnroll.mockReturnValue({
        success: false,
        message: "Already enrolled in this course",
      });

      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      const enrollButton = screen.getByTestId("button-enroll-now");

      await userEvent.click(enrollButton);

      expect(toast.error).toHaveBeenCalledWith("Already enrolled in this course");
      expect(toast.success).not.toHaveBeenCalled();
    });

    it("shows error toast when enrollment returns false success", async () => {
      mockEnroll.mockReturnValue({
        success: false,
        message: "User not logged in",
      });

      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      const enrollButton = screen.getByTestId("button-enroll-now");

      await userEvent.click(enrollButton);

      expect(toast.error).toHaveBeenCalledWith("User not logged in");
    });

    it("does not show any toast when Lesson Plan is clicked", async () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      const lessonButton = screen.getByTestId("button-lesson-plan");

      await userEvent.click(lessonButton);

      expect(toast.success).not.toHaveBeenCalled();
      expect(toast.error).not.toHaveBeenCalled();
    });
  });

  describe("Hook Integration", () => {
    it("calls useCourse with the course prop", () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);

      expect(useCourse).toHaveBeenCalledWith(mockCourse);
      expect(useCourse).toHaveBeenCalledTimes(1);
    });

    it("uses all required values from useCourse hook", () => {
      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: true,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "courses",
        enrollment: { courseName: "React Fundamentals", enrolledAt: "2025-01-01" },
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);

      // Verify component uses the hook values correctly
      expect(screen.queryByTestId("button-enroll-now")).not.toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined success in enroll response", async () => {
      mockEnroll.mockReturnValue({
        message: "Some error occurred",
      } as any);

      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      const enrollButton = screen.getByTestId("button-enroll-now");

      await userEvent.click(enrollButton);

      expect(toast.error).toHaveBeenCalledWith("Some error occurred");
    });

    it("handles rapid clicks on enroll button", async () => {
      let clickCount = 0;
      mockEnroll.mockImplementation(() => {
        clickCount++;
        return {
          success: true,
          message: `Click ${clickCount}`,
        };
      });

      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      const enrollButton = screen.getByTestId("button-enroll-now");

      await userEvent.click(enrollButton);
      await userEvent.click(enrollButton);
      await userEvent.click(enrollButton);

      expect(mockEnroll).toHaveBeenCalledTimes(3);
      expect(toast.success).toHaveBeenCalledTimes(3);
    });

    it("handles empty message in enroll response", async () => {
      mockEnroll.mockReturnValue({
        success: true,
        message: "",
      });

      vi.mocked(useCourse).mockReturnValue({
        isEnrolled: false,
        enroll: mockEnroll,
        goToLessons: mockGoToLessons,
        variant: "enroll",
        enrollment: undefined,
        enrolledCourses: [],
        courseInfo: {
          totalLessons: 1,
          totalDays: 3,
          completedModules: 0,
          progressPercent: 0,
        },
      });

      render(<CourseActions course={mockCourse} />);
      const enrollButton = screen.getByTestId("button-enroll-now");

      await userEvent.click(enrollButton);

      expect(toast.success).toHaveBeenCalledWith("");
    });
  });
});
