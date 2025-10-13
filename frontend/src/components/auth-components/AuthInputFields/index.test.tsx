import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Form } from "react-final-form";
import AuthInputFields from "components/auth-components/AuthInputFields";

vi.mock("components/fields/Input", () => ({
  default: ({ input, placeholder, type }: any) => (
    <input {...input} placeholder={placeholder} type={type || "text"} />
  ),
}));

const renderWithForm = (isLoginMode: boolean) => {
  return render(
    <Form
      onSubmit={vi.fn()}
      render={() => (
        <form>
          <AuthInputFields isLoginMode={isLoginMode} />
        </form>
      )}
    />
  );
};

describe("AuthInputFields", () => {
  it("renders email and password fields in login mode", () => {
    renderWithForm(true);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("does not render username field in login mode", () => {
    renderWithForm(true);

    expect(screen.queryByPlaceholderText("Username")).not.toBeInTheDocument();
  });

  it("renders all three fields in signup mode", () => {
    renderWithForm(false);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("email field has correct type", () => {
    renderWithForm(true);
    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("password field has correct type", () => {
    renderWithForm(true);
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("shows username field when switching to signup mode", () => {
    const { rerender } = render(
      <Form
        onSubmit={vi.fn()}
        render={() => (
          <form>
            <AuthInputFields isLoginMode={true} />
          </form>
        )}
      />
    );

    expect(screen.queryByPlaceholderText("Username")).not.toBeInTheDocument();

    rerender(
      <Form
        onSubmit={vi.fn()}
        render={() => (
          <form>
            <AuthInputFields isLoginMode={false} />
          </form>
        )}
      />
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  });
});
