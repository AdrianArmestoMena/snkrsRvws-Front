import userEvent from "@testing-library/user-event";
import React from "react";
import { screen } from "../../test-utils/WrappedRender";
import Pagination from "./Pagination";
import { fireEvent, render } from "@testing-library/react";

let mockUseReviews: { loadReviewsByOwner: unknown; loadaAllReviews: unknown } =
  {
    loadReviewsByOwner: jest.fn(),
    loadaAllReviews: jest.fn(),
  };

const setPage = jest.fn();
let page = 1;
const mockUseState = [page, setPage];

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: () => mockUseState,
}));

jest.mock("../../hooks/useReviews", () => () => mockUseReviews);

describe("Given a Pagination component", () => {
  beforeEach(() => jest.clearAllMocks());
  const pageNumber = 1;

  describe("When it is instantiated with a page and two functions", () => {
    test("The it should show the page", () => {
      render(<Pagination isHome={true} />);
      const page = screen.getByText(`Page ${pageNumber}`);

      expect(page).toBeInTheDocument();
    });

    test("Then it should call load all reviews if is home is true and pluss botton is clicked", () => {
      render(<Pagination isHome={true} />);
      const buttons = screen.getAllByRole("button");
      userEvent.click(buttons[1]);
      expect(mockUseReviews.loadaAllReviews).toHaveBeenCalled();
    });

    test("Then it should call load by owner if is home is false and  pluss botton is clicked", () => {
      render(<Pagination isHome={false} />);
      const buttons = screen.getAllByRole("button");
      userEvent.click(buttons[1]);
      expect(mockUseReviews.loadReviewsByOwner).toHaveBeenCalled();
    });

    test("Then it should call load reviews by owner if is home is false and less botton is clicked", () => {
      render(<Pagination isHome={false} />);
      const buttons = screen.getAllByRole("button");
      userEvent.click(buttons[0]);
      expect(mockUseReviews.loadReviewsByOwner).toHaveBeenCalled();
    });

    test("Then it should call load all reviews if is home is true and less botton is clicked", () => {
      render(<Pagination isHome={true} />);
      const buttons = screen.getAllByRole("button");
      userEvent.click(buttons[0]);
      expect(mockUseReviews.loadaAllReviews).toHaveBeenCalled();
    });

    test("If load reviews returns 0 it souldnt call load reviews when less button is clicked", async () => {
      mockUseReviews = {
        loadReviewsByOwner: jest.fn().mockResolvedValue(0),
        loadaAllReviews: jest.fn().mockResolvedValue(0),
      };

      render(<Pagination isHome={true} />);

      const buttons = screen.getAllByRole("button");
      await fireEvent.click(buttons[0]);
      expect(setPage).not.toHaveBeenCalledTimes(2);
    });

    test("If load reviews returns 0 it souldnt call load reviews when plus button is clicked and is home is true", async () => {
      mockUseReviews = {
        loadReviewsByOwner: jest.fn().mockResolvedValue(0),
        loadaAllReviews: jest.fn().mockResolvedValue(0),
      };

      render(<Pagination isHome={true} />);

      const buttons = screen.getAllByRole("button");
      await userEvent.click(buttons[1]);

      expect(setPage).not.toHaveBeenCalledTimes(2);
    });

    test("If load reviews returns 0 it souldnt call load reviews when plus button is clicked and is home is false", async () => {
      mockUseReviews = {
        loadReviewsByOwner: jest.fn().mockResolvedValue(0),
        loadaAllReviews: jest.fn().mockResolvedValue(0),
      };

      render(<Pagination isHome={false} />);

      const buttons = screen.getAllByRole("button");
      await userEvent.click(buttons[1]);

      expect(setPage).not.toHaveBeenCalledTimes(2);
    });
  });
});
