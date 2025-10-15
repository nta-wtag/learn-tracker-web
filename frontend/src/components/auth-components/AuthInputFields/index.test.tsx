import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Form } from "react-final-form";
import AuthInputFields from "components/auth-components/AuthInputFields";

vi.mock("components/base-components/Input", () => ({
  default: ({ input, placeholder, type }: any) => (
    <input {...input} placeholder={placeholder} type={type || "text"} />
  ),
}));

const createMockStore = (isLoginMode: boolean) => {
  return configureStore({
    reducer: {
      authUi: () => ({ isLoginMode }),
    },
  });
};

const renderWithForm = (isLoginMode: boolean) => {
  const store = createMockStore(isLoginMode);
  return render(
    <Provider store={store}>
      <Form
        onSubmit={vi.fn()}
        render={() => (
          <form>
            <AuthInputFields />
          </form>
        )}
      />
    </Provider>
  );
};

describe("AuthInputFields", () => {
  describe("Login Mode", () => {
    it("renders email field", () => {
      renderWithForm(true);
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    });

    it("renders password field", () => {
      renderWithForm(true);
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    });

    it("does not render username field", () => {
      renderWithForm(true);
      expect(screen.queryByPlaceholderText("Username")).not.toBeInTheDocument();
    });

    it("email field has email type", () => {
      renderWithForm(true);
      const emailInput = screen.getByPlaceholderText("Email");
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("password field has password type", () => {
      renderWithForm(true);
      const passwordInput = screen.getByPlaceholderText("Password");
      expect(passwordInput).toHaveAttribute("type", "password");
    });
  });

  describe("Signup Mode", () => {
    it("renders all three fields", () => {
      renderWithForm(false);
      expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    });

    it("username field appears first", () => {
      renderWithForm(false);
      const inputs = screen.getAllByRole("textbox");

      // Username should be first textbox
      expect(inputs[0]).toHaveAttribute("placeholder", "Username");
    });
  });

  describe("Field Order", () => {
    it("maintains correct field order in signup", () => {
      renderWithForm(false);
      const allInputs = document.querySelectorAll("input");

      expect(allInputs[0]).toHaveAttribute("placeholder", "Username");
      expect(allInputs[1]).toHaveAttribute("placeholder", "Email");
      expect(allInputs[2]).toHaveAttribute("placeholder", "Password");
    });
  });
});
