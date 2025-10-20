import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthForm from "components/auth-components/AuthForm";

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock("redux-toolkit/store", () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock("redux-toolkit/thunks/authThunk", () => ({
  loginUser: vi.fn((data) => ({ unwrap: () => Promise.resolve(data) })),
  registerUser: vi.fn((data) => ({ unwrap: () => Promise.resolve(data) })),
}));

vi.mock("utils/auth-validation", () => ({
  validateAuth: vi.fn(() => ({})),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("components/base-components/Button", () => ({
  default: ({ text, type, disabled }: any) => (
    <button
      type={type}
      data-testid={`button-${text.replace(/\s+/g, "-").toLowerCase()}`}
      disabled={disabled}
    >
      {text}
    </button>
  ),
}));

vi.mock("components/auth-components/AuthInputFields", () => ({
  default: () => <div data-testid="auth-input-fields" />,
}));

let mockIsLoginMode = true;
vi.mock("hooks/useAuth", () => ({
  useAuth: () => ({ isLoginMode: mockIsLoginMode }),
}));

describe("AuthForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders input fields", () => {
      mockIsLoginMode = true;
      render(
        <BrowserRouter>
          <AuthForm />
        </BrowserRouter>
      );
      expect(screen.getByTestId("auth-input-fields")).toBeInTheDocument();
    });

    it("renders Sign In button in login mode", () => {
      mockIsLoginMode = true;
      render(
        <BrowserRouter>
          <AuthForm />
        </BrowserRouter>
      );
      expect(screen.getByTestId("button-sign-in")).toBeInTheDocument();
    });

    it("renders Sign Up button in signup mode", () => {
      mockIsLoginMode = false;
      render(
        <BrowserRouter>
          <AuthForm />
        </BrowserRouter>
      );
      expect(screen.getByTestId("button-sign-up")).toBeInTheDocument();
    });
  });

  describe("Form behavior", () => {
    it("submit button has correct type", () => {
      mockIsLoginMode = true;
      render(
        <BrowserRouter>
          <AuthForm />
        </BrowserRouter>
      );
      const submitButton = screen.getByTestId("button-sign-in");
      expect(submitButton).toHaveAttribute("type", "submit");
    });
  });
});
