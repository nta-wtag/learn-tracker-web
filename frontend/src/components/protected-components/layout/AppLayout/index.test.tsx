import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AppLayout from "components/protected-components/layout/AppLayout";

vi.mock("components/protected-components/layout/sidenav/Sidebar", () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>,
}));

vi.mock("components/protected-components/layout/TopNav", () => ({
  default: () => <div data-testid="topnav">TopNav</div>,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet">Outlet</div>,
  };
});

vi.mock("react-hot-toast", () => ({
  Toaster: () => <div data-testid="toaster">Toaster</div>,
}));

describe("AppLayout", () => {
  it("renders Sidebar, TopNav, Outlet, and Toaster", () => {
    render(<AppLayout />);

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("topnav")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
    expect(screen.getByTestId("toaster")).toBeInTheDocument();
  });
});
