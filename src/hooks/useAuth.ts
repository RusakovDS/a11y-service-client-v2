import { useAppSelector } from "../app/store";

const useAuth = () => {
  const { user, token } = useAppSelector((state) => state.auth);

  return { user, token };
};

export default useAuth;
