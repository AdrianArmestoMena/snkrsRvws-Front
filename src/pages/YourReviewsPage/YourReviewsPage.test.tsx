import TestRenderer from "react-test-renderer";
import Wrapper from "../../test-utils/Wrapper";
import YourReviewsPage from "./YourReviewsPage";

describe("Given a your reviews page function", () => {
  describe("When it's instantiated", () => {
    test("Then it should match the html from your reviews page", () => {
      const expectedLoginPage = TestRenderer.create(
        <Wrapper>
          <YourReviewsPage />
        </Wrapper>
      );

      expect(expectedLoginPage).toMatchSnapshot();
    });
  });
});
