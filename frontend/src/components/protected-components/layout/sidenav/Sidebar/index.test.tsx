import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Sidebar from "components/protected-components/layout/sidenav/Sidebar";

vi.mock("components/protected-components/layout/sidenav/SidebarNav", () => ({
  default: () => <div data-testid="sidebar-nav">SidebarNav</div>,
}));

describe("Sidebar", () => {
  it("renders the logo image", () => {
    render(<Sidebar />);
    const logo = screen.getByAltText("LearnTracker Logo") as HTMLImageElement;
    expect(logo).toBeInTheDocument();
    expect(logo.src).toContain("logo.png"); 
  });

  it("renders the app title", () => {
    render(<Sidebar />);
    const title = screen.getByText("LearnTracker");
    expect(title).toBeInTheDocument();
  });

  it("renders SidebarNav component", () => {
    render(<Sidebar />);
    const nav = screen.getByTestId("sidebar-nav");
    expect(nav).toBeInTheDocument();
  });
});
