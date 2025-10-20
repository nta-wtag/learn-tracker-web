import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'redux-toolkit/slices/authSlice';
import lessonReducer from 'redux-toolkit/slices/lessonSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lesson: lessonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
