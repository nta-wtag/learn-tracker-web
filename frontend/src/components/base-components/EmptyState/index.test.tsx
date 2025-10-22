import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EmptyState from "components/base-components/EmptyState";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("EmptyState", () => {
  describe("Rendering", () => {
    it("renders title", () => {
      renderWithRouter(
        <EmptyState title="No Data" description="Nothing to show" />
      );
      expect(screen.getByText("No Data")).toBeInTheDocument();
    });

    it("renders description", () => {
      renderWithRouter(
        <EmptyState title="No Data" description="Nothing to show" />
      );
      expect(screen.getByText("Nothing to show")).toBeInTheDocument();
    });

    it("renders without action button", () => {
      renderWithRouter(
        <EmptyState title="No Data" description="Nothing to show" />
      );
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("renders with action button when props provided", () => {
      renderWithRouter(
        <EmptyState
          title="No Data"
          description="Nothing to show"
          actionText="Add Item"
          actionLink="/add"
        />
      );
      expect(screen.getByRole("button", { name: "Add Item" })).toBeInTheDocument();
    });

    it("does not render button if only actionText provided", () => {
      renderWithRouter(
        <EmptyState
          title="No Data"
          description="Nothing to show"
          actionText="Add Item"
        />
      );
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("does not render button if only actionLink provided", () => {
      renderWithRouter(
        <EmptyState
          title="No Data"
          description="Nothing to show"
          actionLink="/add"
        />
      );
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });

  describe("Links", () => {
    it("links to correct path", () => {
      renderWithRouter(
        <EmptyState
          title="No Data"
          description="Nothing to show"
          actionText="Add Item"
          actionLink="/add-item"
        />
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/add-item");
    });
  });
});
