import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, setCurrentUser, getUsers, saveUserToStorage } from "utils/auth-storage";
import type { EnrolledCourse } from "types/auth-types";

export const loadEnrollmentsThunk = createAsyncThunk<EnrolledCourse[]>(
  "enrollment/loadEnrollments",
  async () => {
    const user = getCurrentUser();

    if (!user) {
      return [];
    }

    return user.courses || [];
  }
);

export const enrollCourseThunk = createAsyncThunk<EnrolledCourse, string>(
  "enrollment/enrollCourse",
  async (courseName) => {
    const user = getCurrentUser();

    if (!user) {
      throw new Error("User not logged in");
    }

    user.courses = user.courses || [];

    const alreadyEnrolled = user.courses.some(
      (c) => c.courseName === courseName
    );

    if (alreadyEnrolled) {
      throw new Error("Already enrolled in this course");
    }

    const newEnrollment: EnrolledCourse = {
      courseName,
      enrolledAt: new Date().toISOString(),
      completedAt: null,
    };

    user.courses.push(newEnrollment);

    setCurrentUser(user);

    const users = getUsers();    
    const idx = users.findIndex((u) => u.email === user.email);

    if (idx !== -1) {
      users[idx] = user;

      saveUserToStorage(user);
    }

    return newEnrollment;
  }
);

export const completeCourseThunk = createAsyncThunk<EnrolledCourse, string>(
  "enrollment/completeCourse",
  async (courseName) => {
    const user = getCurrentUser();

    if (!user?.courses) {
      throw new Error("User not logged in");
    }

    const course = user.courses.find((c) => c.courseName === courseName);

    if (!course) {
      throw new Error("Course not found");
    }

    course.completedAt = new Date().toISOString();

    setCurrentUser(user);

    const users = getUsers();
    const idx = users.findIndex((u) => u.email === user.email);

    if (idx !== -1) {
      users[idx] = user;
      
      saveUserToStorage(user);
    }

    return course;
  }
);
