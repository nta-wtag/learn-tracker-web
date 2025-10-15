import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Auth from "components/auth-components/Auth";

// Mock child components
vi.mock("components/auth-components/AuthIllustration", () => ({
  default: () => <div data-testid="auth-illustration">Illustration</div>,
}));

vi.mock("components/auth-components/AuthHeader", () => ({
  default: () => <div data-testid="auth-header">Header</div>,
}));

vi.mock("components/auth-components/AuthForm", () => ({
  default: () => <div data-testid="auth-form">Form</div>,
}));

vi.mock("components/auth-components/AuthModeSwitcher", () => ({
  default: () => <div data-testid="auth-switcher">Switcher</div>,
}));

const createMockStore = () => {
  return configureStore({
    reducer: {
      authUi: () => ({ isLoginMode: true }),
    },
  });
};

describe("Auth", () => {
  describe("Rendering", () => {
    it("renders all child components", () => {
      const store = createMockStore();
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Auth />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByTestId("auth-illustration")).toBeInTheDocument();
      expect(screen.getByTestId("auth-header")).toBeInTheDocument();
      expect(screen.getByTestId("auth-form")).toBeInTheDocument();
      expect(screen.getByTestId("auth-switcher")).toBeInTheDocument();
    });
  });
});
