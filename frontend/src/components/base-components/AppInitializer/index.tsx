import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "store/slices/authSlice";

interface Props {
  children: React.ReactNode;
}

const AppInitializer: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return <>{children}</>;
};

export default AppInitializer;
