import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SidebarNav from "components/protected-components/layout/sidenav/SidebarNav";

vi.mock("components/protected-components/layout/sidenav/SidebarLink", () => ({
  default: ({ label }: any) => <div data-testid="sidebar-link">{label}</div>,
}));

describe("SidebarNav", () => {
  it("renders all navigation links", () => {
    render(<SidebarNav />);

    const links = screen.getAllByTestId("sidebar-link");
    expect(links).toHaveLength(4);

    const linkLabels = links.map(link => link.textContent);
    expect(linkLabels).toContain("Dashboard");
    expect(linkLabels).toContain("Courses");
    expect(linkLabels).toContain("Enroll");
    expect(linkLabels).toContain("Profile");
  });
});
