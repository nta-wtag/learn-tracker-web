import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authUiReducer from "store/slices/authUiSlice"; // adjust the path to your slice
import AuthHeader from "components/auth-components/AuthHeader";

const renderWithRedux = (ui: React.ReactNode, { preloadedState }: any) => {
  const store = configureStore({
    reducer: { authUi: authUiReducer },
    preloadedState,
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe("AuthHeader", () => {
  it("renders login header text when in login mode", () => {
    renderWithRedux(<AuthHeader />, { preloadedState: { authUi: { isLoginMode: true } } });
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
  });

  it("renders signup header text when not in login mode", () => {
    renderWithRedux(<AuthHeader />, { preloadedState: { authUi: { isLoginMode: false } } });
    expect(screen.getByText("Hello There")).toBeInTheDocument();
  });

  it("has correct heading level", () => {
    const { container } = renderWithRedux(<AuthHeader />, { preloadedState: { authUi: { isLoginMode: true } } });
    const heading = container.querySelector("h1");

    expect(heading).toBeInTheDocument();
  });
});
