import TestRenderer from "react-test-renderer";
import ReviewsList from "../../components/ReviewsList/ReviewsList";
import Wrapper from "../../test-utils/Wrapper";
import YourReviewsPageStyle from "./YourReviewsPage.style";

describe("Given a your reviews page function", () => {
  describe("When it's instantiated", () => {
    test("Then it should match the html from your reviews page", () => {
      const expectedLoginPage = TestRenderer.create(
        <Wrapper>
          <YourReviewsPageStyle>
            <h2 className="tittle">Your Reviews</h2>
            <ReviewsList />
          </YourReviewsPageStyle>
        </Wrapper>
      );

      expect(expectedLoginPage).toMatchSnapshot();
    });
  });
});
