export interface AuthData {
  email: string;
  password: string;
  username: string;
  role: "ADMIN" | "USER";
}

export const getUsers = (): AuthData[] => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

export const findUserByEmail = (email: string) => {
  const users = getUsers();
  return users.find((u) => u.email === email);
};

export const setCurrentUser = (user: AuthData) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const saveUser = (user: AuthData) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const clearUser = () => {
  localStorage.removeItem("user");
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};
