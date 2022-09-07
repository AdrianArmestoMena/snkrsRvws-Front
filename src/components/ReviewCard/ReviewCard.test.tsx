import userEvent from "@testing-library/user-event";
import { screen, wrappedRender } from "../../test-utils/WrappedRender";
import ReviewCard from "./ReviewCard";

const mockReview = {
  brand: "NIke",
  model: "Jordan 11 low black and white",
  picture: "f96fc1f1c03538f4940955da94925f90",
  review: "weqklrn ejq rtjqenr qejrt qer iluqe",
  owner: "6310d142612b1f0a1cec8961",
  id: "uabuidwnsuqifbqekjf",
};

const mockUseReviews = {
  deleteReview: jest.fn(),
};
jest.mock("../../hooks/useReviews", () => () => mockUseReviews);

describe("Given a ReviewCard component", () => {
  describe("When it is instantiated with a review as props", () => {
    test("The it should show a heading with the brand and the model of the review", () => {
      wrappedRender(
        <ReviewCard
          brand={mockReview.brand}
          model={mockReview.model}
          picture={mockReview.picture}
          review={mockReview.review}
          owner={mockReview.owner}
          id={mockReview.id}
        />
      );
      const heading = screen.getByRole("heading", {
        name: `${mockReview.brand} ${mockReview.model}`,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show the review image", () => {
      wrappedRender(
        <ReviewCard
          brand={mockReview.brand}
          model={mockReview.model}
          picture={mockReview.picture}
          review={mockReview.review}
          owner={mockReview.owner}
          id={mockReview.id}
        />
      );
      const image = screen.getByRole("img");

      expect(image).toHaveAttribute(
        "src",
        `${process.env.REACT_APP_API_URL}/${mockReview.picture}`
      );
    });

    test("Then it should show the owner", () => {
      wrappedRender(
        <ReviewCard
          brand={mockReview.brand}
          model={mockReview.model}
          picture={mockReview.picture}
          review={mockReview.review}
          owner={mockReview.owner}
          id={mockReview.id}
        />
      );
      const owner = screen.getByText(`by ${mockReview.owner}`);

      expect(owner).toBeInTheDocument();
    });

    test("If the user click on the delete button it should call the use reviews's delete review function with the id of the review", async () => {
      wrappedRender(
        <ReviewCard
          brand={mockReview.brand}
          model={mockReview.model}
          picture={mockReview.picture}
          review={mockReview.review}
          owner={mockReview.owner}
          id={mockReview.id}
        />
      );

      const deleteButton = screen.getByText("Delete");
      await userEvent.click(deleteButton);

      expect(mockUseReviews.deleteReview).toBeCalledWith(mockReview.id);
    });
  });
});
