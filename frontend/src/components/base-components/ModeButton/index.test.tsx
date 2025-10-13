import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModeButton from "components/base-components/ModeButton";

describe("ModeButton", () => {
  describe("Rendering", () => {
    it("renders with label", () => {
      render(<ModeButton label="Sign In" active={false} onClick={vi.fn()} />);
      expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
    });

    it("shows active indicator when active", () => {
      const { container } = render(
        <ModeButton label="Active" active={true} onClick={vi.fn()} />
      );
      
      const indicator = container.querySelector(".bg-primaryColor");
      expect(indicator).toBeInTheDocument();
    });

    it("does not show indicator when inactive", () => {
      const { container } = render(
        <ModeButton label="Inactive" active={false} onClick={vi.fn()} />
      );
      
      // Active indicator should not be present
      const indicators = container.querySelectorAll(".bg-primaryColor");
      expect(indicators.length).toBe(0);
    });
  });

  describe("Styling", () => {
    it("applies active styles when active", () => {
      render(<ModeButton label="Active" active={true} onClick={vi.fn()} />);
      const button = screen.getByRole("button");
      
      expect(button).toHaveClass("text-primaryColor");
      expect(button).toHaveClass("font-extrabold");
    });

    it("applies inactive styles when not active", () => {
      render(<ModeButton label="Inactive" active={false} onClick={vi.fn()} />);
      const button = screen.getByRole("button");
      
      expect(button).toHaveClass("text-gray-400");
      expect(button).toHaveClass("font-light");
    });
  });

  describe("Interactions", () => {
    it("calls onClick when clicked", async () => {
      const handleClick = vi.fn();
      render(<ModeButton label="Click" active={false} onClick={handleClick} />);
      
      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick even when active", async () => {
      const handleClick = vi.fn();
      render(<ModeButton label="Click" active={true} onClick={handleClick} />);
      
      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
