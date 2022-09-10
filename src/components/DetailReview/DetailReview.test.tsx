import userEvent from "@testing-library/user-event";
import { screen, wrappedRender } from "../../test-utils/WrappedRender";
import DetailReview from "./DetailReview";

const mockUseReviews = {
  deleteReview: jest.fn(),
  loadReviewById: jest.fn(),
};

let mockReviews = [
  {
    brand: "NIke",
    model: "Jordan 11 low black and white",
    picture: "3631ee0b22ed7c7dca950bccab9d75e2",
    review: "asfa sdfgsdvwe antonioooooooo",
    owner: "6310d142612b1f0a1cec8961",
    likes: [],
    comments: [],
    id: "631765170a79f65125123e64",
    backupImage: "url",
  },
];
const mockNavigate = jest.fn();

let mockParam = {
  id: "631765170a79f65125123e64",
};
jest.mock("../../store/hooks", () => ({
  ...jest.requireActual("../../store/hooks"),
  useAppSelector: () => mockReviews,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => mockParam,
  useNavigate: () => mockNavigate,
}));

jest.mock("../../hooks/useReviews", () => () => mockUseReviews);

describe("Given a ReviewCard component", () => {
  describe("When it is instantiated with a review as props", () => {
    test("The it should show a heading with the brand and the model of the review", () => {
      wrappedRender(<DetailReview />);
      const heading = screen.getByRole("heading", {
        name: `${mockReviews[0].brand} ${mockReviews[0].model}`,
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show the review image", () => {
      wrappedRender(<DetailReview />);
      const image = screen.getByRole("img");

      expect(image).toHaveAttribute("src", mockReviews[0].backupImage);
    });

    test("Then it should show the owner", () => {
      wrappedRender(<DetailReview />);
      const owner = screen.getByText(`by ${mockReviews[0].owner}`);

      expect(owner).toBeInTheDocument();
    });

    test("If the user click on the delete button it should call the use reviews's delete review function with the id of the review", async () => {
      wrappedRender(<DetailReview />);
      const route = "/your-reviews";
      const deleteButton = screen.getByText("Delete");

      await userEvent.click(deleteButton);

      expect(mockUseReviews.deleteReview).toBeCalledWith(mockParam.id);
      expect(mockNavigate).toBeCalledWith(route);
    });

    test("If the user click on the modify button it should call the navigate with /modify/ and the id of the review", async () => {
      wrappedRender(<DetailReview />);
      const route = `/modify/${mockReviews[0].id}`;
      const deleteButton = screen.getByText("Modify");

      await userEvent.click(deleteButton);

      expect(mockNavigate).toBeCalledWith(route);
    });
  });
});
