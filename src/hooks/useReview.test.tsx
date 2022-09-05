import { renderHook } from "@testing-library/react";
import { loadReviewsActionCreator } from "../store/features/reviews/reviewsSlice";
import Wrapper from "../test-utils/Wrapper";
import { ReviewAdd } from "../types/Review";
import useReviews from "./useReviews";

const mockUseDispatch = jest.fn();
const mockUser = {
  id: "1234",
};
const mockThrowError = "";

jest.mock("../store/hooks", () => ({
  ...jest.requireActual("../store/hooks"),
  useAppDispatch: () => mockUseDispatch,
  useAppSelector: () => mockUser,
}));

jest.mock("../store/features/uiModal/uiModalSlice", () => ({
  ...jest.requireActual("../store/features/uiModal/uiModalSlice"),
  throwMessageErrorActionCreator: () => mockThrowError,
}));

describe("Given a useReviews custom hook", () => {
  beforeEach(() => jest.clearAllMocks());
  describe("When createReview method is called with a correct review", () => {
    const review: ReviewAdd = {
      brand: "nike",
      model: "Jordan11",
      review: "Nice shoes",
      picture: "img",
      owner: "630e5e99bd6d5f91b999517b",
    };
    const reviewData = JSON.stringify(review);

    const formdata = new FormData();

    formdata.append("picture", "jordan.jpg");
    formdata.append("review", reviewData);

    test("Then it should return the created review", async () => {
      const expectedResponse = {
        newReview: {
          brand: "nike",
          model: "jordan11",
          picture: "uploads\\b1c7cbcb713f5c58adfb155d8640088d",
          review: "Nice shoes",
          owner: "630e5e99bd6d5f91b999517b",
          likes: [],
          comments: [],
          id: "63149166440acde4125bf0f8",
        },
      };

      const {
        result: {
          current: { createReview },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      const revicedResponse = await createReview(formdata);

      expect(revicedResponse).toStrictEqual(expectedResponse);
    });
  });

  describe("When createReview method is called with a incorrect data review", () => {
    const review: ReviewAdd = {
      brand: "",
      model: "Jordan11",
      review: "Nice shoes",
      picture: "img",
      owner: "630e5e99bd6d5f91b999517b",
    };
    const reviewData = JSON.stringify(review);

    const formdata = new FormData();

    formdata.append("picture", "jordan.jpg");
    formdata.append("review", reviewData);

    test("Then it should return the created review", async () => {
      const {
        result: {
          current: { createReview },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await createReview(formdata);

      expect(mockUseDispatch).toHaveBeenCalledWith(mockThrowError);
    });
  });

  describe("When loadbReviewsby owner method is called with a correct review", () => {
    test("Then it should called the dispatch with the load reviews action", async () => {
      const getReviews = [
        {
          brand: "NIke",
          model: "Jordan 11 low black and white",
          picture: "uploads/f96fc1f1c03538f4940955da94925f90",
          review: "weqklrn ejq rtjqenr qejrt qer iluqe",
          owner: "6310d142612b1f0a1cec8961",
          likes: [],
          comments: [],
          id: "6315c901e752dbaefbdfca05",
        },
      ];
      const {
        result: {
          current: { loadReviewsByOwner },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await loadReviewsByOwner();

      expect(mockUseDispatch).toHaveBeenCalledWith(
        loadReviewsActionCreator(getReviews)
      );
    });

    test("Then if the request return an error it shouldn't called the dispatch with the load reviews action", async () => {
      mockUser.id = "12345";

      const getReviews = [
        {
          brand: "NIke",
          model: "Jordan 11 low black and white",
          picture: "uploads/f96fc1f1c03538f4940955da94925f90",
          review: "weqklrn ejq rtjqenr qejrt qer iluqe",
          owner: "6310d142612b1f0a1cec8961",
          likes: [],
          comments: [],
          id: "6315c901e752dbaefbdfca05",
        },
      ];

      const {
        result: {
          current: { loadReviewsByOwner },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await loadReviewsByOwner();

      expect(mockUseDispatch).not.toHaveBeenCalledWith(
        loadReviewsActionCreator(getReviews)
      );
      expect(mockUseDispatch).toHaveBeenCalledWith(mockThrowError);
    });
  });
});
