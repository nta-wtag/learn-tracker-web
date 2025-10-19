import { AuthData } from "types/auth-types";

// Storage keys
const STORAGE_KEYS = {
  USERS: "users",
  CURRENT_USER: "currentUser",
} as const;

// Get all users
export const getUsers = (): AuthData[] => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

// Find user by email
export const findUserByEmail = (email: string): AuthData | undefined => {
  return getUsers().find((user) => user.email === email);
};

// Get current logged-in user
export const getCurrentUser = (): AuthData | null => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

// Set current logged-in user
export const setCurrentUser = (user: AuthData): void => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};

// Save new user to users list
export const saveUserToStorage = (user: AuthData): void => {
  const users = getUsers();
  if (user) localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([...users, user]));
  else localStorage.removeItem(STORAGE_KEYS.USERS);
};

// Logout current user
export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};
