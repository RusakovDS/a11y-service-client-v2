import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AuthWrapper() {
  const { token } = useAuth();

  return <>{token ? <Outlet /> : <Navigate to="/signin" />}</>;
}

export default AuthWrapper;
