import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AuthData } from "types/auth-types";
import { getCurrentUser, saveUserToStorage } from "utils/auth-storage";

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
      saveUserToStorage(action.payload);
    },
    updateUser: (state, action: PayloadAction<Partial<AuthData>>) => {
      if (!state.currentUser) return;
      state.currentUser = { ...state.currentUser, ...action.payload };
      saveUserToStorage(state.currentUser);
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthChecked = true;
      saveUserToStorage(null);
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    restoreUserFromStorage: (state) => {
      state.currentUser = getCurrentUser();
      state.isAuthChecked = true;
    },
    checkAuth: (state) => {
      state.currentUser = getCurrentUser();
      state.isAuthChecked = true;
    },
  },
});

export const { setUser, updateUser, logout, setAuthChecked, restoreUserFromStorage, checkAuth } =
  authSlice.actions;
export default authSlice.reducer;
