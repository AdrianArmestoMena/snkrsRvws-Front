import { renderHook } from "@testing-library/react";
import { loginActionCreator } from "../store/features/users/usersSlice";
import mockLocalStorage from "../test-utils/mocks/localStorageMock";
import { UserToken } from "../types/User";
import useStorage from "./useStorage";

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

const tokenUser: UserToken = {
  userName: "adrian",
  id: "123",
  iat: 12,
};
const mockJwt = jest.fn().mockReturnValue(tokenUser);
jest.mock("jwt-decode", () => () => mockJwt);

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("Given a useStorage hook", () => {
  describe("When getToken function is called with", () => {
    test("The it should call the dispatch with login action creator with the user", async () => {
      await mockLocalStorage.setItem("token", "q2345");

      const {
        result: {
          current: { getToken },
        },
      } = renderHook(() => useStorage());
      getToken();

      expect(mockUseDispatch).toHaveBeenCalledWith(
        loginActionCreator(tokenUser)
      );
    });
  });
});
