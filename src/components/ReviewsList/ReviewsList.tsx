import { useEffect } from "react";
import useReviews from "../../hooks/useReviews";
import { useAppSelector } from "../../store/hooks";
import ReviewCard from "../ReviewCard/ReviewCard";
import ReviewsListStyle from "./ReviewsList.style";

const ReviewsList = (): JSX.Element => {
  const { loadReviewsByOwner } = useReviews();
  const reviews = useAppSelector((state) => state.reviews);
  const user = useAppSelector((state) => state.users);

  useEffect(() => {
    loadReviewsByOwner();
  }, [loadReviewsByOwner]);

  return (
    <ReviewsListStyle>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review.review}
          brand={review.brand}
          model={review.model}
          picture={review.picture}
          owner={user.userName}
        />
      ))}
    </ReviewsListStyle>
  );
};

export default ReviewsList;
