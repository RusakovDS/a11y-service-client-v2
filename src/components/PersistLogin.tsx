import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  const isLoading = useRefreshToken();

  return (
    <>{isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
