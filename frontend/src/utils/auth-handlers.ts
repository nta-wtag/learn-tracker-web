import { findUserByEmail } from "utils/auth-storage";
import { AuthData, AuthResult } from "types/auth-types";

// Error messages
const AUTH_MESSAGES = {
  USER_NOT_FOUND: "User not found. Please sign up first.",
  INCORRECT_PASSWORD: "Incorrect password.",
  LOGIN_SUCCESS: "Login successful!",
  EMAIL_EXISTS: "Email already registered.",
  REGISTER_SUCCESS: "Registration successful!",
} as const;

export const validateLogin = (email: string, password: string): AuthResult => {
  const user = findUserByEmail(email);

  if (!user) {
    return { success: false, message: AUTH_MESSAGES.USER_NOT_FOUND };
  }

  if (user.password !== password) {
    return { success: false, message: AUTH_MESSAGES.INCORRECT_PASSWORD };
  }

  return { success: true, user, message: AUTH_MESSAGES.LOGIN_SUCCESS };
};

export const validateRegistration = (
  username: string,
  email: string,
  password: string
): AuthResult => {
  if (findUserByEmail(email)) {
    return { success: false, message: AUTH_MESSAGES.EMAIL_EXISTS };
  }

  const newUser: AuthData = { username, email, password, role: "USER" };

  return { success: true, user: newUser, message: AUTH_MESSAGES.REGISTER_SUCCESS };
};
