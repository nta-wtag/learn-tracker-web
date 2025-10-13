import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import AuthForm from "components/auth-components/AuthForm";
import * as authHandlers from "utils/auth-handlers";

// Mock matchMedia BEFORE any imports
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

// Mock dependencies
vi.mock("components/base-components/Button", () => ({
    default: ({ text, type, disabled }: any) => (
        <button type={type} disabled={disabled}>
            {text}
        </button>
    ),
}));

vi.mock("components/auth-components/AuthInputFields", () => ({
    default: () => <div data-testid="auth-input-fields" />,
}));

vi.mock("utils/auth-validation", () => ({
    validateAuth: vi.fn(() => ({})),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

const renderAuthForm = (isLoginMode: boolean) => {
    return render(
        <BrowserRouter>
            <AuthForm isLoginMode={isLoginMode} />
        </BrowserRouter>
    );
};

describe("AuthForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("Rendering", () => {
        it("renders form with input fields", () => {
            renderAuthForm(true);
            expect(screen.getByTestId("auth-input-fields")).toBeInTheDocument();
        });

        it("renders Sign In button in login mode", () => {
            renderAuthForm(true);
            expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
        });

        it("renders Sign Up button in signup mode", () => {
            renderAuthForm(false);
            expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
        });
    });

    describe("Login Flow", () => {
        it("navigates to home on successful login", async () => {
            vi.spyOn(authHandlers, "handleLogin").mockReturnValue({
                success: true,
                user: { email: "test@test.com", username: "test", password: "pass", role: "USER" },
                message: "Login successful",
            });

            renderAuthForm(true);
            const submitButton = screen.getByRole("button", { name: "Sign In" });
            await userEvent.click(submitButton);

            await waitFor(() => {
                expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
            });
        });

        it("does not navigate on failed login", async () => {
            vi.spyOn(authHandlers, "handleLogin").mockReturnValue({
                success: false,
                message: "Invalid credentials",
            });

            renderAuthForm(true);
            const submitButton = screen.getByRole("button", { name: "Sign In" });
            await userEvent.click(submitButton);

            await waitFor(() => {
                expect(mockNavigate).not.toHaveBeenCalled();
            });
        });
    });

    describe("Signup Flow", () => {
        it("navigates to home on successful registration", async () => {
            vi.spyOn(authHandlers, "handleRegister").mockReturnValue({
                success: true,
                user: { email: "new@test.com", username: "newuser", password: "pass", role: "USER" },
                message: "Registration successful",
            });

            renderAuthForm(false);
            const submitButton = screen.getByRole("button", { name: "Sign Up" });
            await userEvent.click(submitButton);

            await waitFor(() => {
                expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
            });
        });

        it("does not navigate on failed registration", async () => {
            vi.spyOn(authHandlers, "handleRegister").mockReturnValue({
                success: false,
                message: "Email already exists",
            });

            renderAuthForm(false);
            const submitButton = screen.getByRole("button", { name: "Sign Up" });
            await userEvent.click(submitButton);

            await waitFor(() => {
                expect(mockNavigate).not.toHaveBeenCalled();
            });
        });
    });
});
