import { useEffect } from "react";
import useReviews from "../../hooks/useReviews";
import { useAppSelector } from "../../store/hooks";
import Pagination from "../Pagination/Pagination";
import ReviewCard from "../ReviewCard/ReviewCard";
import ReviewsListStyle from "./ReviewsList.style";

interface ReviewsListParams {
  isHome: boolean;
}

const ReviewsList = ({ isHome }: ReviewsListParams): JSX.Element => {
  const { loadReviewsByOwner, loadaAllReviews } = useReviews();
  const reviews = useAppSelector((state) => state.reviews);
  const user = useAppSelector((state) => state.users);

  useEffect(() => {
    !isHome ? loadReviewsByOwner(1) : loadaAllReviews(1);
  }, [loadReviewsByOwner, isHome, loadaAllReviews]);

  return reviews.length ? (
    <ReviewsListStyle>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review.review}
          brand={review.brand}
          model={review.model}
          picture={review.picture}
          owner={!isHome ? user.userName : ""}
          id={review.id}
          backupImage={review.backupImage}
        />
      ))}
      <Pagination isHome={isHome} />
    </ReviewsListStyle>
  ) : (
    <h3 className="reviees__no-reviews">
      {isHome ? "No reviews found" : "You don't have reviews yet"}
    </h3>
  );
};

export default ReviewsList;
