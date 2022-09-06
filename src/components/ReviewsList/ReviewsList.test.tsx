import { screen, wrappedRender } from "../../test-utils/WrappedRender";
import ReviewsList from "./ReviewsList";

const reviews = [
  {
    brand: "NIke",
    model: "Jordan 11 low black and white",
    picture: "3631ee0b22ed7c7dca950bccab9d75e2",
    review: "asfa sdfgsdvwe antonioooooooo",
    owner: "6310d142612b1f0a1cec8961",
    likes: [],
    comments: [],
    id: "631765170a79f65125123e64",
  },
];
jest.mock("../../store/hooks", () => ({
  ...jest.requireActual("../../store/hooks"),
  useAppSelector: () => reviews,
}));

const mockUseReviews = {
  loadReviewsByOwner: jest.fn(),
};

jest.mock("../../hooks/useReviews", () => () => mockUseReviews);

describe("Given a reviews list function", () => {
  describe("When it is instantiated", () => {
    test("Then it should us much reviews as reviews are on the reviews state", () => {
      wrappedRender(<ReviewsList></ReviewsList>);

      const items = screen.getAllByRole("listitem");

      expect(items).toHaveLength(reviews.length);
    });

    test("Then it should call userevies'function loadReviewsByOwner", () => {
      wrappedRender(<ReviewsList></ReviewsList>);

      expect(mockUseReviews.loadReviewsByOwner).toHaveBeenCalled();
    });
  });
});
