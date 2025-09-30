import {type AuthData, findUserByEmail, saveUser, setCurrentUser } from "utils/auth-storage";

export const handleLogin = (email: string, password: string) => {
  const user = findUserByEmail(email);
  if (!user) {
    alert("User not found. Please sign up first.");
    return false;
  }
  if (user.password !== password) {
    alert("Incorrect password.");
    return false;
  }
  setCurrentUser(user);
  alert("Login successful!");
  return true;
};

export const handleRegister = (username: string, email: string, password: string) => {
  if (findUserByEmail(email)) {
    alert("Email already registered.");
    return false;
  }
  const newUser: AuthData = { username, email, password, role: "USER" };
  saveUser(newUser);
  setCurrentUser(newUser);
  alert("Registration successful!\nLogin to continue.");
  return true;
};
