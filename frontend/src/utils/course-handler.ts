import { getUsers, setCurrentUser, getCurrentUser } from "utils/auth-storage";
import type { AuthData } from "utils/auth-storage";

export interface EnrolledCourse {
  courseName: string;
  enrolledAt: string; 
}
export interface Module {
  title: string;
  estDays: number;
  resources: string[];
}

export interface Lesson {
  week: number;
  modules: Module[];
}

export interface Course {
  course: string;
  lessons: Lesson[];
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
  const idx = users.findIndex((u:AuthData) => u.email === user.email);
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

export const calculateDaysLessons = (lessons: Lesson)=>{
    const totalLessons = lessons.reduce(
      (sum :number, lesson:Lesson) => sum + lesson.modules.length,
      0
    );
  
    const totalDays = lessons.reduce(
      (sum :number, lesson:Lesson) => sum + lesson.modules.reduce((s, m) => s + m.estDays, 0),
      0
    );
    return {totalLessons, totalDays}
}
