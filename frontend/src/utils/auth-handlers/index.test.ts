import { describe, it, expect, beforeEach, vi } from "vitest";
import { handleLogin, handleRegister } from "utils/auth-handlers";
import * as authStorage from "utils/auth-storage";

vi.mock("utils/auth-storage");

describe("Auth Handlers", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("handleLogin", () => {
        it("returns error when user not found", () => {
            vi.mocked(authStorage.findUserByEmail).mockReturnValue(undefined);

            const result = handleLogin("nonexistent@test.com", "password");

            expect(result.success).toBe(false);
            expect(result.message).toBe("User not found. Please sign up first.");
            expect(result.user).toBeUndefined();
        });

        it("returns error when password is incorrect", () => {
            const mockUser = {
                email: "test@test.com",
                password: "correctpass",
                username: "testuser",
                role: "USER" as const,
            };
            vi.mocked(authStorage.findUserByEmail).mockReturnValue(mockUser);

            const result = handleLogin("test@test.com", "wrongpass");

            expect(result.success).toBe(false);
            expect(result.message).toBe("Incorrect password.");
            expect(result.user).toBeUndefined();
        });

        it("returns success when credentials are correct", () => {
            const mockUser = {
                email: "test@test.com",
                password: "correctpass",
                username: "testuser",
                role: "USER" as const,
            };
            vi.mocked(authStorage.findUserByEmail).mockReturnValue(mockUser);

            const result = handleLogin("test@test.com", "correctpass");

            expect(result.success).toBe(true);
            expect(result.message).toBe("Login successful!");
            expect(result.user).toEqual(mockUser);
            expect(authStorage.setCurrentUser).toHaveBeenCalledWith(mockUser);
        });
    });

    describe("handleRegister", () => {
        it("returns error when email already exists", () => {
            const existingUser = {
                email: "existing@test.com",
                password: "pass",
                username: "existing",
                role: "USER" as const,
            };
            vi.mocked(authStorage.findUserByEmail).mockReturnValue(existingUser);

            const result = handleRegister("newuser", "existing@test.com", "password");

            expect(result.success).toBe(false);
            expect(result.message).toBe("Email already registered.");
            expect(result.user).toBeUndefined();
        });

        it("creates new user successfully", () => {
            vi.mocked(authStorage.findUserByEmail).mockReturnValue(undefined);

            const result = handleRegister("newuser", "new@test.com", "password");

            expect(result.success).toBe(true);
            expect(result.message).toBe("Registration successful!");
            expect(result.user).toEqual({
                username: "newuser",
                email: "new@test.com",
                password: "password",
                role: "USER",
            });
            expect(authStorage.saveUser).toHaveBeenCalled();
            expect(authStorage.setCurrentUser).toHaveBeenCalled();
        });

        it("saves and sets user as current after registration", () => {
            vi.mocked(authStorage.findUserByEmail).mockReturnValue(undefined);

            const result = handleRegister("testuser", "test@test.com", "pass123");

            const expectedUser = {
                username: "testuser",
                email: "test@test.com",
                password: "pass123",
                role: "USER",
            };

            expect(result.success).toBe(true);
            expect(result.user).toEqual(expectedUser);
            expect(result.message).toBe("Registration successful!");


            expect(authStorage.saveUser).toHaveBeenCalledWith(expectedUser);
            expect(authStorage.setCurrentUser).toHaveBeenCalledWith(expectedUser);
        });
    });
});
