import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AuthHeader from "components/auth-components/AuthHeader";

let mockIsLoginMode = true;

vi.mock("hooks/useAuth", () => ({
  useAuth: () => ({ isLoginMode: mockIsLoginMode }),
}));

describe("AuthHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders 'Welcome Back' when in login mode", () => {
    mockIsLoginMode = true;
    render(<AuthHeader />);
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
  });

  it("renders 'Hello There' when in signup mode", () => {
    mockIsLoginMode = false;
    render(<AuthHeader />);
    expect(screen.getByText("Hello There")).toBeInTheDocument();
  });
});
