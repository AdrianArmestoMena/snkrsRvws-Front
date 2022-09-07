import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loadReviewsActionCreator } from "../store/features/reviews/reviewsSlice";
import {
  closeAllActionCreator,
  closeLoadingActionCreator,
  loadingUiActionCreator,
  throwMessageErrorActionCreator,
} from "../store/features/uiModal/uiModalSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ReviewsResponse } from "../types/Review";

const apiUrl = process.env.REACT_APP_API_URL;

const useReviews = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.users);

  const createReview = async (formData: FormData) => {
    let response;
    const token = localStorage.getItem("token");
    try {
      dispatch(loadingUiActionCreator());
      response = await axios.post(`${apiUrl}/reviews/addreview`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      const errorObject = JSON.parse((error as AxiosError).request.response);
      dispatch(closeLoadingActionCreator());
      dispatch(throwMessageErrorActionCreator(errorObject.error));
      return false;
    }
    navigate("/your-reviews");
    dispatch(closeAllActionCreator());
    return response.data;
  };

  const loadReviewsByOwner = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      dispatch(loadingUiActionCreator());
      const {
        data: { reviews },
      }: AxiosResponse<ReviewsResponse> = await axios.get(
        `${apiUrl}/reviews/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(loadReviewsActionCreator(reviews));
    } catch (error) {
      const errorObject = JSON.parse((error as AxiosError).request.response);
      dispatch(closeLoadingActionCreator());
      dispatch(throwMessageErrorActionCreator(errorObject.error));
      return false;
    }
    dispatch(closeAllActionCreator());
    return true;
  }, [dispatch, user.id]);

  return { createReview, loadReviewsByOwner };
};

export default useReviews;
