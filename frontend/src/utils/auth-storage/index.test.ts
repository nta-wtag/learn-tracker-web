import { describe, it, expect, beforeEach, vi } from "vitest";
import {
    getUsers,
    findUserByEmail,
    getCurrentUser,
    setCurrentUser,
    saveUser,
    logout,
} from "utils/auth-storage";

describe("Auth Storage", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    describe("getUsers", () => {
        it("returns empty array when no users", () => {
            expect(getUsers()).toEqual([]);
        });

        it("returns parsed users from localStorage", () => {
            const mockUsers = [
                { email: "user1@test.com", username: "user1", password: "pass1", role: "USER" as const },
                { email: "user2@test.com", username: "user2", password: "pass2", role: "USER" as const },
            ];
            localStorage.setItem("users", JSON.stringify(mockUsers));

            expect(getUsers()).toEqual(mockUsers);
        });
    });

    describe("findUserByEmail", () => {
        it("returns undefined when user not found", () => {
            expect(findUserByEmail("nonexistent@test.com")).toBeUndefined();
        });

        it("finds and returns user by email", () => {
            const mockUsers = [
                { email: "user1@test.com", username: "user1", password: "pass1", role: "USER" as const },
                { email: "user2@test.com", username: "user2", password: "pass2", role: "USER" as const },
            ];
            localStorage.setItem("users", JSON.stringify(mockUsers));

            const found = findUserByEmail("user2@test.com");
            expect(found).toEqual(mockUsers[1]);
        });
    });

    describe("getCurrentUser", () => {
        it("returns null when no current user", () => {
            expect(getCurrentUser()).toBeNull();
        });

        it("returns current user from localStorage", () => {
            const mockUser = {
                email: "current@test.com",
                username: "current",
                password: "pass",
                role: "USER" as const,
            };
            localStorage.setItem("currentUser", JSON.stringify(mockUser));

            expect(getCurrentUser()).toEqual(mockUser);
        });
    });

    describe("setCurrentUser", () => {
        it("saves user to localStorage", () => {
            const mockUser = {
                email: "test@test.com",
                username: "test",
                password: "pass",
                role: "USER" as const,
            };

            setCurrentUser(mockUser);

            const stored = localStorage.getItem("currentUser");
            expect(stored).toBeTruthy();
            expect(JSON.parse(stored!)).toEqual(mockUser);
        });
    });

    describe("saveUser", () => {
        it("adds user to empty users list", () => {
            const newUser = {
                email: "new@test.com",
                username: "new",
                password: "pass",
                role: "USER" as const,
            };

            saveUser(newUser);

            const users = getUsers();
            expect(users).toHaveLength(1);
            expect(users[0]).toEqual(newUser);
        });

        it("appends user to existing users list", () => {
            const existingUsers = [
                { email: "user1@test.com", username: "user1", password: "pass1", role: "USER" as const },
            ];
            localStorage.setItem("users", JSON.stringify(existingUsers));

            const newUser = {
                email: "user2@test.com",
                username: "user2",
                password: "pass2",
                role: "USER" as const,
            };

            saveUser(newUser);

            const users = getUsers();
            expect(users).toHaveLength(2);
            expect(users[1]).toEqual(newUser);
        });
    });

    describe("logout", () => {
        it("removes current user from localStorage", () => {
            const mockUser = {
                email: "test@test.com",
                username: "test",
                password: "pass",
                role: "USER" as const,
            };
            localStorage.setItem("currentUser", JSON.stringify(mockUser));

            logout();

            expect(localStorage.getItem("currentUser")).toBeNull();
        });
    });
});
