import userEvent from "@testing-library/user-event";
import React from "react";
import { screen, wrappedRender } from "../../test-utils/WrappedRender";
import Pagination from "./Pagination";

const mockUseReviews = {
  loadReviewsByOwner: jest.fn(),
  loadaAllReviews: jest.fn(),
};
/* const setPage = jest.fn();
let page = 1;
const mockUseState = [page, setPage];

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: () => mockUseState,
})); */

jest.mock("../../hooks/useReviews", () => () => mockUseReviews);

describe("Given a Pagination component", () => {
  beforeEach(() => jest.clearAllMocks());
  const pageNumber = 1;
  describe("When it is instantiated with a page and two functions", () => {
    test("The it should show the page", () => {
      wrappedRender(<Pagination isHome={true} />);
      const page = screen.getByText(`Page ${pageNumber}`);

      expect(page).toBeInTheDocument();
    });

    test("Then it should call load all reviews if is home is true and pluss botton is clicked", () => {
      wrappedRender(<Pagination isHome={true} />);
      const buttons = screen.getAllByRole("button");
      userEvent.click(buttons[1]);
      expect(mockUseReviews.loadaAllReviews).toHaveBeenCalled();
    });

    test("Then it should call load by owner if is home is false and  pluss botton is clicked", () => {
      wrappedRender(<Pagination isHome={false} />);
      const buttons = screen.getAllByRole("button");
      userEvent.click(buttons[1]);
      expect(mockUseReviews.loadReviewsByOwner).toHaveBeenCalled();
    });

    test("Then it should call load reviews by owner if is home is false and less botton is clicked", () => {
      wrappedRender(<Pagination isHome={false} />);
      const buttons = screen.getAllByRole("button");
      userEvent.click(buttons[0]);
      expect(mockUseReviews.loadReviewsByOwner).toHaveBeenCalled();
    });

    test("Then it should call load all reviews if is home is true and less botton is clicked", () => {
      wrappedRender(<Pagination isHome={true} />);
      const buttons = screen.getAllByRole("button");
      userEvent.click(buttons[0]);
      expect(mockUseReviews.loadaAllReviews).toHaveBeenCalled();
    });
  });
});
