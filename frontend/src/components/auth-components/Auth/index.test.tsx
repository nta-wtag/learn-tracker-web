import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Auth from "components/auth-components/Auth";

vi.mock("components/auth-components/AuthIllustration", () => ({
    default: () => <div data-testid="auth-illustration">Auth Illustration</div>,
}));

vi.mock("components/auth-components/AuthHeader", () => ({
    default: () => <div data-testid="auth-header">Auth Header</div>,
}));

vi.mock("components/auth-components/AuthForm", () => ({
    default: () => <form data-testid="auth-form">Auth Form</form>,
}));

vi.mock("components/auth-components/AuthModeSwitcher", () => ({
    default: () => (
        <div data-testid="auth-mode-switcher">
            <button data-testid="login-button">Login</button>
            <button data-testid="signup-button">Signup</button>
        </div>
    ),
}));

describe("Auth Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("Rendering", () => {
        it("renders all child components", () => {
            render(<Auth />);
            expect(screen.getByTestId("auth-illustration")).toBeInTheDocument();
            expect(screen.getByTestId("auth-header")).toBeInTheDocument();
            expect(screen.getByTestId("auth-form")).toBeInTheDocument();
            expect(screen.getByTestId("auth-mode-switcher")).toBeInTheDocument();
        });

        it("renders child components with correct content", () => {
            render(<Auth />);
            expect(screen.getByTestId("auth-illustration")).toHaveTextContent("Auth Illustration");
            expect(screen.getByTestId("auth-header")).toHaveTextContent("Auth Header");
            expect(screen.getByTestId("auth-form")).toHaveTextContent("Auth Form");
            expect(screen.getByTestId("login-button")).toHaveTextContent("Login");
            expect(screen.getByTestId("signup-button")).toHaveTextContent("Signup");
        });

        it("has proper layout container", () => {
            const { container } = render(<Auth />);
            const mainContainer = container.querySelector('.w-full.h-screen');
            expect(mainContainer).toBeInTheDocument();
        });
    });
});
