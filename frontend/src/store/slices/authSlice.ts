import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthData } from "utils/auth-storage";

interface AuthState {
  currentUser: AuthData | null;
  isAuthChecked: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
  },
});

export const { setUser, logout, setAuthChecked, restoreUserFromStorage } =  authSlice.actions;
export default authSlice.reducer;
