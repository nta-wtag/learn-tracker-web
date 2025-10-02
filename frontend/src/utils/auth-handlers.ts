import { type AuthData, findUserByEmail, saveUser, setCurrentUser } from "utils/auth-storage";

export interface AuthResult {
  success: boolean;
  user?: AuthData;
  message?: string;
}

export const handleLogin = (email: string, password: string): AuthResult => {
  const user = findUserByEmail(email);
  if (!user) {
    return { success: false, message: "User not found. Please sign up first." };
  }
  if (user.password !== password) {
    return { success: false, message: "Incorrect password." };
  }
  setCurrentUser(user);
  return { success: true, user, message: "Login successful!" };
};

export const handleRegister = (username: string, email: string, password: string): AuthResult => {
  if (findUserByEmail(email)) {
    return { success: false, message: "Email already registered." };
  }
  const newUser: AuthData = { username, email, password, role: "USER", courses: [] };
  saveUser(newUser);
  setCurrentUser(newUser);
  return { success: true, user: newUser, message: "Registration successful! Login to continue." };
};
