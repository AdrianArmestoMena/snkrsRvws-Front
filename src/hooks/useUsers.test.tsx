import axios from "axios";
import { SignUp } from "../types/User";
import useUser from "./useUser";

jest.mock("axios");
const apiUrl = process.env.REACT_APP_API_URL;
describe("Given a useUserApi hook", () => {
  describe("When invoke register function with a mockUser", () => {
    test("Then it should post a new user", async () => {
      const mockUser: SignUp = {
        userName: "a",
        password: "a",
        email: "a",
      };

      const { signUp } = useUser();
      await signUp(mockUser);

      expect(axios.post).toHaveBeenCalledWith(
        `${apiUrl}/users/signUp`,
        mockUser
      );
    });
  });
});
