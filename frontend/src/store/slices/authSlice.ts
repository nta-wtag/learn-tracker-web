import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthData } from 'utils/auth-storage';

interface AuthState {
  currentUser: AuthData | null;
  isAuthChecked: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthData>) => {
      state.currentUser = action.payload;
    },
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthChecked = true;
    },
  },
});

export const { setUser, setAuthChecked, logout } = authSlice.actions;
export default authSlice.reducer;
