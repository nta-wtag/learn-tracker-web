import { CompletedLesson } from "types/course-types";
import { getCurrentUser } from "utils/auth-storage";

// Generate a storage key per user
const getCompletedLessonsKey = () => {
  const user = getCurrentUser();
  return user ? `completedLessons_${user.email}` : "completedLessons_guest";
};

// Load completed lessons for the current user
export const getCompletedLessons = (): CompletedLesson[] => {
  const data = localStorage.getItem(getCompletedLessonsKey());
  return data ? JSON.parse(data) : [];
};

// Save completed lessons for the current user
export const saveCompletedLessons = (lessons: CompletedLesson[]): void => {
  localStorage.setItem(getCompletedLessonsKey(), JSON.stringify(lessons));
};

// Clear completed lessons for current user (optional)
export const clearCompletedLessons = (): void => {
  localStorage.removeItem(getCompletedLessonsKey());
};
