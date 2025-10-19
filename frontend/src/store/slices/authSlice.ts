import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AuthData } from "types/auth-types";
import { getCurrentUser } from "utils/auth-storage";

interface AuthState {
  currentUser: AuthData | null;
  isAuthChecked: boolean;
  isLoginMode: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  isAuthChecked: false,
  isLoginMode: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginMode: (state, action) => {
      state.isLoginMode = action.payload;
    },
    toggleLoginMode: (state) => {
      state.isLoginMode = !state.isLoginMode;
    },
    setUser: (state, action: PayloadAction<AuthData>) => {
      state.currentUser = action.payload;
      state.isAuthChecked = true;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthChecked = true;
      localStorage.removeItem("currentUser");
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    restoreUserFromStorage: (state) => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) state.currentUser = JSON.parse(storedUser);
      state.isAuthChecked = true;
    },
    checkAuth: (state) => {
      const user = getCurrentUser();
      state.currentUser = user;
      state.isAuthChecked = true;
    },
  },
});

export const { setUser, logout, setAuthChecked, restoreUserFromStorage, checkAuth, setLoginMode, toggleLoginMode } =
  authSlice.actions;
export default authSlice.reducer;
