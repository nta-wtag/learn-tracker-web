import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Auth from "components/auth-components/Auth";

// Mock child components to simplify testing
vi.mock("components/auth-components/AuthIllustration", () => ({
  default: ({ isLoginMode }: { isLoginMode: boolean }) => (
    <div data-testid="auth-illustration">
      {isLoginMode ? "Login Illustration" : "Signup Illustration"}
    </div>
  ),
}));

vi.mock("components/auth-components/AuthHeader", () => ({
  default: ({ isLoginMode }: { isLoginMode: boolean }) => (
    <div data-testid="auth-header">
      {isLoginMode ? "Welcome Back" : "Create Account"}
    </div>
  ),
}));

vi.mock("components/auth-components/AuthForm", () => ({
  default: ({ isLoginMode }: { isLoginMode: boolean }) => (
    <form data-testid="auth-form">
      {isLoginMode ? "Login Form Fields" : "Signup Form Fields"}
    </form>
  ),
}));

vi.mock("components/auth-components/AuthModeSwitcher", () => ({
  default: ({ isLoginMode, setIsLoginMode }: any) => (
    <div data-testid="auth-mode-switcher">
      <button
        data-testid="login-button"
        onClick={() => setIsLoginMode(true)}
        aria-pressed={isLoginMode}
      >
        Login
      </button>
      <button
        data-testid="signup-button"
        onClick={() => setIsLoginMode(false)}
        aria-pressed={!isLoginMode}
      >
        Signup
      </button>
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

    it("renders with correct default state (login mode)", () => {
      render(<Auth />);

      expect(screen.getByTestId("auth-illustration")).toHaveTextContent("Login Illustration");
      expect(screen.getByTestId("auth-header")).toHaveTextContent("Welcome Back");
      expect(screen.getByTestId("auth-form")).toHaveTextContent("Login Form Fields");
    });

    it("has proper layout structure", () => {
      const { container } = render(<Auth />);
      
      // Check for main container
      const mainContainer = container.querySelector('.w-full.h-screen');
      expect(mainContainer).toBeInTheDocument();
    });
  });

  describe("Mode Switching", () => {
    it("switches from login to signup mode", async () => {
      render(<Auth />);
      const signupButton = screen.getByTestId("signup-button");

      // Initially in login mode
      expect(screen.getByTestId("auth-header")).toHaveTextContent("Welcome Back");

      // Click to switch to signup
      await userEvent.click(signupButton);

      // Now should show signup content
      expect(screen.getByTestId("auth-header")).toHaveTextContent("Create Account");
      expect(screen.getByTestId("auth-illustration")).toHaveTextContent("Signup Illustration");
      expect(screen.getByTestId("auth-form")).toHaveTextContent("Signup Form Fields");
    });

    it("switches from signup back to login mode", async () => {
      render(<Auth />);
      const signupButton = screen.getByTestId("signup-button");
      const loginButton = screen.getByTestId("login-button");

      // Switch to signup
      await userEvent.click(signupButton);
      expect(screen.getByTestId("auth-header")).toHaveTextContent("Create Account");

      // Switch back to login
      await userEvent.click(loginButton);
      expect(screen.getByTestId("auth-header")).toHaveTextContent("Welcome Back");
    });

    it("toggles mode multiple times correctly", async () => {
      render(<Auth />);
      const signupButton = screen.getByTestId("signup-button");
      const loginButton = screen.getByTestId("login-button");

      // Initial: Login
      expect(screen.getByTestId("auth-header")).toHaveTextContent("Welcome Back");

      // Toggle 1: Signup
      await userEvent.click(signupButton);
      expect(screen.getByTestId("auth-header")).toHaveTextContent("Create Account");

      // Toggle 2: Login
      await userEvent.click(loginButton);
      expect(screen.getByTestId("auth-header")).toHaveTextContent("Welcome Back");

      // Toggle 3: Signup
      await userEvent.click(signupButton);
      expect(screen.getByTestId("auth-header")).toHaveTextContent("Create Account");
    });
  });

  describe("Component Integration", () => {
    it("passes isLoginMode prop correctly to all child components", () => {
      render(<Auth />);

      // All components should reflect login mode
      expect(screen.getByTestId("auth-illustration")).toHaveTextContent("Login");
      expect(screen.getByTestId("auth-header")).toHaveTextContent("Welcome Back");
      expect(screen.getByTestId("auth-form")).toHaveTextContent("Login");
    });

    it("updates all child components when mode changes", async () => {
      render(<Auth />);
      const signupButton = screen.getByTestId("signup-button");

      await userEvent.click(signupButton);

      // All components should update to signup mode
      expect(screen.getByTestId("auth-illustration")).toHaveTextContent("Signup");
      expect(screen.getByTestId("auth-header")).toHaveTextContent("Create Account");
      expect(screen.getByTestId("auth-form")).toHaveTextContent("Signup");
    });

    it("passes setIsLoginMode function to AuthModeSwitcher", () => {
      render(<Auth />);
      
      // The mode switcher should be able to change state
      const switcherElement = screen.getByTestId("auth-mode-switcher");
      expect(switcherElement).toBeInTheDocument();
      
      // Verify it has both buttons
      expect(screen.getByTestId("login-button")).toBeInTheDocument();
      expect(screen.getByTestId("signup-button")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes for mode buttons", async () => {
      render(<Auth />);
      
      const loginButton = screen.getByTestId("login-button");
      const signupButton = screen.getByTestId("signup-button");

      // Login mode active initially
      expect(loginButton).toHaveAttribute("aria-pressed", "true");
      expect(signupButton).toHaveAttribute("aria-pressed", "false");

      // Switch to signup
      await userEvent.click(signupButton);

      expect(loginButton).toHaveAttribute("aria-pressed", "false");
      expect(signupButton).toHaveAttribute("aria-pressed", "true");
    });
  });

  describe("State Management", () => {
    it("maintains state independently", async () => {
      const { unmount } = render(<Auth />);
      const signupButton = screen.getByTestId("signup-button");

      await userEvent.click(signupButton);
      expect(screen.getByTestId("auth-header")).toHaveTextContent("Create Account");

      unmount();

      // Re-render should reset to default login mode
      render(<Auth />);
      expect(screen.getByTestId("auth-header")).toHaveTextContent("Welcome Back");
    });
  });
});
