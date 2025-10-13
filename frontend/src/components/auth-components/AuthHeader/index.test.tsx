import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AuthHeader from "components/auth-components/AuthHeader";

describe("AuthHeader", () => {
  it("renders login header text when in login mode", () => {
    render(<AuthHeader isLoginMode={true} />);
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
  });

  it("renders signup header text when not in login mode", () => {
    render(<AuthHeader isLoginMode={false} />);
    expect(screen.getByText("Hello There")).toBeInTheDocument();
  });

  it("has correct heading level and styles", () => {
    const { container } = render(<AuthHeader isLoginMode={true} />);
    const heading = container.querySelector("h1");
    
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-primaryColor");
    expect(heading).toHaveClass("font-black");
  });
});
