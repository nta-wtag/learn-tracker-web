import { useSelector } from "react-redux";
import type { RootState } from "redux-toolkit/store";

export const useAuth = () => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const isAuthChecked = useSelector((state: RootState) => state.auth.isAuthChecked);
  const status = useSelector((state: RootState) => state.auth.status);
  const error = useSelector((state: RootState) => state.auth.error);
  const isLoginMode = useSelector((state: RootState) => state.auth.isLoginMode);


  return {
    user: currentUser,
    isAuthenticated: !!currentUser,
    isAuthChecked,
    loading: status === "loading",
    error,
    isLoginMode,
  };
};
