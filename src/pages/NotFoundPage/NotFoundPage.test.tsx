import { screen, wrappedRender } from "../../test-utils/WrappedRender";
import NotFoundPage from "./NotFoundPage";

describe("Given a not found page function", () => {
  describe("Whe it is instantiated", () => {
    test("Then it should show a heading with the text 'PAGE NOT FOUND'", () => {
      wrappedRender(<NotFoundPage />);

      const heading = screen.getByRole("heading", { name: "PAGE NOT FOUND" });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show a 404 code", () => {
      wrappedRender(<NotFoundPage />);

      const code = screen.getByText("404");

      expect(code).toBeInTheDocument();
    });
  });
});
