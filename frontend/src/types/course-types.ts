export interface Module {
  title: string;
  estDays: number;
  resources: string[];
}

export interface Week {
  week: number;
  modules: Module[];
}

export interface Course {
  course: string;
  lessons: Week[];
  image: string;
}

export interface CourseStats {
  totalLessons: number;
  totalDays: number;
}

export interface CompletedLesson {
  courseName: string;
  moduleTitle: string;
}


export interface BaseCourseInfo {
  completedModules: number;
  progressPercent: number;
  totalLessons: number;
  totalDays: number;
}

export interface EnrolledCourseInfo extends BaseCourseInfo {
  deadline: string;
  daysLeft: number;
  isDeadlineOver: boolean;
  enrolledAt: string;
  completedAt?: string | null;
}

export interface EnrichedCourse extends Course {
  completedModules: number;
  progressPercent: number;
  totalLessons: number;
  totalDays: number;
  deadline?: string;
  daysLeft?: number;
  isDeadlineOver?: boolean;
  enrolledAt?: string;
  completedAt?: string | null;
}

export interface DashboardStats {
  totalProgress: string;
  enrolledCount: number;
  completedCount: number;
  completedCourses: EnrichedCourse[];
  recentCourses: EnrichedCourse[];
}

export type CourseCardVariant = "enroll" | "courses";
