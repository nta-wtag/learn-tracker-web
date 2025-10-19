import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "store";
import {
  setUser,
  updateUser,
  restoreUserFromStorage,
  logout as logoutAction,
} from "store/slices/authSlice";
import { validateLogin, validateRegistration } from "utils/auth-handlers";
import {
  saveUserToStorage,
  setCurrentUser,
  logout as clearStorage,
} from "utils/auth-storage";

export const useAuthRedux = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const isAuthChecked = useSelector(
    (state: RootState) => state.auth.isAuthChecked
  );

  const login = useCallback(
    (email: string, password: string) => {
      const result = validateLogin(email, password);
      
      if (result.success && result.user) {
        dispatch(setUser(result.user));
      }

      return result;
    },
    [dispatch]
  );

  const register = useCallback(
    (username: string, email: string, password: string) => {
      const result = validateRegistration(username, email, password);
      if (result.success && result.user) {
        saveUserToStorage(result.user);
        dispatch(setUser(result.user));
      }
      return result;
    },
    [dispatch]
  );

  const logoutUser = useCallback(() => {
    clearStorage();
    dispatch(logoutAction());
  }, [dispatch]);

  const restoreUser = useCallback(() => {
    dispatch(restoreUserFromStorage());
  }, [dispatch]);

  const updateCurrentUser = useCallback(
    (updatedData: Partial<typeof user>) => {
      if (!user) {
        return;
      }

      dispatch(updateUser(updatedData));
      setCurrentUser({ ...user, ...updatedData });
    },
    [dispatch, user]
  );

  return {
    user,
    isAuthenticated: !!user,
    isAuthChecked,
    login,
    register,
    logoutUser,
    restoreUser,
    updateUser: updateCurrentUser,
  };
};
