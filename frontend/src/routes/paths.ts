export const ROUTES = {
  // Public routes
  AUTH: { path: "/auth", label: "Authentication" },
  NOT_FOUND: { path: "*", label: "Not Found" },
  UNAUTHORIZED: { path: "/unauthorized", label: "Unauthorized" },

  // Protected routes
  DASHBOARD: { path: "/", label: "Dashboard" },
  ENROLL: { path: "/enroll", label: "Enroll" },
  ENROLL_COURSE: { path: "/enroll/:courseId", label: "Enroll Course" },
  COURSES: { path: "/courses", label: "Courses" },
  COURSE_MODULE: { path: "/courses/:courseId", label: "Courses" },
  PROFILE: { path: "/profile", label: "Profile" },
} as const;

export const getEnrollCoursePath = (courseId: string | number) => `/enroll/${courseId}`;

export const getCoursePath = (courseId: string | number) => `/courses/${courseId}`;
