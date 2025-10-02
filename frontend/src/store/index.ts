import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/slices/authSlice';
import authUiReducer from 'store/slices/authUiSlice';
import coursesReducer from 'store/slices/courseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authUi: authUiReducer,
    courses: coursesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
