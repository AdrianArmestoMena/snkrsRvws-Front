import userEvent from "@testing-library/user-event";
import { screen, wrappedRender } from "../../test-utils/WrappedRender";
import Pagination from "./Pagination";

const mockUseReviews = {
  loadReviewsByOwner: jest.fn(),
  loadaAllReviews: jest.fn(),
};

jest.mock("../../hooks/useReviews", () => () => mockUseReviews);

describe("Given a Pagination component", () => {
  const pageNumber = 1;
  describe("When it is instantiated with a page and two functions", () => {
    test("The it should show the page", () => {
      wrappedRender(<Pagination isHome={true} />);
      const page = screen.getByText(`Page ${pageNumber}`);

      expect(page).toBeInTheDocument();
    });
    test("Then it should call pluss function if pluss botton is clicked", () => {
      wrappedRender(<Pagination isHome={true} />);
      const buttons = screen.getAllByRole("button");
      userEvent.click(buttons[1]);
      expect(mockUseReviews.loadaAllReviews).toHaveBeenCalled();
    });

    test("Then it should call les function if less botton is clicked", () => {
      wrappedRender(<Pagination isHome={false} />);
      const buttons = screen.getAllByRole("button");
      userEvent.click(buttons[0]);
      expect(mockUseReviews.loadReviewsByOwner).toHaveBeenCalled();
    });
  });
});
