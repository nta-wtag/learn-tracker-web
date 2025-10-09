export const ROUTES = {
  // Public routes
  AUTH: '/auth',
  NOT_FOUND: '*',
  
  // Protected routes
  DASHBOARD: '/',
  ENROLL: '/enroll',
  ENROLL_COURSE: '/enroll/:courseId',
  COURSES: '/courses',
  COURSE_MODULE: ':courseId/modules/:moduleId',
  PROFILE: '/profile',
} as const;

export const getEnrollCoursePath = (courseId: string | number) => 
  `/enroll/${courseId}`;

export const getCourseModulePath = (courseId: string | number, moduleId: string | number) => 
  `/courses/${courseId}/modules/${moduleId}`;