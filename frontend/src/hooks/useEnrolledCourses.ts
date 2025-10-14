import { useCurrentUser } from "store/useUserStore";

export const useEnrolledCourses = () => {
  const user = useCurrentUser();
  return user?.courses || [];
};
