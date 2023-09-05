import { Navigate } from "react-router-dom";
import { useAuth } from "src/hooks/use-auth";

interface IPrivateRouteProps {
  children: React.ReactElement | React.ReactElement[];
}

export const Protected = ({ children }: IPrivateRouteProps) => {
  const { isAuth } = useAuth();

  return isAuth ? children : <Navigate to="/register" />;
};
