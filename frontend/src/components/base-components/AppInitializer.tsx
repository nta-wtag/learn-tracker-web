import { useEffect } from "react";
import { useAppDispatch } from "redux-toolkit/store";
import { checkAuth } from "redux-toolkit/thunks/authThunk";

interface Props {
  children: React.ReactNode;
}

const AppInitializer: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return <>{children}</>;
};

export default AppInitializer;
