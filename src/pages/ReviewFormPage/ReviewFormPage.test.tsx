import TestRenderer from "react-test-renderer";
import Wrapper from "../../test-utils/Wrapper";
import ReviewFormPage from "./ReviewFormPage";

describe("Given a review form Page component", () => {
  describe("When it's instantiated", () => {
    test("Then it should match the html from Home page", () => {
      const expectedLoginPage = TestRenderer.create(
        <Wrapper>
          <ReviewFormPage />
        </Wrapper>
      );

      expect(expectedLoginPage).toMatchSnapshot();
    });
  });
});
