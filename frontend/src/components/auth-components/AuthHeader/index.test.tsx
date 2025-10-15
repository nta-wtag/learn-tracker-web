import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AuthHeader from "components/auth-components/AuthHeader";

const createMockStore = (isLoginMode: boolean) => {
  return configureStore({
    reducer: {
      authUi: () => ({ isLoginMode }),
    },
  });
};

describe("AuthHeader", () => {
  describe("Rendering", () => {
    it("renders login header in login mode", () => {
      const store = createMockStore(true);
      render(
        <Provider store={store}>
          <AuthHeader />
        </Provider>
      );
      expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    });

    it("renders signup header in signup mode", () => {
      const store = createMockStore(false);
      render(
        <Provider store={store}>
          <AuthHeader />
        </Provider>
      );
      expect(screen.getByText("Hello There")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("uses h1 tag", () => {
      const store = createMockStore(true);
      render(
        <Provider store={store}>
          <AuthHeader />
        </Provider>
      );
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });
  });
});
