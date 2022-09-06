import { screen, wrappedRender } from "../../test-utils/WrappedRender";
import { ReviewAdd } from "../../types/Review";
import ReviewCard from "./ReviewCard";

const mockReview: ReviewAdd = {
  brand: "NIke",
  model: "Jordan 11 low black and white",
  picture: "f96fc1f1c03538f4940955da94925f90",
  review: "weqklrn ejq rtjqenr qejrt qer iluqe",
  owner: "6310d142612b1f0a1cec8961",
};

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
        />
      );
      const owner = screen.getByText(`by ${mockReview.owner}`);

      expect(owner).toBeInTheDocument();
    });
  });
});
