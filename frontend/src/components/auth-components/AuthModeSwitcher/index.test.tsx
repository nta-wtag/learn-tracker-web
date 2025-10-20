import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import AuthModeSwitcher from "components/auth-components/AuthModeSwitcher";
import { useAuth } from "hooks/useAuth";

vi.mock("hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

const mockDispatch = vi.fn();

vi.mock("redux-toolkit/store", async () => {
  const actual = await vi.importActual("redux-toolkit/store");
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
  };
});

vi.mock("components/base-components/ModeButton", () => ({
  default: ({ label, onClick, active }: any) => (
    <button
      data-testid={`mode-button-${label.replace(/\s+/g, "-").toLowerCase()}`}
      onClick={onClick}
      data-active={active}
    >
      {label}
    </button>
  ),
}));

describe("AuthModeSwitcher", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("renders Sign In and Sign Up buttons", () => {
    (useAuth as any).mockReturnValue({ isLoginMode: true });
    render(<AuthModeSwitcher />);
    const signInButton = screen.getByTestId("mode-button-sign-in");
    const signUpButton = screen.getByTestId("mode-button-sign-up");

    expect(signInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  it("activates Sign In button in login mode", () => {
    (useAuth as any).mockReturnValue({ isLoginMode: true });
    render(<AuthModeSwitcher />);
    const signInButton = screen.getByTestId("mode-button-sign-in");
    const signUpButton = screen.getByTestId("mode-button-sign-up");

    expect(signInButton.dataset.active).toBe("true");
    expect(signUpButton.dataset.active).toBe("false");
  });

  it("activates Sign Up button in signup mode", () => {
    (useAuth as any).mockReturnValue({ isLoginMode: false });
    render(<AuthModeSwitcher />);
    const signInButton = screen.getByTestId("mode-button-sign-in");
    const signUpButton = screen.getByTestId("mode-button-sign-up");

    expect(signInButton.dataset.active).toBe("false");
    expect(signUpButton.dataset.active).toBe("true");
  });

  it("dispatches toggleLoginMode when buttons are clicked", () => {
    (useAuth as any).mockReturnValue({ isLoginMode: true });
    render(<AuthModeSwitcher />);
    fireEvent.click(screen.getByText("Sign In"));
    fireEvent.click(screen.getByText("Sign Up"));
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
