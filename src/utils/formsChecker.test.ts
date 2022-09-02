import { paswordsChecker } from "./formsCheckers";

describe("Given a pasword checker function", () => {
  describe("When it is called", () => {
    test("Then it should return true if the given paswords are the same", () => {
      const user = {
        password: "Anton123",
        passwordRepeat: "Anton123",
        userName: "Anton",
        email: "anton@",
      };
      const expected = paswordsChecker(user);

      expect(expected).toBe(true);
    });

    test("Then it should return false if the given paswords are not the same", () => {
      const user = {
        password: "Antons123",
        passwordRepeat: "Anton12356",
        userName: "Anton",
        email: "anton@",
      };
      const expected = paswordsChecker(user);

      expect(expected).toBe(false);
    });
  });
});
