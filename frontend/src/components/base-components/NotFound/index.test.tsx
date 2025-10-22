import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFoundComponent from "components/base-components/NotFound";
import { useAuth } from "hooks/useAuth";

vi.mock("hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("NotFoundComponent", () => {
  const mockUseAuth = vi.mocked(useAuth);

  describe("Rendering", () => {
    it("renders 404 heading", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        user: null,
        isAuthChecked: true,
        loading: false,
        error: null,
        isLoginMode: true,
      });

      renderWithRouter(<NotFoundComponent />);
      expect(screen.getByText("404")).toBeInTheDocument();
    });

    it("renders 'Page Not Found' message", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        user: null,
        isAuthChecked: true,
        loading: false,
        error: null,
        isLoginMode: true,
      });

      renderWithRouter(<NotFoundComponent />);
      expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    });

    it("renders image", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        user: null,
        isAuthChecked: true,
        loading: false,
        error: null,
        isLoginMode: true,
      });

      renderWithRouter(<NotFoundComponent />);
      const image = screen.getByTestId("404-img");
      expect(image).toBeInTheDocument();
    });

    it("renders 'Go Home' link", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        user: null,
        isAuthChecked: true,
        loading: false,
        error: null,
        isLoginMode: true,
      });

      renderWithRouter(<NotFoundComponent />);
      expect(screen.getByTestId("go-home-link")).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("links to auth page when not authenticated", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        user: null,
        isAuthChecked: true,
        loading: false,
        error: null,
        isLoginMode: true,
      });

      renderWithRouter(<NotFoundComponent />);
      const link = screen.getByTestId("go-home-link");
      expect(link).toHaveAttribute("href", "/auth");
    });

    it("links to dashboard when authenticated", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        user: { email: "test@test.com", username: "test", password: "password" , role: "USER" },
        isAuthChecked: true,
        loading: false,
        error: null,
        isLoginMode: false,
      });

      renderWithRouter(<NotFoundComponent />);
      const link = screen.getByTestId("go-home-link");
      expect(link).toHaveAttribute("href", "/");
    });
  });
});
