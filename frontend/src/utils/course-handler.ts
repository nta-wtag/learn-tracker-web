import type { Week, CourseStats } from "types/course-types";
import { getCurrentUser, setCurrentUser, getUsers } from "./auth-storage";
import { EnrolledCourse } from "types/auth-types";

export const isEnrolled = (courseName: string): boolean => {
  const user = getCurrentUser();
  return user?.courses?.some((c) => c.courseName === courseName) ?? false;
};

export const enrollCourseForCurrentUser = (courseName: string): string => {
  const user = getCurrentUser();

  if (!user) {
    return "No user logged in";
  }

  if (!user.courses) {
    user.courses = [];
  }

  const alreadyEnrolled = user.courses.find((c) => c.courseName === courseName);

  if (alreadyEnrolled) {
    return `Already enrolled since ${new Date(alreadyEnrolled.enrolledAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`;
  }

  const enrollment: EnrolledCourse = {
    courseName,
    enrolledAt: new Date().toISOString(),
  };

  user.courses.push(enrollment);
  setCurrentUser(user);

  const users = getUsers();
  const userIndex = users.findIndex((u) => u.email === user.email);

  if (userIndex !== -1) {
    users[userIndex] = user;
    localStorage.setItem("users", JSON.stringify(users));
  }

  return `Successfully enrolled in ${courseName}!`;
};

export const getEnrolledCourses = (): EnrolledCourse[] => {
  const user = getCurrentUser();
  return user?.courses ?? [];
};

export const calculateDeadline = (enrolledAt: string, totalDays: number): string => {
  let currentDate = new Date(enrolledAt);
  let addedDays = 0;

  while (addedDays < totalDays) {
    currentDate.setDate(currentDate.getDate() + 1);
    const day = currentDate.getDay(); 

    // Skip weekends
    if (day !== 5 && day !== 6) {
      addedDays++;
    }
  }
  const formattedDeadline = new Date(currentDate.toISOString().split("T")[0]).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).toString();

  return formattedDeadline; 
}

export const isDeadlineOver = (deadline: string): boolean => {
  return new Date() > new Date(deadline);
};

export const calculateCourseStats = (weeks: Week[]): CourseStats => {
  const totalLessons = weeks.reduce(
    (sum, week) => sum + week.modules.length,
    0
  );

  const totalDays = weeks.reduce(
    (sum, week) => sum + week.modules.reduce((s, m) => s + m.estDays, 0),
    0
  );

  return { totalLessons, totalDays };
};
