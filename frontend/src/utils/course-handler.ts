import type { Week, CourseStats, Course } from "types/course-types";

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
