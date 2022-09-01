import getTokenUser from "./getUserData";
import jwt_decode from "jwt-decode";

jest.mock("jwt-decode");

describe("Given a getUser data function", () => {
  describe("When it is called with a toke", () => {
    test("Then it should call jwt_decode with the token", () => {
      const token: string =
        "asbjwb1u23x31hjgyr234c543tfjxskbdhgbfvhjfsbdjhgvbndf";

      getTokenUser(token);

      expect(jwt_decode).toHaveBeenCalledWith(token);
    });
  });
});
