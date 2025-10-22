import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "components/protected-components/ProtectedRoute";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Navigate: ({ to, replace }: any) => {
      mockNavigate(to, replace);
      return <div data-testid="navigate" data-to={to} data-replace={replace} />;
    },
  };
});

const mockUseAuth = vi.fn();
vi.mock("hooks/useAuth", () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock("components/base-components/Spinner", () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock("components/protected-components/layout/AppLayout", () => ({
  default: () => <div data-testid="app-layout">App Layout</div>,
}));

const mockUser = {
  id: "2",
  email: "user@test.com",
  username: "user",
  role: "user",
};

const renderProtectedRoute = (props = {}) => {
  return render(
    <MemoryRouter>
      <ProtectedRoute {...props} />
    </MemoryRouter>
  );
};

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Loading State", () => {
    it("should show spinner when auth is not checked", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isAuthChecked: false,
        user: null,
      });

      renderProtectedRoute();

      expect(screen.getByTestId("spinner")).toBeInTheDocument();
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should NOT show AppLayout while loading", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isAuthChecked: false,
        user: null,
      });

      renderProtectedRoute();

      expect(screen.queryByTestId("app-layout")).not.toBeInTheDocument();
    });

    it("should NOT navigate while loading", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isAuthChecked: false,
        user: null,
      });

      renderProtectedRoute();

      expect(screen.queryByTestId("navigate")).not.toBeInTheDocument();
    });
  });

  describe("Unauthenticated User", () => {
    it("should redirect to auth page when not authenticated", async () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isAuthChecked: true,
        user: null,
      });

      renderProtectedRoute();

      await waitFor(() => {
        expect(screen.getByTestId("navigate")).toBeInTheDocument();
      });

      const navigate = screen.getByTestId("navigate");
      expect(navigate).toHaveAttribute("data-to", "/auth");
      expect(navigate).toHaveAttribute("data-replace", "true");
    });

    it("should NOT show AppLayout when not authenticated", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isAuthChecked: true,
        user: null,
      });

      renderProtectedRoute();

      expect(screen.queryByTestId("app-layout")).not.toBeInTheDocument();
    });
  });

  describe("Component Rendering", () => {
    it("should render only Navigate when not authenticated", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isAuthChecked: true,
        user: null,
      });

      renderProtectedRoute();

      expect(screen.getByTestId("navigate")).toBeInTheDocument();
      expect(screen.queryByTestId("app-layout")).not.toBeInTheDocument();
      expect(screen.queryByTestId("toaster")).not.toBeInTheDocument();
    });

    it("should render only Spinner when auth not checked", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isAuthChecked: false,
        user: null,
      });

      renderProtectedRoute();

      expect(screen.getByTestId("spinner")).toBeInTheDocument();
      expect(screen.queryByTestId("app-layout")).not.toBeInTheDocument();
      expect(screen.queryByTestId("navigate")).not.toBeInTheDocument();
    });
  });
});
