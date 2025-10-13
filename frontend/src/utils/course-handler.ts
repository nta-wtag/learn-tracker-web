import type { Week, CourseStats } from "types/course-types";

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
