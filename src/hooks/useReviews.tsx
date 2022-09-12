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
      navigate("/your-reviews");
    } catch (error) {
      const errorObject = JSON.parse((error as AxiosError).request.response);
      dispatch(closeLoadingActionCreator());
      dispatch(throwMessageErrorActionCreator(errorObject.error));
      setTimeout(() => {
        dispatch(closeAllActionCreator());
      }, 3000);
      return false;
    }
    dispatch(closeAllActionCreator());
    return response.data;
  };

  const updateReview = async (formData: FormData, id: string) => {
    let response;
    const token = localStorage.getItem("token");
    try {
      dispatch(loadingUiActionCreator());
      response = await axios.put(
        `${apiUrl}/reviews/updatereview/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/your-reviews");
    } catch (error) {
      const errorObject = JSON.parse((error as AxiosError).request.response);
      dispatch(closeLoadingActionCreator());
      dispatch(throwMessageErrorActionCreator(errorObject.error));
      setTimeout(() => {
        dispatch(closeAllActionCreator());
      }, 3000);
      return false;
    }
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
      setTimeout(() => {
        dispatch(closeAllActionCreator());
      }, 3000);
      return false;
    }
    dispatch(closeAllActionCreator());
    return true;
  }, [dispatch, user.id]);

  const loadaAllReviews = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      dispatch(loadingUiActionCreator());
      const {
        data: { reviews },
      }: AxiosResponse<ReviewsResponse> = await axios.get(`${apiUrl}/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(loadReviewsActionCreator(reviews));
    } catch (error) {
      dispatch(closeLoadingActionCreator());
      dispatch(throwMessageErrorActionCreator("Could not load reviews"));
      setTimeout(() => {
        dispatch(closeAllActionCreator());
      }, 3000);
      return false;
    }
    dispatch(closeAllActionCreator());
    return true;
  }, [dispatch]);

  const loadReviewsByBrand = useCallback(
    async (brand: string) => {
      const token = localStorage.getItem("token");
      try {
        dispatch(loadingUiActionCreator());
        const {
          data: { reviews },
        }: AxiosResponse<ReviewsResponse> = await axios.get(
          `${apiUrl}/reviews/bybrand/${brand}`,
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
        setTimeout(() => {
          dispatch(closeAllActionCreator());
        }, 3000);
        return false;
      }
      dispatch(closeAllActionCreator());
      return true;
    },
    [dispatch]
  );

  const loadReviewById = useCallback(
    async (id: string) => {
      const token = localStorage.getItem("token");
      try {
        dispatch(loadingUiActionCreator());
        const {
          data: { reviews },
        }: AxiosResponse<ReviewsResponse> = await axios.get(
          `${apiUrl}/reviews/onereview/${id}`,
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
        setTimeout(() => {
          dispatch(closeAllActionCreator());
        }, 3000);
        return false;
      }
      dispatch(closeAllActionCreator());
      return true;
    },
    [dispatch]
  );

  const deleteReview = useCallback(
    async (id: string) => {
      const token = localStorage.getItem("token");
      try {
        dispatch(loadingUiActionCreator());
        await axios.delete(`${apiUrl}/reviews/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        loadReviewsByOwner();
      } catch (error) {
        const errorObject = JSON.parse((error as AxiosError).request.response);
        dispatch(closeLoadingActionCreator());
        dispatch(throwMessageErrorActionCreator(errorObject.error));
        setTimeout(() => {
          dispatch(closeAllActionCreator());
        }, 3000);
        return false;
      }
      dispatch(closeAllActionCreator());
      return true;
    },
    [dispatch, loadReviewsByOwner]
  );

  return {
    createReview,
    loadReviewsByOwner,
    deleteReview,
    loadReviewById,
    updateReview,
    loadReviewsByBrand,
    loadaAllReviews,
  };
};

export default useReviews;
