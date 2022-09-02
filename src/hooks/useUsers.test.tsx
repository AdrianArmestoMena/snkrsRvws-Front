import { renderHook } from "@testing-library/react";
import { throwMessageErrorActionCreator } from "../store/features/uiModal/uiModalSlice";
import { loginActionCreator } from "../store/features/users/usersSlice";
import Wrapper from "../test-utils/Wrapper";
import { IUser, LoginUser } from "../types/User";
import useUser from "./useUser";

const mockUseDispatch = jest.fn();
const mockThrowError = "";

jest.mock("../store/hooks", () => ({
  ...jest.requireActual("../store/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

jest.mock("../store/features/uiModal/uiModalSlice", () => ({
  ...jest.requireActual("../store/features/uiModal/uiModalSlice"),
  throwMessageErrorActionCreator: () => mockThrowError,
}));

const mockGetToken = jest.fn();
jest.mock("../utils/getUserData", () => () => mockGetToken);

jest.mock("../store/features/users/usersSlice", () => ({
  ...jest.requireActual("../store/features/users/usersSlice"),
  loginActionCreator: jest.fn(),
}));

describe("Given a useUserApi hook", () => {
  describe("When signUp function is called with a User data", () => {
    test("The it should return the response of the request", async () => {
      const mockUser: IUser = {
        userName: "a",
        password: "a",
        email: "a",
      };
      const newUser = {
        userName: "Adriana",
        email: "arm@this.com",
        contacts: [],
        reviews: [],
        id: "630d2cfb6b681f3c99cf1717",
      };

      const {
        result: {
          current: { signUp },
        },
      } = renderHook(useUser, { wrapper: Wrapper });
      await signUp(mockUser);

      const result = await signUp(mockUser);

      expect(result.newUser).toStrictEqual(newUser);
    });
  });

  describe("When login function is called with a User name and a password", () => {
    test("Then it should return the response of the request", async () => {
      const mockUser: LoginUser = {
        userName: "Adrian",
        password: "Armesto",
      };
      const user = { token: "12345" };

      const {
        result: {
          current: { logIn },
        },
      } = renderHook(useUser, { wrapper: Wrapper });
      await logIn(mockUser);

      expect(mockUseDispatch).toHaveBeenCalledWith(
        loginActionCreator(mockGetToken(user.token))
      );
    });
  });

  describe("When login function is called with a User name and a wrong password", () => {
    test("Then it should call the dispatch with throwMessageErrorActionCreator", async () => {
      const mockUser: LoginUser = {
        userName: "Adrian",
        password: "",
      };

      const {
        result: {
          current: { logIn },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      await logIn(mockUser);

      expect(mockUseDispatch).toHaveBeenCalledWith(mockThrowError);
    });
  });

  describe("When sign up function is called with a User name and wrong password", () => {
    test("Then it should call the dispatch with throwMessageErrorActionCreator", async () => {
      const mockUser: IUser = {
        userName: "Adrian",
        password: "",
        email: "adrian@adrian.com",
      };

      const {
        result: {
          current: { signUp },
        },
      } = renderHook(useUser, { wrapper: Wrapper });

      await signUp(mockUser);

      expect(mockUseDispatch).toHaveBeenCalledWith(mockThrowError);
    });
  });
});
