import { renderHook } from "@testing-library/react";
import axios from "axios";
import { loadReviewsActionCreator } from "../store/features/reviews/reviewsSlice";
import Wrapper from "../test-utils/Wrapper";
import { ReviewAdd } from "../types/Review";
import useReviews from "./useReviews";

const mockUseDispatch = jest.fn();
const mockUser = {
  id: "1234",
};
const mockThrowError = "";
const closeAllActionCreator = "";
jest.useFakeTimers();

jest.mock("../store/hooks", () => ({
  ...jest.requireActual("../store/hooks"),
  useAppDispatch: () => mockUseDispatch,
  useAppSelector: () => mockUser,
}));

jest.mock("../store/features/uiModal/uiModalSlice", () => ({
  ...jest.requireActual("../store/features/uiModal/uiModalSlice"),
  throwMessageErrorActionCreator: () => mockThrowError,
  closeAllActionCreator: () => closeAllActionCreator,
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
          backupImage: "url",
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

      jest.advanceTimersByTime(4000);

      expect(mockUseDispatch).toHaveBeenCalledWith(closeAllActionCreator);
    });
  });

  describe("When loadbReviewsby owner method is called with a correct owner id", () => {
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
          backupImage: "url",
        },
      ];
      const {
        result: {
          current: { loadReviewsByOwner },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await loadReviewsByOwner(1);

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
          backupImage: "url",
        },
      ];

      const {
        result: {
          current: { loadReviewsByOwner },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await loadReviewsByOwner(1);

      expect(mockUseDispatch).not.toHaveBeenCalledWith(
        loadReviewsActionCreator(getReviews)
      );
      expect(mockUseDispatch).toHaveBeenCalledWith(mockThrowError);
    });

    test("Then if the request return an error it should called the dispatch with the cloase all modals action after 3 seconds", async () => {
      mockUser.id = "12345";

      const {
        result: {
          current: { loadReviewsByOwner },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await loadReviewsByOwner(1);

      jest.advanceTimersByTime(3100);
      expect(mockUseDispatch).toHaveBeenCalledWith(closeAllActionCreator);
    });
  });

  describe("When loadbReviewsby brand method is called with a brand", () => {
    test("Then it should called the dispatch with the load reviews action", async () => {
      const getReviews = [
        {
          brand: "Nike",
          model: "Jordan 11 low black and white",
          picture: "uploads/f96fc1f1c03538f4940955da94925f90",
          review: "weqklrn ejq rtjqenr qejrt qer iluqe",
          owner: "6310d142612b1f0a1cec8961",
          likes: [],
          comments: [],
          id: "6315c901e752dbaefbdfca05",
          backupImage: "url",
        },
      ];
      const {
        result: {
          current: { loadReviewsByBrand },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await loadReviewsByBrand(getReviews[0].brand);

      expect(mockUseDispatch).toHaveBeenCalledWith(
        loadReviewsActionCreator(getReviews)
      );
    });

    test("Then if the request return an error it shouldn't called the dispatch with the load reviews action", async () => {
      const wrongBrand = "geox";
      const getReviews = [
        {
          brand: "Nike",
          model: "Jordan 11 low black and white",
          picture: "uploads/f96fc1f1c03538f4940955da94925f90",
          review: "weqklrn ejq rtjqenr qejrt qer iluqe",
          owner: "6310d142612b1f0a1cec8961",
          likes: [],
          comments: [],
          id: "6315c901e752dbaefbdfca05",
          backupImage: "url",
        },
      ];

      const {
        result: {
          current: { loadReviewsByBrand },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await loadReviewsByBrand(wrongBrand);

      expect(mockUseDispatch).not.toHaveBeenCalledWith(
        loadReviewsActionCreator(getReviews)
      );
      expect(mockUseDispatch).toHaveBeenCalledWith(mockThrowError);
    });

    test("Then if the request return an error it should called the dispatch with the cloase all modals action after 3 seconds", async () => {
      const wrongBrand = "geox";

      const {
        result: {
          current: { loadReviewsByBrand },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await loadReviewsByBrand(wrongBrand);

      jest.advanceTimersByTime(3100);
      expect(mockUseDispatch).toHaveBeenCalledWith(closeAllActionCreator);
    });
  });

  describe("When loadbReviewbyId method is called with a correct id", () => {
    const getReviews = [
      {
        brand: "Adidas",
        model: "forum",
        picture: "uploads/f96fc1f1c03538f4940955da94925f90",
        review: "weqklrn ejq rtjqenr qejrt qer iluqe",
        owner: "6310d142612b1f0a1cec8961",
        likes: [],
        comments: [],
        id: "1234",
        backupImage: "url",
      },
    ];
    test("Then it should called the dispatch with the load reviews action", async () => {
      const {
        result: {
          current: { loadReviewById },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await loadReviewById(getReviews[0].id);

      expect(mockUseDispatch).toHaveBeenCalledWith(
        loadReviewsActionCreator(getReviews)
      );
    });

    test("Then if the request return an error it shouldn't called the dispatch with the load reviews action", async () => {
      const reviewIncorrctId: string = "12345";

      const {
        result: {
          current: { loadReviewById },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await loadReviewById(reviewIncorrctId);

      expect(mockUseDispatch).not.toHaveBeenCalledWith(
        loadReviewsActionCreator(getReviews)
      );
      expect(mockUseDispatch).toHaveBeenCalledWith(mockThrowError);
    });

    test("Then if the request return an error it should called the dispatch with the cloase all modals action after 3 seconds", async () => {
      const reviewIncorrctId: string = "12345";
      const {
        result: {
          current: { loadReviewById },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await loadReviewById(reviewIncorrctId);

      jest.advanceTimersByTime(3100);
      expect(mockUseDispatch).toHaveBeenCalledWith(closeAllActionCreator);
    });
  });

  describe("When deleteReview  method is called with a correct id", () => {
    test("Then it should called the dispatch with the load reviews action", async () => {
      const id = "1234";
      const {
        result: {
          current: { deleteReview },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      const returnedValued = await deleteReview(id);

      expect(returnedValued).toBe(true);
    });

    test("Then if the request return an error it shouldn't called the dispatch with the load reviews action", async () => {
      const id = "12345";

      const {
        result: {
          current: { deleteReview },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await deleteReview(id);

      expect(mockUseDispatch).toHaveBeenCalledWith(mockThrowError);

      jest.advanceTimersByTime(3100);

      expect(mockUseDispatch).toHaveBeenCalledWith(closeAllActionCreator);
    });
  });

  describe("When updateReview method is called with a correct review and an id", () => {
    const review: ReviewAdd = {
      brand: "adidas",
      model: "12",
      picture: "123",
      review: "nix",
      owner: "630e5e99bd6d5f91b999517b",
    };

    const id = "1234";
    const reviewData = JSON.stringify(review);

    const formdata = new FormData();

    formdata.append("picture", "jordan.jpg");
    formdata.append("review", reviewData);

    test("Then it should return the created review", async () => {
      const expectedResponse = {
        newReview: {
          brand: "adidas",
          model: "12",
          picture: "123",
          review: "nix",
          owner: "630e5e99bd6d5f91b999517b",
          likes: [],
          comments: [],
          id: "63149166440acde4125bf0f8",
        },
      };

      const {
        result: {
          current: { updateReview },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      const revicedResponse = await updateReview(formdata, id);

      expect(revicedResponse).toStrictEqual(expectedResponse);
    });
  });

  describe("When updateReview method is called with a incorrect data review", () => {
    const review: ReviewAdd = {
      brand: "",
      model: "Jordan11",
      review: "Nice shoes",
      picture: "img",
      owner: "630e5e99bd6d5f91b999517b",
    };
    const reviewData = JSON.stringify(review);
    const id = "1234";
    const formdata = new FormData();

    formdata.append("picture", "jordan.jpg");
    formdata.append("review", reviewData);

    test("Then it should return the created review", async () => {
      const {
        result: {
          current: { updateReview },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await updateReview(formdata, id);

      expect(mockUseDispatch).toHaveBeenCalledWith(mockThrowError);

      jest.advanceTimersByTime(4000);

      expect(mockUseDispatch).toHaveBeenCalledWith(closeAllActionCreator);
    });
  });

  describe("When load all reviews  method is called", () => {
    test("Then it should called the dispatch with the load reviews action", async () => {
      const getReviews = [
        {
          brand: "Nike",
          model: "Jordan 11 low black and white",
          picture: "uploads/f96fc1f1c03538f4940955da94925f90",
          review: "weqklrn ejq rtjqenr qejrt qer iluqe",
          owner: "6310d142612b1f0a1cec8961",
          likes: [],
          comments: [],
          id: "6315c901e752dbaefbdfca05",
          backupImage: "url",
        },
      ];
      const {
        result: {
          current: { loadaAllReviews },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await loadaAllReviews(1);

      expect(mockUseDispatch).toHaveBeenCalledWith(
        loadReviewsActionCreator(getReviews)
      );
    });

    test("Then if the request return an error it should called the dispatch with the cloase all modals action after 3 seconds", async () => {
      axios.get = jest.fn().mockRejectedValue(new Error());

      const {
        result: {
          current: { loadaAllReviews },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await loadaAllReviews(1);

      jest.advanceTimersByTime(3100);
      expect(mockUseDispatch).toHaveBeenCalledWith(closeAllActionCreator);
    });

    test("Then if the request return an empty array it shouldn't called the dispatch with the cloase loadreviews action creator", async () => {
      axios.get = jest.fn().mockResolvedValue({ data: { reviews: [] } });

      const {
        result: {
          current: { loadaAllReviews },
        },
      } = renderHook(useReviews, { wrapper: Wrapper });

      await loadaAllReviews(1);

      expect(mockUseDispatch).not.toHaveBeenCalledWith(
        loadReviewsActionCreator
      );
      expect(mockUseDispatch).toHaveBeenCalledWith(closeAllActionCreator);
    });
  });
});

describe("When loadbReviewsby owner method is called with a correct owner id", () => {
  test("Then if the request return an empty array it shouldn't called the dispatch with the cloase loadreviews action creator", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: { reviews: [] } });

    const {
      result: {
        current: { loadReviewsByOwner },
      },
    } = renderHook(useReviews, { wrapper: Wrapper });

    await loadReviewsByOwner(1);

    expect(mockUseDispatch).not.toHaveBeenCalledWith(loadReviewsActionCreator);
    expect(mockUseDispatch).toHaveBeenCalledWith(closeAllActionCreator);
  });
});
