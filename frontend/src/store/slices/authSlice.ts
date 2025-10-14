import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData } from "types/auth-types";
import { getCurrentUser, setCurrentUser, logout as clearStorage } from "utils/auth-storage";

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
      setCurrentUser(action.payload); // Sync with localStorage
    },
    logout: (state) => {
      state.currentUser = null;
      clearStorage();
    },
    restoreUserFromStorage: (state) => {
      const user = getCurrentUser();
      state.currentUser = user;
      state.isAuthChecked = true;
    },
  },
});

export const { setUser, logout, restoreUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
