import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Review } from "../../../types/Review";

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
    backupImage: "url",
  },
];

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    loadReviews: (state: Review[], action: PayloadAction<Review[]>) =>
      action.payload,
  },
});

export const { loadReviews: loadReviewsActionCreator } = reviewsSlice.actions;

export const reviewsReducer = reviewsSlice.reducer;
