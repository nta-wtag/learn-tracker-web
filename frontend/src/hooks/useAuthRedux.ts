import { useSelector } from "react-redux";
import type { RootState } from "store";

export const useAuthRedux = () => {
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const isAuthChecked = useSelector((state: RootState) => state.auth.isAuthChecked);

  return {
    user,
    isAuthenticated: !!user,
    isAuthChecked,
  };
};
