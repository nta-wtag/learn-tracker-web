import type { Course } from "./course-handler";
import type { CompletedLesson } from "store/slices/lessonSlice";

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
