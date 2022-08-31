import { User } from "./model/User";
import { logIn, usersReducer } from "./usersSlice";

describe("Given a users reducer function", () => {
  const initialState: User = {
    id: "",
    userName: "",
    token: "",
  };

  describe("When it is called with an undefined action and an unknow state", () => {
    test("Then it should return the initial state", () => {
      const unknownAction = { type: "unknown" };

      expect(usersReducer(undefined, unknownAction)).toEqual(initialState);
    });

    describe("When it is called with a login action", () => {
      test("Then it should return the user on the action payload", () => {
        const newUser: User = {
          id: "Anton",
          userName: "Adrian",
          token: "12345",
        };

        const actualUser = usersReducer(undefined, logIn(newUser));

        expect(actualUser).toStrictEqual(newUser);
      });
    });
  });
});
