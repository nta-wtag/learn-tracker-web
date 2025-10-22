import React from "react";
import { render, screen } from "@testing-library/react";
import { Form } from "react-final-form";
import { vi } from "vitest";

import AuthInputFields from "components/auth-components/AuthInputFields";
import { useAuth } from "hooks/useAuth";

vi.mock("hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

describe("AuthInputFields", () => {
  const renderForm = () =>
    render(
      <Form onSubmit={vi.fn()} render={() => <AuthInputFields />} />
    );

  it("renders username field in signup mode", () => {
    (useAuth as any).mockReturnValue({ isLoginMode: false });
    renderForm();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
  });

  it("does not render username field in login mode", () => {
    (useAuth as any).mockReturnValue({ isLoginMode: true });
    renderForm();
    expect(screen.queryByPlaceholderText("Username")).toBeNull();
  });

  it("renders email and password fields in login mode", () => {
    (useAuth as any).mockReturnValue({ isLoginMode: true });
    renderForm();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("renders email and password fields in signup mode", () => {
    (useAuth as any).mockReturnValue({ isLoginMode: false });
    renderForm();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });
});
