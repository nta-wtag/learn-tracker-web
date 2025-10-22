import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import TopNav from "components/protected-components/layout/TopNav";
import { logoutUser } from "redux-toolkit/thunks/authThunk";

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

let mockUser = {
    username: "TestUser",
    email: "abc@gmail.com",
    password: "password123",
    role: "user",
};

vi.mock("hooks/useAuth", () => ({
    useAuth: () => ({ user: mockUser }),
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock("redux-toolkit/thunks/authThunk", () => ({
    logoutUser: vi.fn(() => async (dispatch: any) => {
        return Promise.resolve();
    }),
}));

vi.mock("redux-toolkit/store", () => ({
    useAppDispatch: () => (action: any) => {
        if (typeof action === "function") {
            return action(mockDispatch);
        }
        
        return action;
    },
}));

vi.mock("components/base-components/Button", () => ({
    default: ({ text, onClick }: any) => (
        <button data-testid={`button-${text.toLowerCase()}`} onClick={onClick}>
            {text}
        </button>
    ),
}));

describe("TopNav", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders username", () => {
        mockUser = {
            username: "Noushin",
            email: "abc@gmail.com",
            password: "password123",
            role: "user",
        };

        render(<TopNav />);

        expect(screen.getByText(/hey there/i)).toBeInTheDocument();
        expect(screen.getByText("Noushin")).toBeInTheDocument();
    });

    it("navigates to enroll page when Enroll button clicked", () => {
        render(<TopNav />);
        fireEvent.click(screen.getByTestId("button-enroll"));

        expect(mockNavigate).toHaveBeenCalledWith("/enroll");
    });
});
