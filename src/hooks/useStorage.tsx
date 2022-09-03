import jwtDecode from "jwt-decode";
import { useCallback } from "react";
import { loginActionCreator } from "../store/features/users/usersSlice";
import { useAppDispatch } from "../store/hooks";
import { UserToken } from "../types/User";

const useStorage = () => {
  const token = localStorage.getItem("token") as string;
  const dispatch = useAppDispatch();

  const getToken = useCallback(() => {
    if (localStorage.getItem("token")) {
      const user: UserToken = jwtDecode(token);
      dispatch(loginActionCreator(user));
    }
  }, [dispatch, token]);

  return { getToken };
};

export default useStorage;
