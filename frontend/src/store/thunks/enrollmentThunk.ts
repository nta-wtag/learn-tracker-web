import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser, setCurrentUser, getUsers } from "utils/auth-storage";
import type { EnrolledCourse } from "types/auth-types";

// ✅ Load user enrollments
export const loadEnrollmentsThunk = createAsyncThunk<EnrolledCourse[]>(
  "enrollment/loadEnrollments",
  async () => {
    const user = getCurrentUser();
    return user?.courses || [];
  }
);

// ✅ Enroll in a course
export const enrollCourseThunk = createAsyncThunk<EnrolledCourse, string>(
  "enrollment/enrollCourse",
  async (courseName) => {
    const user = getCurrentUser();
    if (!user) throw new Error("User not logged in");

    user.courses = user.courses || [];

    const alreadyEnrolled = user.courses.some(
      (c) => c.courseName === courseName
    );
    if (alreadyEnrolled) throw new Error("Already enrolled in this course");

    const newEnrollment: EnrolledCourse = {
      courseName,
      enrolledAt: new Date().toISOString(),
      completedAt: null,
    };

    user.courses.push(newEnrollment);

    // Sync storage
    setCurrentUser(user);
    const users = getUsers();
    const idx = users.findIndex((u) => u.email === user.email);
    if (idx !== -1) {
      users[idx] = user;
      localStorage.setItem("users", JSON.stringify(users));
    }

    return newEnrollment;
  }
);

// ✅ Unenroll from course
export const unenrollCourseThunk = createAsyncThunk<string, string>(
  "enrollment/unenrollCourse",
  async (courseName) => {
    const user = getCurrentUser();
    if (!user?.courses) throw new Error("User not logged in");

    user.courses = user.courses.filter((c) => c.courseName !== courseName);

    setCurrentUser(user);
    const users = getUsers();
    const idx = users.findIndex((u) => u.email === user.email);
    if (idx !== -1) {
      users[idx] = user;
      localStorage.setItem("users", JSON.stringify(users));
    }

    return courseName;
  }
);

// ✅ Mark course as completed
export const completeCourseThunk = createAsyncThunk<EnrolledCourse, string>(
  "enrollment/completeCourse",
  async (courseName) => {
    const user = getCurrentUser();
    if (!user?.courses) throw new Error("User not logged in");

    const course = user.courses.find((c) => c.courseName === courseName);
    if (!course) throw new Error("Course not found");

    course.completedAt = new Date().toISOString();

    setCurrentUser(user);
    const users = getUsers();
    const idx = users.findIndex((u) => u.email === user.email);
    if (idx !== -1) {
      users[idx] = user;
      localStorage.setItem("users", JSON.stringify(users));
    }

    return course;
  }
);
