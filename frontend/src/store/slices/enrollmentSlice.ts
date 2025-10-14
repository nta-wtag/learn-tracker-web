import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { EnrolledCourse } from "types/auth-types";
import { getCurrentUser, setCurrentUser, getUsers } from "utils/auth-storage";

interface EnrollmentState {
  enrolledCourses: EnrolledCourse[];
  loading: boolean;
}

const initialState: EnrollmentState = {
  enrolledCourses: getCurrentUser()?.courses || [],
  loading: false,
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    loadEnrollments: (state) => {
      const user = getCurrentUser();
      state.enrolledCourses = user?.courses || [];
    },
    
    enrollCourse: (state, action: PayloadAction<string>) => {
      const courseName = action.payload;
      const user = getCurrentUser();
      
      if (!user) return;
      
      if (!user.courses) {
        user.courses = [];
      }
      
      const alreadyEnrolled = user.courses.find((c) => c.courseName === courseName);
      if (alreadyEnrolled) return;
      
      const enrollment: EnrolledCourse = {
        courseName,
        enrolledAt: new Date().toISOString(),
      };
      
      user.courses.push(enrollment);
      state.enrolledCourses.push(enrollment);
      
      setCurrentUser(user);
      const users = getUsers();
      const userIndex = users.findIndex((u) => u.email === user.email);
      if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem("users", JSON.stringify(users));
      }
    },
    
    unenrollCourse: (state, action: PayloadAction<string>) => {
      const courseName = action.payload;
      const user = getCurrentUser();
      
      if (!user || !user.courses) return;
      
      user.courses = user.courses.filter((c) => c.courseName !== courseName);
      state.enrolledCourses = state.enrolledCourses.filter(
        (c) => c.courseName !== courseName
      );
      
      setCurrentUser(user);
      const users = getUsers();
      const userIndex = users.findIndex((u) => u.email === user.email);
      if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem("users", JSON.stringify(users));
      }
    },
  },
});

export const { loadEnrollments, enrollCourse, unenrollCourse } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
