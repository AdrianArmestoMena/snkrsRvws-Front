import TestRenderer from "react-test-renderer";
import Wrapper from "../../test-utils/Wrapper";
import SignupPage from "./SignupPage";

describe("Given a singup form Page component", () => {
  describe("When it's instantiated", () => {
    test("Then it should match the html from Home page", () => {
      const expectedLoginPage = TestRenderer.create(
        <Wrapper>
          <SignupPage />
        </Wrapper>
      );

      expect(expectedLoginPage).toMatchSnapshot();
    });
  });
});
