import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  closeAllActionCreator,
  closeLoadingActionCreator,
  loadingUiActionCreator,
  throwMessageErrorActionCreator,
} from "../store/features/uiModal/uiModalSlice";
import {
  loginActionCreator,
  logOutActionCreator,
} from "../store/features/users/usersSlice";
import { useAppDispatch } from "../store/hooks";
import { LoginResponse, LoginUser, IUser } from "../types/User";
import getTokenUser from "../utils/getUserData";

const apiUrl = process.env.REACT_APP_API_URL;

const useUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signUp = async ({ userName, password, email }: IUser) => {
    let response: AxiosResponse<any>;
    try {
      dispatch(loadingUiActionCreator());
      response = await axios.post(`${apiUrl}/users/signup`, {
        userName,
        password,
        email,
      });
    } catch (error) {
      const errorObject = JSON.parse((error as AxiosError).request.response);
      dispatch(closeLoadingActionCreator());
      setTimeout(() => dispatch(closeAllActionCreator()), 3000);
      dispatch(throwMessageErrorActionCreator(errorObject.error));
      return false;
    }
    navigate("/login");
    dispatch(closeAllActionCreator());

    return response.data;
  };

  const logIn = useCallback(
    async ({ userName, password }: LoginUser): Promise<boolean> => {
      try {
        dispatch(loadingUiActionCreator());
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
      } catch (error) {
        const errorObject = JSON.parse((error as AxiosError).request.response);
        dispatch(closeLoadingActionCreator());
        setTimeout(() => dispatch(closeAllActionCreator()), 3000);
        dispatch(throwMessageErrorActionCreator(errorObject.error));
        return false;
      }

      navigate("/");
      dispatch(closeAllActionCreator());

      return true;
    },
    [dispatch, navigate]
  );
  const logOut = () => {
    localStorage.clear();
    dispatch(logOutActionCreator());
    navigate("/");
  };

  return { signUp, logIn, logOut };
};

export default useUser;
