import { User } from "../store/features/users/model/User";
import { UserToken } from "../types/User";
import initialState from "./initialState";

const tokenUser: UserToken = {
  userName: "adrian",
  id: "123",
  iat: 12,
};

jest.mock("jwt-decode", () => () => tokenUser);

describe("Given a useStorage hook", () => {
  describe("When getToken function is called with", () => {
    test("Then if there isn't token in local storage it should return an empty value", async () => {
      const emptyUser: User = {
        userName: "",
        id: "",
      };
      const user = initialState();

      expect(user).toStrictEqual(emptyUser);
    });
    test("Then if there is token in local storage it should return the value that jwt decodes return", async () => {
      const mockTokenStorage =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGQzNWI4NGQzMmExOGViOTZhMjljYyIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NjI0OTU3Njh9.29edGTKKsTXErsUrlP9rSPoAHa9BGvoHa1JvcMNnmdc";
      window.localStorage.setItem("token", mockTokenStorage);

      const user = initialState();

      expect(user).toBe(tokenUser);
    });
  });
});
