import { useCurrentUser } from "store/useUserStore";
import type { EnrolledCourse } from "utils/course-handler";

export const useEnrolledCourses = (): EnrolledCourse[] => {
  const user = useCurrentUser();
  return user?.courses || [];
};
