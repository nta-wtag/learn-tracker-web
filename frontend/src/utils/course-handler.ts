import type { Course } from "utils/course-storage";

export const getTotalLessons = (course: Course): number => {
  return course.lessons.reduce((sum, week) => sum + week.modules.length, 0);
};

export const getTotalDays = (course: Course): number => {
  return course.lessons.reduce(
    (sum, week) => sum + week.modules.reduce((s, m) => s + m.estDays, 0),
    0
  );
};

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
