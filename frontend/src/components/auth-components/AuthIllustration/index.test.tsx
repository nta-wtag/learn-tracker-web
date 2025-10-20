import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import AuthIllustration from "components/auth-components/AuthIllustration";

let mockIsLoginMode = true;

vi.mock("hooks/useAuth", () => ({
  useAuth: () => ({ isLoginMode: mockIsLoginMode }),
}));

vi.mock("assets/login-illustration.jpg", () => ({
  default: "loginImg",
}));

vi.mock("assets/register-illustration.jpeg", () => ({
  default: "registerImg",
}));


describe("AuthIllustration", () => {
  it("renders login illustration when in login mode", () => {
    mockIsLoginMode = true;
    render(<AuthIllustration />);
    const img = screen.getByAltText("Auth illustration") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("loginImg");
  });

  it("renders register illustration when in register mode", () => {
    mockIsLoginMode = false;
    render(<AuthIllustration />);
    const img = screen.getByAltText("Auth illustration") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("registerImg");
  });
});
