import { screen, wrappedRender } from "../../test-utils/WrappedRender";
import HomePage from "./HomePage";

describe("Given a Home page function", () => {
  describe("When it's instantiated", () => {
    test("Then it should show", () => {
      wrappedRender(<HomePage />);

      const heading = screen.getByRole("heading", { name: "Reviews" });

      expect(heading).toBeInTheDocument();
    });
  });
});
