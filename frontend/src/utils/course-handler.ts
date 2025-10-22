import type { Week, CourseStats, Course, CompletedLesson } from "types/course-types";

export const calculateDeadline = (enrolledAt: string, totalDays: number) => {
  const currentDate = new Date(enrolledAt);
  let addedDays = 0;

  // Add totalDays excluding Fridays (5) and Saturdays (6)
  while (addedDays < totalDays) {
    currentDate.setDate(currentDate.getDate() + 1);
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek !== 5 && dayOfWeek !== 6) {
      addedDays++;
    }
  }

  // Format deadline nicely
  const deadline = currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Calculate days left (0 if past deadline)
  const today = new Date();
  const diffTime = currentDate.getTime() - today.getTime();
  const daysLeft = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);

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

export const calculateCourseProgress = (
  course: Course,
  completedLessons: CompletedLesson[]
) => {
  const {totalLessons, totalDays} = calculateCourseStats(course.lessons);

  const completedModules = completedLessons.filter(
    (l) => l.courseName === course.course
  ).length;

  const progressPercent = totalLessons ? (completedModules / totalLessons) * 100 : 0;

  return {
    completedModules,
    progressPercent,
    totalDays,
    totalLessons
  };
};
