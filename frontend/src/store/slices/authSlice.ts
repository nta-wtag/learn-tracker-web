import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthData } from 'utils/auth-storage';

interface AuthState {
  currentUser: AuthData | null;
}

const initialState: AuthState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthData>) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
