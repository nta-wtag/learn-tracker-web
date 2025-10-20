import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import AuthModeSwitcher from "components/auth-components/AuthModeSwitcher";

vi.mock("components/base-components/ModeButton", () => ({
  default: ({ label, active, onClick }: any) => (
    <button onClick={onClick} data-active={active}>
      {label}
    </button>
  ),
}));

const mockToggleMode = vi.fn();

vi.mock("store/slices/authUiSlice", () => ({
  toggleMode: () => ({ type: "authUi/toggleMode" }),
}));

const createMockStore = (isLoginMode: boolean) => {
  return configureStore({
    reducer: {
      authUi: () => ({ isLoginMode }),
    },
  });
};

describe("AuthModeSwitcher", () => {
  beforeEach(() => {
    mockToggleMode.mockClear();
  });

  describe("Rendering", () => {
    it("renders both mode buttons", () => {
      const store = createMockStore(true);
      render(
        <Provider store={store}>
          <AuthModeSwitcher />
        </Provider>
      );
      expect(screen.getByText("Sign In")).toBeInTheDocument();
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });
  });

  describe("Active States", () => {
    it("Sign In is active in login mode", () => {
      const store = createMockStore(true);
      render(
        <Provider store={store}>
          <AuthModeSwitcher />
        </Provider>
      );
      const signInButton = screen.getByText("Sign In");
      expect(signInButton).toHaveAttribute("data-active", "true");
    });

    it("Sign Up is active in signup mode", () => {
      const store = createMockStore(false);
      render(
        <Provider store={store}>
          <AuthModeSwitcher />
        </Provider>
      );
      const signUpButton = screen.getByText("Sign Up");
      expect(signUpButton).toHaveAttribute("data-active", "true");
    });

    it("only one button is active at a time", () => {
      const store = createMockStore(true);
      render(
        <Provider store={store}>
          <AuthModeSwitcher />
        </Provider>
      );
      const signInButton = screen.getByText("Sign In");
      const signUpButton = screen.getByText("Sign Up");

      expect(signInButton).toHaveAttribute("data-active", "true");
      expect(signUpButton).toHaveAttribute("data-active", "false");
    });
  });

  describe("Interactions", () => {
    it("dispatches toggleMode when Sign In clicked", async () => {
      const store = createMockStore(false);
      const dispatchSpy = vi.spyOn(store, "dispatch");

      render(
        <Provider store={store}>
          <AuthModeSwitcher />
        </Provider>
      );

      await userEvent.click(screen.getByText("Sign In"));
      expect(dispatchSpy).toHaveBeenCalled();
    });

    it("dispatches toggleMode when Sign Up clicked", async () => {
      const store = createMockStore(true);
      const dispatchSpy = vi.spyOn(store, "dispatch");

      render(
        <Provider store={store}>
          <AuthModeSwitcher />
        </Provider>
      );

      await userEvent.click(screen.getByText("Sign Up"));
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });
});
