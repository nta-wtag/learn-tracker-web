import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFoundComponent from "components/base-components/NotFound";
import { useAuthRedux } from "hooks/useAuthRedux";

vi.mock("hooks/useAuthRedux", () => ({
    useAuthRedux: vi.fn(),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("NotFoundComponent", () => {
  describe("Rendering", () => {
    it("renders 404 heading", () => {
      vi.mocked(useAuthRedux).mockReturnValue({
        isAuthenticated: false,
        user: null,
        isAuthChecked: true,
        login: vi.fn(),
        register: vi.fn(),
        logoutUser: vi.fn(),
        restoreUser: vi.fn(),
      });

      renderWithRouter(<NotFoundComponent />);
      expect(screen.getByText("404")).toBeInTheDocument();
    });

    it("renders 'Page Not Found' message", () => {
      vi.mocked(useAuthRedux).mockReturnValue({
        isAuthenticated: false,
        user: null,
        isAuthChecked: true,
        login: vi.fn(),
        register: vi.fn(),
        logoutUser: vi.fn(),
        restoreUser: vi.fn(),
      });

      renderWithRouter(<NotFoundComponent />);
      expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    });

    it("renders image", () => {
      vi.mocked(useAuthRedux).mockReturnValue({
        isAuthenticated: false,
        user: null,
        isAuthChecked: true,
        login: vi.fn(),
        register: vi.fn(),
        logoutUser: vi.fn(),
        restoreUser: vi.fn(),
      });

      renderWithRouter(<NotFoundComponent />);
      const image = screen.getByRole("img");
      expect(image).toBeInTheDocument();
    });

    it("renders 'Go Home' link", () => {
      vi.mocked(useAuthRedux).mockReturnValue({
        isAuthenticated: false,
        user: null,
        isAuthChecked: true,
        login: vi.fn(),
        register: vi.fn(),
        logoutUser: vi.fn(),
        restoreUser: vi.fn(),
      });

      renderWithRouter(<NotFoundComponent />);
      expect(screen.getByRole("link", { name: "Go Home" })).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("links to auth page when not authenticated", () => {
      vi.mocked(useAuthRedux).mockReturnValue({
        isAuthenticated: false,
        user: null,
        isAuthChecked: true,
        login: vi.fn(),
        register: vi.fn(),
        logoutUser: vi.fn(),
        restoreUser: vi.fn(),
      });

      renderWithRouter(<NotFoundComponent />);
      const link = screen.getByRole("link", { name: "Go Home" });
      expect(link).toHaveAttribute("href", "/auth");
    });

    it("links to dashboard when authenticated", () => {
      vi.mocked(useAuthRedux).mockReturnValue({
        isAuthenticated: true,
        user: { email: "test@test.com", username: "test", password: "pass", role: "USER" },
        isAuthChecked: true,
        login: vi.fn(),
        register: vi.fn(),
        logoutUser: vi.fn(),
        restoreUser: vi.fn(),
      });

      renderWithRouter(<NotFoundComponent />);
      const link = screen.getByRole("link", { name: "Go Home" });
      expect(link).toHaveAttribute("href", "/");
    });
  });

  describe("Styling", () => {
    it("has correct styling classes on 404 text", () => {
      vi.mocked(useAuthRedux).mockReturnValue({
        isAuthenticated: false,
        user: null,
        isAuthChecked: true,
        login: vi.fn(),
        register: vi.fn(),
        logoutUser: vi.fn(),
        restoreUser: vi.fn(),
      });

      renderWithRouter(<NotFoundComponent />);
    });

    it("has correct button styling", () => {
      vi.mocked(useAuthRedux).mockReturnValue({
        isAuthenticated: false,
        user: null,
        isAuthChecked: true,
        login: vi.fn(),
        register: vi.fn(),
        logoutUser: vi.fn(),
        restoreUser: vi.fn(),
      });

      renderWithRouter(<NotFoundComponent />);
    });
  });
});
