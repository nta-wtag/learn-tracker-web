import { describe, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TopNav from "components/protected-components/layout/TopNav";

const mockNavigate = vi.fn();
const mockLogoutUser = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock("hooks/useAuthRedux", () => ({
    useAuthRedux: () => ({
        user: { username: "John" },
        logoutUser: mockLogoutUser,
    }),
}));

vi.mock("components/base-components/Button", () => ({
    default: ({ text, onClick }: any) => (
        <button onClick={onClick}>{text}</button>
    ),
}));

describe("TopNav", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders user greeting with username", () => {
        render(<TopNav />);
        expect(screen.getByText(/Hey there,/)).toBeInTheDocument();
        expect(screen.getByText("John")).toBeInTheDocument();

    });

    it("calls navigate to enroll page when Enroll clicked", async () => {
        render(<TopNav />);
        await userEvent.click(screen.getByText("Enroll"));
        expect(mockNavigate).toHaveBeenCalledWith("/enroll");
    });

    it("calls logoutUser and navigates to auth page when Log out clicked", async () => {
        render(<TopNav />);
        await userEvent.click(screen.getByText("Log out"));
        expect(mockLogoutUser).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/auth", { replace: true });
    });
});
