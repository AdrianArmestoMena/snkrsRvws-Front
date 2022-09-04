import { renderHook } from "@testing-library/react";
import Wrapper from "../test-utils/Wrapper";
import { ReviewAdd } from "../types/Review";
import useReviews from "./useReviews";

const mockUseDispatch = jest.fn();
const mockThrowError = "";

jest.mock("../store/hooks", () => ({
  ...jest.requireActual("../store/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

jest.mock("../store/features/uiModal/uiModalSlice", () => ({
  ...jest.requireActual("../store/features/uiModal/uiModalSlice"),
  throwMessageErrorActionCreator: () => mockThrowError,
}));

describe("Given a useReviews custom hook", () => {
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
});
