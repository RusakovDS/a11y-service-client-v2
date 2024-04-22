import { useEffect, useState } from "react";
import { useRefreshTokenMutation } from "../app/services/api/authApi";
import { logout, updateToken } from "../app/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../app/store";

const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAppSelector((state) => state.auth);
  const [refreshToken] = useRefreshTokenMutation();

  const refreshAndUpdateToken = async () => {
    const data = await refreshToken().unwrap();
    dispatch(updateToken(data));
  };

  useEffect(() => {
    const refresh = async () => {
      try {
        await refreshAndUpdateToken();
      } catch (err) {
        dispatch(logout());
      } finally {
        setIsLoading(prev => !prev)
      }
    };

    !token ? refresh() : setIsLoading(prev => !prev)
  }, []);

  return isLoading;
};

export default useRefreshToken;