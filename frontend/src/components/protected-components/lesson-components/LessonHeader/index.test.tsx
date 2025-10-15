import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi, beforeEach } from "vitest";
import LessonHeader from "components/protected-components/lesson-components/LessonHeader";
import { Course } from "types/course-types";

const mockEnroll = vi.fn();

vi.mock("react-hot-toast", () => ({
    default: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("hooks/useCourseEnrollment", () => ({
    useCourseEnrollment: () => ({
        enroll: mockEnroll,
    }),
}));

describe("LessonHeader", () => {
    const course: Course = { course: "React Basics", title: "React Basics Course" } as any;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders course title correctly", () => {
        render(<LessonHeader course={course} />);
        expect(screen.getByText("React Basics - Lesson Plan")).toBeInTheDocument();
    });

    it("renders Start Learning button", () => {
        render(<LessonHeader course={course} />);
        expect(screen.getByRole("button", { name: /Start Learning/i })).toBeInTheDocument();
    });

    it("calls enroll and shows success toast on successful enrollment", async () => {
        mockEnroll.mockReturnValue({ success: true, message: "Enrolled successfully!" });

        const toast = (await import("react-hot-toast")).default;

        render(<LessonHeader course={course} />);

        await userEvent.click(screen.getByRole("button", { name: /Start Learning/i }));

        expect(mockEnroll).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith("Enrolled successfully!");
        expect(toast.error).not.toHaveBeenCalled();
    });

    it("calls enroll and shows error toast on failed enrollment", async () => {
        mockEnroll.mockReturnValue({ success: false, message: "Already enrolled" });

        const toast = (await import("react-hot-toast")).default;

        render(<LessonHeader course={course} />);

        await userEvent.click(screen.getByRole("button", { name: /Start Learning/i }));

        expect(mockEnroll).toHaveBeenCalled();
        expect(toast.error).toHaveBeenCalledWith("Already enrolled");
        expect(toast.success).not.toHaveBeenCalled();
    });
});
