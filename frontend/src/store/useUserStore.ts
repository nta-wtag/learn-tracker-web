import { useSyncExternalStore } from "react";

export interface AuthData {
  email: string;
  password: string;
  username: string;
  role: "ADMIN" | "USER";
  courses: string[];
}

const CURRENT_USER_KEY = "currentUser";
const USERS_KEY = "users";

const subscribers = new Set<() => void>();
const emitChange = () => subscribers.forEach((callback) => callback());

export const useCurrentUser = () =>
  useSyncExternalStore(subscribe, getCurrentUserSnapshot, getCurrentUserSnapshot);

export const useUsers = () =>
  useSyncExternalStore(subscribe, getUsersSnapshot, getUsersSnapshot);

function subscribe(callback: () => void) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

function getCurrentUserSnapshot(): AuthData | null {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

function getUsersSnapshot(): AuthData[] {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

export const setCurrentUser = (user: AuthData) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  emitChange();
};

export const clearCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  emitChange();
};

export const logout = () => clearCurrentUser();

export const getCurrentUser = (): AuthData | null => getCurrentUserSnapshot();

export const getUsers = (): AuthData[] => getUsersSnapshot();

export const saveUser = (user: AuthData) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  emitChange();
};

export const findUserByEmail = (email: string) => {
  const users = getUsers();
  return users.find((u) => u.email === email);
};
