import { getUsers, setCurrentUser, getCurrentUser } from "utils/auth-storage";

export interface EnrolledCourse {
  courseName: string;
  enrolledAt: string; 
}

export const isEnrolled = (courseName: string) => {
  const user = getCurrentUser();
  return user?.courses?.some((c: EnrolledCourse) => c.courseName === courseName) || false;
};

export const enrollCourseForCurrentUser = (courseName: string) => {
  const user = getCurrentUser();
  if (!user) return "No user logged in";

  if (!user.courses) user.courses = [];

  const alreadyEnrolled = user.courses.find(
    (c: EnrolledCourse) => c.courseName === courseName
  );
  
  if (alreadyEnrolled) {
    return `You are already enrolled in ${courseName} (since ${alreadyEnrolled.enrolledAt})`;
  }

  const enrollment = {
    courseName,
    enrolledAt: new Date().toISOString(),
  };
  user.courses.push(enrollment);

  setCurrentUser(user);

  const users = getUsers();
  const idx = users.findIndex((u) => u.email === user.email);
  if (idx !== -1) {
    users[idx] = user;
    localStorage.setItem("users", JSON.stringify(users));
  }

  return `You are now enrolled in ${courseName}!`;
};

export const getEnrolledCourses = (): EnrolledCourse[] => {
  const user = getCurrentUser();
  return user?.courses || [];
};
