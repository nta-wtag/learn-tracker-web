import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "components/base-components/Button";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders button with text", () => {
      render(<Button text="Click me" />);
      expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    });

    it("renders with icon", () => {
      const icon = <span data-testid="test-icon">🚀</span>;
      render(<Button text="Submit" icon={icon} />);
      
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
      expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    it("has default type of button", () => {
      render(<Button text="Test" />);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("can have submit type", () => {
      render(<Button text="Submit" type="submit" />);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });
  });

  describe("Variants", () => {
    it("applies primary variant styles by default", () => {
      render(<Button text="Primary" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-primaryColor");
    });

    it("applies secondary variant styles", () => {
      render(<Button text="Secondary" variant="secondary" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-lightPrimaryColor");
    });

    it("applies danger variant styles", () => {
      render(<Button text="Delete" variant="danger" />);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-danger");
    });
  });

  describe("States", () => {
    it("can be disabled", () => {
      render(<Button text="Disabled" disabled />);
      const button = screen.getByRole("button");
      
      expect(button).toBeDisabled();
      expect(button).toHaveClass("bg-gray-300");
      expect(button).toHaveClass("cursor-not-allowed");
    });

    it("removes hover styles when disabled", () => {
      render(<Button text="Disabled" disabled />);
      const button = screen.getByRole("button");
      
      expect(button).not.toHaveClass("hover:bg-darkPrimaryColor");
    });

    it("can be full width", () => {
      render(<Button text="Full Width" fullWidth />);
      expect(screen.getByRole("button")).toHaveClass("w-full");
    });
  });

  describe("Interactions", () => {
    it("calls onClick when clicked", async () => {
      const handleClick = vi.fn();
      render(<Button text="Click" onClick={handleClick} />);
      
      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when disabled", async () => {
      const handleClick = vi.fn();
      render(<Button text="Click" onClick={handleClick} disabled />);
      
      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
