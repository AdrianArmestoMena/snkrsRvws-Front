import { screen, wrappedRender } from "../../test-utils/WrappedRender";
import ReviewsList from "./ReviewsList";

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
  },
];
jest.mock("../../store/hooks", () => ({
  ...jest.requireActual("../../store/hooks"),
  useAppSelector: () => mockReviews,
}));

const mockUseReviews = {
  loadReviewsByOwner: jest.fn(),
  loadaAllReviews: jest.fn(),
};

jest.mock("../../hooks/useReviews", () => () => mockUseReviews);

describe("Given a reviews list function", () => {
  beforeEach(() => jest.clearAllMocks());
  describe("When it is instantiated", () => {
    test("Then it should us much reviews as reviews are on the reviews state", () => {
      wrappedRender(<ReviewsList isHome={false}></ReviewsList>);

      const items = screen.getAllByRole("listitem");

      expect(items).toHaveLength(mockReviews.length);
    });

    test("Then it should call userevies'function loadReviewsByOwner", () => {
      wrappedRender(<ReviewsList isHome={false}></ReviewsList>);

      expect(mockUseReviews.loadReviewsByOwner).toHaveBeenCalled();
    });

    test("Then there are not reviews in the state it should show an advice", () => {
      mockReviews = [
        {
          brand: "",
          model: "J",
          picture: "",
          review: "",
          owner: "",
          likes: [],
          comments: [],
          id: "",
        },
      ];

      wrappedRender(<ReviewsList isHome={false}></ReviewsList>);

      const noReviews = screen.getByRole("heading", {
        name: "You don't have reviews yet",
      });

      expect(noReviews).toBeInTheDocument();
    });

    test("Then there are not reviews in the state it should show an advice if isHome is true", () => {
      mockReviews = [
        {
          brand: "",
          model: "J",
          picture: "",
          review: "",
          owner: "",
          likes: [],
          comments: [],
          id: "",
        },
      ];

      wrappedRender(<ReviewsList isHome={true}></ReviewsList>);

      const noReviews = screen.getByRole("heading", {
        name: "No reviews found",
      });

      expect(noReviews).toBeInTheDocument();
    });
  });
});
