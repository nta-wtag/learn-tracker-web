import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "components/base-components/Input";

describe("Input Component", () => {
  const mockOnChange = vi.fn();
  const mockOnBlur = vi.fn();
  const inputProps = {
    name: "username",
    value: "",
    onChange: mockOnChange,
    onBlur: mockOnBlur,
  };

  describe("Rendering", () => {
    it("renders input element", () => {
      render(<Input input={inputProps} error="" touched={false} placeholder="Enter text" />);
      const input = screen.getByPlaceholderText("Enter text");
      expect(input).toBeInTheDocument();
    });

    it("renders password type when specified", () => {
      render(<Input input={inputProps} type="password" error="" touched={false} placeholder="Password" />);
      const input = screen.getByPlaceholderText("Password");
      expect(input).toHaveAttribute("type", "password");
    });
  });

  describe("Interactions", () => {
    it("calls onChange when typing", async () => {
      render(<Input input={inputProps} error="" touched={false} placeholder="Username" />);
      const input = screen.getByPlaceholderText("Username");
      await userEvent.type(input, "test");
      expect(mockOnChange).toHaveBeenCalled();
    });

    it("calls onBlur when blurred", async () => {
      render(<Input input={inputProps} error="" touched={false} placeholder="Username" />);
      const input = screen.getByPlaceholderText("Username");

      input.focus(); // focus first
      input.blur();  // then blur

      expect(mockOnBlur).toHaveBeenCalled();
    });
  });

  describe("Error Handling", () => {
    it("displays error message when touched and error exist", () => {
      render(<Input input={inputProps} error="Required" touched={true} placeholder="Username" />);
      expect(screen.getByText("Required")).toBeInTheDocument();
    });

    it("does not display error message when not touched", () => {
      render(<Input input={inputProps} error="Required" touched={false} placeholder="Username" />);
      expect(screen.queryByText("Required")).not.toBeInTheDocument();
    });
  });
});
