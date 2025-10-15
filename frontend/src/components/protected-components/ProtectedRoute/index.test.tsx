import { describe, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProtectedRoute from "components/protected-components/ProtectedRoute";

vi.mock("components/base-components/Spinner", () => ({
  default: () => <div data-testid="spinner">Spinner</div>,
}));

vi.mock("components/protected-components/layout/AppLayout", () => ({
  default: () => <div data-testid="app-layout">AppLayout</div>,
}));

const mockUseAuthRedux = {
  isAuthenticated: true,
  isAuthChecked: true,
  user: { role: "user" },
};

vi.mock("hooks/useAuthRedux", () => ({
  useAuthRedux: () => mockUseAuthRedux,
}));

const createMockStore = () =>
  configureStore({
    reducer: { authUi: () => ({}) },
  });

describe("ProtectedRoute", () => {
  beforeEach(() => {
    // reset mock before each test
    mockUseAuthRedux.isAuthenticated = true;
    mockUseAuthRedux.isAuthChecked = true;
    mockUseAuthRedux.user = { role: "user" };
  });

  it("renders Spinner when auth check is not finished", () => {
    mockUseAuthRedux.isAuthChecked = false;

    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoute />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders AppLayout when authorized", () => {
    mockUseAuthRedux.isAuthenticated = true;
    mockUseAuthRedux.isAuthChecked = true;
    mockUseAuthRedux.user = { role: "user" };

    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoute />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("app-layout")).toBeInTheDocument();
  });

  it("redirects when not authenticated", () => {
    mockUseAuthRedux.isAuthenticated = false;
    mockUseAuthRedux.isAuthChecked = true;

    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoute />
        </BrowserRouter>
      </Provider>
    );

    // since Navigate renders nothing, we can check that AppLayout is not rendered
    expect(container.querySelector("[data-testid='app-layout']")).toBeNull();
    expect(screen.queryByTestId("spinner")).toBeNull();
  });

  it("redirects when unauthorized", () => {
    mockUseAuthRedux.isAuthenticated = true;
    mockUseAuthRedux.isAuthChecked = true;
    mockUseAuthRedux.user = { role: "guest" };

    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ProtectedRoute allowedRoles={["admin"]} />
        </BrowserRouter>
      </Provider>
    );

    // AppLayout should not render for unauthorized user
    expect(container.querySelector("[data-testid='app-layout']")).toBeNull();
  });
});
