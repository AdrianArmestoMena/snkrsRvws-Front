import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
  closeAllActionCreator,
  closeLoadingActionCreator,
  loadingUiActionCreator,
  throwMessageErrorActionCreator,
} from "../store/features/uiModal/uiModalSlice";
import { useAppDispatch } from "../store/hooks";

const apiUrl = process.env.REACT_APP_API_URL;

const useReviews = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    navigate("/");
    dispatch(closeAllActionCreator());
    return response.data;
  };
  return { createReview };
};

export default useReviews;
