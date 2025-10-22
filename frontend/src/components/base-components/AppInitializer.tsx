import { useEffect } from "react";
import { useAppDispatch } from "redux-toolkit/store";
import { checkAuth } from "redux-toolkit/thunks/authThunk";
import { loadEnrollmentsThunk } from "redux-toolkit/thunks/enrollmentThunk";

interface Props {
  children: React.ReactNode;
}

const AppInitializer: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(checkAuth());
      await dispatch(loadEnrollmentsThunk());
    };
    
    initializeApp();
  }, [dispatch]);
  return <>{children}</>;
};

export default AppInitializer;
