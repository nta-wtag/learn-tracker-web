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
  courseName: string;
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
  if (!user) return { success: false, message: "No user logged in" };

  if (!user.courses) user.courses = [];

  const alreadyEnrolled = user.courses.find(
    (c: EnrolledCourse) => c.courseName === courseName
  );

  if (alreadyEnrolled) {
    return { success: false, message: `You are already enrolled in ${courseName} (since ${alreadyEnrolled.enrolledAt})` };
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

  return { success: false, message: `You are now enrolled in ${courseName}!`};
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

export const calculateDeadline = (enrolledAt: string, totalDays: number): string => {
  let currentDate = new Date(enrolledAt);
  let addedDays = 0;

  while (addedDays < totalDays) {
    currentDate.setDate(currentDate.getDate() + 1);
    const day = currentDate.getDay(); 
    if (day !== 5 && day !== 6) {
      addedDays++;
    }
  }

  return currentDate.toISOString().split("T")[0]; 
};

export const calculateCourseProgress = (
  course: Course,
  completedLessons: CompletedLesson[]
) => {
  const totalModules = course.lessons.reduce(
    (sum, lesson) => sum + lesson.modules.length,
    0
  );

  const completedModules = completedLessons.filter(
    (l) => l.courseName === course.course
  ).length;

  const progressPercent = totalModules ? (completedModules / totalModules) * 100 : 0;

  return {
    totalModules,
    completedModules,
    progressPercent,
  };
};

export const calculateDaysLeft = (enrolledAt: string, totalDays: number): number => {
  const enrolledDate = new Date(enrolledAt);
  const deadline = new Date(enrolledDate);
  deadline.setDate(deadline.getDate() + totalDays);

  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
};
