import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/slices/authSlice';
import coursesReducer from 'store/slices/courseSlice';
import lessonReducer from 'store/slices/lessonSlice';
import enrollmentReducer from 'store/slices/enrollmentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    lesson: lessonReducer,
    enrollment: enrollmentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
