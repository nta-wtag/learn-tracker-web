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
    setLoginMode: (state, action) => {
      state.isLoginMode = action.payload;
    },
    toggleMode: (state) => {
      state.isLoginMode = !state.isLoginMode;
    },
  },
});

export const { toggleMode, setLoginMode } = authUiSlice.actions;
export default authUiSlice.reducer;
