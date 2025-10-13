import { describe, it, expect } from "vitest";
import { validateAuth } from "utils/auth-validation";

describe("Auth Validation", () => {
  describe("Email Validation", () => {
    it("returns error when email is empty", () => {
      const errors = validateAuth({ email: "", password: "ValidPass1!" }, true);
      expect(errors.email).toBe("Email is required");
    });

    it("returns error for invalid email format", () => {
      const errors = validateAuth({ email: "notanemail", password: "ValidPass1!" }, true);
      expect(errors.email).toBe("Invalid email format");
    });

    it("accepts valid email", () => {
      const errors = validateAuth({ email: "valid@test.com", password: "ValidPass1!" }, true);
      expect(errors.email).toBeUndefined();
    });
  });

  describe("Password Validation", () => {
    it("returns error when password is empty", () => {
      const errors = validateAuth({ email: "test@test.com", password: "" }, true);
      expect(errors.password).toBe("Password is required");
    });

    it("returns error for password less than 8 characters", () => {
      const errors = validateAuth({ email: "test@test.com", password: "Pass1!" }, true);
      expect(errors.password).toContain("at least 8 characters");
    });

    it("returns error for password without numbers", () => {
      const errors = validateAuth({ email: "test@test.com", password: "Password!" }, true);
      expect(errors.password).toContain("numbers");
    });

    it("returns error for password without special characters", () => {
      const errors = validateAuth({ email: "test@test.com", password: "Password1" }, true);
      expect(errors.password).toContain("special character");
    });

    it("accepts valid strong password", () => {
      const errors = validateAuth({ email: "test@test.com", password: "ValidPass1!" }, true);
      expect(errors.password).toBeUndefined();
    });
  });

  describe("Username Validation (Signup)", () => {
    it("returns error when username is empty in signup mode", () => {
      const errors = validateAuth(
        { email: "test@test.com", password: "ValidPass1!", username: "" },
        false
      );
      expect(errors.username).toBe("Username must be at least 3 characters");
    });

    it("returns error when username is less than 3 characters", () => {
      const errors = validateAuth(
        { email: "test@test.com", password: "ValidPass1!", username: "ab" },
        false
      );
      expect(errors.username).toBe("Username must be at least 3 characters");
    });

    it("accepts valid username in signup mode", () => {
      const errors = validateAuth(
        { email: "test@test.com", password: "ValidPass1!", username: "validuser" },
        false
      );
      expect(errors.username).toBeUndefined();
    });

    it("does not validate username in login mode", () => {
      const errors = validateAuth(
        { email: "test@test.com", password: "ValidPass1!" },
        true
      );
      expect(errors.username).toBeUndefined();
    });
  });

  describe("Combined Validation", () => {
    it("returns no errors for valid login", () => {
      const errors = validateAuth(
        { email: "test@test.com", password: "ValidPass1!" },
        true
      );
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it("returns no errors for valid signup", () => {
      const errors = validateAuth(
        { email: "test@test.com", password: "ValidPass1!", username: "testuser" },
        false
      );
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it("returns multiple errors when multiple fields invalid", () => {
      const errors = validateAuth(
        { email: "invalid", password: "weak", username: "a" },
        false
      );
      expect(errors.email).toBeTruthy();
      expect(errors.password).toBeTruthy();
      expect(errors.username).toBeTruthy();
    });
  });
});
