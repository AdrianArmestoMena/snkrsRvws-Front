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

  return reviews.length ? (
    <ReviewsListStyle>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review.review}
          brand={review.brand}
          model={review.model}
          picture={review.picture}
          owner={user.userName}
          id={review.id}
        />
      ))}
    </ReviewsListStyle>
  ) : (
    <h3 className="reviees__no-reviews">You still don't have reviews</h3>
  );
};

export default ReviewsList;
