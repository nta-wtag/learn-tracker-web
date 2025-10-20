import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PageHeader from "components/base-components/PageHeader";

describe("PageHeader", () => {
  describe("Rendering", () => {
    it("renders title", () => {
      render(<PageHeader title="My Page" />);
      expect(screen.getByText("My Page")).toBeInTheDocument();
    });

    it("renders without subtitle", () => {
      render(<PageHeader title="My Page" />);
      expect(screen.queryByTestId("header-subtitle")).not.toBeInTheDocument();
    });

    it("renders with subtitle when provided", () => {
      render(<PageHeader title="My Page" subtitle="Page description" />);
      expect(screen.getByText("Page description")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("uses heading tag for title", () => {
      render(<PageHeader title="My Page" />);
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("My Page");
    });
  });
});
