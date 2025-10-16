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
  completedAt?: string;
}

export type CourseCardVariant = "enroll" | "courses";
