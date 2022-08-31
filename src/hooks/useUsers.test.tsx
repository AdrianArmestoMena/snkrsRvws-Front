import { renderHook } from "@testing-library/react";
import axios from "axios";
import Wrapper from "../test-utils/Wrapper";
import { IUser } from "../types/User";
import useUser from "./useUser";

jest.mock("axios");
const apiUrl = process.env.REACT_APP_API_URL;
describe("Given a useUserApi hook", () => {
  describe("When signUp function is called with a User data", () => {
    test("Then it should call axios post method with the given url and user", async () => {
      const mockUser: IUser = {
        userName: "a",
        password: "a",
        email: "a",
      };

      const {
        result: {
          current: { signUp },
        },
      } = renderHook(useUser, { wrapper: Wrapper });
      await signUp(mockUser);

      expect(axios.post).toHaveBeenCalledWith(
        `${apiUrl}/users/signUp`,
        mockUser
      );
    });
  });

  describe("When signin function is called with a UserName and a password", () => {
    test("Then it should post a new user", async () => {
      const mockUser: IUser = {
        userName: "a",
        password: "a",
        email: "a",
      };

      const {
        result: {
          current: { signUp },
        },
      } = renderHook(useUser, { wrapper: Wrapper });
      await signUp(mockUser);

      expect(axios.post).toHaveBeenCalledWith(
        `${apiUrl}/users/signUp`,
        mockUser
      );
    });
  });
});
