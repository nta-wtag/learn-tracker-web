import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser, restoreUser, checkAuth } from "store/thunks/authThunk";
import type { AuthData } from "types/auth-types";

interface AuthState {
  currentUser: AuthData | null;
  isAuthChecked: boolean;
  isLoginMode: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  isAuthChecked: false,
  isLoginMode: true,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleLoginMode: (state) => {
      state.isLoginMode = !state.isLoginMode;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthChecked = true;
        state.status = "succeeded";
      })
      .addCase(checkAuth.rejected, (state) => {
        state.currentUser = null;
        state.isAuthChecked = true;
        state.status = "failed";
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthChecked = true;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
        state.isAuthChecked = true;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthChecked = true;
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Registration failed";
        state.isAuthChecked = true;
      })

      // Restore
      .addCase(restoreUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthChecked = true;
        state.status = "succeeded";
      })
      .addCase(restoreUser.rejected, (state) => {
        state.currentUser = null;
        state.isAuthChecked = true;
        state.status = "idle";
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.isAuthChecked = true;
        state.status = "idle";
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { toggleLoginMode, clearError } = authSlice.actions;
export default authSlice.reducer;
