import { useAppSelector } from "./redux-hooks";

export const useAuth = () => {
  const { email, id } = useAppSelector((state) => state.user);

  return {
    isAuth: Boolean(email),
    email: email,
    id: id,
  };
};
