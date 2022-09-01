import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { loginActionCreator } from "../store/features/users/usersSlice";
import { useAppDispatch } from "../store/hooks";
import { LoginResponse, LoginUser, IUser } from "../types/User";
import getTokenUser from "../utils/getUserData";

const apiUrl = process.env.REACT_APP_API_URL;

const useUser = () => {
  const dispatch = useAppDispatch();

  const signUp = async ({ userName, password, email }: IUser) => {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `${apiUrl}/users/signup`,
        {
          userName,
          password,
          email,
        }
      );
      return response.data;
    } catch (error) {}
  };

  const logIn = useCallback(
    async ({ userName, password }: LoginUser): Promise<void> => {
      try {
        const {
          data: {
            user: { token },
          },
        }: AxiosResponse<LoginResponse> = await axios.post(
          `${apiUrl}/users/login`,
          {
            userName,
            password,
          }
        );

        const tokenContent = getTokenUser(token);

        localStorage.setItem("token", token);

        dispatch(loginActionCreator(tokenContent));
      } catch (error) {}
    },
    [dispatch]
  );
  return { signUp, logIn };
};

export default useUser;
