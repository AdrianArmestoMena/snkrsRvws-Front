import TestRenderer from "react-test-renderer";
import Wrapper from "../../test-utils/Wrapper";
import LoginPage from "./LoginPage";

describe("Given a Login Page component", () => {
  describe("When it's instantiated", () => {
    test("Then it should match the html from Home page", () => {
      const expectedLoginPage = TestRenderer.create(
        <Wrapper>
          <LoginPage />
        </Wrapper>
      );

      expect(expectedLoginPage).toMatchSnapshot();
    });
  });
});
