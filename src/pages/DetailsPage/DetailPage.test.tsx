import TestRenderer from "react-test-renderer";
import Wrapper from "../../test-utils/Wrapper";
import DetailsPage from "./DetailsPage";

describe("Given a detail Page function", () => {
  describe("When it's instantiated", () => {
    test("Then it should match the html from Home page", () => {
      const expectedLoginPage = TestRenderer.create(
        <Wrapper>
          <DetailsPage />
        </Wrapper>
      );

      expect(expectedLoginPage).toMatchSnapshot();
    });
  });
});
