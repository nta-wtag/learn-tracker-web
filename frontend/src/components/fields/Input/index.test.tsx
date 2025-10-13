import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "components/fields/Input";

describe("Input", () => {
  const mockInput = {
    name: "test",
    value: "",
    onChange: vi.fn(),
    onBlur: vi.fn(),
    onFocus: vi.fn(),
  };

  describe("Rendering", () => {
    it("renders input field", () => {
      render(<Input input={mockInput} error={null} touched={false} />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
      render(<Input input={mockInput} error={null} touched={false} placeholder="Enter text" />);
      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    });

    it("has text type by default", () => {
      render(<Input input={mockInput} error={null} touched={false} />);
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
    });

    it("can have email type", () => {
      render(<Input input={mockInput} error={null} touched={false} type="email" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
    });

    it("can have password type", () => {
      render(<Input input={mockInput} error={null} touched={false} type="password" />);
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("does not show error when not touched", () => {
      render(<Input input={mockInput} error="This field is required" touched={false} />);
      expect(screen.queryByText("This field is required")).not.toBeInTheDocument();
    });

    it("shows error when touched", () => {
      render(<Input input={mockInput} error="This field is required" touched={true} />);
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("error has correct styling", () => {
      render(<Input input={mockInput} error="Error message" touched={true} />);
      const error = screen.getByText("Error message");
      
      expect(error).toHaveClass("text-red-500");
      expect(error).toHaveClass("text-sm");
    });

    it("does not show error when error is null", () => {
      render(<Input input={mockInput} error={null} touched={true} />);
      const errorElements = document.querySelectorAll(".text-red-500");
      expect(errorElements.length).toBe(0);
    });
  });

  describe("Input Props", () => {
    it("spreads input props correctly", () => {
      const input = { ...mockInput, value: "test value" };
      render(<Input input={input} error={null} touched={false} />);
      
      expect(screen.getByRole("textbox")).toHaveValue("test value");
    });
  });
});
