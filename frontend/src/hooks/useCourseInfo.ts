import { useMemo } from "react";
import type { Week } from "types/course-types";
import { calculateCourseStats } from "utils/course-handler";

export const useCourseInfo = (lessons: Week[]) => {
  return useMemo(() => calculateCourseStats(lessons), [lessons]);
};
