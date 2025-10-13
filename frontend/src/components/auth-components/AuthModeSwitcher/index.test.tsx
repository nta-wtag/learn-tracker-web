import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthModeSwitcher from "components/auth-components/AuthModeSwitcher";

vi.mock("components/base-components/ModeButton", () => ({
  default: ({ label, active, onClick }: any) => (
    <button onClick={onClick} data-active={active}>
      {label}
    </button>
  ),
}));

describe("AuthModeSwitcher", () => {
  it("renders both mode buttons", () => {
    const setIsLoginMode = vi.fn();
    render(<AuthModeSwitcher isLoginMode={true} setIsLoginMode={setIsLoginMode} />);

    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("highlights active mode button", () => {
    const setIsLoginMode = vi.fn();
    render(<AuthModeSwitcher isLoginMode={true} setIsLoginMode={setIsLoginMode} />);

    const signInButton = screen.getByText("Sign In");
    const signUpButton = screen.getByText("Sign Up");

    expect(signInButton).toHaveAttribute("data-active", "true");
    expect(signUpButton).toHaveAttribute("data-active", "false");
  });

  it("calls setIsLoginMode(true) when Sign In is clicked", async () => {
    const setIsLoginMode = vi.fn();
    render(<AuthModeSwitcher isLoginMode={false} setIsLoginMode={setIsLoginMode} />);

    await userEvent.click(screen.getByText("Sign In"));
    expect(setIsLoginMode).toHaveBeenCalledWith(true);
  });

  it("calls setIsLoginMode(false) when Sign Up is clicked", async () => {
    const setIsLoginMode = vi.fn();
    render(<AuthModeSwitcher isLoginMode={true} setIsLoginMode={setIsLoginMode} />);

    await userEvent.click(screen.getByText("Sign Up"));
    expect(setIsLoginMode).toHaveBeenCalledWith(false);
  });

  it("renders divider between buttons", () => {
    const setIsLoginMode = vi.fn();
    const { container } = render(
      <AuthModeSwitcher isLoginMode={true} setIsLoginMode={setIsLoginMode} />
    );

    const divider = container.querySelector(".border-l-2");
    expect(divider).toBeInTheDocument();
  });
});
