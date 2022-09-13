import userEvent from "@testing-library/user-event";
import { screen, wrappedRender } from "../../test-utils/WrappedRender";
import ReviewCard from "./ReviewCard";

const mockReview = {
  brand: "NIke",
  model: "Jordan 11 low black and white",
  picture: "f96fc1f1c03538f4940955da94925f90",
  review: "nice Shoes",
  owner: "6310d142612b1f0a1cec8961",
  id: "uabuidwnsuqifbqekjf",
  backupImage: "url",
};

const mockUseReviews = {
  deleteReview: jest.fn(),
};
jest.mock("../../hooks/useReviews", () => () => mockUseReviews);

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockUser = {
  id: mockReview.owner,
};

jest.mock("../../store/hooks", () => ({
  ...jest.requireActual("../../store/hooks"),
  useAppSelector: () => mockUser,
}));

describe("Given a ReviewCard component", () => {
  beforeEach(() => jest.clearAllMocks());
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
          backupImage={mockReview.backupImage}
          ownerId={mockReview.owner}
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
          backupImage={mockReview.backupImage}
          ownerId={mockReview.owner}
        />
      );
      const image = screen.getByRole("img");

      expect(image).toHaveAttribute("src", mockReview.backupImage);
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
          backupImage={mockReview.backupImage}
          ownerId={mockReview.owner}
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
          backupImage={mockReview.backupImage}
          ownerId={mockReview.owner}
        />
      );

      const deleteButton = screen.getByText("Delete");

      await userEvent.click(deleteButton);

      expect(mockUseReviews.deleteReview).toBeCalledWith(mockReview.id);
    });

    test("If the user click on the delete icon it should call the use reviews's delete review function with the id of the review", async () => {
      wrappedRender(
        <ReviewCard
          brand={mockReview.brand}
          model={mockReview.model}
          picture={mockReview.picture}
          review={mockReview.review}
          owner={mockReview.owner}
          id={mockReview.id}
          backupImage={mockReview.backupImage}
          ownerId={mockReview.owner}
        />
      );

      const deleteIcon = screen.getAllByRole("button");
      await userEvent.click(deleteIcon[0]);

      expect(mockUseReviews.deleteReview).toBeCalledWith(mockReview.id);
    });

    test("If the user click on the view review button it should call the navigate", async () => {
      wrappedRender(
        <ReviewCard
          brand={mockReview.brand}
          model={mockReview.model}
          picture={mockReview.picture}
          review={mockReview.review}
          owner={mockReview.owner}
          id={mockReview.id}
          backupImage={mockReview.backupImage}
          ownerId={mockReview.owner}
        />
      );

      const viewReview = screen.getByText("View Review");

      await userEvent.click(viewReview);

      expect(mockNavigate).toBeCalledWith(`/review/${mockReview.id}`);
    });
    test("If reviews' owner is different as store user's id delete icons shouldn't be in the document", async () => {
      mockUser.id = "";

      wrappedRender(
        <ReviewCard
          brand={mockReview.brand}
          model={mockReview.model}
          picture={mockReview.picture}
          review={mockReview.review}
          owner={mockReview.owner}
          id={mockReview.id}
          backupImage={mockReview.backupImage}
          ownerId={mockReview.owner}
        />
      );

      const deleteIcon = screen.getAllByRole("button");
      await userEvent.click(deleteIcon[0]);

      expect(mockUseReviews.deleteReview).not.toBeCalledWith(mockReview.id);
    });
  });
});
