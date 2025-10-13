import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AuthIllustration from "components/auth-components/AuthIllustration";

describe("AuthIllustration", () => {
  it("renders login illustration when in login mode", () => {
    render(<AuthIllustration isLoginMode={true} />);
    const img = screen.getByAltText("Auth illustration");
    
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", expect.stringContaining("login-illustration"));
  });

  it("renders signup illustration when not in login mode", () => {
    render(<AuthIllustration isLoginMode={false} />);
    const img = screen.getByAltText("Auth illustration");
    
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", expect.stringContaining("register-illustration"));
  });

  it("has proper alt text for accessibility", () => {
    render(<AuthIllustration isLoginMode={true} />);
    expect(screen.getByAltText("Auth illustration")).toBeInTheDocument();
  });

  it("switches image when mode changes", () => {
    const { rerender } = render(<AuthIllustration isLoginMode={true} />);
    let img = screen.getByAltText("Auth illustration");
    expect(img).toHaveAttribute("src", expect.stringContaining("login-illustration"));

    rerender(<AuthIllustration isLoginMode={false} />);
    img = screen.getByAltText("Auth illustration");
    expect(img).toHaveAttribute("src", expect.stringContaining("register-illustration"));
  });
});
