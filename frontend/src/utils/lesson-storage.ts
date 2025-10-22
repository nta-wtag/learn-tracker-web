import { CompletedLesson } from "types/course-types";
import { getCurrentUser } from "utils/auth-storage";

const getCompletedLessonsKey = () => {
  const user = getCurrentUser();
  
  return user ? `completedLessons_${user.email}` : "completedLessons_guest";
};

export const getCompletedLessons = (): CompletedLesson[] => {
  const data = localStorage.getItem(getCompletedLessonsKey());

  return data ? JSON.parse(data) : [];
};

export const saveCompletedLessons = (lessons: CompletedLesson[]): void => {
  localStorage.setItem(getCompletedLessonsKey(), JSON.stringify(lessons));
};
