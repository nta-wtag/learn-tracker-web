import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/slices/authSlice';
import authUiReducer from 'store/slices/authUiSlice';
import lessonReducer from 'store/slices/lessonSlice';
import enrollmentReducer from 'store/slices/enrollmentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authUi: authUiReducer,
    lesson: lessonReducer,
    enrollment: enrollmentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
