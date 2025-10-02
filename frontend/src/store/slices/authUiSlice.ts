import { createSlice } from "@reduxjs/toolkit";

interface AuthUiState {
  isLoginMode: boolean;
}

const initialState: AuthUiState = {
  isLoginMode: true,
};

const authUiSlice = createSlice({
  name: "authUi",
  initialState,
  reducers: {
    toggleLoginMode(state) {
      state.isLoginMode = !state.isLoginMode;
    },
    setLoginMode(state, action: { payload: boolean }) {
      state.isLoginMode = action.payload;
    },
  },
});

export const { toggleLoginMode, setLoginMode } = authUiSlice.actions;
export default authUiSlice.reducer;
