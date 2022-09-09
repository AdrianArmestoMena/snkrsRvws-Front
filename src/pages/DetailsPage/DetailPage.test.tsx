import { screen, wrappedRender } from "../../test-utils/WrappedRender";
import DetailsPage from "./DetailsPage";

describe("Given a detail Page function", () => {
  describe("When it's instantiated", () => {
    test("Then it should show a heading with the text your reviews", () => {
      wrappedRender(<DetailsPage />);

      const heading = screen.getByRole("heading", { name: "Your Reviews" });

      expect(heading).toBeInTheDocument();
    });
  });
});
