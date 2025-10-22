import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CourseStats from "components/protected-components/course-components/CourseStats";

vi.mock("lucide-react", () => ({
  Book: ({ size }: any) => <svg data-testid="book-icon" data-size={size}>Book</svg>,
  BookCheck: ({ size }: any) => <svg data-testid="book-check-icon" data-size={size}>BookCheck</svg>,
  Clock: ({ size }: any) => <svg data-testid="clock-icon" data-size={size}>Clock</svg>,
  AlertCircle: ({ size }: any) => <svg data-testid="alert-circle-icon" data-size={size}>AlertCircle</svg>,
  CheckCircle: ({ size }: any) => <svg data-testid="check-circle-icon" data-size={size}>CheckCircle</svg>,
}));

const mockUseCourse = vi.fn();
vi.mock("hooks/useCourseDetails", () => ({
  useCourse: (course: any) => mockUseCourse(course),
}));

vi.mock("components/base-components/StatItem", () => ({
  default: ({ icon: Icon, label }: any) => (
    <div data-testid="stat-item">
      <Icon size={20} />
      <span>{label}</span>
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

const mockCourseInfoInProgress = {
  completedModules: 5,
  progressPercent: 50,
  totalLessons: 10,
  totalDays: 30,
  deadline: "January 31, 2024",
  daysLeft: 15,
  isDeadlineOver: false,
  enrolledAt: "2024-01-01T00:00:00.000Z",
};

const mockCourseInfoCompleted = {
  completedModules: 10,
  progressPercent: 100,
  totalLessons: 10,
  totalDays: 30,
  deadline: "January 31, 2024",
  daysLeft: 5,
  isDeadlineOver: false,
  enrolledAt: "2024-01-01T00:00:00.000Z",
};

const mockCourseInfoOverdue = {
  completedModules: 5,
  progressPercent: 50,
  totalLessons: 10,
  totalDays: 30,
  deadline: "January 31, 2024",
  daysLeft: -5,
  isDeadlineOver: true,
  enrolledAt: "2024-01-01T00:00:00.000Z",
};

const mockCourseInfoEnroll = {
  completedModules: 0,
  progressPercent: 0,
  totalLessons: 10,
  totalDays: 30,
};

describe("CourseStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("should render course image", () => {
      mockUseCourse.mockReturnValue({
        variant: "enroll",
        courseInfo: mockCourseInfoEnroll,
        enrollment: null,
      });

      render(<CourseStats course={mockCourse} />);

      const image = screen.getByAltText("React Fundamentals course thumbnail");
      expect(image).toBeInTheDocument();
    });

    it("should render course title", () => {
      mockUseCourse.mockReturnValue({
        variant: "enroll",
        courseInfo: mockCourseInfoEnroll,
        enrollment: null,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.getByText("React Fundamentals")).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "React Fundamentals"
      );
    });
  });

  describe("Enroll Variant", () => {
    it("should display total lessons in enroll mode", () => {
      mockUseCourse.mockReturnValue({
        variant: "enroll",
        courseInfo: mockCourseInfoEnroll,
        enrollment: null,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.getByText("10 Lessons")).toBeInTheDocument();
    });

    it("should display duration in enroll mode", () => {
      mockUseCourse.mockReturnValue({
        variant: "enroll",
        courseInfo: mockCourseInfoEnroll,
        enrollment: null,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.getByText("Duration: 30 days")).toBeInTheDocument();
    });

    it("should use singular 'Lesson' for 1 lesson", () => {
      const singleLessonInfo = { ...mockCourseInfoEnroll, totalLessons: 1 };
      mockUseCourse.mockReturnValue({
        variant: "enroll",
        courseInfo: singleLessonInfo,
        enrollment: null,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.getByText("1 Lesson")).toBeInTheDocument();
    });

    it("should use singular 'day' for 1 day duration", () => {
      const oneDayInfo = { ...mockCourseInfoEnroll, totalDays: 1 };
      mockUseCourse.mockReturnValue({
        variant: "enroll",
        courseInfo: oneDayInfo,
        enrollment: null,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.getByText("Duration: 1 day")).toBeInTheDocument();
    });

    it("should NOT show status badge in enroll mode", () => {
      mockUseCourse.mockReturnValue({
        variant: "enroll",
        courseInfo: mockCourseInfoEnroll,
        enrollment: null,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.queryByText("On Time")).not.toBeInTheDocument();
      expect(screen.queryByText("Completed")).not.toBeInTheDocument();
      expect(screen.queryByText("Time Over")).not.toBeInTheDocument();
    });

    it("should render Book and Clock icons in enroll mode", () => {
      mockUseCourse.mockReturnValue({
        variant: "enroll",
        courseInfo: mockCourseInfoEnroll,
        enrollment: null,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.getAllByTestId("book-icon")).toHaveLength(1);
      expect(screen.getAllByTestId("clock-icon")).toHaveLength(1);
    });
  });

  describe("Courses Variant - In Progress", () => {
    it("should display completed/total lessons in courses mode", () => {
      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: mockCourseInfoInProgress,
        enrollment: mockEnrollment,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.getByText("5/10 Lessons")).toBeInTheDocument();
    });

    it("should display deadline in courses mode", () => {
      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: mockCourseInfoInProgress,
        enrollment: mockEnrollment,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.getByText("Due: January 31, 2024")).toBeInTheDocument();
    });

    it("should show 'On Time' status when in progress and not overdue", () => {
      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: mockCourseInfoInProgress,
        enrollment: mockEnrollment,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.getByText("On Time")).toBeInTheDocument();
    });

    it("should render Clock icon for 'On Time' status", () => {
      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: mockCourseInfoInProgress,
        enrollment: mockEnrollment,
      });

      render(<CourseStats course={mockCourse} />);

      const badge = screen.getByText("On Time").parentElement;
      expect(badge?.querySelector('[data-testid="clock-icon"]')).toBeInTheDocument();
    });

    it("should render BookCheck and Clock icons in courses mode", () => {
      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: mockCourseInfoInProgress,
        enrollment: mockEnrollment,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.getByTestId("book-check-icon")).toBeInTheDocument();
      expect(screen.getAllByTestId("clock-icon").length).toBeGreaterThan(0);
    });
  });

  describe("Courses Variant - Completed", () => {
    it("should show 'Completed' status when all lessons done", () => {
      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: mockCourseInfoCompleted,
        enrollment: mockEnrollment,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.getByText("Completed")).toBeInTheDocument();
    });

    it("should render CheckCircle icon for 'Completed' status", () => {
      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: mockCourseInfoCompleted,
        enrollment: mockEnrollment,
      });

      render(<CourseStats course={mockCourse} />);

      const badge = screen.getByText("Completed").parentElement;
      expect(badge?.querySelector('[data-testid="check-circle-icon"]')).toBeInTheDocument();
    });

    it("should display 10/10 lessons when completed", () => {
      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: mockCourseInfoCompleted,
        enrollment: mockEnrollment,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.getByText("10/10 Lessons")).toBeInTheDocument();
    });
  });

  describe("Courses Variant - Overdue", () => {
    it("should show 'Time Over' status when deadline passed", () => {
      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: mockCourseInfoOverdue,
        enrollment: mockEnrollment,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.getByText("Time Over")).toBeInTheDocument();
    });

    it("should render AlertCircle icon for 'Time Over' status", () => {
      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: mockCourseInfoOverdue,
        enrollment: mockEnrollment,
      });

      render(<CourseStats course={mockCourse} />);

      const badge = screen.getByText("Time Over").parentElement;
      expect(badge?.querySelector('[data-testid="alert-circle-icon"]')).toBeInTheDocument();
    });

    it("should still show incomplete progress when overdue", () => {
      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: mockCourseInfoOverdue,
        enrollment: mockEnrollment,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.getByText("5/10 Lessons")).toBeInTheDocument();
    });
  });

  describe("Status Badge Logic", () => {
    it("should NOT show status when courseInfo is null", () => {
      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: null,
        enrollment: mockEnrollment,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.queryByText("On Time")).not.toBeInTheDocument();
      expect(screen.queryByText("Completed")).not.toBeInTheDocument();
      expect(screen.queryByText("Time Over")).not.toBeInTheDocument();
    });

    it("should NOT show status when enrollment is null", () => {
      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: mockCourseInfoInProgress,
        enrollment: null,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.queryByText("On Time")).not.toBeInTheDocument();
    });

    it("should NOT show status when totalLessons is 0", () => {
      const zeroLessonsInfo = { ...mockCourseInfoInProgress, totalLessons: 0, completedModules: 0 };
      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: zeroLessonsInfo,
        enrollment: mockEnrollment,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.queryByText("Completed")).not.toBeInTheDocument();
    });

    it("should prioritize 'Completed' over 'Time Over' status", () => {
      const completedButOverdue = {
        ...mockCourseInfoCompleted,
        isDeadlineOver: true,
      };

      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: completedButOverdue,
        enrollment: mockEnrollment,
      });

      render(<CourseStats course={mockCourse} />);

      expect(screen.getByText("Completed")).toBeInTheDocument();
      expect(screen.queryByText("Time Over")).not.toBeInTheDocument();
    });
  });

  describe("StatItem Integration", () => {
    it("should render two StatItems in enroll mode", () => {
      mockUseCourse.mockReturnValue({
        variant: "enroll",
        courseInfo: mockCourseInfoEnroll,
        enrollment: null,
      });

      render(<CourseStats course={mockCourse} />);

      const statItems = screen.getAllByTestId("stat-item");
      expect(statItems).toHaveLength(2);
    });

    it("should render two StatItems in courses mode", () => {
      mockUseCourse.mockReturnValue({
        variant: "courses",
        courseInfo: mockCourseInfoInProgress,
        enrollment: mockEnrollment,
      });

      render(<CourseStats course={mockCourse} />);

      const statItems = screen.getAllByTestId("stat-item");
      expect(statItems).toHaveLength(2);
    });
  });
});
