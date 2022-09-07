import { screen, wrappedRender } from "../../test-utils/WrappedRender";
import YourReviewsPage from "./YourReviewsPage";

describe("Given a Your revies page function", () => {
  describe("When it's instantiated", () => {
    test("Then it should show", () => {
      wrappedRender(<YourReviewsPage />);

      const heading = screen.getByRole("heading", { name: "Your Reviews" });

      expect(heading).toBeInTheDocument();
    });
  });
});
