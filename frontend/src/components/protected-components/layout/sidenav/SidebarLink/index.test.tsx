import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import SidebarLink from "components/protected-components/layout/sidenav/SidebarLink";

const MockIcon = () => <svg data-testid="icon" />;

describe("SidebarLink", () => {
  it("renders label text", () => {
    render(
      <MemoryRouter>
        <SidebarLink to="/test" label="Test Link" icon={MockIcon} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Link")).toBeInTheDocument();
  });

  it("renders icon", () => {
    render(
      <MemoryRouter>
        <SidebarLink to="/test" label="Test Link" icon={MockIcon} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("applies active class when route is active", () => {
    render(
      <MemoryRouter initialEntries={["/test"]}>
        <SidebarLink to="/test" label="Test Link" icon={MockIcon} />
      </MemoryRouter>
    );

    const link = screen.getByText("Test Link").closest("a");
    expect(link).toHaveClass("text-primaryColor");
  });

  it("applies inactive class when route is not active", () => {
    render(
      <MemoryRouter initialEntries={["/other"]}>
        <SidebarLink to="/test" label="Test Link" icon={MockIcon} />
      </MemoryRouter>
    );

    const link = screen.getByText("Test Link").closest("a");
    expect(link).toHaveClass("text-gray-400");
    expect(link).toHaveClass("hover:text-gray-600");
  });
});
