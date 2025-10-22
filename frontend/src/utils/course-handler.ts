import type { Week, CourseStats, Course, CompletedLesson } from "types/course-types";

export const calculateDeadline = (enrolledAt: string, totalDays: number) => {
  const currentDate = new Date(enrolledAt);
  let addedDays = 0;

  // Calculate the deadline by adding totalDays excluding Fridays (5) and Saturdays (6)
  while (addedDays < totalDays) {
    currentDate.setDate(currentDate.getDate() + 1);
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek !== 5 && dayOfWeek !== 6) {
      addedDays++;
    }
  }

  const deadline = currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const today = new Date();
  let daysLeft = 0;
  let tempDate = new Date(today);

  while (tempDate <= currentDate) {
    const dayOfWeek = tempDate.getDay();
    if (dayOfWeek !== 5 && dayOfWeek !== 6) {
      daysLeft++;
    }
    tempDate.setDate(tempDate.getDate() + 1);
  }

  return { deadline, daysLeft };
};

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
