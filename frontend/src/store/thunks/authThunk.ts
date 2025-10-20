import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthData } from "types/auth-types";
import { validateLogin, validateRegistration } from "utils/auth-handlers";
import { 
  getCurrentUser, 
  saveUserToStorage, 
  removeUser 
} from "utils/auth-storage";

export const checkAuth = createAsyncThunk<AuthData | null>(
  "auth/checkAuth",
  async () => {
    const user = getCurrentUser();
    return user || null;
  }
);

export const loginUser = createAsyncThunk<
  AuthData,
  { email: string; password: string },
  { rejectValue: string }
>(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = validateLogin(email, password);
      
      if (!result.success || !result.user) {
        return rejectWithValue(result.message || "Invalid credentials");
      }

      saveUserToStorage(result.user);
      
      return result.user;
    } catch (error) {
      return rejectWithValue("An error occurred during login");
    }
  }
);

export const registerUser = createAsyncThunk<
  AuthData,
  { username: string; email: string; password: string },
  { rejectValue: string }
>(
  "auth/registerUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const result = validateRegistration(username, email, password);
      
      if (!result.success || !result.user) {
        return rejectWithValue(result.message || "Registration failed");
      }

      saveUserToStorage(result.user);
      
      return result.user;
    } catch (error) {
      return rejectWithValue("An error occurred during registration");
    }
  }
);

export const restoreUser = createAsyncThunk(
  "auth/restoreUser",
  async () => {
    return getCurrentUser(); 
  }
);

export const logoutUser = createAsyncThunk<
  null,
  void,
  { rejectValue: string }
>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      removeUser();
      return null;
    } catch (error) {
      return rejectWithValue("Failed to logout");
    }
  }
);
