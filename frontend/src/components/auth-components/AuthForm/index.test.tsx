import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import AuthForm from "components/auth-components/AuthForm";

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

const mockLogin = vi.fn();
const mockRegister = vi.fn();
const mockNavigate = vi.fn();

vi.mock("hooks/useAuthRedux", () => ({
  useAuthRedux: () => ({
    login: mockLogin,
    register: mockRegister,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const createMockStore = (isLoginMode: boolean) => {
  return configureStore({
    reducer: {
      authUi: () => ({ isLoginMode }),
    },
  });
};

describe("AuthForm", () => {
  beforeEach(() => {
    mockLogin.mockClear();
    mockRegister.mockClear();
    mockNavigate.mockClear();
  });

  describe("Rendering", () => {
    it("renders form", () => {
      const store = createMockStore(true);
      render(
        <Provider store={store}>
          <BrowserRouter>
            <AuthForm />
          </BrowserRouter>
        </Provider>
      );
      expect(screen.getByTestId("auth-input-fields")).toBeInTheDocument();
    });

    it("renders Sign In button in login mode", () => {
      const store = createMockStore(true);
      render(
        <Provider store={store}>
          <BrowserRouter>
            <AuthForm />
          </BrowserRouter>
        </Provider>
      );
      expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
    });

    it("renders Sign Up button in signup mode", () => {
      const store = createMockStore(false);
      render(
        <Provider store={store}>
          <BrowserRouter>
            <AuthForm />
          </BrowserRouter>
        </Provider>
      );
      expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
    });
  });

  describe("Form Submission", () => {
    it("submit button has correct type", () => {
      const store = createMockStore(true);
      render(
        <Provider store={store}>
          <BrowserRouter>
            <AuthForm />
          </BrowserRouter>
        </Provider>
      );
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });
  });
});
