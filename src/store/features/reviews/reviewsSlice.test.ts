import { Review } from "../../../types/Review";
import { loadReviewsActionCreator, reviewsReducer } from "./reviewsSlice";

describe("Given a reviews reducer function", () => {
  const initialState: Review[] = [
    {
      brand: "",
      model: "",
      picture: "",
      review: "",
      owner: "",
      likes: [],
      comments: [],
      id: "",
    },
  ];
  describe("When it is called with an undefined action and an unknow state", () => {
    test("Then it should return the initial state", () => {
      const unknownAction = { type: "unknown" };

      expect(reviewsReducer(undefined, unknownAction)).toEqual(initialState);
    });

    describe("When it is called with a loading action", () => {
      test("Then it should return the uiState loading on the action payload", () => {
        const reviewsToLoad: Review[] = [
          {
            brand: "Nike",
            model: "airmax 1",
            picture: "jpg",
            review: "nice",
            owner: "me",
            likes: [],
            comments: [],
            id: "1234",
          },
        ];

        const actualReviews = reviewsReducer(
          undefined,
          loadReviewsActionCreator(reviewsToLoad)
        );

        expect(actualReviews).toStrictEqual(reviewsToLoad);
      });
    });
  });
});
