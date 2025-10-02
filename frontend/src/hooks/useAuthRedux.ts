import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from 'store';
import { setUser, logout, restoreUserFromStorage } from 'store/slices/authSlice';
import { type AuthData } from 'utils/auth-storage';

export const useAuthRedux = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.currentUser);
  const isAuthChecked = useSelector((state: RootState) => state.auth.isAuthChecked);

  const login = (userData: AuthData) => {
    dispatch(setUser(userData));
  };

  const register = (userData: AuthData) => {
    dispatch(setUser(userData));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const restoreUser = () => {
    dispatch(restoreUserFromStorage());
  };

  return {
    user,
    isAuthenticated: !!user,
    isAuthChecked,
    login,
    register,
    logoutUser,
    restoreUser,
  };
};
