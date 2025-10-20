import { getCurrentUser, setCurrentUser, getUsers } from "utils/auth-storage";
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
    return `Already enrolled since ${new Date(
      alreadyEnrolled.enrolledAt
    ).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`;
  }

  const enrollment: EnrolledCourse = {
    courseName,
    enrolledAt: new Date().toISOString(),
    completedAt: "",
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
