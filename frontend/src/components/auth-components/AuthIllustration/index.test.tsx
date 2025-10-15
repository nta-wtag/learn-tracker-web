import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AuthIllustration from "components/auth-components/AuthIllustration";

const createMockStore = (isLoginMode: boolean) => {
  return configureStore({
    reducer: {
      authUi: () => ({ isLoginMode }),
    },
  });
};

describe("AuthIllustration", () => {
  describe("Rendering", () => {
    it("renders image", () => {
      const store = createMockStore(true);
      render(
        <Provider store={store}>
          <AuthIllustration />
        </Provider>
      );
      expect(screen.getByAltText("Auth illustration")).toBeInTheDocument();
    });

    it("has correct alt text", () => {
      const store = createMockStore(true);
      render(
        <Provider store={store}>
          <AuthIllustration />
        </Provider>
      );
      expect(screen.getByAltText("Auth illustration")).toBeInTheDocument();
    });
  });

  describe("Image Selection", () => {
    it("shows login image in login mode", () => {
      const store = createMockStore(true);
      render(
        <Provider store={store}>
          <AuthIllustration />
        </Provider>
      );
      const img = screen.getByAltText("Auth illustration");
      expect(img).toHaveAttribute("src", expect.stringContaining("login-illustration"));
    });

    it("shows register image in signup mode", () => {
      const store = createMockStore(false);
      render(
        <Provider store={store}>
          <AuthIllustration />
        </Provider>
      );
      const img = screen.getByAltText("Auth illustration");
      expect(img).toHaveAttribute("src", expect.stringContaining("register-illustration"));
    });
  });
});
