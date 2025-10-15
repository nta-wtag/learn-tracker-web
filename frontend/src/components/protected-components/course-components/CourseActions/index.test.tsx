
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi, beforeEach } from "vitest";
import { Course } from "types/course-types";
import CourseActions from "components/protected-components/course-components/CourseActions";

const mockEnroll = vi.fn();
const mockGoToLessons = vi.fn();

let isEnrolled = false;

vi.mock("hooks/useCourseEnrollment", () => ({
    useCourseEnrollment: () => ({
        isEnrolled,
        enroll: mockEnroll,
    }),
}));

vi.mock("hooks/useNavigateToCourse", () => ({
    useNavigateToCourse: () => ({
        goToLessons: mockGoToLessons,
    }),
}));

vi.mock("hooks/useCourseContext", () => ({
    useCourseContext: () => "enroll",
}));

vi.mock("react-hot-toast", () => ({
    default: { success: vi.fn(), error: vi.fn() },
}));

describe("CourseActions", () => {
    const course: Course = { course: "course-1", title: "Test Course" } as any;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders Lesson Plan button", () => {
        render(<CourseActions course={course} />);
        
        expect(screen.getByRole("button", { name: /Lesson Plan/i })).toBeInTheDocument();
    });

    it("renders Enroll Now button when not enrolled", () => {
        render(<CourseActions course={course} />);

        expect(screen.getByRole("button", { name: /Enroll Now/i })).toBeInTheDocument();
    });

    it("calls goToLessons when Lesson Plan clicked", async () => {
        render(<CourseActions course={course} />);

        await userEvent.click(screen.getByRole("button", { name: /Lesson Plan/i }));

        expect(mockGoToLessons).toHaveBeenCalled();
    });

    it("calls enroll and shows success toast when enrollment succeeds", async () => {
        mockEnroll.mockReturnValue({ success: true, message: "Enrolled!" });

        const toast = (await import("react-hot-toast")).default;

        render(<CourseActions course={course} />);

        await userEvent.click(screen.getByRole("button", { name: /Enroll Now/i }));

        expect(mockEnroll).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith("Enrolled!");
    });

    it("calls enroll and shows error toast when enrollment fails", async () => {
        mockEnroll.mockReturnValue({ success: false, message: "Already enrolled" });

        const toast = (await import("react-hot-toast")).default;

        render(<CourseActions course={course} />);

        await userEvent.click(screen.getByRole("button", { name: /Enroll Now/i }));

        expect(mockEnroll).toHaveBeenCalled();
        expect(toast.error).toHaveBeenCalledWith("Already enrolled");
    });

    it("disables Enroll button when already enrolled", () => {
        isEnrolled = true; 

        render(<CourseActions course={course} />);

        const enrollButton = screen.getByRole("button", { name: /Enrolled/i });

        expect(enrollButton).toBeDisabled();

        isEnrolled = false;
    });
});
