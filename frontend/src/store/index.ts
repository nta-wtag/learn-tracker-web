import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/slices/authSlice';
import authUiReducer from 'store/slices/authUiSlice';
import coursesReducer from 'store/slices/courseSlice';
import lessonReducer from 'store/slices/lessonSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authUi: authUiReducer,
    courses: coursesReducer,
    lesson: lessonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
